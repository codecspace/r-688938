## Goal

Bring GSAP into the site for a few high-impact, restrained "awwwards" moments — not a rebuild. Framer Motion stays for component-level UI; GSAP handles scroll-driven timelines it's better at.

## What gets added

**1. GSAP setup**
- Install `gsap` (v3.13+ — ScrollTrigger, SplitText and all former Club plugins are now free).
- A single `src/lib/gsap.ts` that registers `ScrollTrigger` + `SplitText` once and syncs GSAP's ticker with the existing Lenis smooth scroll (otherwise scroll-driven animations jitter).
- A small `useGsap` hook wrapping `gsap.context()` so every animation auto-cleans on unmount (required with React StrictMode / route changes).

**2. Four clean effects**

- **Headline split reveal** — section headings (About, Projects, Team, Featured) animate in line-by-line/char-by-char with a mask, staggered, on scroll. This is the single most recognisable "award site" cue.
- **Pinned Statement scrub** — the existing `Statement.tsx` horizontal word scrub gets moved from Framer's `useScroll` to GSAP ScrollTrigger with `scrub`, which is smoother and lets the four words scale/fade individually as they cross centre.
- **Card stagger + parallax** — Projects / Featured Properties cards rise and settle with a batched ScrollTrigger stagger, and their images get a subtle inner parallax (image moves slower than the card) — the depth trick used on most agency sites.
- **Hero exit transition** — hero copy and background scrub apart on first scroll (copy drifts up + blurs, image scales slightly), replacing the current Framer parallax so hero and Statement feel like one continuous move.

**3. Guardrails**
- All GSAP work respects `prefers-reduced-motion` (via `gsap.matchMedia`) — animations resolve to final state instead of running.
- Mobile: heavier effects (pin, char-splitting) disabled under 768px via `matchMedia` so nothing fights touch scroll.
- GSAP is imported only in below-the-fold lazy components, so it doesn't enter the initial bundle and LCP stays where it is.

## Technical notes

- `gsap.ticker` drives `lenis.raf`, and `lenis.on('scroll', ScrollTrigger.update)` — `SmoothScroll.tsx` moves off `autoRaf`.
- `ScrollTrigger.refresh()` on route change and after lazy sections mount, so trigger positions are correct with `Suspense`.
- No design-token changes; existing `lion-gold` / glass classes are reused.

## Files touched

- `package.json` (add gsap)
- new `src/lib/gsap.ts`, `src/hooks/useGsap.ts`, `src/components/layout/SplitReveal.tsx`
- `SmoothScroll.tsx`, `Statement.tsx`, `Hero.tsx`, `Projects.tsx`, `FeaturedProperties.tsx`, `AboutUs.tsx`
