
CREATE TABLE public.lut_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lut_slug text NOT NULL,
  stripe_session_id text,
  amount_cents integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lut_slug)
);

ALTER TABLE public.lut_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own lut purchases"
  ON public.lut_purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE INDEX idx_lut_purchases_user ON public.lut_purchases(user_id);

CREATE OR REPLACE FUNCTION public.owns_lut(_user_id uuid, _slug text)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.lut_purchases
    WHERE user_id = _user_id AND lut_slug = _slug
  );
$$;
