import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AdminButton } from "@/components/admin/Fields";
import { Loader2, Trash2 } from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  project_name: string | null;
  source_path: string | null;
  created_at: string;
}

const EnquiriesPanel = () => {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("enquiries")
      .select("id,name,phone,email,message,project_name,source_path,created_at")
      .order("created_at", { ascending: false })
      .limit(300);
    setLoading(false);
    if (error) {
      toast({ title: "Couldn't load enquiries", description: error.message, variant: "destructive" });
      return;
    }
    setRows(data ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) {
      toast({ title: "Couldn't delete", description: error.message, variant: "destructive" });
      return;
    }
    setRows((r) => r.filter((x) => x.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-white/50 text-sm">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading enquiries
      </div>
    );
  }

  if (!rows.length) {
    return <p className="text-white/45 text-sm">No enquiries yet. New leads from the website appear here.</p>;
  }

  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <article key={r.id} className="border border-white/10 bg-white/[0.02] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display text-xl text-white">{r.name}</h3>
              <p className="text-white/50 text-sm mt-1">
                <a href={`tel:${r.phone}`} className="hover:text-lion-gold transition-colors">{r.phone}</a>
                {r.email && (
                  <>
                    {" · "}
                    <a href={`mailto:${r.email}`} className="hover:text-lion-gold transition-colors break-all">{r.email}</a>
                  </>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/30 text-xs">{new Date(r.created_at).toLocaleString()}</p>
              {r.project_name && <p className="text-lion-gold text-[0.6rem] uppercase tracking-[0.2em] mt-1">{r.project_name}</p>}
            </div>
          </div>
          {r.message && <p className="text-white/65 text-sm mt-4 leading-relaxed whitespace-pre-wrap">{r.message}</p>}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-4">
            <span className="text-white/25 text-xs">{r.source_path}</span>
            <AdminButton variant="danger" onClick={() => remove(r.id)}>
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </AdminButton>
          </div>
        </article>
      ))}
    </div>
  );
};

export default EnquiriesPanel;
