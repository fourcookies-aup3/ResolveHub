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
    "Gz_QzBdHDYc", tut,
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
    "2AhwGMOHh-Q", hero,
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
    "hFZDiXbFeJQ", desert,
    [
      { title: "1. Color Management auf DaVinci YRGB Color Managed", body: "Project Settings → Color Management → DaVinci YRGB Color Managed." },
      { title: "2. Input Color Space pro Clip setzen", body: "Rechtsklick auf Clip → Input Color Space → z.B. Sony S-Log3 / S-Gamut3.Cine." },
      { title: "3. Timeline & Output Color Space wählen", body: "Timeline: DaVinci WG/Intermediate. Output: Rec.709 Gamma 2.4 für Web/Broadcast." },
      { title: "4. Erste Korrektur prüfen", body: "Footage sollte nun normal aussehen — danach erst kreatives Grading starten." },
    ]
  ),

  make("skin-tones-perfect",
    "Perfekte Skintones in 5 Schritten",
    "Hauttöne natürlich und schmeichelhaft — egal welcher Look später drüber liegt.",
    "Fortgeschritten", "18 min", "Skintones", "Portrait / Interview",
    "1NiOIakkGV8", vintage,
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
    "RxmTgUpzH00", cyber,
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
    "4kfiwBeH7dA", desert,
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
    "AzpHKhnm-RA", vintage,
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
    "67KjW-McIOA", tut,
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
    "sKD2hlhK8rE", tut,
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
    "n5UR9XVtM28", cyber,
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
    "2v2lraFeoj0", hero,
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
    "fxOpRPNsMTM", desert,
    [
      { title: "1. Color Management auf HDR PQ", body: "Output: Rec.2020 ST.2084, 1000 Nits." },
      { title: "2. HDR Wheels nutzen", body: "Color Page → Palette → HDR Wheels für mehrere Tonal-Zones." },
      { title: "3. Dolby Vision Trim Pass", body: "Workflows → Dolby Vision → Analyze → Trims für 100/600 Nits." },
    ]
  ),

  make("retro-vhs-look",
    "Retro VHS / 80s Look",
    "Magenta-Cast, Bandverzerrung und gelifteter Schwarzwert für authentischen VHS-Vibe.",
    "Anfänger", "11 min", "Vintage / Film", "Musikvideo / Retro",
    "qoHdMRk5864", vintage,
    [
      { title: "1. Lift Richtung Magenta", body: "Lift-Wheel leicht Richtung Magenta-Lila ziehen, Schwarzwert auf ~10% lifteln." },
      { title: "2. Saturation reduzieren", body: "Globale Sat auf 0.8 — VHS war nie sehr farbgenau." },
      { title: "3. Soft Glow + Chromatic Aberration", body: "ResolveFX Soft Glow, leichte Aberration via Lens Distortion." },
      { title: "4. Scanlines & Noise overlay", body: "Generator → Noise + Lined Pattern, Composite Mode 'Overlay' bei 15%." },
    ],
    ["VHS hatte 240 sichtbare Linien — minimal komprimieren für Authentizität."]
  ),

  make("anime-pop-grade",
    "Anime / Cell-Shaded Look",
    "Übersättigte Pop-Farben mit weichen Highlights — ideal für stylized Content.",
    "Fortgeschritten", "14 min", "Stylized", "Stylized / Animation",
    "WWPzENHUGXk", cyber,
    [
      { title: "1. Saturation deutlich anheben", body: "Globale Sat auf 1.5, Highlights leicht entsättigen für die Soft-Spots." },
      { title: "2. Hue vs Hue Shifts", body: "Grün-Töne Richtung Cyan, Rot Richtung Magenta drücken." },
      { title: "3. Posterize-Effekt mild", body: "OFX Posterize mit 8-12 Levels, Mix 30%." },
      { title: "4. Outline via Edge Detect", body: "Parallel-Node mit Edge Detect, schwarze Linien minimal überlagern." },
    ]
  ),

  make("bleach-bypass-grade",
    "Bleach Bypass — der 'Saving Private Ryan' Look",
    "Hoher Kontrast, entsättigte Mids, silbriger Schein.",
    "Fortgeschritten", "13 min", "Vintage / Film", "Krieg / Drama",
    "VyYMbqR_X9M", vintage,
    [
      { title: "1. Sättigung halbieren", body: "Globale Saturation auf 0.5 setzen." },
      { title: "2. Kontrast deutlich erhöhen", body: "Contrast auf 1.3, Pivot leicht nach unten verschieben." },
      { title: "3. Cool Cast in Schatten", body: "Lift Richtung Cyan-Blau für den 'metallischen' Schein." },
      { title: "4. Korn hinzufügen", body: "Film Grain 5219 mit Strength 0.6 für rauen Look." },
    ]
  ),

  make("pastel-dream-grade",
    "Pastel Dream — Wedding & Lifestyle",
    "Verträumter Pastell-Look mit angehobenen Schwarzwerten.",
    "Anfänger", "9 min", "Stylized", "Wedding / Lifestyle",
    "VyYMbqR_X9M", vintage,
    [
      { title: "1. Lift deutlich anheben", body: "Lift +0.05 für den 'milky' Look, Schwarzwerte verschwinden." },
      { title: "2. Sättigung leicht senken", body: "Sat auf 0.85 für sanfte Pastell-Töne." },
      { title: "3. Gamma Richtung Pink", body: "Mids leicht Richtung Magenta-Rosa." },
      { title: "4. Soft Bloom", body: "ResolveFX Glow mit niedriger Intensity (~0.2)." },
    ]
  ),

  make("blockbuster-action",
    "Blockbuster Action Grade",
    "Hochkontrastiger Action-Look à la Michael Bay — knackig, warm, episch.",
    "Profi", "20 min", "Cinematic", "Action / Trailer",
    "1-5mXPEsm3k", hero,
    [
      { title: "1. Crushed Blacks", body: "Lift -0.08, schwarze Bereiche tief absenken für dramatische Schatten." },
      { title: "2. Warm Highlights", body: "Gain Richtung Orange-Gelb, Sättigung der Highlights anheben." },
      { title: "3. Selective Saturation", body: "Sat vs Lum: Mids deutlich sättigen, Highlights leicht entsättigen." },
      { title: "4. Anamorphic Crop + Flares", body: "2.39:1 Crop, blue Streak Flares auf Highlights." },
    ]
  ),

  make("documentary-natural",
    "Documentary Natural Grade",
    "Ehrlich, neutral, aber dennoch professionell aussehend — für Doku & Reportage.",
    "Anfänger", "12 min", "Natural", "Doku / Reportage",
    "TYi_y5cjFkY", tut,
    [
      { title: "1. Weißabgleich präzise korrigieren", body: "Pipette auf Grau, dann Feinkorrektur via Temperatur/Tint." },
      { title: "2. Subtile Sat-Anhebung", body: "Sat auf 1.05 — minimal, damit es nicht 'graded' aussieht." },
      { title: "3. Highlight Recovery", body: "HDR Wheels: Highlights -0.1 für überstrahltes Licht." },
      { title: "4. Konsistenz zwischen Clips", body: "Per Group Pre-Clip einheitliche Basis-Korrektur." },
    ]
  ),

  make("music-video-punch",
    "Music Video Color Punch",
    "Knallige, gesättigte Farben mit hohem Kontrast für Musikvideos.",
    "Fortgeschritten", "17 min", "Stylized", "Musikvideo",
    "5h12LYZlvzI", cyber,
    [
      { title: "1. Hard Contrast Curve", body: "S-Kurve auf Custom Curves — Highlights und Schatten verstärken." },
      { title: "2. Color Boost", body: "Sat auf 1.4, Color Boost OFX hinzu." },
      { title: "3. Komplementäre Looks pro Cut", body: "Pro Szene andere Komplementärfarben — Energie durch Wechsel." },
      { title: "4. Fast Vignettes", body: "Power Window mit hartem Falloff für visuellen Beat." },
    ]
  ),

  make("horror-grade",
    "Horror Color Grade — Green Cast",
    "Beklemmende Atmosphäre durch grünlichen Cast und tiefe Schatten.",
    "Fortgeschritten", "15 min", "Night & Moody", "Horror / Thriller",
    "IFVf6OJZcG4", cyber,
    [
      { title: "1. Green Cast in Mids", body: "Gamma deutlich Richtung Grün-Gelb." },
      { title: "2. Tiefe, kalte Schatten", body: "Lift Richtung Blau-Grün, sehr tief." },
      { title: "3. Skintones leicht entsättigen", body: "HSL Qualifier auf Haut, Sat -20." },
      { title: "4. Vignette + Korn", body: "Harte Vignette, schweres Filmkorn für Unbehagen." },
    ]
  ),
];

export const categories = Array.from(new Set(tutorials.map(t => t.category)));
export const levels = ["Anfänger","Fortgeschritten","Profi"] as const;

export const getTutorial = (slug: string) => tutorials.find(t => t.slug === slug);
