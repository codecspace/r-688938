import { useState, ImgHTMLAttributes, ReactNode } from "react";
import { Building2 } from "lucide-react";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Shown inside the placeholder if the image fails to load */
  fallbackLabel?: string;
  /** Optional custom placeholder (e.g. initials avatar) instead of the default building icon */
  fallbackContent?: ReactNode;
}

/**
 * Property/team photos on this site are hotlinked from third-party image
 * hosts (imgur/postimg), which occasionally go dead. Rather than showing the
 * browser's broken-image icon — which looks like a bug on a "premium" site —
 * this quietly swaps in an on-brand placeholder so a dead link degrades
 * gracefully instead of looking broken.
 */
const ImageWithFallback = ({ fallbackLabel, fallbackContent, className, alt, onError, ...props }: ImageWithFallbackProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fallbackContent) return <>{fallbackContent}</>;
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-lion-black to-lion-obsidian text-lion-gold/60 ${className ?? ""}`}
      >
        <Building2 className="w-10 h-10" strokeWidth={1} />
        {fallbackLabel && (
          <span className="text-xs uppercase tracking-widest text-center px-6">{fallbackLabel}</span>
        )}
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      className={className}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
};

export default ImageWithFallback;
