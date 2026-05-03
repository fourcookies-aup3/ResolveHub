import { Film, Sun, User, Moon, Sparkles, Camera } from "lucide-react";

const categories = [
  { icon: Film, label: "Cinematic", count: 142, color: "from-primary/20 to-primary/5" },
  { icon: Camera, label: "Log Footage", count: 98, color: "from-accent/20 to-accent/5" },
  { icon: User, label: "Skintones", count: 76, color: "from-primary/20 to-accent/10" },
  { icon: Moon, label: "Night & Moody", count: 64, color: "from-primary/20 to-primary/5" },
  { icon: Sun, label: "Golden Hour", count: 53, color: "from-accent/20 to-accent/5" },
  { icon: Sparkles, label: "Vintage / Film", count: 48, color: "from-accent/20 to-primary/10" },
];

const Categories = () => {
  return (
    <section id="categories" className="py-24">
      <div className="container">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium text-primary mb-2">KATEGORIEN</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Finde deinen <span className="text-gradient-cinematic">Look</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Von cleanen Skintones bis hin zu vintage Film-Emulationen — alles thematisch sortiert.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ icon: Icon, label, count, color }) => (
            <a
              key={label}
              href="#luts"
              className={`group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br ${color} p-6 transition-smooth hover:border-primary/50 hover:-translate-y-1 hover:shadow-glow-primary`}
            >
              <Icon className="w-7 h-7 text-foreground/90 mb-4 group-hover:text-primary transition-smooth" />
              <h3 className="font-semibold mb-1">{label}</h3>
              <p className="text-xs text-muted-foreground">{count} Looks</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
