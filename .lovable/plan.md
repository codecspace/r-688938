# Final full site check

The site currently builds without errors. This pass checks everything end to end, fixes whatever breaks, and ends with a short report.

## 1. Code health
- Run a full type check and lint across the project.
- Find unused files, imports, and leftover old components, and remove them.
- Check that every page and section loads the editable content, with sensible fallbacks.

## 2. Public site walkthrough (phone and desktop)
- Homepage: intro video, hero, about, stats, highlights, portfolio filters, team, contact, footer.
- Property detail pages, privacy policy, and the 404 page.
- Take screenshots and review the console for errors, broken images, overlapping layouts, and slow loading.
- Check that page titles, descriptions, the sitemap, and robots.txt are correct.

## 3. Enquiry forms
- Send a real test enquiry, confirm it shows up in the admin inbox, and confirm the rate limit still blocks spam. Delete the test rows afterwards.

## 4. Admin panel
- Sign in and open every tab (Homepage, Properties, Team, Contact, Enquiries, Users).
- Confirm saving and image uploads work. Confirm someone without access is kept out.

## 5. Security
- Run the security scan and the database checks. Fix real issues (tighten access rules and remove unneeded permissions). Leave the public keys alone, since those are safe.
- Run the dependency vulnerability scan and upgrade anything flagged.

## 6. Report
- A short summary of what was fixed and anything that still needs your decision, such as setting up an email domain for notifications.

## Technical details
- Tools: tsgo, eslint, Playwright at 393px and 1280px, supabase linter, security scan, and dependency scan.
- Fixes stay minimal, with no design changes, and follow the existing memory rules (RouteHead, named Three.js imports, no team badges).
