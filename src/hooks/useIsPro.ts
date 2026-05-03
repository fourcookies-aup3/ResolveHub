import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const useIsPro = () => {
  const { user } = useAuth();
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeUntil, setActiveUntil] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!user) { setIsPro(false); setLoading(false); return; }
      const { data } = await supabase
        .from("pro_members")
        .select("active_until")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!active) return;
      const until = data?.active_until ?? null;
      setActiveUntil(until);
      setIsPro(!!until && new Date(until) > new Date());
      setLoading(false);
    })();
    return () => { active = false; };
  }, [user]);

  return { isPro, loading, activeUntil };
};
