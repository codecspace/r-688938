# Site Audit — Fixes, Polish, and Business Gaps

Full pass over the current build. Nothing gets redesigned; the editorial look, animations and routing stay exactly as they are. This is about correctness, load reliability, and the commercial side of the site.

## 1. Image reliability (the main real bug)

Several listings still point at third-party image hosts even though the WebP files are already self-hosted in `public/projects/`:

- AIPL Joy District: card image on imgur, hero + gallery on postimg
- Godrej Aristocrat, Hero Homes, Joy Square, TARC Ishva: card `image` still on imgur

These are the images that go blank or hang on mobile Safari. Fix: repoint every listing to the local `/projects/*.webp` files so no listing depends on an outside host.

The homepage hero is also a generic Unsplash stock house — a foreign-looking suburban home fronting a Delhi NCR agency, loaded from an external CDN as the largest element on the page. Replace it with a self-hosted image of an actual project, and preload that file instead of the Unsplash URL in `index.html`.

## 2. Duplicate project listing

The homepage shows all six projects twice: once in "Projects we know inside out" (large alternating plates) and again in "Addresses worth a second look" (card grid). Same links, same photos, roughly a full screen of repeat scrolling, and two nav targets (`#projects`, `#properties`) that mean the same thing.

Fix: keep the large editorial section as the full index, and turn the second section into a short "Currently open for enquiry" strip of the new/featured listings only (no repeats of what isn't flagged), or drop it and route `#properties` to `#projects`. Recommendation: the shortened featured strip.

## 3. Lead capture — biggest business gap

Right now every call to action is a `tel:` link or a pre-filled Gmail/mailto compose. If someone browses at 11pm, or is on a desktop without a mail client configured, the lead is simply lost. There is no enquiry form anywhere on the site.

Add a real enquiry form (name, phone, email, project of interest, message) that:
- saves the enquiry to the backend so nothing is ever lost
- appears in the contact section, and as the "Schedule a Visit" action on each project page (pre-filled with that project)
- keeps the existing call/email buttons alongside it

Also add a WhatsApp CTA. For Indian real estate this converts better than email, and it currently isn't on the site at all.

## 4. Compliance and trust

- No RERA registration details anywhere. Property marketing in Haryana requires the agent's RERA number and a disclaimer that images/plans are indicative. This needs a footer line and a line on each project page. I need your RERA number to fill it in.
- Footer social icons link to `#` — dead links. Either wire the real profiles or remove them.
- Privacy policy exists but nothing links to a terms/disclaimer page; a short disclaimer block in the footer covers it.

## 5. SEO and search visibility

- No structured data at all. Add `RealEstateAgent` JSON-LD (name, phone, email, office address, area served) on the homepage and `Residence`/`Product`-style JSON-LD on each project page. This is what gets the phone number and address into Google's result panel.
- `og:url` and `canonical` in `index.html` are relative `/`; social scrapers want absolute URLs on the live domain.
- `og:image` points at imgur. Move it to a self-hosted file.
- Sitemap has no `lastmod` dates.

## 6. Quality-of-life fixes

- Anchor jumps land under the fixed navbar — no `scroll-padding-top` is set, so the section heading sits behind the bar. Add scroll padding.
- Project detail pages have no "price on request" / configuration summary above the fold; the sidebar is contact-only. Add a compact fact rail (developer, location, type, status) under the hero.
- Contact deep-link toasts say "Opening email client" even when nothing opens. Make the copy honest and offer a fallback to copy the address.
- `alt` text on project images is just the property name; add location for accessibility and image search.
- Hero image element has no explicit width/height, which contributes to layout shift.

## Technical notes

- Enquiry form uses Lovable Cloud: one `enquiries` table with RLS (public insert, no public read) plus explicit grants. Submissions readable only via the backend, not exposed to visitors.
- No routes are added, renamed or removed. `vercel.json`, `robots.txt` and the sitemap structure stay valid; only sitemap `lastmod` values are added.
- JSON-LD is injected through the existing `RouteHead` component so per-route metadata stays in one place.
- No changes to the animation system, `Editorial.tsx`, or the design tokens.

## What I need from you

1. Your RERA registration number (and state) for the compliance line.
2. WhatsApp business number — same as `+91 97735 52334`, or different?
3. Real social profile URLs, or should the icons come out?
4. Should enquiries also be emailed to `sales@lionvestrealty.com` on submit, or is the backend record enough for now?

I can start on everything in sections 1, 2, 5 and 6 immediately; the compliance and lead-routing details can be filled in once you answer.
