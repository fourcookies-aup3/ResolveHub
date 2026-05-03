import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, PlayCircle } from "lucide-react";
import type { Tutorial } from "@/data/tutorials";

const levelColor: Record<string, string> = {
  "Anfänger": "bg-primary/15 text-primary border-primary/30",
  "Fortgeschritten": "bg-accent/15 text-accent border-accent/30",
  "Profi": "bg-destructive/15 text-destructive border-destructive/30",
};

const TutorialCard = ({ t }: { t: Tutorial }) => (
  <Link to={`/tutorials/${t.slug}`} className="group rounded-xl overflow-hidden border border-border bg-card shadow-card hover:shadow-glow-primary transition-smooth hover:-translate-y-1">
    <div className="relative aspect-video overflow-hidden">
      <img
        src={t.thumbnail || `https://i.ytimg.com/vi/${t.youtubeId}/hqdefault.jpg`}
        alt={t.title} loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth bg-background/40 backdrop-blur-sm">
        <PlayCircle className="w-14 h-14 text-primary drop-shadow-[0_0_12px_hsl(var(--primary))]" />
      </div>
      <Badge variant="outline" className={`absolute top-3 left-3 ${levelColor[t.level]}`}>{t.level}</Badge>
      <Badge variant="outline" className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm border-border">{t.category}</Badge>
    </div>
    <div className="p-5">
      <h3 className="font-semibold leading-snug mb-2 group-hover:text-primary transition-smooth line-clamp-2">{t.title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{t.description}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{t.duration}</span>
        <span className="text-muted-foreground/70">{t.scenario}</span>
      </div>
    </div>
  </Link>
);

export default TutorialCard;
