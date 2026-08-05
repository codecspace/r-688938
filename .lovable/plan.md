# Admin panel (/admin) — edit the whole site without touching code

A private, password-protected editor at `yoursite.com/admin` that lets you change almost everything visible on the site — projects, photos, homepage copy, team, contact details — and see it live within seconds. Plus the new logo and a pass of UI polish.

## What you'll be able to edit

**Projects** (the core of it)
- Add a new project, edit an existing one, delete one
- Name, developer, location, full address, short + long description
- Upload / replace / remove gallery photos straight from your phone camera roll, drag to reorder, pick which one is the cover
- Amenities: add/remove as simple tags
- Specifications: grouped lists (Overview, Leasing strategy, etc.) as plain text lines
- Flags: "New", "Featured" (featured ones show on the homepage)
- Drag to reorder how projects appear on the site and in "Explore properties"

**Homepage & site content**
- Hero: headline, sub-line, button labels, hero background image
- About us, Vision & Mission, Stats numbers/labels
- Section headings and intro copy for Projects, Team, Contact
- Team members: name, role, bio, photo (or leave blank for the gold initials placeholder), phone, email — add/remove/reorder
- Contact block + footer: phone, email, address, disclaimer text
- Ticker words that scroll across the page

Everything is a labelled text box with your current wording already in it, and a Save button. No page builders, no jargon.

## How access is protected

- `/admin` is a real login (email + password) on the site's backend, not a hardcoded password.
- Only email addresses you explicitly approve can even see the editor, and the database itself refuses saves from anyone else — so it can't be bypassed from the browser.
- No public signup. I create your account; you can change the password later.
- The public site stays readable by everyone; only writing is locked down.

**I need one thing from you: the email address you want to log in with.** I'll set it as the admin and give you the initial password when it's live.

## Safety: your edits and my code can't collide

Content is stored in the backend, not in the site's source files. That means:
- I can redesign or update the site any time and your edits survive untouched.
- Saving a change never touches code, so a bad edit can't break or white-screen the site — anything missing or malformed falls back to the current built-in content.
- Photos are shrunk in the browser before upload, so a 10MB phone photo becomes a fast, web-sized image automatically.

## Logo + UI polish (same pass)

- Replace the nav, footer and favicon logo with your new transparent high-res crest.
- Rebuild the scroll-to-top arrow: the cheap glow/shine ring goes, replaced by a quiet dark glass circle with a thin gold progress ring that fills as you scroll, subtle hover lift only.
- Tidy the same over-glowy treatment where it repeats: nav dots, floating WhatsApp/call buttons, and any leftover hard shadow rings — all moved to the restrained gold-hairline style used elsewhere.

## Technical notes

- New table `public.site_content`: single JSON row, public read, update restricted to admin emails via a `user_roles` table + `has_role()` security-definer function (never a role column on a profile). Grants issued in the same migration.
- Storage bucket `site-media` (public read, authenticated write, image mime types, 8MB cap) for uploaded photos.
- `SiteContentProvider` + `useSiteContent()` fetch the row once and deep-merge it over the existing `projectsData.ts` / hardcoded copy as defaults, so the site renders identically if the row is empty or the fetch fails.
- Admin routes lazy-loaded (`/admin`, `/admin/login`) so they add nothing to the public bundle. Zod-validated forms, client-side canvas resize to max 1920px WebP before upload.
- Components updated to read from the provider rather than their inline constants: Hero, AboutUs, VisionMission, Stats, Projects, Team, FeaturedProperties, SimpleContact, Footer, ProjectDetails.

## Order of work

1. Database + storage migration, admin account.
2. Content provider and defaults wiring (site looks identical, now data-driven).
3. Admin login + editor shell, then Projects editor, then site-content editors.
4. Logo swap + scroll-to-top and glow polish.
