import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Lightbulb } from "lucide-react";
import { getTutorial, tutorials } from "@/data/tutorials";
import TutorialCard from "@/components/TutorialCard";

const TutorialDetail = () => {
  const { slug } = useParams();
  const t = slug ? getTutorial(slug) : undefined;

  if (!t) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Tutorial nicht gefunden</h1>
          <Link to="/tutorials"><Button>Zurück zu Tutorials</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  const related = tutorials.filter(x => x.slug !== t.slug && (x.category === t.category || x.level === t.level)).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-28 pb-20 max-w-5xl">
        <Link to="/tutorials" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-smooth mb-6">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Alle Tutorials
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="outline" className="border-primary/30 text-primary">{t.level}</Badge>
          <Badge variant="outline">{t.category}</Badge>
          <Badge variant="outline" className="text-muted-foreground"><Clock className="w-3 h-3 mr-1" /> {t.duration}</Badge>
          <Badge variant="outline" className="text-muted-foreground">{t.scenario}</Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t.title}</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">{t.description}</p>

        <div className="aspect-video w-full rounded-xl overflow-hidden border border-border shadow-elegant mb-12 bg-secondary">
          <iframe
            src={`https://www.youtube.com/embed/${t.youtubeId}`}
            title={t.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Schritt-für-Schritt Anleitung</h2>
          <ol className="space-y-4">
            {t.steps.map((s, i) => (
              <li key={i} className="relative pl-14 p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-smooth">
                <span className="absolute left-4 top-5 w-8 h-8 rounded-full bg-gradient-cinematic text-primary-foreground font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {t.tips && t.tips.length > 0 && (
          <section className="mb-12 p-6 rounded-xl border border-accent/30 bg-accent/5">
            <h2 className="flex items-center gap-2 font-semibold mb-3"><Lightbulb className="w-5 h-5 text-accent" /> Pro-Tipps</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
              {t.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Ähnliche Tutorials</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(r => <TutorialCard key={r.slug} t={r} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TutorialDetail;
