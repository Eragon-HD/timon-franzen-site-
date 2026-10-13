# timonfranzen — personal site

Static one-pager for Timon Franzen: developer, Basel → Zürich.

- No frameworks, no build step. `index.html` + `assets/css` + `assets/js`.
- Fonts are self-hosted (Bricolage Grotesque, Work Sans, IBM Plex Mono) and work offline.
- Motion: Lenis scrolling on desktop and a gentle 8px section fade. Both respect
    `prefers-reduced-motion`; touch devices keep native scrolling.

## Deploy (it's automatic)

Live at **https://www.timonfranzen.ch** — GitHub Pages from this repo
(`Eragon-HD/timon-franzen-site-`). `git push origin main` deploys in ~1 min.
DNS at Infomaniak: apex A → GitHub Pages IPs, `www` CNAME →
`eragon-hd.github.io`. The MX/TXT records there are the email — never touch.
Cache busting: bump `?v=N` on `styles.css`/`main.js` links in `index.html`
with every CSS/JS change.

## Run locally

```bash
python3 -m http.server 4180 --directory .
# → http://localhost:4180
```

## Edit me

- Contact email (`contact@timonfranzen.ch`) lives in `index.html` (nav, contact section).
- Project cards are plain `<article class="card">` blocks — copy one to add work.
- Accent colour: `--accent` in `assets/css/styles.css`.
