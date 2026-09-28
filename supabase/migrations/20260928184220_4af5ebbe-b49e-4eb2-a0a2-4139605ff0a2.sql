ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS ip_hash text;
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_ip_hash_idx ON public.enquiries (ip_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_phone_idx ON public.enquiries (phone, created_at DESC);
DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;
REVOKE INSERT ON public.enquiries FROM anon;
GRANT ALL ON public.enquiries TO service_role;