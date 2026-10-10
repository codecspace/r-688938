# Bolder Google logo (crest on a solid black circle)

Your logo setup is already correct. Google just hasn't fetched it yet. This change makes the icon easier to see at Google's tiny size (16–48px), and it works in both light and dark search results.

## What changes

- Make a new icon from the existing transparent lion crest: the gold crest sits centred on a solid near-black circle, filling about 80% of it, with a transparent area outside the circle.
- Replace the existing icon images with the bolder version, keeping the same file names and web addresses, so the links Google already knows about stay the same:
  - favicon.ico (16, 32, 48, 64 sizes)
  - favicon.png (96px)
  - icon-48.png
  - icon-192.png
  - apple-touch-icon.png (180px, solid black square background, since iPhones don't allow transparency)
- The homepage code stays the same. All the icon links are already in place.
- Nothing else on the site changes. The logo in the navigation bar and footer stays as it is.

## After it's built

- Check that each icon looks clear at 16px and 48px.
- You publish once.
- Then in Google Search Console, inspect https://lionvestrealty.com/ and click Request Indexing again.
- After that, leave it alone. Google usually updates the logo within a few days to a few weeks.

## Technical details

- Source: public/lionvest-logo.png (transparent crest).
- Build with ImageMagick: trim the crest, resize it to about 80% of the canvas, and composite it over a filled circle (#0B0B0B), all at high resolution, then downscale to each size with Lanczos. Build the .ico from 16/32/48/64 PNGs.
- No changes to index.html, robots.txt, the sitemap, or other SEO settings.
