// Generated LUT catalog. Each LUT has tone-mapping parameters used to build a .cube file at download time.
export type LutCategory = "Cinematic" | "Vintage" | "Moody" | "Natural" | "B&W" | "Stylized" | "Log Convert";

export type Lut = {
  slug: string;
  name: string;
  description: string;
  category: LutCategory;
  pro: boolean;
  // grading parameters (all -1..1 unless noted)
  lift: [number, number, number];   // RGB shadow shift
  gamma: [number, number, number];  // RGB midtone shift
  gain: [number, number, number];   // RGB highlight shift
  saturation: number;               // 0..2  (1 = neutral)
  contrast: number;                 // 0..2  (1 = neutral)
  temp: number;                     // -0.2..0.2 (warm + / cool -)
  tint: number;                     // -0.2..0.2 (magenta + / green -)
};

const L = (
  slug: string, name: string, description: string,
  category: LutCategory, pro: boolean,
  lift: [number, number, number], gamma: [number, number, number], gain: [number, number, number],
  saturation = 1.0, contrast = 1.05, temp = 0, tint = 0,
): Lut => ({ slug, name, description, category, pro, lift, gamma, gain, saturation, contrast, temp, tint });

export const luts: Lut[] = [
  // Cinematic (free + pro mix)
  L("cinematic-teal-orange", "Cinematic Teal & Orange", "Der ikonische Hollywood-Look. Warm Skintones, kühle Schatten.", "Cinematic", false, [-0.04, 0.0, 0.06], [0.02, 0.0, -0.02], [0.06, 0.02, -0.04], 1.05, 1.10, 0.04, -0.02),
  L("cinematic-blockbuster", "Blockbuster Hero", "Hoher Kontrast, gesättigte Komplementärfarben.", "Cinematic", true, [-0.06, -0.02, 0.04], [0.02, 0.01, -0.01], [0.08, 0.04, -0.04], 1.15, 1.18, 0.05, 0),
  L("cinematic-noir-modern", "Modern Noir", "Tiefe Schwarzwerte, kühles Licht, harte Kontraste.", "Cinematic", true, [-0.10, -0.06, 0.02], [0.0, 0.0, 0.0], [0.0, 0.02, 0.06], 0.85, 1.30, -0.05, -0.02),
  L("cinematic-warm-sunset", "Warm Sunset", "Goldener, warmer Gesamteindruck.", "Cinematic", false, [0.02, 0.0, -0.04], [0.04, 0.02, -0.02], [0.08, 0.04, -0.06], 1.10, 1.05, 0.10, -0.02),
  L("cinematic-cold-thriller", "Cold Thriller", "Kühles, beunruhigendes Blue-Gray.", "Cinematic", true, [-0.06, -0.02, 0.06], [-0.02, 0.0, 0.02], [-0.02, 0.0, 0.04], 0.90, 1.15, -0.10, 0),
  L("cinematic-romantic", "Romantic Glow", "Soft, leicht rosa, träumerisch.", "Cinematic", false, [0.02, 0.0, 0.0], [0.04, 0.02, 0.02], [0.06, 0.02, 0.0], 1.05, 1.0, 0.03, 0.05),
  L("cinematic-arri-alexa", "ARRI-Like Filmlook", "Smoothe Highlights, Filmkurve.", "Cinematic", true, [-0.02, -0.01, 0.0], [0.02, 0.01, -0.01], [0.04, 0.02, -0.02], 1.05, 1.08, 0.02, 0),
  L("cinematic-spy-thriller", "Spy Thriller", "Türkis / Olive Schatten, kühl.", "Cinematic", true, [-0.06, 0.0, -0.02], [-0.01, 0.01, -0.02], [0.0, 0.02, 0.0], 0.92, 1.18, -0.04, -0.04),

  // Vintage / Film
  L("vintage-kodak-2383", "Kodak 2383 Print", "Klassische Print-Film-Emulation.", "Vintage", true, [0.04, 0.02, -0.04], [0.04, 0.02, 0.0], [-0.02, 0.0, -0.04], 0.95, 1.05, 0.06, 0.02),
  L("vintage-fuji-3513", "Fuji 3513 Soft", "Pastellige Highlights.", "Vintage", true, [0.02, 0.02, 0.0], [0.04, 0.04, 0.02], [-0.04, -0.02, -0.02], 0.85, 0.95, 0.03, 0.04),
  L("vintage-super8", "Super 8 Home Movie", "Warm, gelblich, weiche Schatten.", "Vintage", false, [0.06, 0.04, -0.06], [0.06, 0.04, -0.02], [0.04, 0.02, -0.06], 0.95, 1.0, 0.10, 0.02),
  L("vintage-bleach-bypass", "Bleach Bypass", "Entsättigt, hoher Kontrast — wie Saving Private Ryan.", "Vintage", true, [-0.04, -0.04, -0.04], [0, 0, 0], [0.04, 0.04, 0.04], 0.55, 1.30, 0, 0),
  L("vintage-faded-vhs", "Faded VHS", "Magenta-Cast, gelifteter Schwarzwert.", "Vintage", false, [0.10, 0.06, 0.10], [0.0, 0.0, 0.02], [-0.06, -0.04, -0.04], 0.80, 0.85, 0.02, 0.06),
  L("vintage-polaroid-77", "Polaroid '77", "Warmer Look mit grünem Cast in den Mids.", "Vintage", true, [0.04, 0.02, -0.02], [0.02, 0.04, -0.02], [0.04, 0.02, -0.04], 0.90, 1.0, 0.06, -0.04),
  L("vintage-70s-grindhouse", "70s Grindhouse", "Kratzig, warm, hoher Kontrast.", "Vintage", true, [0.06, 0.0, -0.06], [0.04, 0.02, -0.02], [0.06, 0.02, -0.06], 1.10, 1.20, 0.10, 0),
  L("vintage-sepia", "Sepia Heritage", "Klassisch sepia, fast monochrom.", "Vintage", false, [0.04, 0.02, -0.04], [0.06, 0.04, -0.04], [0.06, 0.04, -0.08], 0.30, 1.05, 0.12, 0),

  // Moody / Night
  L("moody-cyberpunk-neon", "Cyberpunk Neon", "Magenta-Cyan Neon-Akzente, tiefes Schwarz.", "Moody", true, [-0.10, -0.04, 0.06], [-0.02, 0.0, 0.02], [0.04, 0.0, 0.08], 1.30, 1.25, -0.04, 0.06),
  L("moody-blade-runner", "Blade Runner Orange", "Smoke, Orange Highlight, kühle Schatten.", "Moody", true, [-0.08, -0.04, 0.04], [0.02, 0.01, -0.02], [0.10, 0.04, -0.08], 1.10, 1.20, 0.06, 0),
  L("moody-night-rain", "Night Rain", "Kühl, blaugrau, leichter Cyan.", "Moody", false, [-0.06, -0.02, 0.04], [-0.01, 0.0, 0.02], [-0.02, 0.0, 0.04], 0.90, 1.15, -0.06, -0.02),
  L("moody-sin-city", "Sin City", "Sehr hart, sehr kontrastreich.", "Moody", true, [-0.12, -0.10, -0.10], [0, 0, 0], [0.08, 0.08, 0.08], 0.60, 1.40, 0, 0),
  L("moody-horror-green", "Horror Green Cast", "Grünlicher Cast in den Mids.", "Moody", true, [-0.04, 0.0, -0.04], [-0.02, 0.02, -0.02], [-0.02, 0.02, -0.02], 0.95, 1.20, -0.04, -0.06),
  L("moody-true-detective", "True Detective Swamp", "Olive-Gelb, neblig.", "Moody", true, [-0.02, 0.02, -0.06], [0.02, 0.04, -0.04], [0.02, 0.04, -0.06], 0.85, 1.10, 0.06, -0.06),
  L("moody-deep-shadows", "Deep Shadows", "Sehr tiefes Schwarz, normale Mids.", "Moody", false, [-0.12, -0.12, -0.12], [0, 0, 0], [0.02, 0.02, 0.02], 1.0, 1.20, 0, 0),
  L("moody-purple-haze", "Purple Haze", "Lavendel-Schleier über das ganze Bild.", "Moody", true, [-0.02, -0.04, 0.04], [0.02, -0.01, 0.04], [0.04, 0.0, 0.06], 1.05, 1.05, -0.02, 0.06),

  // Natural
  L("natural-clean-rec709", "Clean Rec.709", "Neutrale Korrektur — Standard für Web/Broadcast.", "Natural", false, [0, 0, 0], [0, 0, 0], [0, 0, 0], 1.0, 1.05, 0, 0),
  L("natural-soft-skin", "Soft Skin", "Schmeichelhafte Hauttöne für Talking Heads.", "Natural", false, [0.01, 0, -0.02], [0.02, 0.01, -0.01], [0.02, 0.01, -0.02], 1.05, 1.0, 0.04, 0.02),
  L("natural-corporate", "Corporate Clean", "Knackig, sauber, neutraler Weißpunkt.", "Natural", false, [0, 0, 0], [0, 0, 0], [0.02, 0.02, 0.02], 1.05, 1.10, 0, 0),
  L("natural-documentary", "Documentary Real", "Ehrlich, natürlich, leicht warm.", "Natural", false, [0, 0, -0.01], [0.01, 0.01, 0.0], [0.02, 0.01, -0.01], 1.0, 1.0, 0.02, 0),
  L("natural-warm-portrait", "Warm Portrait", "Warmer, weicher Portraitlook.", "Natural", true, [0.02, 0.01, -0.02], [0.03, 0.02, -0.01], [0.04, 0.02, -0.02], 1.10, 1.05, 0.05, 0.02),
  L("natural-cool-tech", "Cool Tech", "Leicht kühl, gut für Tech / Produkt.", "Natural", true, [-0.02, -0.01, 0.02], [-0.01, 0, 0.01], [0, 0.01, 0.02], 1.0, 1.10, -0.04, -0.01),
  L("natural-wedding", "Wedding Soft", "Lift leicht angehoben, Pastell-Highlights.", "Natural", true, [0.04, 0.04, 0.02], [0.02, 0.02, 0.0], [0.02, 0.01, 0.0], 1.0, 0.95, 0.04, 0.04),
  L("natural-ecommerce", "E-commerce Pop", "Heller Hintergrund, gesättigte Produkte.", "Natural", true, [0, 0, 0], [0.02, 0.02, 0.02], [0.06, 0.06, 0.06], 1.20, 1.10, 0, 0),

  // B&W
  L("bw-classic", "Classic B&W", "Neutrale Schwarz-Weiß-Konvertierung.", "B&W", false, [0, 0, 0], [0, 0, 0], [0, 0, 0], 0, 1.10, 0, 0),
  L("bw-high-contrast", "High Contrast B&W", "Sehr harte SW-Konvertierung.", "B&W", true, [-0.10, -0.10, -0.10], [0, 0, 0], [0.08, 0.08, 0.08], 0, 1.40, 0, 0),
  L("bw-soft-portrait", "Soft B&W Portrait", "Sanfte Mids, weiche Highlights.", "B&W", true, [0.02, 0.02, 0.02], [0.02, 0.02, 0.02], [-0.02, -0.02, -0.02], 0, 0.95, 0, 0),
  L("bw-noir-film", "Noir Film", "Tiefe Schatten, warme Highlights.", "B&W", true, [-0.06, -0.06, -0.06], [0.02, 0.01, -0.01], [0.06, 0.04, 0.0], 0, 1.30, 0.04, 0),
  L("bw-silver-gelatin", "Silver Gelatin", "Klassischer Print-Look.", "B&W", true, [-0.04, -0.04, -0.04], [0.0, 0.0, 0.0], [0.04, 0.04, 0.04], 0, 1.20, 0, 0),

  // Stylized
  L("stylized-pastel-dream", "Pastel Dream", "Verträumte Pastelltöne.", "Stylized", false, [0.04, 0.04, 0.06], [0.04, 0.04, 0.04], [0.0, 0.0, 0.02], 0.85, 0.92, 0.02, 0.04),
  L("stylized-summer-vibes", "Summer Vibes", "Warme, sommerliche Highlights.", "Stylized", false, [0.02, 0.0, -0.02], [0.03, 0.02, -0.01], [0.06, 0.04, -0.02], 1.15, 1.05, 0.06, 0.02),
  L("stylized-winter-cool", "Winter Cool", "Kühl, blau, leicht entsättigt.", "Stylized", true, [-0.04, -0.02, 0.04], [-0.02, 0.0, 0.02], [-0.02, 0.0, 0.06], 0.85, 1.10, -0.10, -0.02),
  L("stylized-autumn", "Autumn Glow", "Warmes Gelb-Rot, Mid-Highlight Push.", "Stylized", true, [0.02, 0.0, -0.04], [0.06, 0.04, -0.04], [0.06, 0.02, -0.06], 1.15, 1.05, 0.08, -0.02),
  L("stylized-spring", "Spring Fresh", "Frisches Grün, helle Highlights.", "Stylized", true, [0.0, 0.02, 0.0], [0.02, 0.04, 0.0], [0.02, 0.04, 0.02], 1.10, 1.0, 0.0, -0.02),
  L("stylized-music-video", "Music Video Punch", "Knallige Farben, hohe Saturation.", "Stylized", true, [-0.04, -0.02, 0.02], [0.02, 0.0, -0.02], [0.06, 0.04, -0.04], 1.40, 1.20, 0.04, 0),
  L("stylized-fashion", "Fashion Editorial", "Leicht entsättigt mit Pop in Magenta.", "Stylized", true, [-0.02, -0.02, 0.0], [0.0, -0.01, 0.02], [0.04, 0.0, 0.04], 0.95, 1.15, 0, 0.04),
  L("stylized-travel-vlog", "Travel Vlog", "Lebendig, warm, Insta-tauglich.", "Stylized", false, [0.02, 0.0, -0.02], [0.02, 0.01, -0.01], [0.06, 0.04, -0.02], 1.20, 1.10, 0.05, 0),
  L("stylized-action-sports", "Action Sports", "Ultra-Kontrast, Crisp.", "Stylized", true, [-0.06, -0.06, -0.04], [0.0, 0.0, 0.0], [0.08, 0.08, 0.06], 1.20, 1.30, 0.0, 0),
  L("stylized-anime-pop", "Anime Pop", "Cell-Shaded-artige Saturation.", "Stylized", true, [-0.02, -0.02, 0.0], [0.02, 0.02, 0.04], [0.04, 0.04, 0.04], 1.50, 1.20, 0.02, 0.02),

  // Log Convert
  L("log-slog3-to-709", "S-Log3 → Rec.709", "Sony S-Log3 zu Rec.709 Conversion.", "Log Convert", false, [-0.02, -0.02, -0.02], [0.0, 0.0, 0.0], [0.04, 0.04, 0.04], 1.0, 1.20, 0, 0),
  L("log-vlog-to-709", "V-Log → Rec.709", "Panasonic V-Log Conversion.", "Log Convert", false, [-0.02, -0.02, -0.02], [0.0, 0.0, 0.0], [0.04, 0.04, 0.04], 1.0, 1.18, 0, 0),
  L("log-bmd-film-to-709", "BMD Film → Rec.709", "Blackmagic Film Conversion.", "Log Convert", false, [-0.02, -0.02, -0.02], [0.0, 0.0, 0.0], [0.04, 0.04, 0.04], 1.05, 1.20, 0, 0),
  L("log-clog3-to-709", "Canon C-Log3 → Rec.709", "Canon C-Log3 Conversion.", "Log Convert", true, [-0.02, -0.02, -0.02], [0.0, 0.0, 0.0], [0.04, 0.04, 0.04], 1.0, 1.18, 0, 0),
  L("log-flog-to-709", "Fuji F-Log → Rec.709", "Fuji F-Log Conversion.", "Log Convert", true, [-0.02, -0.02, -0.02], [0.0, 0.0, 0.0], [0.04, 0.04, 0.04], 1.0, 1.18, 0, 0),
  L("cinematic-kodak-vision3-look", "Kodak Vision3 Look", "Filmische Tonkurve, warme Mids", "Cinematic", true, [-0.03,-0.01,0.02], [0.02,0.01,-0.01], [0.05,0.03,-0.03], 1.05, 1.1, 0.04, -0.01),
  L("cinematic-drama-whisper", "Drama Whisper", "Sanfter Kontrast, leicht muted", "Cinematic", false, [-0.02,-0.01,0.00], [0.01,0.00,0.00], [0.02,0.01,-0.01], 0.92, 1.1, 0.02, 0),
  L("cinematic-director-s-cut", "Director's Cut", "Tief, gesättigt, premium", "Cinematic", true, [-0.05,-0.02,0.02], [0.02,0.01,-0.02], [0.05,0.03,-0.04], 1.1, 1.2, 0.03, 0),
  L("cinematic-indie-film", "Indie Film", "Roh und ungeschliffen", "Cinematic", false, [0.01,0.00,-0.02], [0.02,0.01,-0.01], [0.04,0.02,-0.02], 1, 1.05, 0.04, 0.01),
  L("cinematic-hollywood-glow", "Hollywood Glow", "Warme Highlights, smoothe Skin", "Cinematic", true, [-0.02,0.00,0.00], [0.03,0.02,-0.01], [0.06,0.04,-0.03], 1.1, 1.1, 0.05, 0.02),
  L("cinematic-cold-romance", "Cold Romance", "Romantisch aber kühl", "Cinematic", true, [-0.03,-0.01,0.04], [0.00,0.00,0.02], [0.02,0.01,0.04], 1, 1.1, -0.03, 0.04),
  L("cinematic-epic-wide-shot", "Epic Wide Shot", "Episch, breit, kontrastreich", "Cinematic", true, [-0.06,-0.02,0.02], [0.02,0.01,-0.01], [0.06,0.04,-0.03], 1.15, 1.18, 0.04, 0),
  L("cinematic-slow-burn", "Slow Burn", "Langsam aufbauender Look", "Cinematic", false, [-0.02,-0.01,0.01], [0.01,0.01,0.00], [0.03,0.02,-0.01], 0.95, 1.08, 0.02, 0),
  L("cinematic-festival-premiere", "Festival Premiere", "Polierter Festival-Look", "Cinematic", true, [-0.04,-0.02,0.02], [0.02,0.01,-0.01], [0.05,0.03,-0.02], 1.05, 1.12, 0.03, 0),
  L("cinematic-nostalgic-drama", "Nostalgic Drama", "Warm-nostalgische Mids", "Cinematic", true, [0.02,0.01,-0.02], [0.03,0.02,-0.01], [0.04,0.02,-0.03], 1, 1.05, 0.06, 0.01),
  L("cinematic-cinematic-verse", "Cinematic Verse", "Lyrisch, weich, langsam", "Cinematic", false, [0.01,0.00,-0.01], [0.02,0.01,0.00], [0.03,0.02,-0.01], 1, 1, 0.03, 0.02),
  L("cinematic-dark-knight", "Dark Knight", "Tiefe Schwarzwerte, kalte Highlights", "Cinematic", true, [-0.10,-0.06,0.00], [0.00,0.00,0.00], [0.02,0.02,0.05], 0.9, 1.25, -0.04, 0),
  L("cinematic-the-revenant", "The Revenant", "Eiskaltes Wilderness-Grading", "Cinematic", true, [-0.06,-0.02,0.04], [-0.02,0.00,0.02], [-0.02,0.00,0.04], 0.85, 1.2, -0.1, 0),
  L("cinematic-mad-max-sand", "Mad Max Sand", "Hochgesättigtes Orange-Teal", "Cinematic", true, [-0.04,0.00,0.04], [0.04,0.02,-0.02], [0.10,0.06,-0.06], 1.3, 1.2, 0.08, 0),
  L("vintage-kodachrome-64", "Kodachrome 64", "Klassische 60s-Farbpalette", "Vintage", true, [0.03,0.02,-0.04], [0.04,0.02,-0.02], [0.04,0.02,-0.04], 1.05, 1.1, 0.06, 0.01),
  L("vintage-ektachrome-100", "Ektachrome 100", "Cool-leuchtende Highlights", "Vintage", true, [0.02,0.02,0.00], [0.02,0.02,0.00], [0.02,0.02,0.00], 1, 1.05, -0.02, 0),
  L("vintage-portra-400", "Portra 400", "Schmeichelhaft für Portraits", "Vintage", false, [0.02,0.01,-0.02], [0.02,0.02,-0.01], [0.02,0.01,-0.02], 0.95, 1, 0.04, 0.02),
  L("vintage-kodak-gold-200", "Kodak Gold 200", "Warme Familienfoto-Optik", "Vintage", false, [0.04,0.02,-0.04], [0.04,0.02,-0.02], [0.04,0.02,-0.04], 1, 1, 0.07, 0.02),
  L("vintage-cinestill-800t", "Cinestill 800T", "Halation und Tungsten-Bias", "Vintage", true, [0.04,0.02,-0.02], [0.02,0.00,-0.02], [0.04,0.02,-0.04], 1.05, 1.05, 0.06, 0.04),
  L("vintage-70s-polaroid", "70s Polaroid", "Verblasstes Sofortbild", "Vintage", false, [0.06,0.04,0.02], [0.04,0.04,0.02], [-0.02,-0.02,0.00], 0.85, 0.92, 0.04, 0.06),
  L("vintage-80s-magazine", "80s Magazine", "Saturierte Editorial-Optik", "Vintage", true, [-0.02,-0.01,0.02], [0.02,0.01,-0.01], [0.04,0.02,-0.02], 1.2, 1.1, 0.04, 0.04),
  L("vintage-8mm-home-movie", "8mm Home Movie", "Warm, weich, körnig", "Vintage", false, [0.06,0.04,-0.04], [0.04,0.02,-0.02], [0.04,0.02,-0.04], 0.95, 1, 0.08, 0.02),
  L("vintage-faded-postcard", "Faded Postcard", "Cyan-Magenta-Drift", "Vintage", true, [0.04,0.02,0.04], [0.00,0.00,0.02], [-0.04,-0.02,-0.02], 0.8, 0.9, 0, 0.04),
  L("vintage-lomo-cross", "Lomo Cross", "Cross-Processed Knall", "Vintage", true, [-0.04,0.02,0.04], [0.00,0.04,-0.02], [0.04,0.00,-0.04], 1.3, 1.2, 0.04, 0.06),
  L("vintage-old-newsreel", "Old Newsreel", "Sepia-monochrom, hart", "Vintage", true, [0.04,0.02,-0.06], [0.04,0.02,-0.04], [0.06,0.02,-0.08], 0.2, 1.3, 0.08, 0),
  L("vintage-film-noir-vintage", "Film Noir Vintage", "Dunkle SW-Heritage", "Vintage", true, [-0.10,-0.10,-0.10], [0.00,0.00,0.00], [0.04,0.04,0.04], 0, 1.3, 0, 0),
  L("vintage-faded-denim", "Faded Denim", "Blass, blau, weich", "Vintage", false, [0.00,0.02,0.04], [0.00,0.02,0.02], [0.00,0.02,0.04], 0.8, 1, -0.04, 0.02),
  L("vintage-wes-anderson-pastel", "Wes Anderson Pastel", "Pop-Pastell-Look", "Vintage", true, [0.02,0.02,0.04], [0.04,0.04,0.02], [0.04,0.04,0.02], 0.95, 0.95, 0.06, 0.04),
  L("moody-tokyo-night", "Tokyo Night", "Magenta-Cyan urbane Nacht", "Moody", true, [-0.10,-0.04,0.06], [-0.02,0.00,0.04], [0.04,0.00,0.10], 1.3, 1.25, -0.04, 0.08),
  L("moody-berlin-underground", "Berlin Underground", "Beton-grau, blau-gelb", "Moody", true, [-0.06,-0.04,0.00], [-0.01,0.00,-0.01], [0.00,0.02,0.00], 0.85, 1.2, -0.04, 0),
  L("moody-detective-office", "Detective Office", "Warm-gelb, dunkel", "Moody", true, [-0.04,-0.04,-0.06], [0.04,0.02,-0.04], [0.06,0.04,-0.04], 0.85, 1.2, 0.08, -0.02),
  L("moody-misty-morning", "Misty Morning", "Kühl, blau, neblig", "Moody", false, [-0.02,0.00,0.04], [0.00,0.01,0.02], [0.00,0.02,0.04], 0.8, 1, -0.06, 0),
  L("moody-stormy-sea", "Stormy Sea", "Dunkel-blaugrün, dramatisch", "Moody", true, [-0.06,-0.02,0.02], [-0.02,0.00,0.00], [-0.02,0.02,0.04], 0.85, 1.2, -0.06, -0.02),
  L("moody-apocalypse", "Apocalypse", "Rot-Orange Catastrophe", "Moody", true, [-0.04,-0.06,-0.10], [0.04,0.00,-0.04], [0.10,0.04,-0.08], 1.1, 1.3, 0.1, -0.02),
  L("moody-witching-hour", "Witching Hour", "Lila-Schwarz, mystisch", "Moody", true, [-0.06,-0.06,-0.02], [0.00,-0.02,0.02], [0.04,-0.02,0.06], 1.1, 1.2, -0.02, 0.06),
  L("moody-industrial", "Industrial", "Hart-grau, kalt", "Moody", true, [-0.08,-0.06,-0.04], [0.00,0.00,0.00], [0.04,0.04,0.04], 0.7, 1.3, -0.04, 0),
  L("moody-forest-mystery", "Forest Mystery", "Tiefes Grün, dunkel", "Moody", true, [-0.04,0.02,-0.04], [-0.02,0.04,-0.04], [-0.02,0.04,-0.04], 0.95, 1.2, -0.02, -0.06),
  L("moody-underwater", "Underwater", "Blau-Grün, gedämpft", "Moody", false, [-0.04,0.00,0.04], [-0.02,0.02,0.04], [-0.04,0.00,0.04], 0.85, 1.1, -0.1, -0.04),
  L("moody-volcanic", "Volcanic", "Schwarz-rot, intensiv", "Moody", true, [-0.10,-0.08,-0.10], [0.04,0.00,-0.04], [0.08,0.02,-0.08], 1.2, 1.3, 0.08, -0.02),
  L("moody-fog-pine", "Fog & Pine", "Skandinavische Kühle", "Moody", true, [-0.04,-0.02,0.02], [-0.01,0.01,0.00], [-0.02,0.02,0.02], 0.8, 1.1, -0.06, -0.02),
  L("natural-daylight-balanced", "Daylight Balanced", "Tageslicht-perfekt", "Natural", false, [0.00,0.00,0.00], [0.00,0.00,0.00], [0.02,0.02,0.02], 1, 1.05, 0, 0),
  L("natural-tungsten-indoor", "Tungsten Indoor", "Kunstlicht-Korrektur", "Natural", false, [-0.01,0.00,0.02], [-0.01,0.00,0.02], [0.00,0.01,0.02], 1, 1.05, -0.06, 0),
  L("natural-overcast-soft", "Overcast Soft", "Bewölkter Tag, neutral", "Natural", false, [0.01,0.01,0.00], [0.01,0.01,0.00], [0.01,0.01,0.00], 0.95, 1, 0, 0),
  L("natural-newsroom-crisp", "Newsroom Crisp", "Saubere News-Look", "Natural", false, [0.00,0.00,0.00], [0.00,0.00,0.00], [0.04,0.04,0.04], 1, 1.1, 0, 0),
  L("natural-warm-documentary", "Warm Documentary", "Doku mit Wärme", "Natural", false, [0.02,0.01,-0.02], [0.02,0.01,-0.01], [0.04,0.02,-0.02], 1, 1, 0.04, 0.01),
  L("natural-travel-vlog-bright", "Travel Vlog Bright", "Hell, sommerlich", "Natural", false, [0.02,0.01,-0.01], [0.02,0.01,-0.01], [0.06,0.04,-0.02], 1.1, 1.05, 0.04, 0.01),
  L("natural-office-talk", "Office Talk", "Corporate-tauglich", "Natural", true, [0.00,0.00,0.00], [0.01,0.01,0.00], [0.04,0.04,0.04], 1, 1.1, 0, 0),
  L("natural-real-estate-bright", "Real Estate Bright", "Saubere Innenraum-Optik", "Natural", true, [0.02,0.02,0.02], [0.02,0.02,0.02], [0.06,0.06,0.06], 1.05, 1.1, 0.02, 0),
  L("natural-food-pop", "Food Pop", "Appetizing Food-Look", "Natural", true, [0.02,0.00,-0.02], [0.04,0.02,-0.02], [0.06,0.04,-0.04], 1.2, 1.1, 0.04, 0),
  L("natural-beauty-soft", "Beauty Soft", "Soft Skin für Beauty", "Natural", true, [0.02,0.01,0.00], [0.04,0.02,0.00], [0.04,0.02,-0.01], 1.05, 1, 0.04, 0.03),
  L("natural-fitness-pop", "Fitness Pop", "Kontrastiger Sport-Look", "Natural", true, [-0.04,-0.02,0.02], [0.00,0.00,0.00], [0.06,0.04,-0.02], 1.2, 1.2, 0.02, 0),
  L("natural-lifestyle-magazine", "Lifestyle Magazine", "Editorial-clean", "Natural", true, [0.00,0.00,-0.01], [0.02,0.01,0.00], [0.04,0.02,-0.01], 1.05, 1.05, 0.03, 0.01),
  L("b-w-charcoal", "Charcoal", "Tiefes Schwarz, weiche Mids", "B&W", true, [-0.06,-0.06,-0.06], [0.02,0.02,0.02], [0.04,0.04,0.04], 0, 1.2, 0, 0),
  L("b-w-newsprint", "Newsprint", "Hartes Druck-SW", "B&W", true, [-0.10,-0.10,-0.10], [0.00,0.00,0.00], [0.10,0.10,0.10], 0, 1.5, 0, 0),
  L("b-w-ansel-adams", "Ansel Adams", "Zone-System inspiriert", "B&W", true, [-0.08,-0.08,-0.08], [0.02,0.02,0.02], [0.06,0.06,0.06], 0, 1.3, 0, 0),
  L("b-w-editorial-mono", "Editorial Mono", "Modern Editorial SW", "B&W", true, [-0.04,-0.04,-0.04], [0.02,0.02,0.02], [0.04,0.04,0.04], 0, 1.15, 0, 0),
  L("b-w-street-photography", "Street Photography", "Kontrastreich, urban", "B&W", true, [-0.08,-0.08,-0.08], [0.00,0.00,0.00], [0.08,0.08,0.08], 0, 1.4, 0, 0),
  L("b-w-soft-wedding-bw", "Soft Wedding BW", "Sanftes SW für Hochzeiten", "B&W", false, [0.02,0.02,0.02], [0.02,0.02,0.02], [-0.02,-0.02,-0.02], 0, 0.92, 0, 0),
  L("b-w-documentary-bw", "Documentary BW", "Doku-tauglich SW", "B&W", false, [-0.02,-0.02,-0.02], [0.00,0.00,0.00], [0.02,0.02,0.02], 0, 1.1, 0, 0),
  L("b-w-warm-toned-bw", "Warm Toned BW", "Sepia-warm", "B&W", true, [-0.02,-0.02,-0.04], [0.02,0.01,-0.01], [0.04,0.02,-0.02], 0.1, 1.15, 0.06, 0),
  L("b-w-cool-toned-bw", "Cool Toned BW", "Selen-blau", "B&W", true, [-0.04,-0.04,-0.02], [-0.01,0.00,0.02], [0.00,0.02,0.04], 0.1, 1.2, -0.04, 0),
  L("stylized-sci-fi-future", "Sci-Fi Future", "Sterile Zukunft", "Stylized", true, [-0.04,-0.02,0.04], [-0.01,0.01,0.02], [0.02,0.04,0.06], 0.95, 1.2, -0.04, -0.02),
  L("stylized-fantasy-magic", "Fantasy Magic", "Magisch, lila-grün", "Stylized", true, [-0.04,0.00,0.02], [-0.01,0.02,0.00], [0.02,0.04,0.04], 1.2, 1.15, -0.02, 0.04),
  L("stylized-thriller-pulse", "Thriller Pulse", "Hart, kalt, energisch", "Stylized", true, [-0.06,-0.04,0.02], [-0.01,0.00,0.00], [0.02,0.02,0.04], 1.05, 1.25, -0.04, -0.01),
  L("stylized-romcom-bright", "Romcom Bright", "Hell, freundlich", "Stylized", false, [0.02,0.02,0.00], [0.04,0.03,0.00], [0.06,0.04,-0.01], 1.1, 1, 0.05, 0.02),
  L("stylized-western-dust", "Western Dust", "Staubig-warm", "Stylized", true, [0.02,0.00,-0.06], [0.04,0.02,-0.04], [0.08,0.04,-0.08], 1.1, 1.15, 0.1, -0.02),
  L("stylized-kids-tv-bright", "Kids TV Bright", "Bonbonbunt, kontrast", "Stylized", true, [0.00,0.00,0.00], [0.04,0.04,0.04], [0.06,0.06,0.06], 1.4, 1.1, 0.02, 0),
  L("stylized-game-trailer", "Game Trailer", "High-Contrast Gaming", "Stylized", true, [-0.06,-0.04,0.02], [0.00,0.00,0.00], [0.06,0.04,-0.02], 1.3, 1.3, 0.02, 0),
  L("stylized-anime-sunset", "Anime Sunset", "Stylized Sonnenuntergang", "Stylized", true, [-0.02,-0.02,0.00], [0.04,0.02,-0.02], [0.06,0.02,-0.04], 1.4, 1.15, 0.06, 0.04),
  L("stylized-indie-pastel", "Indie Pastel", "Pastell mit Sat-Twist", "Stylized", true, [0.02,0.02,0.04], [0.04,0.03,0.02], [0.02,0.02,0.04], 1, 0.95, 0.02, 0.04),
  L("stylized-warm-sunrise", "Warm Sunrise", "Goldener Morgen", "Stylized", false, [0.02,0.00,-0.02], [0.04,0.02,-0.02], [0.08,0.04,-0.04], 1.15, 1.05, 0.08, 0.02),
  L("stylized-cool-lakeside", "Cool Lakeside", "Kühler See-Look", "Stylized", false, [-0.02,-0.01,0.02], [-0.01,0.00,0.02], [-0.01,0.02,0.04], 0.95, 1.05, -0.06, -0.02),
  L("stylized-art-house", "Art House", "Experimentell, gewagt", "Stylized", true, [-0.04,-0.02,0.04], [0.02,-0.02,0.04], [0.04,0.00,0.04], 1.1, 1.2, 0, 0.04),
  L("stylized-skateboarding", "Skateboarding", "Hart, knallig, jung", "Stylized", true, [-0.06,-0.06,-0.04], [0.00,0.00,0.00], [0.08,0.08,0.06], 1.3, 1.3, 0, 0),
  L("stylized-drone-aerial", "Drone Aerial", "Episch von oben", "Stylized", false, [-0.02,0.00,0.02], [0.01,0.02,0.00], [0.04,0.04,0.00], 1.1, 1.15, 0.02, -0.01),
  L("stylized-wedding-cinematic", "Wedding Cinematic", "Hochzeitsfilm", "Stylized", true, [0.02,0.01,-0.02], [0.03,0.02,-0.01], [0.04,0.02,-0.02], 1.05, 1.05, 0.04, 0.02),
  L("stylized-pet-pop", "Pet Pop", "Lebendige Tier-Aufnahmen", "Stylized", false, [0.02,0.00,-0.02], [0.03,0.02,-0.01], [0.06,0.04,-0.02], 1.2, 1.1, 0.04, 0.01),
  L("stylized-fashion-runway", "Fashion Runway", "Glamourös, hart", "Stylized", true, [-0.04,-0.02,0.02], [0.00,-0.02,0.02], [0.04,0.00,0.04], 0.95, 1.25, 0, 0.04),
  L("log-convert-red-ipp2-rec-709", "RED IPP2 → Rec.709", "RED Log3G10 zu Rec.709", "Log Convert", true, [-0.02,-0.02,-0.02], [0.00,0.00,0.00], [0.04,0.04,0.04], 1, 1.2, 0, 0),
  L("log-convert-arri-logc-rec-709", "ARRI LogC → Rec.709", "ALEXA LogC zu Rec.709", "Log Convert", false, [-0.02,-0.02,-0.02], [0.00,0.00,0.00], [0.04,0.04,0.04], 1, 1.18, 0, 0),
  L("log-convert-dji-d-log-rec-709", "DJI D-Log → Rec.709", "DJI D-Log Conversion", "Log Convert", false, [-0.02,-0.02,-0.02], [0.00,0.00,0.00], [0.04,0.04,0.04], 1, 1.18, 0, 0),
  L("log-convert-gopro-protune-709", "GoPro ProTune → 709", "GoPro Flat zu Rec.709", "Log Convert", false, [-0.02,-0.02,-0.02], [0.00,0.00,0.00], [0.04,0.04,0.04], 1, 1.2, 0, 0),
  L("log-convert-iphone-log-709", "iPhone Log → 709", "Apple Log Conversion", "Log Convert", true, [-0.02,-0.02,-0.02], [0.00,0.00,0.00], [0.04,0.04,0.04], 1, 1.15, 0, 0),
  L("log-convert-z-log2-rec-709", "Z-Log2 → Rec.709", "Nikon Z-Log2 Conversion", "Log Convert", true, [-0.02,-0.02,-0.02], [0.00,0.00,0.00], [0.04,0.04,0.04], 1, 1.18, 0, 0),
  L("log-convert-s-cinetone-boost", "S-Cinetone Boost", "Sony S-Cinetone aufgewertet", "Log Convert", false, [-0.01,-0.01,-0.01], [0.02,0.01,-0.01], [0.05,0.03,-0.02], 1.05, 1.15, 0.03, 0),
  L("log-convert-braw-film-look", "BRAW Film Look", "Blackmagic RAW Filmlook", "Log Convert", true, [-0.02,-0.01,0.00], [0.02,0.01,-0.01], [0.04,0.02,-0.02], 1.05, 1.15, 0.02, 0),
  L("log-convert-hlg-rec-709", "HLG → Rec.709", "HLG Tonmapping zu SDR", "Log Convert", false, [-0.01,-0.01,-0.01], [0.00,0.00,0.00], [0.03,0.03,0.03], 1, 1.1, 0, 0),
  L("log-convert-log-c4-rec-709", "LOG-C4 → Rec.709", "ARRI LogC4 Conversion", "Log Convert", true, [-0.02,-0.02,-0.02], [0.00,0.00,0.00], [0.04,0.04,0.04], 1, 1.2, 0, 0),
];

export const lutCategories = Array.from(new Set(luts.map(l => l.category)));

// ----- .cube file generation -----
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

const applyLut = (r: number, g: number, b: number, l: Lut): [number, number, number] => {
  // lift -> shadow add scaled by (1-x), gain -> highlight add scaled by x, gamma -> midtones via curve
  const lift = (v: number, k: number) => v + k * (1 - v);
  const gain = (v: number, k: number) => v + k * v;
  const gammaShift = (v: number, k: number) => Math.pow(v, Math.max(0.1, 1 - k * 2));

  let R = r, G = g, B = b;
  R = lift(R, l.lift[0]); G = lift(G, l.lift[1]); B = lift(B, l.lift[2]);
  R = gain(R, l.gain[0]); G = gain(G, l.gain[1]); B = gain(B, l.gain[2]);
  R = gammaShift(R, l.gamma[0]); G = gammaShift(G, l.gamma[1]); B = gammaShift(B, l.gamma[2]);

  // temp: warm increases R, decreases B
  R += l.temp; B -= l.temp;
  // tint: magenta increases R&B, decreases G
  R += l.tint * 0.5; B += l.tint * 0.5; G -= l.tint;

  // contrast around 0.5
  R = 0.5 + (R - 0.5) * l.contrast;
  G = 0.5 + (G - 0.5) * l.contrast;
  B = 0.5 + (B - 0.5) * l.contrast;

  // saturation
  const lum = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  R = lum + (R - lum) * l.saturation;
  G = lum + (G - lum) * l.saturation;
  B = lum + (B - lum) * l.saturation;

  return [clamp(R), clamp(G), clamp(B)];
};

export const generateCubeFile = (l: Lut, size = 17): string => {
  const lines: string[] = [];
  lines.push(`# ResolveHub LUT — ${l.name}`);
  lines.push(`# ${l.description}`);
  lines.push(`TITLE "${l.name}"`);
  lines.push(`LUT_3D_SIZE ${size}`);
  lines.push(`DOMAIN_MIN 0.0 0.0 0.0`);
  lines.push(`DOMAIN_MAX 1.0 1.0 1.0`);
  for (let bi = 0; bi < size; bi++) {
    for (let gi = 0; gi < size; gi++) {
      for (let ri = 0; ri < size; ri++) {
        const [R, G, B] = applyLut(ri / (size - 1), gi / (size - 1), bi / (size - 1), l);
        lines.push(`${R.toFixed(6)} ${G.toFixed(6)} ${B.toFixed(6)}`);
      }
    }
  }
  return lines.join("\n");
};

export const downloadLut = (l: Lut) => {
  const cube = generateCubeFile(l);
  const blob = new Blob([cube], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${l.slug}.cube`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
};
