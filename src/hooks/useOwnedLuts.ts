import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const useOwnedLuts = () => {
  const { user } = useAuth();
  const [owned, setOwned] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) { setOwned(new Set()); setLoading(false); return; }
    const { data } = await supabase
      .from("lut_purchases")
      .select("lut_slug")
      .eq("user_id", user.id);
    setOwned(new Set((data ?? []).map((r) => r.lut_slug)));
    setLoading(false);
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  return { owned, loading, refresh };
};
