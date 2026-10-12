/* Timon Franzen site interactions. No dependencies. */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── EN/DE language switch (Swiss German: ss, never ß) ── */
  const I18N = {
    de: {
      nav_work: "Projekte", nav_about: "Über mich", nav_services: "Angebot", nav_salons: "Für Salons", nav_cta: "Kontakt",
      kicker: "Ich nehme neue Projekte an.",
      hero_sub: "Ich entwerfe und baue <em>schnelle, unverwechselbare Websites</em> und <em>intelligente Tools</em>, von der ersten Skizze bis zum fertigen Produkt.",
      chip_loc: "Basel → Zürich, Schweiz",
      hero_scroll: "Ausgewählte Projekte",
      rail_focus: "Web · Apps · KI", rail_status: "Ich nehme neue Projekte an.",
      h_work: "Ausgewählte Projekte",
      c1_tag: "Detailhandel · Basel", c1_role: "Design & Umsetzung", c1_link: "#",
      c1_desc: "Ein prägnanter, schneller Webauftritt für ein Basler Outdoor- und Skigeschäft. Offizieller GTS-Händler. Saisonbewusst, zweisprachig, von Hand gebaut, erster Aufbau in unter einer Sekunde.",
      c2_tag: "KI · Persönliches OS", c2_role: "Full Stack",
      c2_desc: "Eine sprachgesteuerte KI-Kommandozentrale: Kalender, Aufgaben, Musik, ÖV, Erinnerungen und Langzeitgedächtnis hinter einem holografischen HUD, angetrieben von Claude.",
      h_about: "Über mich",
      about_lede: "Ich bin Entwickler zwischen Basel und Zürich. Jahre im leistungsorientierten Eishockey haben mich eines gelehrt, und es steckt in allem, was ich baue: <strong>konsequente, fokussierte Arbeit gewinnt.</strong>",
      about_p1: "Mich interessieren Details, an denen die meisten vorbeiscrollen: Typografie, Bewegung, Ladezeit und das Gefühl einer Seite unter dem Daumen. Ich baue schlank und mit langem Atem.",
      about_p2: "Aktuell baue ich Websites für Schweizer KMU und KI-Tools, die im Hintergrund still echte Arbeit erledigen.",
      st1: "Lighthouse-Performance", st2: "Erster Aufbau, typisch",
      h_services: "Was ich mache",
      s1_t: "Websites",
      s1_d: "Unverwechselbare, von Hand gebaute Websites für Läden, Studios und Selbständige. Auffallend im Design, blitzschnell geladen.",
      s2_t: "Web-Apps & Automatisierung",
      s2_d: "Kleine Tools, die lästige Arbeit abnehmen: Dashboards, Buchungsabläufe, Daten-Pipelines und interne Apps, die wirklich benutzt werden.",
      s3_t: "KI-Integration",
      s3_d: "Assistenten, Chat-Oberflächen und smarte Funktionen auf Claude-Basis, verankert in Ihren Daten und angepasst an Ihren Arbeitsablauf.",
      contact_kicker: "Ein Projekt im Kopf?",
      contact_word: "Reden&nbsp;wir",
      footer_top: "Nach oben ↑", footer_legal: "Impressum &amp; Datenschutz",
      nl_title: "Ein Brief, ab und zu",
      nl_sub: "Höchstens einmal im Monat. Was ich gebaut, gelernt und veröffentlicht habe. Für Kunden und Neugierige.",
      nl_ph: "du@beispiel.ch",
      nl_btn: "Anmelden",
      nl_note: "Kein Spam, kein Tracking. Jederzeit abmeldbar.",
      nl_done: "Angemeldet. Bis bald.",
      salons_title: "Websites für Coiffeur-Salons in Zürich. Live in 7 Tagen.",
      salons_kicker: "Websites für Salons · Zürich",
      salons_intro: "Innerhalb von sieben Arbeitstagen live, sobald alle Inhalte da sind. Du lieferst Fotos, Preise und ein paar Sätze über den Salon. Wir kümmern uns um den Rest.",
      salons_demo: "Demo ansehen",
      salons_contact_cta: "Gespräch vereinbaren",
      salons_page_title: "Websites für Coiffeur-Salons in Zürich · Timon Franzen",
      salons_price_kicker: "Offene Preise",
      salons_price_title: "Ein Preis für den Start. Ein klarer Betrag für die Betreuung.",
      salons_price_strip: "CHF 2'900 + CHF 99/Monat",
      salons_launch_strip: "Erste 3 Salons: CHF 1'500 einmalig",
      salons_setup_label: "Website, einmalig",
      salons_setup_price: "CHF 2'900",
      salons_monthly_label: "Pflege und Betreuung: CHF 99/Monat",
      salons_intro_offer: "Erste 3 Salons",
      salons_first_price: "CHF 1'500",
      salons_offer_note: "einmalig, danach CHF 99 pro Monat",
      salons_care_note: "Enthält Website- und Domain-Überwachung, Backups und bis zu zwei Änderungen pro Monat. Mindestlaufzeit 12 Monate, danach mit 3 Monaten Frist auf Monatsende kündbar.",
      salons_extras_note: "Die Domain läuft auf deinen Namen und wird direkt bezahlt. Ein Buchungssystem ist nicht enthalten. Wir verlinken dein bestehendes Tool. Fotos kommen von dir; professionelle Fotos auf Anfrage.",
      salons_includes_kicker: "Umfang",
      salons_includes_title: "Was drin ist",
      salons_includes_intro: "Eine klare Website mit den Informationen, die deine Kundinnen vor der Buchung brauchen.",
      salons_include_1: "Startseite mit Salon, Inhaberin und Fotos",
      salons_include_2: "Leistungen mit Preisen und Dauer",
      salons_include_3: "Deine echten Google-Bewertungen",
      salons_include_4: "Links zu Buchungstool, Telefon und E-Mail",
      salons_include_5: "Aktuell-Leiste für Ferien und Aktionen",
      salons_include_6: "Für Handy optimiert und schnell geladen",
      salons_include_7: "Strukturierte Firmendaten für Google und KI-Assistenten",
      salons_include_8: "Impressum und Datenschutzerklärung",
      salons_process_kicker: "Zusammenarbeit",
      salons_process_title: "In vier Schritten live",
      salons_step_1_title: "Auftrag und Start",
      salons_step_1_body: "Du bestätigst den Auftrag. Zum Start wird die Hälfte des einmaligen Preises fällig.",
      salons_step_2_title: "Du lieferst die Inhalte",
      salons_step_2_body: "Fotos, Preise, Leistungen und ein paar Sätze über dich. Deine Domain bleibt auf deinen Namen.",
      salons_step_3_title: "Entwurf und Korrekturen",
      salons_step_3_body: "Der erste Entwurf kommt innerhalb von fünf Arbeitstagen. Zwei Korrekturrunden sind inklusive.",
      salons_step_4_title: "Restzahlung und Go-live",
      salons_step_4_body: "Nach der Freigabe und Restzahlung geht die Website live, spätestens sieben Arbeitstage nach Erhalt aller Inhalte.",
      salons_team_kicker: "Kontakt",
      salons_team_title: "Timon und Sander",
      salons_team_intro: "Timon baut die Website. Sander führt die Gespräche mit Salons. Schreib uns, und wir melden uns gemeinsam.",
      salons_timon_role: "Konzept und Umsetzung",
      salons_sander_role: "Gespräche und Verkauf",
      salons_team_email: "Timon und Sander kontaktieren",
      salons_back: "Zur Hauptseite",
      title: "Timon Franzen, Entwickler, Basel & Zürich",
    },
    en: { nl_done: "You're in. Talk soon." },
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
    const pageTitle = document.querySelector("title[data-i18n]");
    document.title = pageTitle ? (d[pageTitle.dataset.i18n] || d.title) : d.title;
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
