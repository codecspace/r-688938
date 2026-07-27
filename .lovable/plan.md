## Goal
Make direct requests to React routes like `/privacy-policy` and `/project/aipl-joy-district` return `200` on Vercel, while keeping real static files like `/robots.txt` and `/sitemap.xml` accessible.

## What I verified
- The app is a Vite + React SPA using `BrowserRouter` with routes for `/`, `/privacy-policy`, and `/project/:id`.
- `public/robots.txt` already references `https://lionvestrealty.com/sitemap.xml`.
- The deployed domain still returns `404` for deep routes, so the current Vercel deployment is not applying the SPA fallback.
- The current `vercel.json` exists, but I will adjust it to the simplest Vercel SPA rewrite pattern to remove any chance of the negative-lookahead route not being honored as expected.

## Plan
1. Update `vercel.json` to the standard Vercel SPA fallback:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
2. Keep `public/sitemap.xml` and `public/robots.txt` unchanged unless a quick check shows they no longer match the public app routes.
3. Verify locally that the config file is valid JSON and that the app still has the expected route definitions.
4. Tell you exactly what to redeploy on Vercel and what `curl -I` commands should return after the new deployment is live.

## Important note
I can update the project files, but I cannot force your external Vercel deployment from here unless your deployment pipeline is connected to these changes. After approval, the file change must be redeployed on Vercel for `lionvestrealty.com` to stop returning `404` on direct route requests.