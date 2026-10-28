# Premium full-screen video hero

Replace the homepage hero's static photo with a cinematic full-screen video that loops quietly while the visitor scrolls, keeping the site's gold-and-black editorial look and its current speed budget.

## What you'll see

- The homepage opens on full-screen cinematic footage of a contemporary luxury villa (warm golden-hour light, slow camera glide) instead of the still photo.
- Your existing headline, intro text, and buttons stay exactly as they are, overlaid on the video with the same dark gradient so text stays readable.
- The video loops seamlessly, is silent, and keeps its current slow drift as you scroll (the existing parallax motion stays).
- Scrolling past the hero feels the same as now — the video gently zooms and fades into the page.

## The footage

- One AI-generated clip, about 8–10 seconds, 16:9, muted ambient loop: slow push-in over a modern luxury villa with landscaped frontage at golden hour, cinematic dark grade matching the lion-obsidian/gold palette, no on-screen text, no music, ending on a frame that matches the opening so the loop is seamless.
- Saved into the project and served from the site's CDN (not stored in the codebase).

## How it's built

- `src/components/Hero.tsx` gains a `<video>` layer behind the existing content:
  - Poster image stays the current `hero-villa.webp`, marked high priority — the page's first paint and largest image remain as fast as today; the video loads only after first paint (idle load), protecting the FCP/LCP numbers that were previously fixed.
  - Autoplay muted + inline, standard on all browsers including Safari; loops seamlessly.
  - Visitors with "reduce motion" enabled, and as a fallback if the video fails, still see the static photo exactly as today.
- The existing scroll-driven zoom/fade on the hero continues to apply to the video layer.
- CMS support: a new optional `video` field on the hero content in `src/lib/siteContent.ts`, with a video upload control in the admin Homepage panel (same signed-URL upload pattern as images, stored in the private site-media bucket). Empty field = the generated footage; you can swap in your own drone shot or walkthrough later from the admin panel without code.
- No changes to any other section, the admin login, or the enquiry flow.

## Verification

- Typecheck passes; build log clean.
- Playwright on the dev server: video element present and playing, headline and buttons render over it, no console errors.
- Check the hero on a phone-size viewport and with reduced motion (static-image fallback).

## Explicitly not doing

- No full-page or scroll-scrubbed video — hero only, ambient loop.
- No audio track.
- No changes to published favicon work or the temporary Prem removal (both stay as they are).
