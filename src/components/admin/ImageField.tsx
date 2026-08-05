import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

/** Ten years — long enough that a stored link outlives the listing. */
const SIGNED_URL_TTL = 315_360_000;

export const uploadSiteImage = async (file: File): Promise<string | null> => {
  if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type)) {
    toast({ title: "Unsupported file", description: "Use a JPG, PNG or WebP image.", variant: "destructive" });
    return null;
  }
  if (file.size > 8 * 1024 * 1024) {
    toast({ title: "Image too large", description: "Please keep images under 8 MB.", variant: "destructive" });
    return null;
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("site-media").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) {
    toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    return null;
  }

  const { data } = await supabase.storage.from("site-media").createSignedUrl(path, SIGNED_URL_TTL);
  if (!data?.signedUrl) {
    toast({ title: "Upload failed", description: "Could not create a link for that image.", variant: "destructive" });
    return null;
  }
  return data.signedUrl;
};

interface Props {
  label?: string;
  value: string | null;
  onChange: (url: string | null) => void;
  clearable?: boolean;
}

/** Drop-in image field: shows a preview, uploads a replacement, or clears it. */
const ImageField = ({ label, value, onChange, clearable = true }: Props) => {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    const url = await uploadSiteImage(file);
    setBusy(false);
    if (url) onChange(url);
  };

  return (
    <div>
      {label && (
        <span className="block text-[0.6rem] uppercase tracking-[0.25em] text-white/40 mb-2">{label}</span>
      )}
      <div className="flex items-center gap-4">
        <div className="h-20 w-28 shrink-0 border border-white/12 bg-white/[0.04] overflow-hidden flex items-center justify-center">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-white/25 text-[0.6rem] uppercase tracking-widest">Empty</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-white/75 hover:border-lion-gold hover:text-lion-lightgold transition-colors disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {value ? "Replace" : "Upload"}
          </button>
          {clearable && value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-white/45 hover:border-red-400/50 hover:text-red-300 transition-colors"
            >
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          pick(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default ImageField;
