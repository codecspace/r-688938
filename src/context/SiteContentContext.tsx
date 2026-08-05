import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent, mergeContent, type SiteContent } from "@/lib/siteContent";

interface SiteContentValue {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentValue>({
  content: defaultContent,
  loading: false,
  refresh: async () => undefined,
});

/** Reads the single editable content row and layers it over the built-in defaults. */
export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [raw, setRaw] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("site_content").select("content").eq("id", 1).maybeSingle();
    setRaw(data?.content ?? null);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const content = useMemo(() => mergeContent(defaultContent, raw), [raw]);

  return (
    <SiteContentContext.Provider value={{ content, loading, refresh: load }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
