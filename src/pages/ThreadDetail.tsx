import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

type Thread = { id: string; title: string; body: string; category: string; created_at: string; user_id: string; profiles?: { display_name: string | null } | null };
type Reply = { id: string; body: string; created_at: string; user_id: string; profiles?: { display_name: string | null } | null };

const ThreadDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!id) return;
    const [{ data: t }, { data: r }] = await Promise.all([
      supabase.from("forum_threads").select("*").eq("id", id).maybeSingle(),
      supabase.from("forum_replies").select("*").eq("thread_id", id).order("created_at", { ascending: true }),
    ]);
    const rows: any[] = (r as any[]) || [];
    const ids = Array.from(new Set([...(t ? [(t as any).user_id] : []), ...rows.map(x => x.user_id)]));
    const { data: profs } = ids.length
      ? await supabase.from("profiles").select("id,display_name").in("id", ids)
      : { data: [] as any[] };
    const map = new Map((profs || []).map((p: any) => [p.id, p.display_name]));
    setThread(t ? ({ ...(t as any), profiles: { display_name: map.get((t as any).user_id) ?? null } }) : null);
    setReplies(rows.map(x => ({ ...x, profiles: { display_name: map.get(x.user_id) ?? null } })));
    setLoading(false);
  };

  useEffect(() => {
    load();
    if (!id) return;
    const ch = supabase.channel(`thread_${id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "forum_replies", filter: `thread_id=eq.${id}` }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const reply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { nav("/auth"); return; }
    if (!id || body.trim().length < 1) return;
    setSaving(true);
    const { error } = await supabase.from("forum_replies").insert({ thread_id: id, user_id: user.id, body: body.trim() });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    setBody("");
  };

  if (loading) return (
    <div className="min-h-screen bg-background"><Header /><main className="container pt-32 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></main></div>
  );
  if (!thread) return (
    <div className="min-h-screen bg-background"><Header /><main className="container pt-32 text-center"><p>Thread nicht gefunden</p><Link to="/forum"><Button className="mt-4">Zurück zum Forum</Button></Link></main></div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-28 pb-20 max-w-3xl">
        <Link to="/forum" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"><ArrowLeft className="w-4 h-4 mr-1.5" /> Forum</Link>

        <article className="p-6 rounded-2xl border border-border bg-card mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="outline">#{thread.category}</Badge>
            <span className="text-xs text-muted-foreground">
              {thread.profiles?.display_name || "Anonym"} · {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true, locale: de })}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{thread.title}</h1>
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{thread.body}</p>
        </article>

        <h2 className="text-sm font-semibold text-muted-foreground mb-3">{replies.length} Antwort{replies.length === 1 ? "" : "en"}</h2>
        <ul className="space-y-3 mb-8">
          {replies.map(r => (
            <li key={r.id} className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-2">{r.profiles?.display_name || "Anonym"} · {formatDistanceToNow(new Date(r.created_at), { addSuffix: true, locale: de })}</p>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{r.body}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={reply} className="p-5 rounded-2xl border border-border bg-card">
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={user ? "Schreibe eine Antwort…" : "Logge dich ein, um zu antworten."} disabled={!user} maxLength={4000} className="bg-background min-h-24 mb-3" />
          {user ? (
            <Button type="submit" disabled={saving || body.trim().length < 1} className="bg-gradient-cinematic text-primary-foreground">
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Antworten
            </Button>
          ) : (
            <Link to="/auth"><Button className="bg-gradient-cinematic text-primary-foreground">Login zum Antworten</Button></Link>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ThreadDetail;
