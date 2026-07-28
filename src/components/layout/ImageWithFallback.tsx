import { useState, useEffect, ImgHTMLAttributes, ReactNode } from "react";
import { Building2 } from "lucide-react";
import { cdnImage, cdnSrcSet } from "@/lib/imageUrl";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Shown inside the placeholder if the image fails to load */
  fallbackLabel?: string;
  /** Optional custom placeholder (e.g. initials avatar) instead of the default building icon */
  fallbackContent?: ReactNode;
  /**
   * Rendered width in CSS px. When set, the image is requested through the
   * wsrv.nl resizer at this size (WebP) instead of downloading the original
   * multi-megabyte PNG. If the proxy fails, we retry the original URL before
   * falling back to the placeholder.
   */
  optimizeWidth?: number;
}

/**
 * Property/team photos on this site are hotlinked from third-party image
 * hosts (imgur/postimg), which occasionally go dead. Rather than showing the
 * browser's broken-image icon — which looks like a bug on a "premium" site —
 * this quietly swaps in an on-brand placeholder so a dead link degrades
 * gracefully instead of looking broken.
 */
const ImageWithFallback = ({
  fallbackLabel,
  fallbackContent,
  className,
  alt,
  src,
  optimizeWidth,
  onError,
  loading,
  decoding,
  ...props
}: ImageWithFallbackProps) => {
  // 0 = optimized (proxied) source, 1 = original source, 2 = placeholder
  const [stage, setStage] = useState(optimizeWidth ? 0 : 1);

  useEffect(() => {
    setStage(optimizeWidth ? 0 : 1);
  }, [src, optimizeWidth]);

  if (stage === 2) {
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

  const useProxy = stage === 0 && !!optimizeWidth;

  return (
    <img
      {...props}
      src={useProxy ? cdnImage(src, optimizeWidth) : src}
      srcSet={useProxy ? cdnSrcSet(src, optimizeWidth) : undefined}
      alt={alt}
      className={className}
      loading={loading ?? "lazy"}
      decoding={decoding ?? "async"}
      onError={(e) => {
        setStage((s) => (s === 0 ? 1 : 2));
        if (stage !== 0) onError?.(e);
      }}
    />
  );
};

export default ImageWithFallback;
