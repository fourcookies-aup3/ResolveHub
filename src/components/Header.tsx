import { Button } from "@/components/ui/button";
import { Aperture } from "lucide-react";

const Header = () => {
  const links = [
    { label: "Tutorials", href: "#tutorials" },
    { label: "LUT-Bibliothek", href: "#luts" },
    { label: "Kategorien", href: "#categories" },
    { label: "Beitragen", href: "#submit" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 group">
          <span className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-cinematic shadow-glow-primary">
            <Aperture className="w-5 h-5 text-primary-foreground" />
          </span>
          <span className="font-semibold tracking-tight text-lg">
            Resolve<span className="text-gradient-cinematic">Hub</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Login</Button>
          <Button size="sm" className="bg-gradient-cinematic text-primary-foreground hover:opacity-90 transition-smooth">
            LUT einreichen
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
