## What I found

Two separate problems, both confirmed by inspection:

**1. Very heavy images.** Project images are unoptimized PNGs served straight from imgur/postimg. Measured sizes include 1.95 MB, 1.58 MB, 1.41 MB, 875 KB, 665 KB and 487 KB files — for photos that render at a few hundred pixels wide on a phone. On mobile data these take seconds each, and several load at once.

**2. Too much continuous GPU/CPU work on iOS Safari.** Three things stack up:
- `ParticleField` (hero) runs a full particle sim every frame plus an O(n²) neighbour-line pass — up to ~2,400 distance checks and hundreds of canvas strokes per frame, at up to 2× device pixel ratio, even on phones.
- Lenis smooth scroll (`SmoothScroll`) drives scroll on every frame.
- Many stacked `backdrop-blur` layers (Team has 6, FeaturedProperties 3, Hero 2, Navbar, PropertyCard, NavDots) plus ~120 animated `motion` elements. Backdrop blur is the single most expensive effect on iOS Safari, and combining it with canvas + hijacked scroll is the classic cause of "page freezes until I reload".

## Plan

### Images
- Convert every project image to a size- and format-optimized URL: use `wsrv.nl`-style resizing (or postimg/imgur's own size suffixes where available) so cards request ~600–800 px WebP instead of full-resolution PNG. Expected reduction: 1.9 MB → roughly 60–90 KB per image.
- Add a small `ProjectImage` helper that takes the base URL and a target width, so card grids, hero images and detail galleries each request an appropriate size.
- Ensure every non-LCP `<img>` has `loading="lazy"`, `decoding="async"`, plus explicit `width`/`height` (or aspect-ratio wrapper) to stop layout shift.
- On the project detail page, load only the first gallery image eagerly and lazy-load the rest.

### iOS Safari stability
- Disable `ParticleField` on small/touch devices and when the device reports low core count; keep it on desktop. Also cap DPR at 1.5 and skip the neighbour-line pass below a width threshold.
- Disable Lenis smooth scroll on touch devices (it already respects reduced-motion) — native iOS scrolling is smoother and far cheaper.
- Reduce stacked blur: keep backdrop-blur on the navbar and a single card layer, and on mobile fall back to a solid/translucent background instead of blur (a `@media (max-width: 768px)` rule that neutralizes `backdrop-filter` for the decorative layers).
- Trim always-on animations on mobile: infinite rotate/pulse loops in Hero/Team pause below the tablet breakpoint.

### Verify
- Re-measure transferred image bytes for the homepage and a project page.
- Run the site in a mobile-emulated browser, scroll the full page, and confirm no long-task pileup and no console errors.

## Technical notes
Files touched: `src/data/projectsData.ts` (or a new `src/lib/imageUrl.ts` wrapper so data stays clean), `src/components/layout/ParticleField.tsx`, `src/components/layout/SmoothScroll.tsx`, `src/components/Hero.tsx`, `src/components/Team.tsx`, `src/components/FeaturedProperties.tsx`, `src/components/Projects.tsx`, `src/components/PropertyCard.tsx`, `src/pages/ProjectDetails.tsx`, `src/index.css`. No backend or content changes — the design stays the same on desktop; mobile loses only the effects that are causing the freeze.
