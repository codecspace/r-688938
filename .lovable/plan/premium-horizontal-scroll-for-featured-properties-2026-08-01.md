# Premium horizontal scroll for Featured Properties

Turn the Featured Properties gallery into a pinned horizontal-scroll gallery on desktop: as you scroll down, the section sticks to the viewport and the cards travel sideways at a natural, scroll-linked pace. On tablet and mobile it stays a normal grid / swipe row — no janky pinning on touch devices.

## What changes

**Featured Properties (homepage)**
- Section becomes a tall scroll track; inside it a sticky viewport holds a row of cards that translate left in sync with scroll progress.
- Cards get a slightly taller, more editorial format: full-bleed image, hairline meta bar, index number ("01 — 06"), gold arrow on hover.
- Subtle depth: images drift horizontally inside their frames (counter-parallax) so the row feels layered instead of a flat conveyor.
- Progress rule at the bottom of the sticky frame fills as you move through the gallery, plus a small "drag / scroll" hint and left/right buttons for keyboard and accessibility.
- Mobile/touch and reduced-motion: no pinning. Falls back to a native snap-scroll row (swipeable) with the same card design, so nothing breaks or hangs on iOS Safari.

**Other sections — restrained, only where it earns it**
- Projects (developer partners): keep the alternating vertical plates, but tighten the scroll choreography — each plate's image parallax gets a slower, longer range and the copy column enters with a small offset so the two halves move at different speeds. No horizontal scroll here; the long-form reading layout is the right call for that content.
- Marquee bands: link speed lightly to scroll velocity so they react to movement instead of looping at a constant rate.
- No changes to Hero, About, Vision/Mission, Team, Contact, Footer.

## Guardrails
- All existing links, routes, data and SEO untouched.
- Respects `prefers-reduced-motion` and the existing mobile performance guards (no new blur, no new heavy effects on touch).
- Keyboard users can tab through every card; focusing a card scrolls it into view.

## Technical notes
- New `src/components/layout/HorizontalScroll.tsx`: generic pinned-track component using `useScroll` on the outer track + `useTransform` to an `x` on the inner row, with `useReducedMotion` and a coarse-pointer check to opt out. Height of the track is derived from row width so the mapping is exact (no over/under-scroll).
- `FeaturedProperties.tsx` refactors to render its cards inside that component, with a `SnapRow` fallback branch for touch.
- Scroll-velocity marquee via `useVelocity(useScrollY)` in `Marquee.tsx`, clamped so it never looks frantic.
- `Projects.tsx` only adjusts `Parallax` distances and adds a small `Reveal` offset — no structural change.
