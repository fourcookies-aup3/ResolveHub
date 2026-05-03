import { Link } from "react-router-dom";
import { Sparkles, MessageCircle, PlayCircle } from "lucide-react";

const features = [
  {
    icon: Sparkles, title: "AI Color Analyzer",
    desc: "Lade ein Frame hoch, wähle einen Look — erhalte einen kompletten Grading-Plan inkl. LUT-Vorschlag.",
    to: "/analyzer", cta: "Bild analysieren",
  },
  {
    icon: PlayCircle, title: "Step-by-Step Tutorials",
    desc: "Über 12 Szenarien mit Video, Schritt-Anleitung und Pro-Tipps — von Primary bis HDR.",
    to: "/tutorials", cta: "Tutorials entdecken",
  },
  {
    icon: MessageCircle, title: "Community Forum",
    desc: "Stelle Fragen, zeige deine Looks, lerne von anderen Coloristen — in Echtzeit.",
    to: "/forum", cta: "Zum Forum",
  },
];

const FeatureGrid = () => (
  <section className="py-24 relative">
    <div className="container">
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <p className="text-sm font-medium text-primary mb-2">FEATURES</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Alles, was du für <span className="text-gradient-cinematic">großartiges Grading</span> brauchst.
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc, to, cta }) => (
          <Link key={title} to={to} className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:-translate-y-1 transition-smooth shadow-card hover:shadow-glow-primary">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-cinematic mb-5 shadow-glow-primary">
              <Icon className="w-6 h-6 text-primary-foreground" />
            </span>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-smooth">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{desc}</p>
            <span className="text-sm font-medium text-primary">{cta} →</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;
