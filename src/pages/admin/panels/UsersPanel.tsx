import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, KeyRound, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Panel, TextField, AdminButton, FieldLabel } from "@/components/admin/Fields";

interface AdminUser {
  id: string;
  email: string | null;
  role: "owner" | "editor";
  created_at: string;
  last_sign_in_at: string | null;
}

const call = async (body: Record<string, unknown>) => {
  const { data, error } = await supabase.functions.invoke("admin-users", { body });
  if (error) {
    // The function returns a JSON error body on 4xx; surface it when present.
    let message = error.message;
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === "function") {
      try {
        const parsed = await ctx.json();
        if (parsed?.error) message = parsed.error;
      } catch {
        /* keep the original message */
      }
    }
    throw new Error(message);
  }
  if (data?.error) throw new Error(data.error);
  return data;
};

const randomPassword = () =>
  `Lionvest-${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}-26`;

const UsersPanel = ({ callerId }: { callerId: string | null }) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState(randomPassword());
  const [newRole, setNewRole] = useState<"owner" | "editor">("editor");

  const load = async () => {
    setLoading(true);
    try {
      const data = await call({ action: "list" });
      setUsers(data.users ?? []);
    } catch (e) {
      toast({ title: "Could not load users", description: (e as Error).message, variant: "destructive" });
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const run = async (body: Record<string, unknown>, success: string) => {
    setBusy(true);
    try {
      await call(body);
      toast({ title: success });
      await load();
    } catch (e) {
      toast({ title: "Didn't work", description: (e as Error).message, variant: "destructive" });
    }
    setBusy(false);
  };

  const create = async () => {
    await run({ action: "create", email: newEmail.trim(), password: newPassword, role: newRole }, "User added");
    setNewEmail("");
    setNewPassword(randomPassword());
  };

  const resetPassword = async (u: AdminUser) => {
    const password = randomPassword();
    setBusy(true);
    try {
      await call({ action: "set_password", user_id: u.id, password });
      window.prompt(`New password for ${u.email} — copy it now, it won't be shown again:`, password);
      toast({ title: "Password reset" });
    } catch (e) {
      toast({ title: "Didn't work", description: (e as Error).message, variant: "destructive" });
    }
    setBusy(false);
  };

  return (
    <div className="space-y-6">
      <Panel title="Add a user" description="They can sign in straight away with the password you set here.">
        <div className="grid md:grid-cols-2 gap-5">
          <TextField label="Email" type="email" value={newEmail} onChange={setNewEmail} placeholder="name@example.com" />
          <TextField label="Starting password" value={newPassword} onChange={setNewPassword} />
        </div>
        <div>
          <FieldLabel>Access level</FieldLabel>
          <div className="flex gap-2">
            {(["editor", "owner"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setNewRole(r)}
                className={`border px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] transition-colors ${
                  newRole === r
                    ? "border-lion-gold text-lion-lightgold"
                    : "border-white/12 text-white/45 hover:border-white/30"
                }`}
              >
                {r === "owner" ? "Owner — can manage users" : "Editor — content only"}
              </button>
            ))}
          </div>
        </div>
        <AdminButton variant="gold" onClick={create} disabled={busy || !newEmail || newPassword.length < 10}>
          <Plus className="h-3.5 w-3.5" /> Add user
        </AdminButton>
      </Panel>

      <Panel title="People with access">
        <div className="flex justify-end -mt-2">
          <AdminButton onClick={load} disabled={loading || busy}>
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </AdminButton>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((u) => {
              const self = u.id === callerId;
              return (
                <div
                  key={u.id}
                  className="border border-white/10 bg-white/[0.02] p-4 flex flex-wrap items-center gap-4 justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-white text-sm truncate">
                      {u.email} {self && <span className="text-lion-gold/70 text-xs">(you)</span>}
                    </p>
                    <p className="text-white/35 text-xs mt-1">
                      Last signed in:{" "}
                      {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : "never"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={u.role}
                      disabled={self || busy}
                      onChange={(e) =>
                        run(
                          { action: "update_role", user_id: u.id, role: e.target.value },
                          "Access level updated",
                        )
                      }
                      className="bg-white/[0.04] border border-white/12 text-white text-xs px-3 py-2 outline-none focus:border-lion-gold disabled:opacity-40"
                    >
                      <option value="editor" className="bg-lion-obsidian">Editor</option>
                      <option value="owner" className="bg-lion-obsidian">Owner</option>
                    </select>

                    <AdminButton onClick={() => resetPassword(u)} disabled={busy}>
                      <KeyRound className="h-3.5 w-3.5" /> Reset password
                    </AdminButton>

                    <AdminButton
                      variant="danger"
                      disabled={self || busy}
                      onClick={() => {
                        if (window.confirm(`Remove access for ${u.email}?`)) {
                          run({ action: "remove", user_id: u.id }, "Access removed");
                        }
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </AdminButton>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Panel>
    </div>
  );
};

export default UsersPanel;
