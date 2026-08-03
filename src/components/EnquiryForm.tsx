import { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+0-9\s()-]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .trim()
    .max(255, "Email is too long")
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
});

type Fields = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Fields, string>>;

interface EnquiryFormProps {
  /** Pre-fills which listing the enquiry is about. */
  projectId?: string;
  projectName?: string;
  /** "dark" sits on obsidian panels, "light" on paper. */
  tone?: "dark" | "light";
  onSuccess?: () => void;
}

/**
 * Real lead capture — writes straight to the backend so an enquiry is never
 * lost to a missing mail client. Validated on the client and again by the
 * database policy.
 */
const EnquiryForm = ({ projectId, projectName, tone = "dark", onSuccess }: EnquiryFormProps) => {
  const [values, setValues] = useState<Fields>({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const dark = tone === "dark";
  const fieldClass = dark
    ? "w-full bg-transparent border-b border-white/20 focus:border-lion-gold outline-none py-3 text-white text-sm placeholder:text-white/30 transition-colors"
    : "w-full bg-transparent border-b border-black/15 focus:border-lion-gold outline-none py-3 text-lion-black text-sm placeholder:text-lion-stone/70 transition-colors";
  const labelClass = dark
    ? "block text-[0.6rem] uppercase tracking-[0.25em] text-white/40 mb-1"
    : "block text-[0.6rem] uppercase tracking-[0.25em] text-lion-stone mb-1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({
        name: flat.name?.[0],
        phone: flat.phone?.[0],
        email: flat.email?.[0],
        message: flat.message?.[0],
      });
      return;
    }

    setErrors({});
    setSubmitting(true);

    const { error } = await supabase.from("enquiries").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      message: parsed.data.message || null,
      project_id: projectId ?? null,
      project_name: projectName ?? null,
      source_path: typeof window !== "undefined" ? window.location.pathname : null,
    });

    setSubmitting(false);

    if (error) {
      toast({
        title: "Couldn't send that",
        description: "Something went wrong. Please call us on +91 97735 52334 instead.",
        variant: "destructive",
      });
      return;
    }

    setDone(true);
    setValues({ name: "", phone: "", email: "", message: "" });
    toast({
      title: "Enquiry received",
      description: "Our team will get back to you, usually within a day.",
    });
    onSuccess?.();
  };

  if (done) {
    return (
      <div className={dark ? "text-white/70 text-sm leading-relaxed" : "text-lion-ink/75 text-sm leading-relaxed"}>
        <p className="font-display text-2xl mb-3 text-lion-gold">Thank you.</p>
        <p>
          Your enquiry is with our advisory team{projectName ? ` regarding ${projectName}` : ""}. We
          usually respond within one working day.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-5 text-[0.62rem] uppercase tracking-[0.25em] text-lion-gold hover:text-lion-lightgold transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label className={labelClass} htmlFor="enq-name">
          Name
        </label>
        <input
          id="enq-name"
          className={fieldClass}
          placeholder="Your full name"
          value={values.name}
          maxLength={100}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="enq-phone">
          Phone
        </label>
        <input
          id="enq-phone"
          type="tel"
          className={fieldClass}
          placeholder="+91 00000 00000"
          value={values.phone}
          maxLength={20}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="enq-email">
          Email <span className="normal-case tracking-normal opacity-60">(optional)</span>
        </label>
        <input
          id="enq-email"
          type="email"
          className={fieldClass}
          placeholder="you@example.com"
          value={values.email}
          maxLength={255}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="enq-message">
          What are you looking for?
        </label>
        <textarea
          id="enq-message"
          rows={3}
          className={`${fieldClass} resize-none`}
          placeholder={
            projectName ? `I'd like to know more about ${projectName}` : "Budget, location, timeline…"
          }
          value={values.message}
          maxLength={1000}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-editorial btn-gold w-full justify-center disabled:opacity-60"
      >
        <span className="flex items-center justify-center gap-2">
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Sending" : "Send enquiry"}
        </span>
      </button>

      <p className={dark ? "text-white/30 text-[0.68rem] leading-relaxed" : "text-lion-stone text-[0.68rem] leading-relaxed"}>
        By submitting you agree to be contacted about your enquiry. We never share your details.
      </p>
    </form>
  );
};

export default EnquiryForm;
