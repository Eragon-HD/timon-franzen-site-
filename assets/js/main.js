/* Timon Franzen — site interactions. No dependencies. */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── EN/DE language switch (Swiss German: ss, never ß) ── */
  const I18N = {
    de: {
      nav_work: "Projekte", nav_about: "Über mich", nav_services: "Angebot", nav_cta: "Kontakt",
      kicker: "Offen für ausgewählte Projekte · 2026",
      hero_sub: "Ich entwerfe und baue <em>schnelle, unverwechselbare Websites</em> und <em>intelligente Tools</em> — von der ersten Skizze bis zum fertigen Produkt.",
      chip_loc: "Basel → Zürich, Schweiz",
      hero_scroll: "Ausgewählte Projekte",
      rail_focus: "Web · Apps · KI", rail_status: "Ausgewählte Projekte",
      mq1: "Webdesign", mq2: "Entwicklung", mq3: "KI-Integration", mq4: "Analytik", mq5: "Automatisierung",
      h_work: "Ausgewählte Projekte",
      c1_tag: "Detailhandel · Basel", c1_role: "Design & Umsetzung", c1_link: "#",
      c1_desc: "Ein prägnanter, schneller Webauftritt für ein Basler Outdoor- und Skigeschäft — offizieller GTS-Händler. Saisonbewusst, zweisprachig, von Hand gebaut, erster Aufbau in unter einer Sekunde.",
      c2_tag: "KI · Persönliches OS", c2_role: "Full Stack",
      c2_desc: "Eine sprachgesteuerte KI-Kommandozentrale: Kalender, Aufgaben, Musik, ÖV, Erinnerungen und Langzeitgedächtnis hinter einem holografischen HUD — angetrieben von Claude.",
      c3_tag: "Daten · Akquise", c3_role: "Tooling",
      c3_desc: "Ein System, das Schweizer Firmenverzeichnisse nach Unternehmen mit schwachem oder fehlendem Webauftritt durchsucht, sie bewertet und persönliche Erstkontakte entwirft.",
      c3_note: "Privates Tool — nicht öffentlich gezeigt.",
      h_about: "Über mich",
      about_lede: "Ich bin Entwickler zwischen Basel und Zürich. Jahre im leistungsorientierten Eishockey haben mich eines gelehrt, und es steckt in allem, was ich baue: <strong>konsequente, fokussierte Arbeit gewinnt.</strong>",
      about_p1: "Mich interessieren die Details, an denen die meisten vorbeiscrollen — Typografie, Bewegung, Ladezeit, wie sich eine Seite unter dem Daumen anfühlt. Ich baue schlank und mit langem Atem: kein Ballast, keine Templates, nichts von der Stange.",
      about_p2: "Aktuell baue ich Websites für Schweizer KMU und KI-Tools, die im Hintergrund still echte Arbeit erledigen.",
      st1: "Lighthouse-Performance", st2: "Erster Aufbau, typisch", st3: "Templates, jemals",
      h_services: "Was ich mache",
      s1_t: "Websites",
      s1_d: "Unverwechselbare, von Hand gebaute Websites für Läden, Studios und Selbständige. Auffallend im Design, blitzschnell geladen.",
      s2_t: "Web-Apps & Automatisierung",
      s2_d: "Kleine Tools, die lästige Arbeit abnehmen — Dashboards, Buchungsabläufe, Daten-Pipelines, interne Apps, die wirklich benutzt werden.",
      s3_t: "KI-Integration",
      s3_d: "Assistenten, Chat-Oberflächen und smarte Funktionen auf Claude-Basis — verankert in Ihren Daten, angepasst an Ihren Arbeitsablauf.",
      contact_kicker: "Ein Projekt im Kopf?",
      contact_word: "Reden&nbsp;wir",
      footer_top: "Nach oben ↑",
      nl_title: "Ein Brief, ab und zu",
      nl_sub: "Höchstens einmal im Monat — was ich gebaut, gelernt und veröffentlicht habe. Für Kunden und Neugierige.",
      nl_ph: "du@beispiel.ch",
      nl_btn: "Anmelden",
      nl_note: "Kein Spam, kein Tracking. Jederzeit abmeldbar.",
      nl_done: "Angemeldet — bis bald.",
      title: "Timon Franzen — Entwickler, Basel & Zürich",
    },
    en: { nl_done: "You're in — talk soon." },
  };

  const langBtn = document.getElementById("langBtn");
  document.querySelectorAll("[data-i18n], [data-i18n-html], [data-i18n-ph]").forEach((el) => {
    const key = el.dataset.i18n || el.dataset.i18nHtml || el.dataset.i18nPh;
    if (!(key in I18N.en)) {
      I18N.en[key] = el.dataset.i18nPh != null ? el.placeholder
        : el.dataset.i18nHtml != null ? el.innerHTML : el.textContent;
    }
  });
  I18N.en.title = document.title;

  const applyLang = (lang) => {
    const d = I18N[lang] || I18N.en;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = d[el.dataset.i18n];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const v = d[el.dataset.i18nHtml];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const v = d[el.dataset.i18nPh];
      if (v != null) el.placeholder = v;
    });
    document.title = d.title;
    document.documentElement.lang = lang;
    if (langBtn) langBtn.textContent = lang === "de" ? "EN" : "DE";
    try { localStorage.setItem("lang", lang); } catch {}
  };

  let lang = null;
  try { lang = localStorage.getItem("lang"); } catch {}
  if (lang !== "de" && lang !== "en") {
    lang = (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en";
  }
  if (lang === "de") applyLang("de");
  else if (langBtn) langBtn.textContent = "DE";

  if (langBtn) langBtn.addEventListener("click", () => {
    applyLang(document.documentElement.lang === "de" ? "en" : "de");
  });

  /* ambient hero animation — soft aurora of the accent palette.
     Drawn at 1/4 resolution and scaled up, so it stays cheap. */
  const canvas = document.getElementById("heroCanvas");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    const SCALE = 0.25;
    let w = 0, h = 0, raf = 0;
    const blobs = [
      { c: [255, 154, 60], r: 0.42, ox: 0.72, oy: 0.30, ax: 0.16, ay: 0.12, sp: 0.00023, ph: 0.0, a: 0.16 },
      { c: [255, 91, 91], r: 0.36, ox: 0.55, oy: 0.62, ax: 0.20, ay: 0.10, sp: 0.00017, ph: 2.1, a: 0.13 },
      { c: [150, 90, 255], r: 0.30, ox: 0.85, oy: 0.68, ax: 0.10, ay: 0.16, sp: 0.00029, ph: 4.2, a: 0.10 },
      { c: [255, 200, 120], r: 0.22, ox: 0.35, oy: 0.25, ax: 0.12, ay: 0.14, sp: 0.00021, ph: 1.2, a: 0.09 },
    ];
    const size = () => {
      const r = canvas.getBoundingClientRect();
      w = canvas.width = Math.max(1, r.width * SCALE);
      h = canvas.height = Math.max(1, r.height * SCALE);
    };
    size();
    window.addEventListener("resize", size, { passive: true });
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        const x = (b.ox + Math.sin(t * b.sp + b.ph) * b.ax) * w;
        const y = (b.oy + Math.cos(t * b.sp * 1.3 + b.ph) * b.ay) * h;
        const rad = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    });
  }

  /* pointer-following glow */
  if (!reduced) {
    const root = document.documentElement;
    window.addEventListener("pointermove", (e) => {
      root.style.setProperty("--mx", `${(e.clientX / innerWidth) * 100}%`);
      root.style.setProperty("--my", `${(e.clientY / innerHeight) * 100}%`);
    }, { passive: true });
  }

  /* scroll reveals, staggered per batch */
  const revealed = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    let i = 0;
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      en.target.style.setProperty("--d", `${Math.min(i++ * 0.09, 0.45)}s`);
      en.target.classList.add("in");
      io.unobserve(en.target);
    }
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  revealed.forEach((el) => io.observe(el));

  /* count-up stats */
  const counters = document.querySelectorAll(".stat-num[data-count]");
  const cio = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      cio.unobserve(en.target);
      const el = en.target;
      const target = +el.dataset.count;
      const decimals = +el.dataset.decimals || 0;
      const suffix = el.dataset.suffix || "";
      const fmt = (v) => v.toFixed(decimals) + suffix;
      if (reduced) { el.textContent = fmt(target); continue; }
      const t0 = performance.now();
      const dur = 1200;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.5 });
  counters.forEach((el) => cio.observe(el));

  /* subtle 3D tilt on work cards */
  if (!reduced && matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* live Swiss clock */
  const timeEl = document.getElementById("localTime");
  const fmt = new Intl.DateTimeFormat("de-CH", {
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Zurich",
  });
  const setTime = () => { if (timeEl) timeEl.textContent = `${fmt.format(new Date())} CH`; };
  setTime();
  setInterval(setTime, 30_000);

  /* newsletter signup.
     NEWSLETTER_ENDPOINT: paste a form endpoint (Buttondown, Formspree, …) to go
     fully automatic. Until then, signups arrive as a prefilled email. */
  const NEWSLETTER_ENDPOINT = "";
  const nlForm = document.getElementById("nlForm");
  if (nlForm) nlForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("nlEmail").value.trim();
    if (!email) return;
    const btn = document.getElementById("nlBtn");
    const done = (I18N[document.documentElement.lang] || I18N.en).nl_done || I18N.en.nl_done;
    if (NEWSLETTER_ENDPOINT) {
      try {
        await fetch(NEWSLETTER_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        btn.textContent = done;
        btn.disabled = true;
        return;
      } catch {}
    }
    const de = document.documentElement.lang === "de";
    const subject = encodeURIComponent(de ? "Newsletter-Anmeldung" : "Newsletter signup");
    const body = encodeURIComponent((de ? "Bitte in den Newsletter aufnehmen: " : "Please add me to the newsletter: ") + email);
    window.location.href = `mailto:contact@timonfranzen.ch?subject=${subject}&body=${body}`;
    btn.textContent = done;
  });

  /* footer year */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
