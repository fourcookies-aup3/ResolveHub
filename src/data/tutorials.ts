export type Tutorial = {
  slug: string;
  title: string;
  description: string;
  level: "Anfänger" | "Fortgeschritten" | "Profi";
  duration: string;
  category: string;
  scenario: string;
  youtubeId: string;
  thumbnail?: string;
  steps: { title: string; body: string }[];
  tips?: string[];
};

import vintage from "@/assets/thumb-vintage.jpg";
import cyber from "@/assets/thumb-cyberpunk.jpg";
import desert from "@/assets/thumb-desert.jpg";
import tut from "@/assets/thumb-tutorial.jpg";
import hero from "@/assets/hero-cinematic.jpg";

const make = (
  slug: string, title: string, description: string,
  level: Tutorial["level"], duration: string, category: string, scenario: string,
  youtubeId: string, thumbnail: string,
  steps: Tutorial["steps"], tips: string[] = []
): Tutorial => ({ slug, title, description, level, duration, category, scenario, youtubeId, thumbnail, steps, tips });

export const tutorials: Tutorial[] = [
  make("primary-grade-basics",
    "Primary Grade Basics: Color Wheels meistern",
    "Lerne das Fundament jedes Grades: Lift, Gamma, Gain und Offset richtig einsetzen.",
    "Anfänger", "12 min", "Cinematic", "Allgemeines Footage",
    "qDHnCFMZ9HA", tut,
    [
      { title: "1. Footage einlesen & auf die Color-Page wechseln", body: "Importiere dein Material in den Media Pool. Wechsle über das untere Menü zur Color Page." },
      { title: "2. Scopes öffnen", body: "Aktiviere Waveform und Parade über das Scopes-Icon. Sie sind dein objektiver Kompass beim Graden." },
      { title: "3. Schwarzpunkt setzen mit Lift", body: "Senke den Lift, bis der untere Rand der Waveform fast 0 erreicht — ohne abzuschneiden." },
      { title: "4. Weißpunkt setzen mit Gain", body: "Hebe den Gain, bis Highlights bei ~1023 (10-bit) liegen, ohne zu klippen." },
      { title: "5. Mid-Tones balancieren mit Gamma", body: "Justiere den Gamma-Color-Wheel, um Hauttöne und Mitten zu balancieren." },
    ],
    ["Drücke ⇧H für 50% Vorschau, um vor/nach zu vergleichen.", "Setze Color-Wheels auf Doppelklick zurück."]
  ),

  make("teal-orange-cinematic",
    "Cinematic Teal & Orange Look",
    "Der ikonische Hollywood-Look — von Skintones bis Schatten korrekt aufgebaut.",
    "Fortgeschritten", "22 min", "Cinematic", "Outdoor / Stadt bei Nacht",
    "FUq9qRwrDjI", hero,
    [
      { title: "1. Node-Struktur planen", body: "Node 01 Primary, Node 02 Skin Protection, Node 03 Look (Teal/Orange), Node 04 Vignette." },
      { title: "2. Skintones isolieren", body: "Auf Node 02: HSL-Qualifier auf Hauttöne. Soft auf 30. Maske invertieren für Look-Anwendung." },
      { title: "3. Schatten Richtung Teal", body: "Im Look-Node: Lift-Wheel Richtung Cyan/Teal verschieben (~178°)." },
      { title: "4. Highlights Richtung Orange", body: "Gain-Wheel Richtung Orange (~30°). Saturation leicht anheben." },
      { title: "5. Skintones zurückholen", body: "Springe zu Node 02, hebe die Saturation der Hauttöne wieder an." },
      { title: "6. Vignette setzen", body: "Power Window oval, Soft hoch, Gain leicht runter." },
    ],
    ["Skintones sollten auf der Vector­scope-Linie zwischen Yellow und Red liegen.", "Halte den Look-Mix unter 70%."]
  ),

  make("log-footage-conversion",
    "LOG Footage richtig konvertieren (S-Log3, V-Log, BMD Film)",
    "Korrekte Color-Space-Transformation als Basis für alle weiteren Schritte.",
    "Anfänger", "15 min", "Log Footage", "RAW / LOG Material",
    "8AAEz1GFJxw", desert,
    [
      { title: "1. Color Management auf DaVinci YRGB Color Managed", body: "Project Settings → Color Management → DaVinci YRGB Color Managed." },
      { title: "2. Input Color Space pro Clip setzen", body: "Rechtsklick auf Clip → Input Color Space → z.B. Sony S-Log3 / S-Gamut3.Cine." },
      { title: "3. Timeline & Output Color Space wählen", body: "Timeline: DaVinci WG/Intermediate. Output: Rec.709 Gamma 2.4 für Web/Broadcast." },
      { title: "4. Erste Korrektur prüfen", body: "Footage sollte nun „normal" aussehen — danach erst kreatives Grading starten." },
    ]
  ),

  make("skin-tones-perfect",
    "Perfekte Skintones in 5 Schritten",
    "Hauttöne natürlich und schmeichelhaft — egal welcher Look später drüber liegt.",
    "Fortgeschritten", "18 min", "Skintones", "Portrait / Interview",
    "nYFq9HhA8Ko", vintage,
    [
      { title: "1. Vectorscope mit Skin-Tone-Line aktivieren", body: "Im Vectorscope Menü die Skin-Tone-Indicator-Linie einblenden." },
      { title: "2. HSL Qualifier auf Haut", body: "Picker auf Wange, Range erweitern, Highlight aktivieren um Maske zu prüfen." },
      { title: "3. Maske mit Power Window kombinieren", body: "Window auf das Gesicht, mit dem Qualifier per AND kombinieren." },
      { title: "4. Saturation der Haut sanft heben", body: "Auf isolierter Maske Sat um 5–10 anheben." },
      { title: "5. Hue Richtung Skin-Tone-Line drücken", body: "Hue-vs-Hue: roten/orangen Bereich leicht Richtung Linie ziehen." },
    ],
    ["Bei mehreren Personen lieber pro Person separater Node.", "Tracking nutzen, wenn die Person sich bewegt."]
  ),

  make("night-moody-grade",
    "Night & Moody Grade — Cyberpunk Vibes",
    "Tief, kontrastreich, Neon-Akzente: der perfekte Nacht-Look.",
    "Profi", "28 min", "Night & Moody", "Stadt bei Nacht / Neon",
    "QyaiHKm9CkE", cyber,
    [
      { title: "1. Schwarzwert tief ankern", body: "Lift deutlich runter, Schatten Richtung Blau/Magenta drücken." },
      { title: "2. Highlights kühl mit Tint", body: "Gain in Cyan-Richtung, Sättigung der Highlights selektiv erhöhen." },
      { title: "3. Neon isolieren", body: "Per HSL Qualifier Magenta- und Cyan-Lichter trennen, Glow per Blur+Composite." },
      { title: "4. Bloom-Effekt aufbauen", body: "Parallel-Node mit Blur, Composite-Mode 'Screen', Mix ~30%." },
      { title: "5. Filmkorn", body: "OFX 'Film Grain' auf 35mm 5219, Strength 0.4." },
    ]
  ),

  make("golden-hour-rescue",
    "Golden Hour retten & verstärken",
    "Wenn das Licht weg ist, bringst du es mit Resolve zurück.",
    "Fortgeschritten", "16 min", "Golden Hour", "Outdoor / Sonnenuntergang",
    "Z7eYpLJ8b3M", desert,
    [
      { title: "1. Belichtung anheben mit Highlights-Recovery", body: "HDR Wheels nutzen: Highlights leicht runter, Light hoch." },
      { title: "2. Warmen Tint im Gamma", body: "Gamma Richtung Orange/Yellow drücken." },
      { title: "3. Schatten Richtung Magenta", body: "Lift leicht Magenta für Komplementärkontrast." },
      { title: "4. Sky Replacement vorbereiten (optional)", body: "Per Magic Mask Himmel maskieren, Sat & Hue separat." },
    ]
  ),

  make("vintage-film-emulation",
    "Vintage Film Emulation mit DCTLs",
    "Halation, Bleach Bypass, Print-Film-LUTs realistisch kombinieren.",
    "Profi", "32 min", "Vintage / Film", "Story / Musikvideo",
    "1qFUOqjL3iQ", vintage,
    [
      { title: "1. Print Film Emulation LUT laden", body: "FilmConvert oder freie Kodak 2383 Emulation als Input-LUT." },
      { title: "2. Halation per DCTL", body: "Roten Channel nehmen, blurren, in den Komposit zurückführen." },
      { title: "3. Gate Weave & Grain", body: "OFX Camera Shake minimal + Grain 5219 Heavy für 16mm-Look." },
      { title: "4. Color Bleed reduzieren", body: "Sat global um 10 senken, Lumi-vs-Sat Kurve bei Highlights absenken." },
    ]
  ),

  make("interview-clean",
    "Clean Interview Look (Corporate / YouTube)",
    "Schmeichelhaft, neutral und konsistent — Standard für jedes Talking Head.",
    "Anfänger", "10 min", "Skintones", "Interview / YouTube",
    "y5Yc-Ssvp_I", tut,
    [
      { title: "1. Weißabgleich korrigieren", body: "Pipette auf neutrales Grau (Wand, Papier), Temperatur fein justieren." },
      { title: "2. Belichtung normalisieren", body: "Gain auf ~85% Waveform, Lift auf ~5%." },
      { title: "3. Skin leicht warm halten", body: "Gamma minimal Richtung Yellow." },
      { title: "4. Subtile Vignette", body: "Power Window oval, -0.05 Gain." },
    ]
  ),

  make("matching-multicam",
    "Multi-Cam Matching: Sony + Canon + iPhone",
    "Wie du unterschiedliches Material homogen aussehen lässt.",
    "Fortgeschritten", "26 min", "Log Footage", "Multi-Camera Setup",
    "lWkzuT3xxqM", tut,
    [
      { title: "1. Hero-Camera definieren", body: "Wähle die Kamera mit dem besten Bildprofil als Referenz." },
      { title: "2. Color Match Tool nutzen", body: "Color Chart in beiden Clips, Color Match → Apply." },
      { title: "3. Manuell mit Scopes verfeinern", body: "Parade vergleichen: RGB-Werte angleichen via Offset & Gain." },
      { title: "4. Shared Node als Look", body: "Final Look in Group Post Clip Node anwenden." },
    ]
  ),

  make("greenscreen-keying",
    "Green Screen Keying & Spill Suppression",
    "Sauberer Key auch bei schwierigem Material — ohne grünen Saum.",
    "Profi", "24 min", "Compositing", "VFX / Green Screen",
    "0gO3z-3BxN8", cyber,
    [
      { title: "1. 3D Keyer aufbauen", body: "Color Page → 3D Keyer Mode, Pinsel über Greenscreen ziehen." },
      { title: "2. Matte Finesse", body: "Clean Black & Clean White anpassen, Soften & Shrink für Kanten." },
      { title: "3. Spill entfernen", body: "Despill Strength erhöhen, Hue Rotation für Restgrün." },
      { title: "4. Edge Light hinzufügen", body: "Outside Node mit komplementärem Color für realistische Integration." },
    ]
  ),

  make("anamorphic-faux",
    "Faux Anamorphic Look ohne anamorphes Objektiv",
    "Oval Bokeh, blaue Lens Flares, 2.39:1 Crop.",
    "Fortgeschritten", "14 min", "Cinematic", "Sphärisch gedrehtes Material",
    "2tXcNJWZpks", hero,
    [
      { title: "1. Aspect-Ratio croppen", body: "Output-Blanking auf 2.39:1." },
      { title: "2. Blue Streak Flares", body: "ResolveFX Lens Flares → Anamorphic Streak Preset." },
      { title: "3. Subtile horizontale Distortion", body: "Edge Detect + Lens Distortion minimal." },
    ]
  ),

  make("hdr-deliverable",
    "HDR Mastering: PQ ST.2084 Deliverable",
    "Dolby Vision-ready Grading-Pipeline.",
    "Profi", "45 min", "HDR", "HDR Master",
    "RrPBsQyEy3o", desert,
    [
      { title: "1. Color Management auf HDR PQ", body: "Output: Rec.2020 ST.2084, 1000 Nits." },
      { title: "2. HDR Wheels nutzen", body: "Color Page → Palette → HDR Wheels für mehrere Tonal-Zones." },
      { title: "3. Dolby Vision Trim Pass", body: "Workflows → Dolby Vision → Analyze → Trims für 100/600 Nits." },
    ]
  ),
];

export const categories = Array.from(new Set(tutorials.map(t => t.category)));
export const levels = ["Anfänger","Fortgeschritten","Profi"] as const;

export const getTutorial = (slug: string) => tutorials.find(t => t.slug === slug);
