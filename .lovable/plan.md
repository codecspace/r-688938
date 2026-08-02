# Cinematic 3D Scroll Experience — LionVest Realty

Rebuild the homepage as a scroll-scrubbed, film-like WebGL experience (Jesko-style), while keeping all routes, data, SEO, sitemap and Vercel deployment intact.

## What changes

**Theme flip: dark cinematic**
The site moves from the light "paper" editorial palette to obsidian/charcoal with white text, chrome/glass surfaces and a single warm gold accent. Interior pages (project detail, privacy, 404) get the same dark treatment so nothing looks orphaned.

**Homepage becomes one continuous scroll timeline**
A single fixed WebGL canvas sits behind the whole page. HTML sections scroll over it; scroll position scrubs the 3D scene rather than just moving content.

Timeline beats:
1. **Hero** — a central architectural form (stacked glass/metal tower massing built procedurally, plus a reflective ground plane). Slow idle rotation and float; camera pushes in and orbits as you scroll.
2. **Featured properties** — camera pulls back and cranes sideways; floating glass panels (HTML glassmorphism cards) reveal in a staggered arc over the 3D backdrop.
3. **About LionVest** — camera drops low, fog thickens, key light dims to a moody rim-lit silhouette.
4. **Services** — camera rises to a wide overhead, light intensity lifts, accent glow warms.
5. **Contact / CTA** — the form resolves into a calm, near-static hero-reverse shot.

Scroll-linked per beat: camera position + target, object rotation/scale, light intensity, fog density, background depth, text transitions, section reveals.

**Lighting and render quality (the priority)**
- ACES Filmic tone mapping, correct color space, physically-based intensities
- Generated HDRI-style environment for real reflections on metal/glass
- Directional key + large soft area fill + rim light to separate the form from the background
- Contact shadows, ambient occlusion, bloom, subtle fog, depth of field
- PBR materials with deliberate roughness/metalness — brushed metal, smoked glass, polished stone
- Deliberately underexposed base with controlled highlights; no flat or blown-out look

**Motion**
Lenis smooth scroll on desktop, GSAP ScrollTrigger driving the scrub. All easing is long and soft; nothing snaps. Existing Framer Motion reveal components stay for text-level micro-motion.

**Performance**
- Canvas and postprocessing are lazy-loaded after first paint; static hero poster shows until ready
- Mobile: reduced pixel ratio, simplified post chain (bloom only), fewer lights, no DOF/SSR, Lenis stays off on touch (as today)
- `prefers-reduced-motion`: static composed frame, no scrub
- Property imagery keeps the current self-hosted WebP pipeline and lazy loading

## Technical notes

- Add `three`, `@react-three/fiber@^8`, `@react-three/drei@^9`, `@react-three/postprocessing`, `gsap`. Three.js imported via named exports only.
- New `src/components/three/` : `SceneCanvas.tsx` (canvas + renderer config), `ArchitecturalForm.tsx`, `CinematicLighting.tsx`, `PostFX.tsx`, `useScrollTimeline.ts` (single scroll progress source shared by camera rig and HTML sections).
- Geometry is procedural — no external model downloads, so nothing heavy to fetch.
- `Index.tsx` is restructured into five timeline sections registered against the shared scroll store; `Hero`, `FeaturedProperties`, `AboutUs`, `VisionMission`/`Stats` (folded into Services), `SimpleContact` are re-skinned rather than rewritten from zero.
- Dark tokens replace the paper tokens in `index.css` / `tailwind.config.ts`; components keep using semantic tokens, so no hardcoded colors.
- Routing, `projectsData.ts`, RouteHead SEO, sitemap, robots and `vercel.json` are untouched.

## Out of scope

No backend changes, no new content or copy sourcing beyond what already exists, no replacement of project photography.
