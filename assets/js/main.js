/* Timon Franzen — site interactions. No dependencies. */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
