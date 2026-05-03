import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Upload, Loader2, Download, Crown, Coins } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useIsPro } from "@/hooks/useIsPro";
import { toast } from "sonner";

type Suggestion = {
  analysis: string;
  mood: string;
  colorWheels: { lift: string; gamma: string; gain: string; offset: string };
  curves: string;
  hueVsHue: string;
  steps: { title: string; description: string; node: string }[];
  recommendedLut: { name: string; description: string; strength: string };
  _meta?: { isPro: boolean; remaining: number | null; limit: number };
};

const FREE_LIMIT = 3;

const styles = [
  { id: "cinematic-teal-orange", label: "Cinematic Teal & Orange" },
  { id: "moody-night", label: "Moody Night / Cyberpunk" },
  { id: "warm-vintage-film", label: "Warm Vintage Film" },
  { id: "clean-natural", label: "Clean & Natural" },
  { id: "high-contrast-bw", label: "High Contrast B&W" },
  { id: "pastel-dreamy", label: "Pastel / Dreamy" },
  { id: "bleach-bypass", label: "Bleach Bypass" },
  { id: "golden-hour-warm", label: "Golden Hour" },
];

const fileToDataUrl = (file: File) => new Promise<string>((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result as string);
  r.onerror = rej;
  r.readAsDataURL(file);
});

const Analyzer = () => {
  const { user } = useAuth();
  const { isPro } = useIsPro();
  const nav = useNavigate();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgData, setImgData] = useState<string | null>(null);
  const [style, setStyle] = useState(styles[0].id);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Suggestion | null>(null);
  const [usedThisMonth, setUsedThisMonth] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const { count } = await supabase
        .from("analyzer_usage")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", since);
      setUsedThisMonth(count ?? 0);
    })();
  }, [user, result]);

  const remaining = Math.max(0, FREE_LIMIT - usedThisMonth);

  const handleFile = async (f: File) => {
    if (f.size > 8 * 1024 * 1024) { toast.error("Bild ist größer als 8 MB."); return; }
    const data = await fileToDataUrl(f);
    setImgData(data); setImgUrl(URL.createObjectURL(f)); setResult(null);
  };

  const analyze = async () => {
    if (!user) { toast.error("Bitte einloggen."); nav("/auth"); return; }
    if (!imgData) { toast.error("Bitte zuerst ein Bild hochladen."); return; }
    if (!isPro && remaining <= 0) {
      toast.error("Keine Free-Tokens mehr. Upgrade auf Pro für unbegrenzte Analysen.");
      return;
    }
    setLoading(true); setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-grading", {
        body: { imageBase64: imgData, style: styles.find(s => s.id === style)?.label, notes },
      });
      if (error) throw error;
      if ((data as any)?.error) {
        if ((data as any).error === "QUOTA_EXCEEDED") {
          toast.error((data as any).message);
          return;
        }
        throw new Error((data as any).error);
      }
      setResult(data as Suggestion);
    } catch (e: any) {
      toast.error(e.message || "Analyse fehlgeschlagen");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-28 pb-20">
        <header className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">AI Color Assistant</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Lade dein Frame hoch — wir <span className="text-gradient-cinematic">graden mit dir</span>.
          </h1>
          <p className="text-lg text-muted-foreground">
            Wähle einen Stil, und unsere AI analysiert dein Bild und liefert einen kompletten Schritt-für-Schritt Color-Grading-Plan inkl. LUT-Vorschlag.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap items-center gap-3 p-4 rounded-xl border border-border bg-card">
          {isPro ? (
            <>
              <Badge className="bg-gradient-cinematic text-primary-foreground border-0 gap-1"><Crown className="w-3 h-3" /> PRO</Badge>
              <span className="text-sm">Unbegrenzte AI-Tokens aktiv.</span>
            </>
          ) : user ? (
            <>
              <Coins className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">{remaining} / {FREE_LIMIT} Free-Tokens übrig</span>
              <span className="text-xs text-muted-foreground">(reset alle 30 Tage)</span>
              <div className="flex-1" />
              <Link to="/pro">
                <Button size="sm" variant="outline" className="border-accent/40 text-accent hover:bg-accent/10 gap-1">
                  <Crown className="w-3.5 h-3.5" /> Pro: unbegrenzt
                </Button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">Bitte einloggen, um den AI-Analyzer zu nutzen.</span>
              <div className="flex-1" />
              <Link to="/auth"><Button size="sm">Login</Button></Link>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <label className="block">
              <div className={`relative aspect-video rounded-xl border-2 border-dashed ${imgUrl ? "border-primary/50" : "border-border"} bg-card hover:border-primary/50 transition-smooth cursor-pointer overflow-hidden flex items-center justify-center`}>
                {imgUrl ? (
                  <img src={imgUrl} alt="Upload" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground p-8">
                    <Upload className="w-10 h-10 mx-auto mb-3 text-primary" />
                    <p className="font-medium text-foreground">Bild hochladen</p>
                    <p className="text-xs mt-1">JPG / PNG · max. 8 MB</p>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              </div>
            </label>

            <div>
              <p className="text-sm font-medium mb-2">Wähle einen Stil</p>
              <div className="flex flex-wrap gap-2">
                {styles.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`px-3 py-1.5 rounded-full border text-sm transition-smooth ${
                      style === s.id ? "bg-gradient-cinematic text-primary-foreground border-transparent" : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >{s.label}</button>
                ))}
              </div>
            </div>

            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional: Notizen (z.B. Skintones bewahren, mehr Kontrast)" className="bg-card border-border min-h-24" maxLength={500} />

            <Button onClick={analyze} disabled={loading || !imgData || (!isPro && !!user && remaining <= 0)} className="bg-gradient-cinematic text-primary-foreground hover:opacity-90 h-12 w-full">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analysiere…</> : <><Sparkles className="w-4 h-4 mr-2" /> Color Grading vorschlagen {!isPro && user && <span className="ml-2 text-xs opacity-80">(1 Token)</span>}</>}
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 min-h-[500px]">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-20">
                <Sparkles className="w-10 h-10 text-primary/40 mb-3" />
                <p>Dein Grading-Vorschlag erscheint hier.</p>
              </div>
            )}
            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
                <p>AI analysiert Belichtung, Skintones und Look…</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-xs font-semibold text-primary mb-2 tracking-wider">ANALYSE</h3>
                  <p className="text-sm leading-relaxed">{result.analysis}</p>
                  <p className="text-sm text-muted-foreground mt-2"><span className="text-foreground">Mood:</span> {result.mood}</p>
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-primary mb-2 tracking-wider">COLOR WHEELS</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {(["lift","gamma","gain","offset"] as const).map(k => (
                      <div key={k} className="p-3 rounded-lg bg-secondary/50 border border-border">
                        <p className="text-xs uppercase text-muted-foreground mb-1">{k}</p>
                        <p>{result.colorWheels[k]}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-primary mb-2 tracking-wider">CURVES</h3>
                  <p className="text-sm">{result.curves}</p>
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-primary mb-2 tracking-wider">HUE / QUALIFIER</h3>
                  <p className="text-sm">{result.hueVsHue}</p>
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-primary mb-3 tracking-wider">SCHRITT-FÜR-SCHRITT</h3>
                  <ol className="space-y-3">
                    {result.steps.map((s, i) => (
                      <li key={i} className="pl-9 relative">
                        <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">{i+1}</span>
                        <p className="font-medium text-sm">{s.title} <Badge variant="outline" className="ml-1 text-[10px]">{s.node}</Badge></p>
                        <p className="text-sm text-muted-foreground">{s.description}</p>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="p-4 rounded-xl border border-accent/30 bg-accent/5">
                  <h3 className="text-xs font-semibold text-accent mb-2 tracking-wider flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> EMPFOHLENE LUT</h3>
                  <p className="font-semibold">{result.recommendedLut.name} <span className="text-xs text-muted-foreground font-normal">· {result.recommendedLut.strength}</span></p>
                  <p className="text-sm text-muted-foreground mt-1">{result.recommendedLut.description}</p>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analyzer;
