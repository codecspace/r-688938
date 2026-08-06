# Finish the Lionvest Admin Panel (CMS)

The database, storage, secure user-management backend, and all five editor panels (Homepage, Team, Contact, Properties, Enquiries) are already built. What's left is the way in — the login, the panel shell, the routing — plus connecting the public site so edits actually appear, and the UI polish items.

## 1. Login and admin shell

- `/admin/login` — a clean obsidian/gold sign-in card: email, password, error state. No sign-up link, no password reset noise. Redirects into the panel once the session lands.
- Admin shell — sidebar with Homepage, Properties, Team, Contact, Enquiries, and Users (Users visible only to owners), the signed-in email, role badge, and sign out. Unsaved-changes indicator and a Save button per panel.
- Route guard — checks the live session and re-reads the role from the database on every load, so removing someone takes effect immediately. Anyone without a role is bounced to the login screen.

## 2. Users panel (owner only)

List of accounts with role and last sign-in; add a user by email with a starting password; change a role between owner and editor; reset someone's password; revoke access. All of it goes through the already-deployed secure backend function, which verifies the caller is an owner before acting. You can't demote or remove yourself.

## 3. Routing and content provider

- Add `/admin/login` and `/admin/*` to the app, lazy-loaded and marked noindex so they never show up in search.
- Wrap the app in the content provider so every page reads saved content, falling back to the current built-in copy for anything not yet edited.

## 4. Wire the public site to the CMS

Point these at saved content instead of hardcoded copy: Hero, About, Stats, Projects, Featured Properties, Team, Contact, Footer, and the project detail page. Behaviour and styling stay exactly as they are today — the seeded content matches what's live, so nothing visibly changes until you edit something.

## 5. UI polish

- Scroll-to-top button: drop the cheap glow and the constant shine sweep; replace with a thin gold progress ring that fills as you scroll, a soft hover lift, and a quiet gold hairline border.
- Swap the nav and footer logo for the new transparent high-resolution crest and regenerate the favicon from it.

## Technical notes

- New files: `src/pages/admin/AdminLogin.tsx`, `src/pages/admin/AdminLayout.tsx`, `src/pages/admin/AdminPanel.tsx`, `src/pages/admin/panels/UsersPanel.tsx`, plus a `RequireStaff` guard.
- Saving writes the whole merged content object back to the single `site_content` row; the trigger stamps who changed it and when.
- Panels edit a local draft of the content object and only commit on Save, so a half-finished edit can't reach the live site.
- Public components consume `useSiteContent()`; `mergeContent` guarantees a missing key falls back to the default rather than rendering blank.
- Admin routes sit outside the page-transition wrapper to avoid animation conflicts with the panel layout.

## After this

Sign in at `/admin/login` with `jok38817@gmail.com` and the temporary password issued earlier, then change it from the Users panel.
