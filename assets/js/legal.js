/* Legal page — EN/DE toggle, mirrors the home-page dict for these keys. */
(() => {
  const EN = {
    lg_back: "Back to home",
    lg_h1: "Legal notice",
    lg_resp: "Responsible for the content",
    lg_email_l: "Email:",
    lg_vat: "Freelance web developer, not entered in the commercial register and not VAT-registered (turnover below CHF 100,000). Postal address on request.",
    lg_disc_h: "Disclaimer",
    lg_disc_p: "The content of this website is prepared with care. No guarantee is given for its accuracy, completeness or timeliness. The operators of external links are solely responsible for their content.",
    lg_h2: "Privacy policy",
    lg_p1_h: "Principle",
    lg_p1_p: "Protecting your data matters to me. I process personal data in line with the revised Swiss Data Protection Act (revFADP). Only as much data is collected as each purpose requires.",
    lg_p2_h: "What data, and why",
    lg_p2_p: "If you email me or sign up for the newsletter, I store the email address you provide solely to reply to you or send the newsletter. Nothing is resold or shared with third parties. You can unsubscribe from the newsletter at any time.",
    lg_p3_h: "Hosting and server logs",
    lg_p3_p: "This website is hosted on GitHub Pages (GitHub Inc., USA). When the site is opened, technically necessary data such as IP address and timestamp are processed to deliver the page. No analytics cookies and no trackers are used.",
    lg_p4_h: "Your rights",
    lg_p4_p: "You have the right to access, correct and delete the data I hold about you. A short email to contact@timonfranzen.ch is enough.",
    lg_updated: "Last updated",
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const DE = {};
  nodes.forEach((el) => { DE[el.dataset.i18n] = el.innerHTML; });

  const apply = (lang) => {
    const d = lang === "en" ? EN : DE;
    nodes.forEach((el) => { if (d[el.dataset.i18n] != null) el.innerHTML = d[el.dataset.i18n]; });
    document.documentElement.lang = lang;
    document.title = lang === "en"
      ? "Legal notice & Privacy — Timon Franzen"
      : "Impressum & Datenschutz — Timon Franzen";
    const btn = document.getElementById("langBtn");
    if (btn) btn.textContent = lang === "de" ? "EN" : "DE";
    try { localStorage.setItem("lang", lang); } catch {}
  };

  let lang = null;
  try { lang = localStorage.getItem("lang"); } catch {}
  if (lang !== "de" && lang !== "en") {
    lang = (navigator.language || "de").toLowerCase().startsWith("de") ? "de" : "en";
  }
  apply(lang);

  const btn = document.getElementById("langBtn");
  if (btn) btn.addEventListener("click", () =>
    apply(document.documentElement.lang === "de" ? "en" : "de"));

  const now = new Date();
  const dt = now.toLocaleDateString("de-CH", { month: "long", year: "numeric" });
  const el = document.getElementById("legalDate");
  if (el) el.textContent = dt;
  const y = document.getElementById("year");
  if (y) y.textContent = now.getFullYear();
})();
