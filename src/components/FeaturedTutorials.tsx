import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, PlayCircle } from "lucide-react";
import vintage from "@/assets/thumb-vintage.jpg";
import cyber from "@/assets/thumb-cyberpunk.jpg";
import desert from "@/assets/thumb-desert.jpg";
import resolve from "@/assets/thumb-tutorial.jpg";

const tutorials = [
  { img: resolve, title: "Color Wheels meistern: Primary Grade in 10 Min", level: "Anfänger", duration: "12 min", price: "Kostenlos" },
  { img: cyber, title: "Cyberpunk Night Look — Power Windows & Curves", level: "Fortgeschritten", duration: "28 min", price: "Kostenlos" },
  { img: desert, title: "Sonnenuntergang retten: HDR Recovery Workflow", level: "Profi", duration: "45 min", price: "Bezahlt" },
  { img: vintage, title: "Vintage Film Emulation mit DCTLs", level: "Fortgeschritten", duration: "22 min", price: "Kostenlos" },
];

const levelColor = {
  "Anfänger": "bg-primary/15 text-primary border-primary/30",
  "Fortgeschritten": "bg-accent/15 text-accent border-accent/30",
  "Profi": "bg-destructive/15 text-destructive border-destructive/30",
} as const;

const FeaturedTutorials = () => {
  return (
    <section id="tutorials" className="py-24 relative">
      <div className="container">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium text-primary mb-2">TOP DIESE WOCHE</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Featured <span className="text-gradient-cinematic">Tutorials</span>
            </h2>
          </div>
          <Button variant="ghost" className="group">
            Alle Tutorials <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorials.map((t) => (
            <article key={t.title} className="group rounded-xl overflow-hidden border border-border bg-card shadow-card hover:shadow-glow-primary transition-smooth hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden">
                <img src={t.img} alt={t.title} loading="lazy" width={896} height={512} className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth bg-background/40 backdrop-blur-sm">
                  <PlayCircle className="w-14 h-14 text-primary drop-shadow-[0_0_12px_hsl(var(--primary))]" />
                </div>
                <Badge variant="outline" className={`absolute top-3 left-3 ${levelColor[t.level as keyof typeof levelColor]}`}>
                  {t.level}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="font-semibold leading-snug mb-3 group-hover:text-primary transition-smooth line-clamp-2">{t.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{t.duration}</span>
                  <span>{t.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutorials;
