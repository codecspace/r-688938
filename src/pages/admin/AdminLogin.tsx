import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/useAdminSession";
import RouteHead from "@/components/RouteHead";
import { TextField, AdminButton } from "@/components/admin/Fields";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loading, role } = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && role) navigate("/admin", { replace: true });
  }, [loading, role, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) {
      setError("Those details don't match an account.");
      setBusy(false);
      return;
    }
    const { data } = await supabase.auth.getUser();
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user?.id ?? "");
    if (!roles?.length) {
      await supabase.auth.signOut();
      setError("This account doesn't have access to the panel.");
      setBusy(false);
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-lion-obsidian text-white flex items-center justify-center px-6">
      <RouteHead
        title="Sign in · Lionvest Realty"
        description="Staff sign in for the Lionvest Realty content panel."
        path="/admin/login"
        noindex
      />

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/lionvest-logo.png" alt="Lionvest Realty" className="h-16 mx-auto mb-6 object-contain" />
          <p className="text-[0.6rem] uppercase tracking-[0.35em] text-lion-gold/80">Content panel</p>
          <h1 className="font-display text-3xl mt-3">Sign in</h1>
        </div>

        <form onSubmit={submit} className="border border-white/10 bg-white/[0.02] p-7 space-y-5">
          <TextField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <TextField label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

          {error && <p className="text-red-300 text-sm">{error}</p>}

          <AdminButton type="submit" variant="gold" disabled={busy || !email || !password}>
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {busy ? "Signing in" : "Sign in"}
          </AdminButton>
        </form>

        <p className="text-white/25 text-xs text-center mt-6">
          Access is granted by an owner. There is no public sign-up.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
