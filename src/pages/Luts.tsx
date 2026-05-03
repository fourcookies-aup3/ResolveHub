import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, Crown, Lock, Search, Sparkles } from "lucide-react";
import { luts, lutCategories, downloadLut, type Lut } from "@/data/luts";
import { useIsPro } from "@/hooks/useIsPro";
import { toast } from "sonner";

const LutCard = ({ l, isPro }: { l: Lut; isPro: boolean }) => {
  const locked = l.pro && !isPro;
  const handleDownload = () => {
    if (locked) {
      toast.error("Pro-LUT — bitte upgraden, um sie herunterzuladen.");
      return;
    }
    downloadLut(l);
    toast.success(`${l.name}.cube heruntergeladen`);
  };
  return (
    <div className={`group relative rounded-xl border bg-card overflow-hidden transition-smooth hover:-translate-y-1 ${locked ? "border-accent/30" : "border-border hover:border-primary/50"}`}>
      <div
        className="aspect-video relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg,
            hsl(${(l.gain[0] + 1) * 30}, 70%, ${50 + l.gain[0] * 20}%) 0%,
            hsl(${(l.gamma[1] + 1) * 60 + 180}, 60%, ${40 + l.gamma[1] * 20}%) 50%,
            hsl(${(l.lift[2] + 1) * 90 + 200}, 70%, ${20 + l.lift[2] * 30}%) 100%)`,
        }}
      >
        <div className="film-grain absolute inset-0 opacity-30" />
        {l.pro && (
          <Badge className="absolute top-2 right-2 bg-gradient-cinematic text-primary-foreground border-0 gap-1">
            <Crown className="w-3 h-3" /> PRO
          </Badge>
        )}
        <Badge variant="outline" className="absolute top-2 left-2 bg-background/70 backdrop-blur-sm">{l.category}</Badge>
        {locked && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
            <Lock className="w-8 h-8 text-accent" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 truncate">{l.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[2.5em]">{l.description}</p>
        <Button
          size="sm"
          onClick={handleDownload}
          variant={locked ? "outline" : "default"}
          className={`w-full ${locked ? "border-accent/40 text-accent hover:bg-accent/10" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
        >
          {locked ? <><Crown className="w-3.5 h-3.5 mr-1.5" /> Pro freischalten</> : <><Download className="w-3.5 h-3.5 mr-1.5" /> .cube</>}
        </Button>
      </div>
    </div>
  );
};

const Luts = () => {
  const { isPro } = useIsPro();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [scope, setScope] = useState<"all" | "free" | "pro">("all");

  const filtered = useMemo(() => luts.filter(l => {
    if (cat && l.category !== cat) return false;
    if (scope === "free" && l.pro) return false;
    if (scope === "pro" && !l.pro) return false;
    if (q && !`${l.name} ${l.description}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, cat, scope]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-28 pb-20">
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-medium text-accent mb-2">LUT-BIBLIOTHEK</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-gradient-cinematic">{luts.length}+</span> Pro-LUTs für DaVinci Resolve.
          </h1>
          <p className="text-lg text-muted-foreground">
            Cinematic, Vintage, Moody, Stylized — alle als <code className="text-foreground bg-secondary px-1.5 py-0.5 rounded text-sm">.cube</code> Download.
            {!isPro && <> Pro-LUTs sind exklusiv für <Link to="/pro" className="text-accent underline">Pro-Mitglieder</Link>.</>}
          </p>
        </header>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2 p-2 rounded-2xl border border-border bg-card/80 backdrop-blur-md max-w-xl">
            <Search className="w-5 h-5 text-muted-foreground ml-2" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Such LUT-Name oder Stil…" className="border-0 bg-transparent focus-visible:ring-0 h-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={!cat ? "default" : "outline"} className={!cat ? "bg-gradient-cinematic text-primary-foreground" : ""} onClick={() => setCat(null)}>Alle</Button>
            {lutCategories.map(c => (
              <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} className={cat === c ? "bg-gradient-cinematic text-primary-foreground" : ""} onClick={() => setCat(c)}>{c}</Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all","free","pro"] as const).map(s => (
              <Button key={s} size="sm" variant={scope === s ? "secondary" : "ghost"} onClick={() => setScope(s)}>
                {s === "pro" && <Crown className="w-3.5 h-3.5 mr-1 text-accent" />}
                {s === "all" ? "Alle LUTs" : s === "free" ? "Free" : "Pro"}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            <Badge variant="outline" className="mr-2">{filtered.length}</Badge> LUTs gefunden
            {isPro && <Badge className="ml-2 bg-primary/15 text-primary border-primary/30 gap-1"><Sparkles className="w-3 h-3" /> Pro aktiv</Badge>}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(l => <LutCard key={l.slug} l={l} isPro={isPro} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Luts;
