# Lionvest Admin Panel (CMS) — Plan

## On your question: email check vs roles

Stick with the **roles table** approach (your v2 SQL), not a hardcoded email check. A hardcoded email cannot support what you asked for next — adding more users and editing their access. Roles give you that for free, and they're safer: access is data in the database, not a string in the frontend bundle.

Your account `jok38817@gmail.com` becomes the first **owner**.

## Access model

Two role levels, so you can hand out limited access:

- **owner** — everything, plus can invite/remove users and change their roles. Only an owner can create another owner.
- **editor** — can edit all site content and upload photos, but cannot manage users.

Public visitors are unaffected: the site reads content anonymously, writes are locked to signed-in owners/editors.

Public sign-ups stay disabled. New users are created only from inside the admin panel by an owner.

## What you'll be able to edit

A single `/admin` panel, no technical knowledge needed:

- **Properties** — add, edit, delete, drag to reorder, mark as featured. Every field editable in plain text boxes: name, location, city, price, status, description, specifications, amenities (add/remove chips).
- **Photos** — drag-and-drop upload per property, reorder the gallery, set the cover image, delete images. Uploads go to secured cloud storage.
- **Homepage** — hero headline, sub-headline, background image, button text/link; the "Explore Properties" section heading and ordering; about, vision/mission, stats, ticker.
- **Team** — add/remove members, photo or initials placeholder, name, role, bio.
- **Contact** — phone, email, address, office hours (used across the site and the footer).
- **Enquiries** — read-only inbox of leads submitted through the site, newest first, with the property they asked about.
- **Users** — list of accounts, their role, invite a new one by email, change role, revoke access.

Every screen has a **Preview** and **Save** with a clear "unsaved changes" indicator, so nothing goes live by accident.

## How it hangs together (technical)

Database (one migration, close to your uploaded SQL with adjustments):

- `user_roles` (user_id, role enum `owner`/`editor`) + `has_role(_user_id, _role)` security-definer function, and a `is_staff()` helper. Grants: `select` to authenticated, `all` to service_role. No anon access.
- `site_content` single-row `jsonb` table, public read, write restricted to staff, `updated_at`/`updated_by` stamped by trigger.
- `user_roles` write policies: only owners may insert/update/delete role rows.
- Storage bucket `site-media` (public read, 8MB, jpeg/png/webp), writes restricted to staff.
- Seed row for `site_content` generated from the current `projectsData.ts` and existing component copy, so the panel opens with today's live content already filled in — nothing on the site changes on day one.

Frontend:

- `SiteContentProvider` fetches `site_content` once and deep-merges it over the existing hardcoded defaults, so the site never breaks if a key is missing. `Hero`, `AboutUs`, `Projects`, `FeaturedProperties`, `Team`, `SimpleContact`, `Footer`, `ProjectDetails` read from it.
- Routes `/admin/login` and `/admin/*` (lazy-loaded, `noindex`), guarded by a session + role check that re-validates against the database, not localStorage.
- Admin UI styled to match the site: obsidian/gold, glass panels, restrained motion.
- Inviting a user needs a server-side call, so a small edge function `admin-users` handles create/update/delete of accounts and roles, verifying the caller is an owner before doing anything.

Also included in this pass (your earlier notes):

- Replace the nav/footer logo with your new transparent high-res crest, regenerate the favicon from it.
- Rebuild the scroll-to-top button: remove the cheap glow, use a thin gold progress ring with a soft hover lift; same treatment for other over-glowy buttons.

## Order of work

1. Migration: roles, content table, storage, policies, seed.
2. Auth + admin shell, login, route guard.
3. Content provider and wiring the public site to it.
4. Editors: properties/photos, homepage, team, contact.
5. Enquiries inbox + user management (edge function).
6. Logo swap, favicon, scroll-to-top and button polish.

After step 1 you'll get a temporary password for `jok38817@gmail.com` to sign in and change.
