# Fixes, polish and dependency upgrades

## 1. Bring back the villa hero image

The homepage hero currently uses `public/projects/project-4.webp` (rooftop pool deck). The original opener was a white modern villa (an Unsplash image, later removed when assets were self-hosted).

- Download that villa photo, optimise it to WebP, and store it as `public/hero-villa.webp` (self-hosted — no third-party CDN, keeps the current performance rules).
- Point `Hero.tsx` and the `<link rel="preload">` in `index.html` at it, with updated alt text.

## 2. Logo white rectangle

`public/lionvest-logo.webp` is a 200x300 image with solid white pixels around the crest, so it renders as a white block on the dark navbar and dark footer.

- Trim the surrounding white and export a transparent PNG (`public/lionvest-logo.png`), keeping the crest's own white/gold artwork intact.
- Update `Navbar.tsx` and `Footer.tsx` to the new file with corrected width/height so nothing shifts.
- Regenerate `public/favicon.png` from the same trimmed mark.

## 3. The two overlapping forms on a property page

A project page currently shows the same enquiry form twice: once in the sidebar ("Request details") and again inside the "Schedule a Visit" dialog. Two competing forms for one action.

- Keep a single persistent form in the sidebar, retitled "Enquire about this property", with a small visit-request option (a "I'd like to schedule a site visit" toggle that prefills the message and tags the enquiry).
- Turn "Schedule a Visit" into a button that scrolls/focuses that one form on desktop, and opens a compact sheet on mobile where the sidebar is out of view — no duplicate form component rendered twice.
- Verify submissions actually land in the database for both entry points, and that validation errors, the cooldown state, and the success state all behave.

## 4. Cleaner, more modern "More listings"

- Tighten the listings grid: consistent 4:3 media ratio, calmer badge treatment, clearer developer/name/location hierarchy, and a hover state that matches the editorial system rather than a separate style.
- Add lightweight filtering that actually works: filter chips by city (All / Gurugram / Noida / Delhi), with a count and an empty state.
- Small quality-of-life passes: consistent section spacing, better mobile card sizing, keyboard focus rings on cards, and the same card treatment reused on the related-projects strip at the bottom of a project page.

## 5. Dependency vulnerabilities from the GitHub alerts

Fix the ones that are real and safely upgradable, without breaking the build:

- `vite` and `esbuild` — patch upgrade within v5 (dev-server-only issues, but worth clearing).
- `postcss` — upgrade to the patched 8.5.x.
- `react-router-dom` / `react-router` — patch upgrade within v6 for the open-redirect and hydration advisories.
- `brace-expansion`, `fast-uri`, `@eslint/plugin-kit`, `launch-editor` — transitive dev-only; resolved by refreshing the lockfile with the above upgrades.

No major-version jumps (no Vite 7, no React Router 7) — those would risk breaking the site and are not needed to clear the advisories. After the upgrades: run the dependency scanner, typecheck, and load the site to confirm nothing regressed.

## Technical notes

- Files touched: `src/components/Hero.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/FeaturedProperties.tsx`, `src/pages/ProjectDetails.tsx`, `src/components/EnquiryForm.tsx`, `index.html`, `package.json` + lockfile, plus new files in `public/`.
- Image work done with sharp/ImageMagick in the sandbox; no new runtime dependencies.
- Verification: `tsgo` typecheck, a Playwright pass over the homepage and one project page (console + network clean), and one real enquiry submission through each entry point.
