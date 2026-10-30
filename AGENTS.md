# AGENTS.md

- Hero background film must load only after first paint (idle callback) behind the still poster image; the poster stays the LCP element. Never eager-load the video, remove the still, or block first paint on the film — FCP/LCP regressions here previously took INP to 3.5s.
- Hero video source resolves as `hero.video` (CMS `site_content`) falling back to the built-in CDN clip (`src/assets/hero-video.mp4.asset.json`); a video load error must fall back to the still image, never a blank hero.
