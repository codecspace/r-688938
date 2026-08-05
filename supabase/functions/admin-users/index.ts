import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

/** Service client — bypasses RLS, never signs anyone in. */
const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type Role = "owner" | "editor";

const isEmail = (v: unknown) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 255;

async function rolesFor(userId: string): Promise<Role[]> {
  const { data } = await admin.from("user_roles").select("role").eq("user_id", userId);
  return (data ?? []).map((r: { role: Role }) => r.role);
}

/** Resolves the caller from their bearer token, never from the request body. */
async function callerFromRequest(req: Request) {
  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return null;
  const client = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

async function ownerCount() {
  const { count } = await admin
    .from("user_roles")
    .select("id", { count: "exact", head: true })
    .eq("role", "owner");
  return count ?? 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const action = String(body.action ?? "");

  // One-time bootstrap: only possible while no owner exists at all.
  if (action === "bootstrap") {
    if ((await ownerCount()) > 0) return json({ error: "Already initialised" }, 403);
    if (!isEmail(body.email) || typeof body.password !== "string" || body.password.length < 10) {
      return json({ error: "Valid email and a password of 10+ characters are required" }, 400);
    }
    const { data, error } = await admin.auth.admin.createUser({
      email: body.email as string,
      password: body.password as string,
      email_confirm: true,
    });
    if (error || !data.user) return json({ error: error?.message ?? "Could not create user" }, 400);
    const { error: roleError } = await admin
      .from("user_roles")
      .insert({ user_id: data.user.id, role: "owner" });
    if (roleError) return json({ error: roleError.message }, 400);
    return json({ ok: true, user_id: data.user.id });
  }

  const caller = await callerFromRequest(req);
  if (!caller) return json({ error: "Not signed in" }, 401);

  const callerRoles = await rolesFor(caller.id);
  const isOwner = callerRoles.includes("owner");
  const isStaff = callerRoles.length > 0;
  if (!isStaff) return json({ error: "Not allowed" }, 403);

  if (action === "list") {
    const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (error) return json({ error: error.message }, 400);
    const { data: roleRows } = await admin.from("user_roles").select("user_id, role");
    const roleMap = new Map<string, Role>();
    (roleRows ?? []).forEach((r: { user_id: string; role: Role }) => roleMap.set(r.user_id, r.role));
    const users = data.users
      .filter((u) => roleMap.has(u.id))
      .map((u) => ({
        id: u.id,
        email: u.email,
        role: roleMap.get(u.id),
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
      }));
    return json({ users, caller: { id: caller.id, role: isOwner ? "owner" : "editor" } });
  }

  if (!isOwner) return json({ error: "Only owners can manage users" }, 403);

  if (action === "create") {
    const role = body.role === "owner" ? "owner" : "editor";
    if (!isEmail(body.email) || typeof body.password !== "string" || body.password.length < 10) {
      return json({ error: "Valid email and a password of 10+ characters are required" }, 400);
    }
    const { data, error } = await admin.auth.admin.createUser({
      email: body.email as string,
      password: body.password as string,
      email_confirm: true,
    });
    if (error || !data.user) return json({ error: error?.message ?? "Could not create user" }, 400);
    const { error: roleError } = await admin
      .from("user_roles")
      .insert({ user_id: data.user.id, role });
    if (roleError) return json({ error: roleError.message }, 400);
    return json({ ok: true });
  }

  if (action === "update_role") {
    const userId = String(body.user_id ?? "");
    const role: Role = body.role === "owner" ? "owner" : "editor";
    if (!userId) return json({ error: "Missing user" }, 400);
    if (userId === caller.id) return json({ error: "You cannot change your own role" }, 400);
    await admin.from("user_roles").delete().eq("user_id", userId);
    const { error } = await admin.from("user_roles").insert({ user_id: userId, role });
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true });
  }

  if (action === "set_password") {
    const userId = String(body.user_id ?? "");
    if (!userId || typeof body.password !== "string" || body.password.length < 10) {
      return json({ error: "A password of 10+ characters is required" }, 400);
    }
    const { error } = await admin.auth.admin.updateUserById(userId, {
      password: body.password as string,
    });
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true });
  }

  if (action === "remove") {
    const userId = String(body.user_id ?? "");
    if (!userId) return json({ error: "Missing user" }, 400);
    if (userId === caller.id) return json({ error: "You cannot remove yourself" }, 400);
    const { error } = await admin.auth.admin.deleteUser(userId);
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true });
  }

  return json({ error: "Unknown action" }, 400);
});
