import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Heart, ArrowRight } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import before from "@/assets/lut-before.jpg";
import after from "@/assets/lut-after.jpg";

const FeaturedLuts = () => {
  const meta = [
    { tag: "Teal & Orange", count: 412 },
    { tag: "S-Log3", count: 298 },
    { tag: "BMPCC 6K", count: 187 },
    { tag: "Matte", count: 154 },
    { tag: "Skintones+", count: 132 },
    { tag: "Bleach Bypass", count: 89 },
  ];

  return (
    <section id="luts" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-sm font-medium text-accent mb-2">LUT-BIBLIOTHEK</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Sieh den Unterschied. <br />
              <span className="text-gradient-cinematic">Spüre den Look.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Jede LUT mit interaktivem Before/After-Slider. Lade kostenlos herunter, teste in Resolve,
              oder lade deine eigene Kreation hoch.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {meta.map((m) => (
                <Badge key={m.tag} variant="outline" className="px-3 py-1.5 border-border bg-secondary/50 text-foreground/90 hover:border-primary/50 hover:text-primary transition-smooth cursor-pointer">
                  {m.tag} <span className="ml-1.5 text-muted-foreground">{m.count}</span>
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-cinematic text-primary-foreground hover:opacity-90 transition-smooth">
                <Download className="w-4 h-4 mr-2" /> LUT laden
              </Button>
              <Button variant="outline" className="border-border hover:border-primary/50 hover:text-primary transition-smooth">
                Alle LUTs durchsuchen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-cinematic opacity-20 blur-3xl rounded-full animate-pulse-glow" />
            <div className="relative">
              <BeforeAfterSlider before={before} after={after} beforeLabel="LOG / Ungraded" afterLabel="Cinematic Teal & Orange" />
              <div className="mt-4 flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div>
                  <p className="font-semibold">Cinematic Teal & Orange</p>
                  <p className="text-xs text-muted-foreground mt-0.5">von @colorgrade.studio · 12.4k Downloads</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="hover:text-accent transition-smooth"><Heart className="w-4 h-4" /></Button>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90"><Download className="w-4 h-4 mr-1.5" /> .cube</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLuts;
