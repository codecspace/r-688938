import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type StaffRole = "owner" | "editor";

interface AdminSession {
  loading: boolean;
  userId: string | null;
  email: string | null;
  role: StaffRole | null;
}

/**
 * Session + role check. The role is always re-read from the database, never
 * from local storage, so access can be revoked instantly.
 */
export const useAdminSession = (): AdminSession => {
  const [state, setState] = useState<AdminSession>({
    loading: true,
    userId: null,
    email: null,
    role: null,
  });

  useEffect(() => {
    let active = true;

    const resolve = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!active) return;
      if (!user) {
        setState({ loading: false, userId: null, email: null, role: null });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      if (!active) return;
      const role = (roles?.[0]?.role as StaffRole | undefined) ?? null;
      setState({ loading: false, userId: user.id, email: user.email ?? null, role });
    };

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      setState((s) => ({ ...s, loading: true }));
      // Defer so the Supabase client isn't called from inside its own callback.
      setTimeout(resolve, 0);
    });

    resolve();

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
};
