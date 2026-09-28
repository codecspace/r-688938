# Enquiry forms: verify, rate limit, and reset admin users

## What you get
- Every enquiry and contact form on the site (homepage contact, property pages, footer) tested end to end so submissions land in the admin Enquiries inbox.
- Solid spam protection: one person can't flood the inbox.
- Admin users reset: only your account (jok38817@gmail.com) stays, with a new password I'll give you.

## Rate limit rules
- At most 3 enquiries per phone number or email in 10 minutes.
- At most 5 enquiries per visitor (browser/network) per hour.
- At most 200 enquiries site-wide per hour, so a bot attack can't overwhelm you.
- Duplicate protection: the same message from the same phone within 2 minutes is ignored.
- A hidden "honeypot" field quietly drops bot submissions.
- A clear, friendly message tells real visitors when to try again.

## Steps
1. Test each form on the live preview and confirm the entry shows in the inbox.
2. Add the rate limit and bot checks above; fix any form that fails.
3. Re-test: normal submit works, the 4th quick submit is blocked with the friendly message.
4. Remove all admin users except you, set a new strong password, and share it in chat.

## Technical details
- New edge function `submit-enquiry` validates input with Zod and inserts via the service role; checks limits against recent `enquiries` rows plus a hashed IP column (`ip_hash`, added by migration).
- Remove the public anon INSERT policy on `enquiries` so the function is the only way in (the limits can't be bypassed).
- `EnquiryForm` calls the function instead of inserting directly; adds the honeypot field.
- User reset: delete other auth users via the admin API and update your password; nothing is emailed.
- Note: the pasted security report's `.env` point is a false alarm. Those keys are public by design and protected by the access rules.
