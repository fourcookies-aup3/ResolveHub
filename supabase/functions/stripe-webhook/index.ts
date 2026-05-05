import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });
const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function resolveUserId(sub: Stripe.Subscription, customerId: string): Promise<string | null> {
  const metaUid = (sub.metadata?.user_id as string | undefined) ?? null;
  if (metaUid) return metaUid;
  try {
    const customer = await stripe.customers.retrieve(customerId);
    if (customer && !(customer as Stripe.DeletedCustomer).deleted) {
      const c = customer as Stripe.Customer;
      const cMeta = (c.metadata?.user_id as string | undefined) ?? null;
      if (cMeta) return cMeta;
      if (c.email) {
        const { data } = await admin.auth.admin.listUsers();
        const u = data.users.find((x) => x.email?.toLowerCase() === c.email!.toLowerCase());
        return u?.id ?? null;
      }
    }
  } catch (_) { /* ignore */ }
  return null;
}

async function applySubscription(sub: Stripe.Subscription) {
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const userId = await resolveUserId(sub, customerId);
  if (!userId) {
    console.log("webhook: could not resolve user_id for sub", sub.id);
    return;
  }

  const isActive = sub.status === "active" || sub.status === "trialing";
  if (isActive) {
    const activeUntil = new Date(sub.current_period_end * 1000).toISOString();
    await admin.from("pro_members").upsert(
      { user_id: userId, active_until: activeUntil },
      { onConflict: "user_id" },
    );
    console.log("webhook: activated", userId, "until", activeUntil);
  } else {
    // canceled / unpaid / past_due -> revoke immediately
    await admin.from("pro_members").upsert(
      { user_id: userId, active_until: new Date(0).toISOString() },
      { onConflict: "user_id" },
    );
    console.log("webhook: deactivated", userId, "status", sub.status);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  let event: Stripe.Event;
  try {
    if (webhookSecret && signature) {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } else {
      // Fallback (no secret configured) – parse without verification
      event = JSON.parse(body) as Stripe.Event;
      console.warn("webhook: STRIPE_WEBHOOK_SECRET not set, skipping signature verification");
    }
  } catch (e) {
    console.error("webhook: signature verification failed", (e as Error).message);
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription" && session.subscription) {
          const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          if (session.metadata?.user_id && !sub.metadata?.user_id) {
            await stripe.subscriptions.update(subId, { metadata: { user_id: session.metadata.user_id } });
            sub.metadata = { ...sub.metadata, user_id: session.metadata.user_id };
          }
          await applySubscription(sub);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
      case "customer.subscription.paused":
      case "customer.subscription.resumed": {
        await applySubscription(event.data.object as Stripe.Subscription);
        break;
      }
      case "invoice.payment_succeeded": {
        const inv = event.data.object as Stripe.Invoice;
        if (inv.subscription) {
          const subId = typeof inv.subscription === "string" ? inv.subscription : inv.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          await applySubscription(sub);
        }
        break;
      }
      case "invoice.payment_failed": {
        const inv = event.data.object as Stripe.Invoice;
        if (inv.subscription) {
          const subId = typeof inv.subscription === "string" ? inv.subscription : inv.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          await applySubscription(sub);
        }
        break;
      }
      default:
        console.log("webhook: unhandled event", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("webhook handler error", (e as Error).message);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
