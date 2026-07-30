# Apply the audit fixes to the current build

The current build already includes many of the newer patterns (Editorial motion system, Navbar Team link, self-hosted images, mobile perf guards). The items below are the ones that still genuinely apply, adapted to the new design system — no rollback of the current styling or animations.

## 1. Performance & fonts
- Move the Google Fonts load out of the `@import` at the top of `src/index.css` into `<link rel="preconnect">` + `<link rel="stylesheet">` tags in `index.html` (Instrument Serif + Work Sans — the fonts this build actually uses, not the old Inter/Playfair pair).
- Keep the existing hero image preconnect/preload and all meta tags untouched.

## 2. Routing, 404 and route UX (`src/App.tsx`)
- Add a global scroll-to-top on route change so every route starts at the top (removes the need for the local one in ProjectDetails).
- Add a real `404` route (`path="*"`) — currently unmatched URLs render nothing.
- Replace `Suspense fallback={null}` with a small branded loading state so slow connections don't get a blank flash.
- Add a shared page-transition wrapper (fade/slide, reduced-motion aware). The homepage opts out of the entrance animation so hero LCP stays as tuned.

New files: `src/components/layout/PageTransition.tsx`, `src/components/layout/RouteFallback.tsx`, `src/pages/NotFound.tsx` (styled with the current ink/paper/gold system, not the old glass style).

## 3. SEO (`src/components/RouteHead.tsx`)
- Add an optional `noindex` prop that writes `<meta name="robots">`, used by the 404 page and the "project not found" state. Existing callers are unaffected.

## 4. Project detail page (`src/pages/ProjectDetails.tsx`)
Real bugs, fixed while keeping the page's content and contact logic identical:
- Remove the artificial `setTimeout` loading delay — data comes from a local array, so resolve it synchronously.
- Remove the hardcoded fake amenity list ("Basketball court", "Pool", etc.) that isn't derived from project data and misrepresents commercial listings.
- Fix the sticky contact card offset (`top-8` tucks under the fixed navbar) → `lg:top-24`.
- Standardise the office address to the Footer's version: "Plus Offices, 1st Floor, Landmark Cyber Park, Sector 67, Gurugram, HR 122101".
- Restyle leftover `glass-card` / `text-gray-*` usages to the current editorial tokens so the page matches the rest of the site.
- Add a proper branded "listing not found" state (with `noindex`) instead of bare text.
- Keep untouched: phone/email constants, Gmail-vs-mailto logic, schedule-visit dialog and cooldown, `fetchPriority="high"` on the hero image.

## 5. Privacy policy (`src/pages/PrivacyPolicy.tsx`)
- Bring it onto the current editorial system: dark header band (fixes the white-on-white navbar at the top of this page), Reveal-based entrance, editorial tokens instead of `text-gray-*`.
- Legal copy stays word-for-word identical; all 8 sections preserved.

## 6. Small consistency fixes
- `src/components/Footer.tsx`: add the missing "Team" link (Navbar already has it).
- Accessibility: skip-to-content link in the Navbar plus an `id="main-content"` target on the hero, and keyboard activation (Enter/Space, focus ring, `role="button"`) for the Team cards, which are currently click-only.
- Delete orphaned files with zero references: `src/App.css`, `Contact.tsx`, `LoadingScreen.tsx`, `OurVision.tsx`, `PropertyCard.tsx`, `PropertyGrid.tsx`, `SearchBar.tsx`, `Statement.tsx`, `Testimonials.tsx` (each verified unreferenced before removal).

## Explicitly not doing
- No changes to `projectsData.ts`, `sitemap.xml`, `robots.txt`, `vercel.json`, Supabase/MCP files, or shadcn primitives.
- No reverting of the current Hero/Navbar/Team/FeaturedProperties designs — the audit's suggestions there were against the older build and are already superseded.
- No new dependencies.

## Verification
Typecheck and production build after the edits, plus a browser pass over `/`, `/project/:id`, `/privacy-policy`, and an unknown URL.
