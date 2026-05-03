import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TutorialCard from "@/components/TutorialCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { tutorials, categories, levels } from "@/data/tutorials";

const Tutorials = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [lvl, setLvl] = useState<string | null>(null);

  const filtered = useMemo(() => tutorials.filter(t => {
    if (cat && t.category !== cat) return false;
    if (lvl && t.level !== lvl) return false;
    if (q && !`${t.title} ${t.description} ${t.scenario}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, cat, lvl]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-28 pb-20">
        <header className="mb-10">
          <p className="text-sm font-medium text-primary mb-2">TUTORIALS</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Step-by-Step für <span className="text-gradient-cinematic">jedes Szenario</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Von der ersten Primary bis zum Dolby Vision Master — kuratierte Video-Tutorials inkl. Schritt-für-Schritt-Anleitung.
          </p>
        </header>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2 p-2 rounded-2xl border border-border bg-card/80 backdrop-blur-md max-w-xl">
            <Search className="w-5 h-5 text-muted-foreground ml-2" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Suche Szenario, Look, Technik…" className="border-0 bg-transparent focus-visible:ring-0 h-10" />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={!cat ? "default" : "outline"} className={!cat ? "bg-gradient-cinematic text-primary-foreground" : ""} onClick={() => setCat(null)}>Alle Kategorien</Button>
            {categories.map(c => (
              <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} className={cat === c ? "bg-gradient-cinematic text-primary-foreground" : ""} onClick={() => setCat(c)}>{c}</Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={!lvl ? "secondary" : "ghost"} onClick={() => setLvl(null)}>Alle Level</Button>
            {levels.map(l => (
              <Button key={l} size="sm" variant={lvl === l ? "secondary" : "ghost"} onClick={() => setLvl(l)}>{l}</Button>
            ))}
          </div>

          <p className="text-xs text-muted-foreground"><Badge variant="outline" className="mr-2">{filtered.length}</Badge> Tutorials gefunden</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(t => <TutorialCard key={t.slug} t={t} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tutorials;
