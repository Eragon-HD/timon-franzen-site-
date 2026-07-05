# timonfranzen — personal site

Static one-pager for Timon Franzen: developer, Basel → Zürich.

- No frameworks, no build step. `index.html` + `assets/css` + `assets/js`.
- Fonts are self-hosted (Bricolage Grotesque, Geist, Geist Mono) — works offline.
- Animations: hero rise-in, scroll reveals, card tilt, marquee, count-up stats,
  pointer glow. All gated behind `prefers-reduced-motion`.

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
- Accent colours: `--accent` / `--accent-2` in `assets/css/styles.css`.
