import { Aperture } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 mt-12">
      <div className="container grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-cinematic">
              <Aperture className="w-4 h-4 text-primary-foreground" />
            </span>
            <span className="font-semibold">Resolve<span className="text-gradient-cinematic">Hub</span></span>
          </div>
          <p className="text-muted-foreground leading-relaxed">Die Heimat für DaVinci Resolve Coloristen und Filmemacher.</p>
        </div>
        {[
          { title: "Entdecken", links: ["Tutorials", "LUTs", "Kategorien", "Top diese Woche"] },
          { title: "Community", links: ["Beitragen", "Richtlinien", "Discord", "Newsletter"] },
          { title: "Über", links: ["Mission", "Kontakt", "Impressum", "Datenschutz"] },
        ].map((c) => (
          <div key={c.title}>
            <p className="font-semibold mb-3">{c.title}</p>
            <ul className="space-y-2 text-muted-foreground">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-primary transition-smooth">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container mt-10 pt-6 border-t border-border text-xs text-muted-foreground flex justify-between flex-wrap gap-2">
        <p>© 2026 ResolveHub. Nicht verbunden mit Blackmagic Design.</p>
        <p>Made for colorists, by colorists.</p>
      </div>
    </footer>
  );
};

export default Footer;
