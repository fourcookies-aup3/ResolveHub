import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

type Thread = {
  id: string; title: string; body: string; category: string;
  user_id: string; created_at: string;
  profiles?: { display_name: string | null } | null;
  reply_count?: number;
};

const CATS = ["general","tutorials","luts","grading-help","showcase"];

const Forum = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [cat, setCat] = useState("general");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("forum_threads")
      .select("id,title,body,category,user_id,created_at,forum_replies(count)")
      .order("created_at", { ascending: false });
    if (error) { toast.error(error.message); setLoading(false); return; }
    const rows: any[] = data || [];
    const userIds = Array.from(new Set(rows.map(r => r.user_id)));
    const { data: profs } = userIds.length
      ? await supabase.from("profiles").select("id,display_name").in("id", userIds)
      : { data: [] as any[] };
    const map = new Map((profs || []).map((p: any) => [p.id, p.display_name]));
    setThreads(rows.map(t => ({
      ...t,
      profiles: { display_name: map.get(t.user_id) ?? null },
      reply_count: t.forum_replies?.[0]?.count ?? 0,
    })));
    setLoading(false);
  };

  useEffect(() => {
    load();
    const ch = supabase.channel("forum_threads_rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "forum_threads" }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { nav("/auth"); return; }
    if (title.trim().length < 3 || body.trim().length < 1) { toast.error("Titel & Text erforderlich"); return; }
    setSaving(true);
    const { error } = await supabase.from("forum_threads").insert({
      title: title.trim(), body: body.trim(), category: cat, user_id: user.id,
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    setTitle(""); setBody(""); setCat("general"); setOpen(false);
    toast.success("Thread erstellt");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-28 pb-20 max-w-5xl">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium text-primary mb-2">COMMUNITY</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Forum</h1>
            <p className="text-muted-foreground mt-2">Stelle Fragen, teile Looks, hilf anderen Coloristen.</p>
          </div>
          <Button onClick={() => user ? setOpen(o => !o) : nav("/auth")} className="bg-gradient-cinematic text-primary-foreground">
            <Plus className="w-4 h-4 mr-1.5" /> Neuer Thread
          </Button>
        </div>

        {open && (
          <form onSubmit={create} className="mb-8 p-6 rounded-2xl border border-border bg-card space-y-4">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titel deines Threads" maxLength={200} className="bg-background" />
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button type="button" key={c} onClick={() => setCat(c)} className={`px-3 py-1 text-xs rounded-full border transition-smooth ${cat === c ? "bg-primary/20 text-primary border-primary/40" : "border-border text-muted-foreground hover:text-foreground"}`}>#{c}</button>
              ))}
            </div>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Beschreibe deine Frage oder dein Showcase…" maxLength={8000} className="bg-background min-h-32" />
            <Button type="submit" disabled={saving} className="bg-gradient-cinematic text-primary-foreground">
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Posten
            </Button>
          </form>
        )}

        {loading ? (
          <div className="text-center py-20"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>
        ) : threads.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">Noch keine Threads — sei der/die Erste!</div>
        ) : (
          <ul className="space-y-3">
            {threads.map(t => (
              <li key={t.id}>
                <Link to={`/forum/${t.id}`} className="block p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:-translate-y-0.5 transition-smooth">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <Badge variant="outline" className="text-[10px]">#{t.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          von {t.profiles?.display_name || "Anonym"} · {formatDistanceToNow(new Date(t.created_at), { addSuffix: true, locale: de })}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1 line-clamp-1">{t.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{t.body}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                      <MessageCircle className="w-4 h-4" /> {t.reply_count}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Forum;
