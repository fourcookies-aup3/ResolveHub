import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { lut_slug, lut_name } = await req.json();
    if (!lut_slug || typeof lut_slug !== "string") throw new Error("lut_slug required");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } }
    );
    const { data: u } = await supabase.auth.getUser();
    const user = u.user;
    if (!user?.email) throw new Error("Not authenticated");

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    const customerId = customers.data[0]?.id;

    const origin = req.headers.get("origin") ?? "http://localhost:5173";
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: { name: `LUT: ${lut_name ?? lut_slug}` },
          unit_amount: 300,
        },
        quantity: 1,
      }],
      success_url: `${origin}/luts?purchased=${encodeURIComponent(lut_slug)}`,
      cancel_url: `${origin}/luts?canceled=1`,
      metadata: { user_id: user.id, lut_slug, kind: "lut_purchase" },
      payment_intent_data: { metadata: { user_id: user.id, lut_slug, kind: "lut_purchase" } },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
