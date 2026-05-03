import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, PlayCircle } from "lucide-react";
import heroImg from "@/assets/hero-cinematic.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden film-grain">
      <img
        src={heroImg}
        alt="Cinematic teal and orange color graded film still"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />
      <div className="absolute inset-0 bg-radial-glow" />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-medium text-primary">Nur für DaVinci Resolve</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Color Grading,<br />
            <span className="text-gradient-cinematic">cinematisch gemeistert.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            Die kuratierte Plattform für Coloristen und Filmemacher. Tutorials, LUTs und Looks —
            ausschließlich für DaVinci Resolve, von der Community geteilt.
          </p>

          <form className="flex items-center gap-2 max-w-xl p-2 rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-elegant">
            <div className="flex items-center flex-1 gap-2 px-3">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <Input
                placeholder="Suche nach LUT, Look oder Tutorial…"
                className="border-0 bg-transparent focus-visible:ring-0 px-0 h-10"
              />
            </div>
            <Button className="bg-gradient-cinematic text-primary-foreground hover:opacity-90 transition-smooth h-10 px-6">
              Suchen
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><PlayCircle className="w-4 h-4 text-primary" /> 320+ Tutorials</div>
            <div className="flex items-center gap-2"><Download className="w-4 h-4 text-accent" /> 1.200+ kostenlose LUTs</div>
            <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-muted-foreground" /> Community-kuratiert</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
