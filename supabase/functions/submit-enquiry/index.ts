import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const Body = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(20).regex(/^[+0-9\s()-]+$/),
  email: z.string().trim().email().max(255).optional().or(z.literal("")).nullable(),
  message: z.string().trim().max(1000).optional().nullable(),
  project_id: z.string().max(100).optional().nullable(),
  project_name: z.string().max(200).optional().nullable(),
  source_path: z.string().max(300).optional().nullable(),
  website: z.string().optional().nullable(), // honeypot
});

const sha = async (s: string) => {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d)).map((b) => b.toString(16).padStart(2, "0")).join("");
};

const since = (ms: number) => new Date(Date.now() - ms).toISOString();

const count = async (build: (q: any) => any) => {
  const { count } = await build(admin.from("enquiries").select("id", { count: "exact", head: true }));
  return count ?? 0;
};

const LIMITED = "You've sent a few enquiries already. Please wait a little while, or call us directly.";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let raw: unknown;
  try { raw = await req.json(); } catch { return json({ error: "Invalid request" }, 400); }
  const parsed = Body.safeParse(raw);
  if (!parsed.success) return json({ error: "Please check your details and try again." }, 400);
  const d = parsed.data;

  // Bots fill hidden fields: pretend success, store nothing.
  if (d.website) return json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const ipHash = await sha(`lionvest:${ip}`);
  const phone = d.phone.replace(/\s+/g, " ");
  const email = d.email || null;
  const message = d.message || null;

  const [site, byIp, byPhone, byEmail] = await Promise.all([
    count((q) => q.gte("created_at", since(3600_000))),
    count((q) => q.eq("ip_hash", ipHash).gte("created_at", since(3600_000))),
    count((q) => q.eq("phone", phone).gte("created_at", since(600_000))),
    email ? count((q) => q.eq("email", email).gte("created_at", since(600_000))) : Promise.resolve(0),
  ]);

  if (site >= 200) return json({ error: "We're receiving a lot of enquiries right now. Please call us directly." }, 429);
  if (byIp >= 5 || byPhone >= 3 || byEmail >= 3) return json({ error: LIMITED }, 429);

  // Same phone + same message within 2 minutes = accidental double submit.
  const { data: dup } = await admin.from("enquiries").select("id, message")
    .eq("phone", phone).gte("created_at", since(120_000)).limit(5);
  if ((dup ?? []).some((r: { message: string | null }) => (r.message ?? null) === message)) {
    return json({ ok: true, duplicate: true });
  }

  const { error } = await admin.from("enquiries").insert({
    name: d.name, phone, email, message,
    project_id: d.project_id ?? null, project_name: d.project_name ?? null,
    source_path: d.source_path ?? null, ip_hash: ipHash,
  });
  if (error) {
    console.error("insert failed", error.message);
    return json({ error: "Something went wrong. Please call us instead." }, 500);
  }
  return json({ ok: true });
});
