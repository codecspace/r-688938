/**
 * Property photos are hotlinked from third-party hosts (imgur/postimg) as
 * full-resolution PNGs — several are 1–2 MB, which is brutal on mobile data
 * and a major cause of slow first loads. Route them through the free wsrv.nl
 * image proxy so the browser gets a correctly sized WebP instead.
 *
 * Falls back to the original URL for anything that isn't a plain remote
 * http(s) image (local assets, data URIs, already-proxied URLs).
 */
export const cdnImage = (src?: string, width = 800, quality = 72): string | undefined => {
  if (!src) return src;
  if (!/^https?:\/\//i.test(src)) return src;
  if (src.includes("wsrv.nl")) return src;

  // Unsplash serves its own resizing params — use those directly.
  if (src.includes("images.unsplash.com")) return src;

  const stripped = src.replace(/^https?:\/\//i, "");
  return `https://wsrv.nl/?url=${encodeURIComponent(stripped)}&w=${width}&q=${quality}&output=webp&we`;
};

/** 1x/2x srcset for a proxied image. */
export const cdnSrcSet = (src?: string, width = 800, quality = 72): string | undefined => {
  if (!src || !/^https?:\/\//i.test(src) || src.includes("images.unsplash.com")) return undefined;
  return `${cdnImage(src, width, quality)} 1x, ${cdnImage(src, width * 2, quality - 10)} 2x`;
};
