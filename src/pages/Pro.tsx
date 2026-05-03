import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Sparkles, Download, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsPro } from "@/hooks/useIsPro";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const features = [
  { free: "3 AI-Analyzer Tokens / Monat", pro: "Unbegrenzte AI-Analyzer Tokens" },
  { free: "Basis-LUTs (Free)", pro: "Alle 50+ Pro-LUTs (Cinematic, Vintage, Moody…)" },
  { free: "Anfänger Tutorials", pro: "Alle Profi-Tutorials (HDR, DCTL, Compositing)" },
  { free: "Forum lesen", pro: "Forum + Pro-Channel" },
  { free: "Standard Support", pro: "Priority Support" },
];

const Pro = () => {
  const { user } = useAuth();
  const { isPro, activeUntil, loading } = useIsPro();
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const upgrade = async () => {
    if (!user) { nav("/auth"); return; }
    setSubmitting(true);
    const until = new Date(); until.setDate(until.getDate() + 30);
    const { error } = await supabase.from("pro_members").upsert({
      user_id: user.id, active_until: until.toISOString(),
    }, { onConflict: "user_id" });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Willkommen bei ResolveHub Pro 🎉");
    setTimeout(() => window.location.reload(), 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-28 pb-20">
        <header className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-4">
            <Crown className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">ResolveHub Pro</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Grade wie ein <span className="text-gradient-cinematic">Profi.</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Unbegrenzte AI-Analysen, alle Profi-Tutorials und 50+ Pro-LUTs — alles in einer Mitgliedschaft.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-sm font-semibold text-muted-foreground mb-2">FREE</p>
            <p className="text-4xl font-bold mb-1">€0</p>
            <p className="text-sm text-muted-foreground mb-6">Für immer kostenlos</p>
            <ul className="space-y-3 text-sm mb-8">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {f.free}
                </li>
              ))}
            </ul>
            <Button variant="outline" disabled className="w-full">Aktueller Plan</Button>
          </div>

          <div className="rounded-2xl border-2 border-accent/50 bg-gradient-to-br from-accent/10 via-card to-primary/5 p-8 relative shadow-glow-primary">
            <Badge className="absolute -top-3 right-6 bg-gradient-cinematic text-primary-foreground border-0">Empfohlen</Badge>
            <p className="text-sm font-semibold text-accent mb-2 flex items-center gap-1.5"><Crown className="w-4 h-4" /> PRO</p>
            <p className="text-4xl font-bold mb-1">€12<span className="text-base text-muted-foreground font-normal"> / Monat</span></p>
            <p className="text-sm text-muted-foreground mb-6">Jederzeit kündbar</p>
            <ul className="space-y-3 text-sm mb-8">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-accent mt-0.5 shrink-0" /> {f.pro}
                </li>
              ))}
            </ul>
            {isPro ? (
              <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/30 text-sm">
                <p className="font-semibold text-primary flex items-center justify-center gap-1.5"><Crown className="w-4 h-4" /> Du bist Pro</p>
                {activeUntil && <p className="text-xs text-muted-foreground mt-1">Aktiv bis {new Date(activeUntil).toLocaleDateString()}</p>}
              </div>
            ) : (
              <Button onClick={upgrade} disabled={submitting || loading} className="w-full bg-gradient-cinematic text-primary-foreground hover:opacity-90 h-12">
                <Zap className="w-4 h-4 mr-2" /> {submitting ? "Aktiviere…" : "Pro freischalten"}
              </Button>
            )}
            <p className="text-[10px] text-muted-foreground text-center mt-3">Demo-Aktivierung — Payment-Integration folgt.</p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Sparkles, title: "Unbegrenzte AI-Tokens", body: "Analysiere so viele Frames, wie du brauchst — ohne Limit." },
            { icon: Download, title: "50+ Pro-LUTs", body: "Cinematic, Vintage, Moody, Stylized — direkt als .cube Download." },
            { icon: Crown, title: "Profi-Tutorials", body: "HDR Mastering, DCTLs, Greenscreen, Multi-cam Matching uvm." },
          ].map((b, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6">
              <b.icon className="w-6 h-6 text-primary mb-3" />
              <p className="font-semibold mb-1">{b.title}</p>
              <p className="text-sm text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pro;
