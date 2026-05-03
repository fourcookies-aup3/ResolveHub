import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FREE_LIMIT = 3;
const WINDOW_DAYS = 30;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Bitte einloggen, um den Analyzer zu nutzen." }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Nicht authentifiziert." }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = userData.user.id;

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Pro check
    const { data: pro } = await admin
      .from("pro_members")
      .select("active_until")
      .eq("user_id", userId)
      .maybeSingle();
    const isPro = !!pro?.active_until && new Date(pro.active_until) > new Date();

    // Free quota check (3 per 30 days)
    if (!isPro) {
      const since = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
      const { count } = await admin
        .from("analyzer_usage")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .gte("created_at", since);
      const used = count ?? 0;
      if (used >= FREE_LIMIT) {
        return new Response(JSON.stringify({
          error: "QUOTA_EXCEEDED",
          message: `Du hast deine 3 Free-Tokens für diesen Monat aufgebraucht. Upgrade auf Pro für unbegrenzte Analysen.`,
          remaining: 0, limit: FREE_LIMIT, isPro: false,
        }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    const { imageBase64, style, notes } = await req.json();
    if (!imageBase64 || !style) {
      return new Response(JSON.stringify({ error: "imageBase64 and style required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const systemPrompt = `Du bist ein erfahrener DaVinci Resolve Colorist. Analysiere das Bild und schlage einen konkreten Color-Grading-Workflow im gewählten Stil vor. Antworte ausschließlich über das Tool "grading_suggestion".`;
    const userText = `Gewünschter Stil: ${style}.\nZusätzliche Notizen: ${notes || "keine"}.\nAnalysiere das Ausgangsbild (Belichtung, Kontrast, Farbstich, Skintones, Stimmung) und gib einen Schritt-für-Schritt-Plan in DaVinci Resolve zurück.`;

    const tool = {
      type: "function",
      function: {
        name: "grading_suggestion",
        description: "Strukturierter Color-Grading-Vorschlag",
        parameters: {
          type: "object",
          properties: {
            analysis: { type: "string" }, mood: { type: "string" },
            colorWheels: {
              type: "object",
              properties: { lift: { type: "string" }, gamma: { type: "string" }, gain: { type: "string" }, offset: { type: "string" } },
              required: ["lift","gamma","gain","offset"], additionalProperties: false,
            },
            curves: { type: "string" }, hueVsHue: { type: "string" },
            steps: {
              type: "array",
              items: {
                type: "object",
                properties: { title: { type: "string" }, description: { type: "string" }, node: { type: "string" } },
                required: ["title","description","node"], additionalProperties: false,
              },
            },
            recommendedLut: {
              type: "object",
              properties: { name: { type: "string" }, description: { type: "string" }, strength: { type: "string" } },
              required: ["name","description","strength"], additionalProperties: false,
            },
          },
          required: ["analysis","mood","colorWheels","curves","hueVsHue","steps","recommendedLut"],
          additionalProperties: false,
        },
      },
    };

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: [
            { type: "text", text: userText },
            { type: "image_url", image_url: { url: imageBase64 } },
          ]},
        ],
        tools: [tool],
        tool_choice: { type: "function", function: { name: "grading_suggestion" } },
      }),
    });

    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error", resp.status, t);
      if (resp.status === 429) return new Response(JSON.stringify({ error: "Zu viele Anfragen. Bitte kurz warten." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (resp.status === 402) return new Response(JSON.stringify({ error: "AI-Guthaben erschöpft." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ error: "AI Gateway Fehler" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await resp.json();
    const args = data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) {
      return new Response(JSON.stringify({ error: "Kein Vorschlag erhalten" }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const parsed = JSON.parse(args);

    // Log usage (only for free users; pro is unlimited but we still log for stats)
    await admin.from("analyzer_usage").insert({ user_id: userId });

    // compute remaining
    let remaining: number | null = null;
    if (!isPro) {
      const since = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
      const { count } = await admin
        .from("analyzer_usage")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .gte("created_at", since);
      remaining = Math.max(0, FREE_LIMIT - (count ?? 0));
    }

    return new Response(JSON.stringify({ ...parsed, _meta: { isPro, remaining, limit: FREE_LIMIT } }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
