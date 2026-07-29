## Direction

**Editorial Luxury** — a gallery-like light "paper" canvas broken by full-bleed noir chapters, with gold used sparingly as a rare accent rather than a coating. Composition takes cues from Awwwards architecture/property studios: oversized serif display type, generous margins, asymmetric image/text pairings, and slow, weighted motion.

Locked decisions:
- **Type**: Instrument Serif (display) + Work Sans (body/UI). Fluid `clamp()` type scale, tight display tracking, wide uppercase micro-labels.
- **Color**: Paper `#F5F3EE` / `#E8E4DD`, Ink `#0D0D0D` / `#2D2D2D`, Gold `#C9A84C` with a light `#F0D78C` highlight. All as HSL semantic tokens.
- **Layout**: editorial magazine grid on the homepage and projects, full-bleed cinematic bands for hero/statement/contact.

Everything happens in this Lovable project only — no GitHub writes; you review it in the preview here.

## What changes

**Design system (`src/index.css`, `tailwind.config.ts`)**
- Replace the Playfair/Inter import with Instrument Serif + Work Sans; new `font-display` / `font-sans` families.
- New semantic tokens: paper/ink surfaces, gold accent, hairline borders, editorial shadows, `--radius` reduced to a sharper 4px feel.
- Retire the glass-soup utilities (`glass-card`, `glass-depth-*`, multiple glow classes) in favour of a small set: `.surface-paper`, `.surface-ink`, `.hairline`, `.eyebrow`, `.gold-rule`, `.hover-lift`, `.media-reveal`. Mobile blur/perf guards stay.

**Motion system (new `src/components/motion/`)**
- `Reveal` (staggered mask-up reveals), `SplitText` (word-by-word display headline entry), `MediaParallax` (image drifts inside a fixed frame), `Magnetic` CTA (reuse existing), `PageTransition` wrapper for route changes.
- One shared easing/duration set; all motion respects `prefers-reduced-motion` and stays off the main thread (transform/opacity only).

**Homepage sections (rebuilt, same order & anchors)**
- `Hero`: full-bleed image with slow scale-out, split-word serif headline, gold hairline rule, two restrained CTAs, index-style meta row (location · established · segment) along the bottom.
- `AboutUs`: asymmetric 60/40 — tall image column with parallax against a text column with a numbered manifesto.
- `VisionMission` + `Stats`: ink-dark chapter band, oversized counters with hairline dividers, no cards.
- `Projects` / `FeaturedProperties`: editorial grid — one featured tall tile plus staggered offset tiles, image-first with type overlaid on hover, existing `projectsData` untouched.
- `Team`: portrait grid with initials placeholders preserved for Vaibhav and Jazbi; no experience badges (per existing rule).
- `SimpleContact` + `Footer`: full-bleed ink footer, large serif CTA line, existing Gmail-desktop / native-mail-mobile behaviour kept exactly.
- `Navbar`: floating pill nav on paper, ink-on-scroll, refined mobile sheet.
- Marquee bands restyled as thin editorial tickers.

**Other pages**
- `ProjectDetails`: cinematic hero, sticky spec sidebar, editorial gallery with parallax, unchanged data/routing and `RouteHead` SEO.
- `PrivacyPolicy`: proper editorial long-form layout (measure-limited column, serif headings).

## What is deliberately untouched

Routes in `App.tsx`, `RouteHead` usage and all metadata, `index.html` head tags, `public/sitemap.xml`, `public/robots.txt`, `vercel.json`, `src/data/projectsData.ts`, MCP tools and edge function, self-hosted WebP image pipeline, and the existing mobile performance guards (no blur on phones, desktop-only particles, no Lenis on touch).

## Technical notes

- Framer Motion is already a dependency — the motion layer builds on it; no new heavy libraries.
- Page transitions use `AnimatePresence` keyed on `location.pathname` inside `BrowserRouter`, keeping lazy routes and `Suspense` intact.
- Images keep `width`/`height`, `loading`/`fetchpriority` attributes so LCP and CLS don't regress; the hero preload in `index.html` is updated only if the hero image path changes.
- Accessibility: single H1 per page, focus-visible gold outline retained, AA contrast checked on gold-on-paper (used for large text/accents only, not body copy), all motion gated behind `prefers-reduced-motion`.
- Work is done section by section with a build check after each batch so the preview never goes dark.
