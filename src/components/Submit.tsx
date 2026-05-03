import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

const Submit = () => {
  return (
    <section id="submit" className="py-24">
      <div className="container">
        <div className="relative max-w-4xl mx-auto rounded-3xl border border-border bg-card overflow-hidden p-8 md:p-14 shadow-elegant film-grain">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-cinematic opacity-20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-5">
              <Upload className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">Community-Beitrag</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Teile dein <span className="text-gradient-cinematic">Tutorial oder LUT</span>.
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
              Reiche einen Link, Titel und kurze Beschreibung ein. Nach kurzem Admin-Review erscheint dein Beitrag in der Bibliothek.
            </p>

            <form className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Titel" className="bg-background border-border h-12" />
              <Input placeholder="Kategorie (z.B. Cinematic)" className="bg-background border-border h-12" />
              <Input placeholder="URL (YouTube, Vimeo, .cube-Link)" className="bg-background border-border h-12 sm:col-span-2" />
              <Textarea placeholder="Kurze Beschreibung…" className="bg-background border-border sm:col-span-2 min-h-32" />
              <div className="sm:col-span-2 flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-muted-foreground">Mit dem Einreichen stimmst du den Community-Richtlinien zu.</p>
                <Button className="bg-gradient-cinematic text-primary-foreground hover:opacity-90 transition-smooth h-12 px-8">
                  Beitrag einreichen
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Submit;
