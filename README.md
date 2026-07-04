# timonfranzen — personal site

Static one-pager for Timon Franzen: developer, Basel → Zürich.

- No frameworks, no build step. `index.html` + `assets/css` + `assets/js`.
- Fonts are self-hosted (Bricolage Grotesque, Geist, Geist Mono) — works offline.
- Animations: hero rise-in, scroll reveals, card tilt, marquee, count-up stats,
  pointer glow. All gated behind `prefers-reduced-motion`.

## Run locally

```bash
python3 -m http.server 4180 --directory .
# → http://localhost:4180
```

## Edit me

- Contact email lives in `index.html` (three places: nav, contact, footer).
- Project cards are plain `<article class="card">` blocks — copy one to add work.
- Accent colours: `--accent` / `--accent-2` in `assets/css/styles.css`.
