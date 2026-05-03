import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
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
            analysis: { type: "string", description: "Kurze Analyse des Ausgangsbilds (2-4 Sätze)." },
            mood: { type: "string", description: "Beabsichtigte Stimmung des Endlooks." },
            colorWheels: {
              type: "object",
              properties: {
                lift: { type: "string" }, gamma: { type: "string" }, gain: { type: "string" }, offset: { type: "string" },
              },
              required: ["lift","gamma","gain","offset"], additionalProperties: false,
            },
            curves: { type: "string", description: "Empfehlung zu Kurven (Luma/Hue vs Sat etc.)" },
            hueVsHue: { type: "string", description: "HSL Qualifier / Hue vs Hue Tipps." },
            steps: {
              type: "array",
              description: "Konkrete Step-by-Step Anweisungen in DaVinci Resolve.",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  node: { type: "string", description: "Empfohlener Node, z.B. 'Node 02 — Skin'" },
                },
                required: ["title","description","node"], additionalProperties: false,
              },
            },
            recommendedLut: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                strength: { type: "string", description: "z.B. '60% Mix'" },
              },
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
          {
            role: "user",
            content: [
              { type: "text", text: userText },
              { type: "image_url", image_url: { url: imageBase64 } },
            ],
          },
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
    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
