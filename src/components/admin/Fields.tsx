import type { ReactNode } from "react";

const base =
  "w-full bg-white/[0.04] border border-white/12 focus:border-lion-gold outline-none px-3 py-2.5 text-white text-sm placeholder:text-white/25 transition-colors rounded-none";

export const FieldLabel = ({ children }: { children: ReactNode }) => (
  <span className="block text-[0.6rem] uppercase tracking-[0.25em] text-white/40 mb-2">{children}</span>
);

interface TextProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  type?: string;
}

export const TextField = ({ label, value, onChange, placeholder, maxLength, type = "text" }: TextProps) => (
  <label className="block">
    {label && <FieldLabel>{label}</FieldLabel>}
    <input
      type={type}
      className={base}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

interface AreaProps extends TextProps {
  rows?: number;
}

export const TextArea = ({ label, value, onChange, placeholder, rows = 4, maxLength }: AreaProps) => (
  <label className="block">
    {label && <FieldLabel>{label}</FieldLabel>}
    <textarea
      rows={rows}
      className={`${base} resize-y leading-relaxed`}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

export const Toggle = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-white/70">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 accent-lion-gold cursor-pointer"
    />
    {label}
  </label>
);

export const Panel = ({ title, description, children }: { title: string; description?: string; children: ReactNode }) => (
  <section className="border border-white/10 bg-white/[0.02] p-5 md:p-7">
    <h3 className="font-display text-2xl text-white">{title}</h3>
    {description && <p className="text-white/40 text-sm mt-1.5 mb-6">{description}</p>}
    <div className={description ? "space-y-5" : "space-y-5 mt-6"}>{children}</div>
  </section>
);

export const AdminButton = ({
  children,
  onClick,
  variant = "ghost",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "gold" | "ghost" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
}) => {
  const styles =
    variant === "gold"
      ? "bg-lion-gold text-lion-obsidian hover:bg-lion-lightgold border-lion-gold"
      : variant === "danger"
        ? "border-white/12 text-white/50 hover:border-red-400/50 hover:text-red-300"
        : "border-white/15 text-white/75 hover:border-lion-gold hover:text-lion-lightgold";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 border px-4 py-2.5 text-[0.62rem] uppercase tracking-[0.22em] transition-colors disabled:opacity-50 ${styles}`}
    >
      {children}
    </button>
  );
};

/** Simple add/remove list of short strings (amenities, spec bullets, paragraphs). */
export const StringList = ({
  label,
  items,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) => (
  <div>
    <FieldLabel>{label}</FieldLabel>
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          {multiline ? (
            <textarea
              rows={3}
              className={`${base} resize-y`}
              value={item}
              placeholder={placeholder}
              onChange={(e) => onChange(items.map((v, j) => (j === i ? e.target.value : v)))}
            />
          ) : (
            <input
              className={base}
              value={item}
              placeholder={placeholder}
              onChange={(e) => onChange(items.map((v, j) => (j === i ? e.target.value : v)))}
            />
          )}
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="shrink-0 border border-white/10 px-3 text-white/40 hover:border-red-400/50 hover:text-red-300 transition-colors text-xs"
            aria-label="Remove item"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="text-[0.62rem] uppercase tracking-[0.22em] text-lion-gold hover:text-lion-lightgold transition-colors"
      >
        + Add
      </button>
    </div>
  </div>
);
