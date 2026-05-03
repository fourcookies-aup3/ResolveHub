-- Pro subscription table
CREATE TABLE public.pro_members (
  user_id UUID PRIMARY KEY,
  active_until TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.pro_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own pro" ON public.pro_members FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own pro" ON public.pro_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own pro" ON public.pro_members FOR UPDATE USING (auth.uid() = user_id);

-- Analyzer usage tracking
CREATE TABLE public.analyzer_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.analyzer_usage ENABLE ROW LEVEL SECURITY;
CREATE INDEX analyzer_usage_user_created_idx ON public.analyzer_usage (user_id, created_at DESC);

CREATE POLICY "Users view own usage" ON public.analyzer_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own usage" ON public.analyzer_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Helper function
CREATE OR REPLACE FUNCTION public.is_pro(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.pro_members
    WHERE user_id = _user_id AND active_until > now()
  );
$$;