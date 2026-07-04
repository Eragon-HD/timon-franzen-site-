/* Timon Franzen — site interactions. No dependencies. */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      const target = +en.target.dataset.count;
      if (reduced) { en.target.textContent = target; continue; }
      const t0 = performance.now();
      const dur = 1200;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        en.target.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
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

  /* footer year */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
