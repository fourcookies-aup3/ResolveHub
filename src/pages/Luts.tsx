import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, Crown, Lock, Search, Sparkles, ShoppingCart } from "lucide-react";
import { luts, lutCategories, downloadLut, type Lut } from "@/data/luts";
import { useIsPro } from "@/hooks/useIsPro";
import { useOwnedLuts } from "@/hooks/useOwnedLuts";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import LutPreview from "@/components/LutPreview";
import { toast } from "sonner";

const LUT_PRICE_EUR = 3;

const LutCard = ({
  l, isPro, owned, onBuy, buying,
}: { l: Lut; isPro: boolean; owned: boolean; onBuy: (l: Lut) => void; buying: boolean }) => {
  const unlocked = !l.pro || isPro || owned;
  const handleDownload = () => {
    if (!unlocked) return;
    downloadLut(l);
    toast.success(`${l.name}.cube heruntergeladen`);
  };
  return (
    <div className={`group relative rounded-xl border bg-card overflow-hidden transition-smooth hover:-translate-y-1 ${!unlocked ? "border-accent/30" : "border-border hover:border-primary/50"}`}>
      <div className="aspect-video relative overflow-hidden bg-secondary">
        <LutPreview lut={l} />
        {l.pro && (
          <Badge className="absolute top-2 right-2 bg-gradient-cinematic text-primary-foreground border-0 gap-1 z-10">
            <Crown className="w-3 h-3" /> PRO
          </Badge>
        )}
        <Badge variant="outline" className="absolute top-2 left-2 bg-background/70 backdrop-blur-sm z-10">{l.category}</Badge>
        {!unlocked && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth z-10">
            <Lock className="w-8 h-8 text-accent" />
          </div>
        )}
        {owned && l.pro && !isPro && (
          <Badge className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground border-0 z-10">Gekauft</Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 truncate">{l.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[2.5em]">{l.description}</p>
        {unlocked ? (
          <Button size="sm" onClick={handleDownload} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="w-3.5 h-3.5 mr-1.5" /> .cube
          </Button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" onClick={() => onBuy(l)} disabled={buying} variant="outline" className="border-accent/40 text-accent hover:bg-accent/10">
              <ShoppingCart className="w-3.5 h-3.5 mr-1" /> €{LUT_PRICE_EUR}
            </Button>
            <Button asChild size="sm" className="bg-gradient-cinematic text-primary-foreground">
              <Link to="/pro"><Crown className="w-3.5 h-3.5 mr-1" /> Pro</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Luts = () => {
  const { user } = useAuth();
  const { isPro } = useIsPro();
  const { owned, refresh } = useOwnedLuts();
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [scope, setScope] = useState<"all" | "free" | "pro">("all");
  const [buyingSlug, setBuyingSlug] = useState<string | null>(null);

  useEffect(() => {
    const purchased = params.get("purchased");
    if (purchased) {
      toast.success("Kauf erfolgreich — LUT wird freigeschaltet…");
      setTimeout(refresh, 1500);
      params.delete("purchased");
      setParams(params, { replace: true });
    }
    if (params.get("canceled")) {
      toast.info("Kauf abgebrochen.");
      params.delete("canceled");
      setParams(params, { replace: true });
    }
  }, [params, setParams, refresh]);

  const handleBuy = async (l: Lut) => {
    if (!user) { nav("/auth"); return; }
    setBuyingSlug(l.slug);
    const { data, error } = await supabase.functions.invoke("buy-lut", {
      body: { lut_slug: l.slug, lut_name: l.name },
    });
    setBuyingSlug(null);
    if (error || !data?.url) { toast.error(error?.message ?? "Checkout fehlgeschlagen"); return; }
    window.location.href = data.url;
  };

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
            {!isPro && <> Pro-LUTs einzeln für €{LUT_PRICE_EUR} kaufen oder mit <Link to="/pro" className="text-accent underline">Pro</Link> alle freischalten.</>}
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
          {filtered.map(l => (
            <LutCard
              key={l.slug}
              l={l}
              isPro={isPro}
              owned={owned.has(l.slug)}
              onBuy={handleBuy}
              buying={buyingSlug === l.slug}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Luts;
