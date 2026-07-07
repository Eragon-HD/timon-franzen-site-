/* =====================================================================
   twentyfour sport — interactions, i18n (DE/EN), season switch
   ===================================================================== */
(function () {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =====================================================================
     Translations
     ===================================================================== */
  const STRINGS = {
    de: {
      "skip": "Zum Inhalt springen",
      "nav.collection": "Kollektion", "nav.gts": "GTS", "nav.altitude": "Höhe", "nav.visit": "Besuch",
      "controls.lang": "Sprache", "controls.season": "Saison",
      "season.winter": "Winter", "season.summer": "Sommer",
      "hero.title1": "Für draussen", "hero.title2": "ausgerüstet —", "hero.title3": "mitten in Basel.",
      "hero.cta1": "Kollektion ansehen", "hero.cta2": "Standorte & Öffnungszeiten",
      "hero.k.location": "Standort", "hero.k.elevation": "Höhe ü. M.", "hero.k.season": "Saison", "hero.k.brand": "Marke",
      "gts.lead": "Entworfen in Linz.<br />Für die Berge gemacht.",
      "gts.body1": "Hinter GTS steht ein Paar: ein österreichischer Skirennfahrer und seine Frau, eine Designerin aus Schweden. Er bringt die Funktion aus dem Rennsport, sie die klare Form aus dem Norden — entwickelt wird gemeinsam, als Familienbetrieb in Linz.",
      "gts.body2": "Seit 2015 läuft ihre Kollektion unter dem Namen GTS: Softshells, Unterzieher, Hosen und Socken. Gemacht für lange Tage am Berg — und für jede Schicht dazwischen.",
      "gts.m1": "Ein Skirennfahrer und seine schwedische Frau gründen GTS in Linz.",
      "gts.m2": "Die erste eigene Kollektion erscheint unter dem Namen GTS.",
      "gts.m3": "Erster grosser Auftritt auf der ISPO München.",
      "gts.m4y": "Heute",
      "gts.m4": "Jetzt in Basel, an der Gerbergasse — geführt von twentyfour sport.",
      "gts.spec.k1": "Herkunft", "gts.spec.v1": "Designed in Austria",
      "gts.spec.k2": "Linie", "gts.spec.k3": "Saisons", "gts.spec.v3": "Sommer & Winter",
      "koll.eyebrow": "Die Kollektion",
      "koll.title": "Vier Kategorien. Eine Saison nach der anderen.",
      "koll.noteA": "Aktuell zu sehen:", "koll.noteB": ". Mit dem Schalter oben wechselst du die Saison.",
      "card.jkt.title": "Softshells & Jacken", "card.lay.title": "Funktionswäsche", "card.pnt.title": "Hosen", "card.sck.title": "Socken",
      "card.gaugeK": "Einsatzhöhe", "card.dt.material": "Material", "card.dt.weight": "Gewicht", "card.dt.from": "ab",
      "card.cta": "Im Store anprobieren →",
      "card.gaugeGo": "Diese Höhe im Profil zeigen",
      "elev.eyebrow": "Vom Rhein bis zum Gipfel",
      "elev.title": "Für jede Höhe die richtige Schicht.",
      "elev.note": "Basel liegt auf 277 m. Die GTS-Kollektion trägt dich von der Rheinpromenade bis über die Baumgrenze.",
      "elev.explore": "Höhe erkunden",
      "elev.stop1": "Rhein · Stadt", "elev.sub1": "Funktionsshirt",
      "elev.stop2": "Jura · Wald", "elev.sub2": "Softshell + Hose",
      "elev.stop3": "Alm · Grat", "elev.sub3": "Unterzieher + Jacke",
      "elev.stop4": "Gipfel", "elev.sub4": "Volle Schichtung",
      "elev.cap": "Fahr über das Profil — die Landschaft zeigt jede Höhenlage. Bilder: Wikimedia Commons.",
      "visit.eyebrow": "Besuch uns",
      "visit.title": "An der Gerbergasse, mitten in der Altstadt.",
      "visit.note": "Beraten, anprobieren, mitnehmen — im Herzen von Grossbasel.",
      "visit.tag": "Basel · Grossbasel",
      "map.area": "Grossbasel · Altstadt",
      "store.weekday": "Mo–Fr", "store.sat": "Sa", "store.sun": "So", "store.closed": "geschlossen",
      "store.directions": "Route ansehen →",
      "status.open": "Geöffnet", "status.closed": "Geschlossen", "status.closes": "schliesst", "status.opens": "öffnet",
      "rhine": "RHEIN",
      "foot.dealer": "Offizieller GTS-Händler · Basel",
      "foot.hours": "Mo–Fr 09:30–18:30 · Sa 09:00–17:00",
      "foot.fine": "Preise & Öffnungszeiten exemplarisch — vor Veröffentlichung bestätigen."
    },
    en: {
      "skip": "Skip to content",
      "nav.collection": "Collection", "nav.gts": "GTS", "nav.altitude": "Altitude", "nav.visit": "Visit",
      "controls.lang": "Language", "controls.season": "Season",
      "season.winter": "Winter", "season.summer": "Summer",
      "hero.title1": "Equipped for", "hero.title2": "the outdoors —", "hero.title3": "right in Basel.",
      "hero.cta1": "View collection", "hero.cta2": "Locations & hours",
      "hero.k.location": "Location", "hero.k.elevation": "Elevation", "hero.k.season": "Season", "hero.k.brand": "Brand",
      "gts.lead": "Designed in Linz.<br />Made for the mountains.",
      "gts.body1": "Behind GTS is a couple: an Austrian ski racer and his wife, a designer from Sweden. He brings the function from racing, she the clean form from the North — developed together, as a family business in Linz.",
      "gts.body2": "Since 2015 their collection has run under the GTS name: softshells, base layers, trousers and socks. Made for long days on the mountain — and every layer in between.",
      "gts.m1": "A ski racer and his Swedish wife found GTS in Linz.",
      "gts.m2": "The first collection of their own appears under the GTS name.",
      "gts.m3": "First major showing at ISPO Munich.",
      "gts.m4y": "Today",
      "gts.m4": "Now in Basel, on Gerbergasse — stocked by twentyfour sport.",
      "gts.spec.k1": "Origin", "gts.spec.v1": "Designed in Austria",
      "gts.spec.k2": "Line", "gts.spec.k3": "Seasons", "gts.spec.v3": "Summer & Winter",
      "koll.eyebrow": "The collection",
      "koll.title": "Four categories. One season at a time.",
      "koll.noteA": "Now showing:", "koll.noteB": ". Switch seasons with the toggle above.",
      "card.jkt.title": "Softshells & jackets", "card.lay.title": "Base layers", "card.pnt.title": "Trousers", "card.sck.title": "Socks",
      "card.gaugeK": "Use altitude", "card.dt.material": "Material", "card.dt.weight": "Weight", "card.dt.from": "from",
      "card.cta": "Try it in store →",
      "card.gaugeGo": "Show this range on the altitude profile",
      "elev.eyebrow": "From the Rhine to the summit",
      "elev.title": "The right layer for every altitude.",
      "elev.note": "Basel sits at 277 m. The GTS collection carries you from the Rhine promenade to above the tree line.",
      "elev.explore": "Explore the altitude",
      "elev.stop1": "Rhine · city", "elev.sub1": "Base-layer tee",
      "elev.stop2": "Jura · forest", "elev.sub2": "Softshell + trousers",
      "elev.stop3": "Alp · ridge", "elev.sub3": "Base layer + jacket",
      "elev.stop4": "Summit", "elev.sub4": "Full layering",
      "elev.cap": "Hover the profile — the landscape shows every altitude. Images: Wikimedia Commons.",
      "visit.eyebrow": "Visit us",
      "visit.title": "On Gerbergasse, in the heart of the old town.",
      "visit.note": "Advice, fittings, take it home — in the heart of Grossbasel.",
      "visit.tag": "Basel · Grossbasel",
      "map.area": "Grossbasel · old town",
      "store.weekday": "Mon–Fri", "store.sat": "Sat", "store.sun": "Sun", "store.closed": "closed",
      "store.directions": "Get directions →",
      "status.open": "Open now", "status.closed": "Closed", "status.closes": "closes", "status.opens": "opens",
      "rhine": "RHINE",
      "foot.dealer": "Official GTS dealer · Basel",
      "foot.hours": "Mon–Fri 09:30–18:30 · Sat 09:00–17:00",
      "foot.fine": "Prices & opening hours are illustrative — confirm before publishing."
    }
  };

  /* Season-dependent strings (per language) */
  const SEASON_TEXT = {
    de: {
      winter: { pill: "Winter 25/26", collLabel: "Winterkollektion 25/26", heroMeta: "Winter · ⌀ 2 °C",
        heroLede: "Die GTS Winterkollektion: Softshells, Funktionswäsche, Hosen und Socken. Designed in Austria, anprobiert an der Gerbergasse." },
      summer: { pill: "Sommer 26", collLabel: "Sommerkollektion 26", heroMeta: "Sommer · ⌀ 24 °C",
        heroLede: "Die GTS Sommerkollektion: leichte Softshells, schnelltrocknende Wäsche, Wanderhosen und Socken. Designed in Austria, anprobiert an der Gerbergasse." }
    },
    en: {
      winter: { pill: "Winter 25/26", collLabel: "Winter collection 25/26", heroMeta: "Winter · avg 2 °C",
        heroLede: "The GTS winter collection: softshells, base layers, trousers and socks. Designed in Austria, fitted on Gerbergasse." },
      summer: { pill: "Summer 26", collLabel: "Summer collection 26", heroMeta: "Summer · avg 24 °C",
        heroLede: "The GTS summer collection: light softshells, quick-drying layers, hiking trousers and socks. Designed in Austria, fitted on Gerbergasse." }
    }
  };

  /* Altitude-gauge fill (language-independent), [season][cat] -> {l, r} in % */
  const FILL = {
    winter: { jkt: [40, 0], lay: [4, 14], pnt: [28, 0], sck: [28, 0] },
    summer: { jkt: [13, 20], lay: [4, 26], pnt: [4, 20], sck: [4, 14] }
  };

  /* Card copy, [lang][season][cat] */
  const CARDS = {
    de: {
      winter: {
        jkt: { desc: "Winddicht, isoliert, vier Wege Stretch — die Schale für Grat und Wind.", mat: "Softshell · Windblock", weight: "420 g", price: "CHF 189", gaugeV: "1200 – 3000 m", c1main: "Windblock-Membran", c1sub: "winddicht · atmungsaktiv", c2main: "4-Wege-Stretch", c2sub: "volle Bewegungsfreiheit" },
        lay: { desc: "Wärmt, ohne aufzutragen — die erste Schicht von Stadt bis Gipfel.",       mat: "Merino/Synth. 200",     weight: "180 g", price: "CHF 69",  gaugeV: "277 – 2600 m",  c1main: "Merino 200",        c1sub: "wärmt · geruchsarm",     c2main: "Flachnaht",        c2sub: "scheuerfrei am Rucksack" },
        pnt: { desc: "Isoliert und wasserabweisend — für lange Touren bei Wind.",               mat: "Softshell · DWR",       weight: "510 g", price: "CHF 159", gaugeV: "800 – 3000 m",  c1main: "DWR-Finish",        c1sub: "wasserabweisend",        c2main: "Vorgeformtes Knie", c2sub: "volle Bewegungsfreiheit" },
        sck: { desc: "Gepolstert und geruchsarm — warm von der Ferse bis zum Grat.",            mat: "Merino · Frottee",      weight: "60 g",  price: "CHF 26",  gaugeV: "800 – 3000 m",  c1main: "Merino-Mix",        c1sub: "geruchsarm",             c2main: "Frottee-Zone",     c2sub: "warm gepolstert" }
      },
      summer: {
        jkt: { desc: "Lampione Light — packbar, atmungsaktiv, UV-geschützt.", mat: "Ripstop · UV 40+",    weight: "240 g", price: "CHF 139", gaugeV: "600 – 2400 m", c1main: "Ripstop-Gewebe", c1sub: "leicht · UV 40+",        c2main: "Packmass S",   c2sub: "faustgross verstaut" },
        lay: { desc: "Cool-Tee — schnelltrocknend und leicht.",              mat: "Recycled Poly 130",   weight: "95 g",  price: "CHF 45",  gaugeV: "277 – 2200 m", c1main: "Cool-Poly",      c1sub: "schnelltrocknend",       c2main: "Mesh-Rücken",  c2sub: "maximale Belüftung" },
        pnt: { desc: "Wanderhose Zip-off — Stretch, schnell zur Shorts.",    mat: "Nylon-Stretch · UV",  weight: "330 g", price: "CHF 119", gaugeV: "277 – 2400 m", c1main: "Zip-off-System", c1sub: "Hose zu Shorts",         c2main: "Stretch-Bund", c2sub: "ganztags bequem" },
        sck: { desc: "Trekkingsocke — flach gestrickt, blasenfrei.",         mat: "Coolmax · flach",     weight: "40 g",  price: "CHF 19",  gaugeV: "277 – 2600 m", c1main: "Coolmax",        c1sub: "feuchtigkeitsableitend", c2main: "Flachstrick",  c2sub: "blasenfrei" }
      }
    },
    en: {
      winter: {
        jkt: { desc: "Windproof, insulated, four-way stretch — the shell for ridge and wind.", mat: "Softshell · Windblock", weight: "420 g", price: "CHF 189", gaugeV: "1200 – 3000 m", c1main: "Windblock membrane", c1sub: "windproof · breathable", c2main: "Four-way stretch", c2sub: "full freedom of movement" },
        lay: { desc: "Warms without bulk — the first layer from city to summit.",              mat: "Merino/synth. 200",     weight: "180 g", price: "CHF 69",  gaugeV: "277 – 2600 m",  c1main: "Merino 200",        c1sub: "warm · low-odour",      c2main: "Flatlock seam",   c2sub: "chafe-free under a pack" },
        pnt: { desc: "Insulated and water-repellent — for long tours in the wind.",            mat: "Softshell · DWR",       weight: "510 g", price: "CHF 159", gaugeV: "800 – 3000 m",  c1main: "DWR finish",        c1sub: "water-repellent",       c2main: "Pre-shaped knee", c2sub: "full freedom of movement" },
        sck: { desc: "Cushioned and low-odour — warm from heel to ridge.",                     mat: "Merino · terry",        weight: "60 g",  price: "CHF 26",  gaugeV: "800 – 3000 m",  c1main: "Merino blend",      c1sub: "low-odour",             c2main: "Terry zone",      c2sub: "warm cushioning" }
      },
      summer: {
        jkt: { desc: "Lampione Light — packable, breathable, UV-protected.", mat: "Ripstop · UV 40+",    weight: "240 g", price: "CHF 139", gaugeV: "600 – 2400 m", c1main: "Ripstop fabric", c1sub: "light · UV 40+",      c2main: "Packs to S",   c2sub: "stows fist-sized" },
        lay: { desc: "Cool tee — quick-drying and light.",                   mat: "Recycled poly 130",   weight: "95 g",  price: "CHF 45",  gaugeV: "277 – 2200 m", c1main: "Cool-poly",      c1sub: "quick-drying",        c2main: "Mesh back",    c2sub: "maximum ventilation" },
        pnt: { desc: "Zip-off hiking trousers — stretch, quick to shorts.",  mat: "Nylon stretch · UV",  weight: "330 g", price: "CHF 119", gaugeV: "277 – 2400 m", c1main: "Zip-off system", c1sub: "trousers to shorts",  c2main: "Stretch waist", c2sub: "all-day comfort" },
        sck: { desc: "Trekking sock — flat-knit, blister-free.",             mat: "Coolmax · flat",      weight: "40 g",  price: "CHF 19",  gaugeV: "277 – 2600 m", c1main: "Coolmax",        c1sub: "moisture-wicking",    c2main: "Flat knit",    c2sub: "blister-free" }
      }
    }
  };

  /* ---------- State ---------- */
  let lang = "de";
  let season = "winter";
  let elevSync = null;
  let elevGoto = null;
  let statusRender = null;

  const i18nEls = Array.from(document.querySelectorAll("[data-i18n]"));
  const cardEls = Array.from(document.querySelectorAll(".card[data-cat]"));
  const langButtons = Array.from(document.querySelectorAll("[data-lang-set]"));
  const seasonButtons = Array.from(document.querySelectorAll("[data-season-set]"));

  function setText(el, val) {
    if (!el || val == null) return;
    if (val.indexOf("<") !== -1) el.innerHTML = val; // allows <br>
    else el.textContent = val;
  }

  function render() {
    root.setAttribute("data-lang", lang);
    root.setAttribute("data-season", season);
    root.lang = lang;

    // static strings
    const dict = STRINGS[lang];
    i18nEls.forEach((el) => setText(el, dict[el.dataset.i18n]));

    // toggle button states
    langButtons.forEach((b) => {
      const on = b.dataset.langSet === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    seasonButtons.forEach((b) => {
      const on = b.dataset.seasonSet === season;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });

    // season-dependent shared strings
    const st = SEASON_TEXT[lang][season];
    document.querySelectorAll('[data-field="heroLede"]').forEach((el) => setText(el, st.heroLede));
    document.querySelectorAll('[data-field="heroMeta"]').forEach((el) => setText(el, st.heroMeta));
    document.querySelectorAll('[data-field="collLabel"]').forEach((el) => setText(el, st.collLabel));

    // cards
    const copy = CARDS[lang][season];
    cardEls.forEach((card) => {
      const cat = card.dataset.cat;
      const d = copy[cat];
      if (!d) return;
      const q = (sel) => card.querySelector(sel);
      setText(q('[data-field="pill"]'), st.pill);
      setText(q('[data-field="desc"]'), d.desc);
      setText(q('[data-field="mat"]'), d.mat);
      setText(q('[data-field="weight"]'), d.weight);
      setText(q('[data-field="price"]'), d.price);
      setText(q('[data-field="gaugeV"]'), d.gaugeV);
      setText(q('[data-field="c1main"]'), d.c1main);
      setText(q('[data-field="c1sub"]'), d.c1sub);
      setText(q('[data-field="c2main"]'), d.c2main);
      setText(q('[data-field="c2sub"]'), d.c2sub);
      const fill = q('[data-field="fill"]');
      if (fill) {
        const f = FILL[season][cat];
        fill.style.left = f[0] + "%";
        fill.style.right = f[1] + "%";
      }
    });

    document.querySelectorAll(".card .gauge").forEach((g) => {
      g.setAttribute("aria-label", dict["card.gaugeGo"]);
      g.setAttribute("title", dict["card.gaugeGo"]);
    });

    if (elevSync) elevSync();
    if (statusRender) statusRender();
  }

  langButtons.forEach((b) => b.addEventListener("click", () => { lang = b.dataset.langSet; render(); }));
  seasonButtons.forEach((b) => b.addEventListener("click", () => { season = b.dataset.seasonSet; render(); }));

  render();

  /* =====================================================================
     Chrome: load orchestration, header, mobile nav, reveals, parallax
     ===================================================================== */
  const markReady = () => root.classList.add("is-ready");
  requestAnimationFrame(markReady);
  setTimeout(markReady, 800); // fallback if rAF is throttled (e.g. background tab)

  const head = document.getElementById("siteHead");
  const onScrollHead = () => { if (head) head.classList.toggle("is-stuck", window.scrollY > 8); };
  onScrollHead();
  window.addEventListener("scroll", onScrollHead, { passive: true });

  const burger = document.getElementById("navBurger");
  const nav = document.getElementById("primaryNav");
  if (burger && nav) {
    const setNav = (open) => {
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
    };
    burger.addEventListener("click", () => setNav(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => { if (e.target.closest(".nav__links a")) setNav(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });
  }

  const revealTargets = document.querySelectorAll(".reveal, .cards");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach((t) => io.observe(t));
  } else {
    revealTargets.forEach((t) => t.classList.add("in"));
  }

  const hero = document.querySelector(".hero");
  if (hero && !reduceMotion) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 700);
        hero.style.setProperty("--sy", (y * 0.12).toFixed(1) + "px");
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Hero pointer parallax (photo + contours at different depths) ---------- */
  (function initHeroParallax() {
    if (!hero || reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function tick() {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      hero.style.setProperty("--mx", cx.toFixed(2) + "px");
      hero.style.setProperty("--my", cy.toFixed(2) + "px");
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(tick) : null;
    }
    const nudge = () => { if (!raf) raf = requestAnimationFrame(tick); };
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 20;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 14;
      nudge();
    });
    hero.addEventListener("pointerleave", () => { tx = 0; ty = 0; nudge(); });
  })();

  /* ---------- Magnetic CTA buttons ---------- */
  (function initMagnetic() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.querySelectorAll(".btn").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.setProperty("--magX", (((e.clientX - r.left) / r.width - 0.5) * 7).toFixed(1) + "px");
        b.style.setProperty("--magY", (((e.clientY - r.top) / r.height - 0.5) * 5).toFixed(1) + "px");
      });
      b.addEventListener("pointerleave", () => {
        b.style.setProperty("--magX", "0px");
        b.style.setProperty("--magY", "0px");
      });
    });
  })();

  /* ---------- Interactive altitude chart (desktop) ---------- */
  (function initElev() {
    const chart = document.getElementById("elevChart");
    const ridge = document.getElementById("elevRidge");
    const clip = document.getElementById("elevClip");
    const cursor = document.getElementById("elevCursor");
    const slider = document.getElementById("elevSlider");
    const eroAlt = document.getElementById("eroAlt");
    const eroZone = document.getElementById("eroZone");
    const eroLayer = document.getElementById("eroLayer");
    if (!chart || !ridge || !cursor || !slider) return;

    const cline = cursor.querySelector(".elev__cursor-line");
    const dot = cursor.querySelector(".elev__cursor-dot");
    const bands = Array.from(chart.querySelectorAll(".ephoto"));
    const stops = Array.from(chart.querySelectorAll(".estop"));

    const VB_W = 1200, BASE_Y = 380, A_MIN = 277, A_MAX = 3000, Y_TOP = 70, Y_BOT = 300;
    const yToAlt = (y) => A_MIN + (Y_BOT - y) / (Y_BOT - Y_TOP) * (A_MAX - A_MIN);

    const P = [[0,300],[60,298],[210,283],[380,247],[560,197],[740,150],[900,112],[1060,83],[1160,70],[1200,68]];
    const ptAlt = P.map((p) => yToAlt(p[1]));

    function smooth(pts) {
      let d = "M" + pts[0][0] + " " + pts[0][1];
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i-1]||pts[i], p1 = pts[i], p2 = pts[i+1], p3 = pts[i+2]||pts[i+1];
        const c1x = p1[0]+(p2[0]-p0[0])/6, c1y = p1[1]+(p2[1]-p0[1])/6;
        const c2x = p2[0]-(p3[0]-p1[0])/6, c2y = p2[1]-(p3[1]-p1[1])/6;
        d += " C " + c1x.toFixed(1)+" "+c1y.toFixed(1)+" "+c2x.toFixed(1)+" "+c2y.toFixed(1)+" "+p2[0]+" "+p2[1];
      }
      return d;
    }
    const ridgeD = smooth(P);
    ridge.setAttribute("d", ridgeD);
    if (clip) clip.setAttribute("d", ridgeD + " L" + VB_W + " " + BASE_Y + " L0 " + BASE_Y + " Z");

    function ridgeYAtX(x) {
      x = Math.max(P[0][0], Math.min(P[P.length-1][0], x));
      for (let i = 0; i < P.length-1; i++) {
        if (x <= P[i+1][0]) { const t = (x-P[i][0])/(P[i+1][0]-P[i][0]); return P[i][1]+t*(P[i+1][1]-P[i][1]); }
      }
      return P[P.length-1][1];
    }
    function xAtAlt(a) {
      a = Math.max(A_MIN, Math.min(A_MAX, a));
      for (let i = 0; i < P.length-1; i++) {
        if (a <= ptAlt[i+1]) { const t = (a-ptAlt[i])/((ptAlt[i+1]-ptAlt[i])||1); return P[i][0]+t*(P[i+1][0]-P[i][0]); }
      }
      return P[P.length-1][0];
    }
    const zoneIdx = (a) => a < 800 ? 0 : a < 1500 ? 1 : a < 2000 ? 2 : a < 2600 ? 3 : 4;

    const ZONES = {
      de: [["Rheintal","Funktionsshirt"],["Wald","Softshell + Funktionsshirt"],["Baumgrenze","Softshell + Hose"],["Alpine Zone","Unterzieher + Jacke"],["Firn & Fels","Volle Schichtung"]],
      en: [["Rhine valley","Base-layer tee"],["Forest","Softshell + base tee"],["Tree line","Softshell + trousers"],["Alpine zone","Base layer + jacket"],["Snow & rock","Full layering"]]
    };
    const grouped = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    let curAlt = 1200;

    function syncText() {
      const z = zoneIdx(curAlt);
      const zone = ZONES[lang === "en" ? "en" : "de"][z];
      const altStr = grouped(Math.round(curAlt / 10) * 10) + " m";
      if (eroAlt) eroAlt.textContent = altStr;
      if (eroZone) eroZone.textContent = zone[0];
      if (eroLayer) eroLayer.textContent = zone[1];
      chart.setAttribute("aria-valuetext", altStr + " — " + zone[0]);
      bands.forEach((b) => b.classList.toggle("is-active", +b.dataset.zone === z));
      stops.forEach((s) => s.classList.toggle("is-active", +s.dataset.zone === z));
    }

    function paint(alt) {
      curAlt = Math.max(A_MIN, Math.min(A_MAX, alt));
      const x = xAtAlt(curAlt), y = ridgeYAtX(x);
      cursor.setAttribute("transform", "translate(" + x.toFixed(1) + ",0)");
      if (cline) { cline.setAttribute("y1", y.toFixed(1)); cline.setAttribute("y2", BASE_Y); }
      if (dot) dot.setAttribute("cy", y.toFixed(1));
      chart.style.setProperty("--alt", ((curAlt - A_MIN) / (A_MAX - A_MIN)).toFixed(3));
      chart.setAttribute("aria-valuenow", Math.round(curAlt));
      if (slider && +slider.value !== Math.round(curAlt)) slider.value = Math.round(curAlt);
      syncText();
    }

    function altFromX(clientX) {
      const r = chart.getBoundingClientRect();
      return yToAlt(ridgeYAtX((clientX - r.left) / r.width * VB_W));
    }

    chart.addEventListener("pointermove", (e) => paint(altFromX(e.clientX)));
    chart.addEventListener("pointerdown", (e) => { chart.focus(); paint(altFromX(e.clientX)); });
    slider.addEventListener("input", () => paint(+slider.value));
    chart.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 200 : 50; let a = curAlt;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") a += step;
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") a -= step;
      else if (e.key === "Home") a = A_MIN;
      else if (e.key === "End") a = A_MAX;
      else return;
      e.preventDefault();
      paint(a);
    });

    elevSync = syncText;
    elevGoto = (target) => {
      target = Math.max(A_MIN, Math.min(A_MAX, target));
      if (reduceMotion) { paint(target); return; }
      const from = curAlt, delta = target - from, t0 = performance.now(), D = 850;
      if (!delta) return;
      const step = (now) => {
        const t = Math.min(1, (now - t0) / D);
        paint(from + delta * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    paint(1200);
  })();

  /* ---------- Card gauges link into the altitude explorer ---------- */
  (function initGaugeLinks() {
    const section = document.getElementById("hoehe");
    if (!section) return;
    cardEls.forEach((card) => {
      const g = card.querySelector(".gauge");
      if (!g) return;
      g.classList.add("gauge--link");
      g.setAttribute("role", "button");
      g.tabIndex = 0;
      const go = () => {
        const d = CARDS[lang][season][card.dataset.cat];
        const m = d && d.gaugeV.match(/(\d+)\s*–\s*(\d+)/);
        const mid = m ? Math.round((+m[1] + +m[2]) / 2) : 1200;
        section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        if (elevGoto) setTimeout(() => elevGoto(mid), reduceMotion ? 0 : 400);
      };
      g.addEventListener("click", go);
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
    });
  })();

  /* ---------- Scroll altimeter: 277 m (Basel) at the top, summit at the foot ---------- */
  (function initAltimeter() {
    const el = document.getElementById("altimeter");
    const val = document.getElementById("altimeterV");
    const fill = document.getElementById("altimeterF");
    if (!el || !val) return;
    const group = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let last = -1, ticking = false;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const alt = Math.max(277, Math.min(3000, Math.round((277 + p * (3000 - 277)) / 5) * 5));
      el.classList.toggle("is-on", window.scrollY > window.innerHeight * 0.5);
      if (alt !== last) {
        last = alt;
        val.textContent = group(alt) + " m";
        if (fill) fill.style.width = (p * 100).toFixed(1) + "%";
      }
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  })();

  /* ---------- Live open/closed status (Europe/Zurich) ---------- */
  (function initStatus() {
    const el = document.getElementById("storeStatus");
    if (!el) return;
    const SCHED = { Monday:[570,1110], Tuesday:[570,1110], Wednesday:[570,1110], Thursday:[570,1110], Friday:[570,1110], Saturday:[540,1020], Sunday:null };
    const ORDER = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const DAYS = { de:["So","Mo","Di","Mi","Do","Fr","Sa"], en:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] };
    const hhmm = (m) => Math.floor(m / 60) + ":" + ("0" + (m % 60)).slice(-2);

    function compute() {
      const f = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Zurich", weekday: "long", hour: "numeric", minute: "numeric", hour12: false });
      const p = {};
      f.formatToParts(new Date()).forEach((x) => { p[x.type] = x.value; });
      const idx = ORDER.indexOf(p.weekday);
      const mins = (+p.hour === 24 ? 0 : +p.hour) * 60 + +p.minute;
      const today = SCHED[p.weekday];
      if (today && mins >= today[0] && mins < today[1]) return { open: true, close: today[1] };
      for (let i = 0; i < 8; i++) {
        const di = (idx + i) % 7, s = SCHED[ORDER[di]];
        if (!s) continue;
        if (i === 0 && mins < s[0]) return { open: false, openMin: s[0], sameDay: true };
        if (i > 0) return { open: false, openMin: s[0], dayIdx: di };
      }
      return { open: false };
    }

    let data = compute();

    function paint() {
      const L = lang === "en" ? "en" : "de", S = STRINGS[L];
      el.classList.toggle("is-open", !!data.open);
      el.classList.toggle("is-closed", !data.open);
      if (data.open) {
        el.textContent = S["status.open"] + " · " + S["status.closes"] + " " + hhmm(data.close);
      } else if (data.openMin != null) {
        const when = data.sameDay ? hhmm(data.openMin) : DAYS[L][data.dayIdx] + " " + hhmm(data.openMin);
        el.textContent = S["status.closed"] + " · " + S["status.opens"] + " " + when;
      } else {
        el.textContent = S["status.closed"];
      }
    }

    statusRender = paint;
    paint();
    setInterval(() => { data = compute(); paint(); }, 60000);
  })();
})();
