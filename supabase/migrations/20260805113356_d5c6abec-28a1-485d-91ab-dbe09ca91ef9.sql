CREATE POLICY "Public can view site media"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'site-media');

CREATE POLICY "Staff can upload site media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-media' AND public.is_staff(auth.uid()));

CREATE POLICY "Staff can update site media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-media' AND public.is_staff(auth.uid()));

CREATE POLICY "Staff can delete site media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-media' AND public.is_staff(auth.uid()));