import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Ungültige E-Mail").max(255),
  password: z.string().min(6, "Mindestens 6 Zeichen").max(72),
});

const Auth = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/`, data: { display_name: displayName || email.split("@")[0] } },
        });
        if (error) throw error;
        toast.success("Account erstellt — du bist eingeloggt!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Willkommen zurück!");
      }
      nav("/forum");
    } catch (e: any) {
      toast.error(e.message || "Fehler bei Authentifizierung");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-32 pb-20 max-w-md">
        <h1 className="text-3xl font-bold mb-2">{mode === "signin" ? "Login" : "Account erstellen"}</h1>
        <p className="text-muted-foreground mb-8">{mode === "signin" ? "Schön, dich wiederzusehen." : "Werde Teil der Color-Community."}</p>

        <form onSubmit={submit} className="space-y-4 p-6 rounded-2xl border border-border bg-card">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Anzeigename</Label>
              <Input id="name" value={displayName} onChange={(e) => setName(e.target.value)} maxLength={50} className="mt-1.5 bg-background" />
            </div>
          )}
          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5 bg-background" />
          </div>
          <div>
            <Label htmlFor="password">Passwort</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="mt-1.5 bg-background" />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-cinematic text-primary-foreground h-11">
            {loading ? "Lädt…" : mode === "signin" ? "Einloggen" : "Account erstellen"}
          </Button>
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-sm text-muted-foreground hover:text-primary transition-smooth w-full text-center">
            {mode === "signin" ? "Noch keinen Account? Registrieren" : "Schon registriert? Login"}
          </button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          <Link to="/" className="hover:text-primary">← Zurück zur Startseite</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
