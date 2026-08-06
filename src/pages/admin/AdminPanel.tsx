import { useEffect, useMemo, useState } from "react";
import { Loader2, LogOut, Save, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import RouteHead from "@/components/RouteHead";
import { useAdminSession } from "@/hooks/useAdminSession";
import { useSiteContent } from "@/context/SiteContentContext";
import { defaultContent, mergeContent, type SiteContent } from "@/lib/siteContent";
import { AdminButton } from "@/components/admin/Fields";
import AdminLogin from "./AdminLogin";
import HomepagePanel from "./panels/HomepagePanel";
import PropertiesPanel from "./panels/PropertiesPanel";
import TeamPanel from "./panels/TeamPanel";
import ContactPanel from "./panels/ContactPanel";
import EnquiriesPanel from "./panels/EnquiriesPanel";
import UsersPanel from "./panels/UsersPanel";

type TabKey = "homepage" | "properties" | "team" | "contact" | "enquiries" | "users";

const TABS: { key: TabKey; label: string; ownerOnly?: boolean }[] = [
  { key: "homepage", label: "Homepage" },
  { key: "properties", label: "Properties" },
  { key: "team", label: "Team" },
  { key: "contact", label: "Contact" },
  { key: "enquiries", label: "Enquiries" },
  { key: "users", label: "Users", ownerOnly: true },
];

const AdminPanel = () => {
  const { loading, role, email, userId } = useAdminSession();
  const { content, refresh } = useSiteContent();

  const [tab, setTab] = useState<TabKey>("homepage");
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);

  // Seed the draft from live content once it's available.
  useEffect(() => {
    setDraft((d) => d ?? content);
  }, [content]);

  const dirty = useMemo(
    () => !!draft && JSON.stringify(draft) !== JSON.stringify(content),
    [draft, content],
  );

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (loading) {
    return (
      <div className="min-h-screen bg-lion-obsidian flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-lion-gold" />
      </div>
    );
  }

  if (!role) return <AdminLogin />;

  const patch = (p: Partial<SiteContent>) =>
    setDraft((d) => ({ ...(d ?? defaultContent), ...p }));

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: 1, content: mergeContent(defaultContent, draft) as never });
    setSaving(false);
    if (error) {
      toast({ title: "Couldn't save", description: error.message, variant: "destructive" });
      return;
    }
    await refresh();
    toast({ title: "Saved", description: "Your changes are live on the site." });
  };

  const discard = () => setDraft(content);

  const visibleTabs = TABS.filter((t) => !t.ownerOnly || role === "owner");
  const editing = tab !== "enquiries" && tab !== "users";
  const current = draft ?? content;

  return (
    <div className="min-h-screen bg-lion-obsidian text-white">
      <RouteHead
        title="Content panel · Lionvest Realty"
        description="Staff content panel for Lionvest Realty."
        path="/admin"
        noindex
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-lion-obsidian/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/lionvest-logo.png" alt="" className="h-9 w-9 object-contain" />
            <div className="min-w-0">
              <p className="text-[0.55rem] uppercase tracking-[0.3em] text-lion-gold/80">Content panel</p>
              <p className="text-white/45 text-xs truncate">
                {email} · {role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {dirty && (
              <span className="hidden sm:inline text-[0.6rem] uppercase tracking-[0.2em] text-amber-300/80">
                Unsaved changes
              </span>
            )}
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-white/70 hover:border-lion-gold hover:text-lion-lightgold transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Preview
            </Link>
            <AdminButton onClick={() => supabase.auth.signOut()}>
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </AdminButton>
          </div>
        </div>

        <nav className="max-w-6xl mx-auto px-5 md:px-8 flex gap-1 overflow-x-auto">
          {visibleTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 px-4 py-3 text-[0.62rem] uppercase tracking-[0.22em] border-b-2 transition-colors ${
                tab === t.key
                  ? "border-lion-gold text-lion-lightgold"
                  : "border-transparent text-white/45 hover:text-white/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-8 pb-32">
        {tab === "homepage" && <HomepagePanel content={current} patch={patch} />}
        {tab === "properties" && <PropertiesPanel content={current} patch={patch} />}
        {tab === "team" && <TeamPanel content={current} patch={patch} />}
        {tab === "contact" && <ContactPanel content={current} patch={patch} />}
        {tab === "enquiries" && <EnquiriesPanel />}
        {tab === "users" && role === "owner" && <UsersPanel callerId={userId} />}
      </main>

      {editing && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-lion-obsidian/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              {dirty ? "You have unsaved changes." : "Everything is saved."}
            </p>
            <div className="flex gap-2">
              <AdminButton onClick={discard} disabled={!dirty || saving}>
                Discard
              </AdminButton>
              <AdminButton variant="gold" onClick={save} disabled={!dirty || saving}>
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                {saving ? "Saving" : "Save changes"}
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
