import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Aperture, Crown, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsPro } from "@/hooks/useIsPro";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const { user } = useAuth();
  const { isPro } = useIsPro();
  const nav = useNavigate();

  const links = [
    { label: "Tutorials", to: "/tutorials" },
    { label: "AI Analyzer", to: "/analyzer" },
    { label: "LUTs", to: "/luts" },
    { label: "Forum", to: "/forum" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-cinematic shadow-glow-primary">
            <Aperture className="w-5 h-5 text-primary-foreground" />
          </span>
          <span className="font-semibold tracking-tight text-lg">
            Resolve<span className="text-gradient-cinematic">Hub</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {isPro && (
                <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent font-medium">
                  <Crown className="w-3 h-3" /> PRO
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={async () => { await supabase.auth.signOut(); nav("/"); }}>
                <LogOut className="w-4 h-4 mr-1.5" /> Logout
              </Button>
            </>
          ) : (
            <Link to="/auth"><Button variant="ghost" size="sm" className="hidden sm:inline-flex">Login</Button></Link>
          )}
          <Link to="/pro">
            <Button size="sm" className="bg-gradient-cinematic text-primary-foreground hover:opacity-90 transition-smooth gap-1">
              <Crown className="w-3.5 h-3.5" /> Pro
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
