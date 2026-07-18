/* ============================================================
   animations.js — Loader, scroll reveal, magnetic buttons,
   parallax, nav hide/show. Pure vanilla JS.
   Respects prefers-reduced-motion.
============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. LOADING SCREEN ---------- */
  (function loader() {
    var loaderEl = document.getElementById("loader");
    var progressEl = document.getElementById("loaderProgress");
    var countEl = document.getElementById("loaderCount");
    if (!loaderEl) return;

    document.body.classList.add("is-loading");
    var pct = 0;

    function finish() {
      loaderEl.classList.add("is-done");
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-loaded");
      window.setTimeout(function () { loaderEl.setAttribute("hidden", ""); }, 800);
    }

    if (reduceMotion) {
      if (progressEl) progressEl.style.width = "100%";
      if (countEl) countEl.textContent = "100";
      finish();
      return;
    }

    var timer = window.setInterval(function () {
      pct += Math.floor(Math.random() * 12) + 4;
      if (pct >= 100) { pct = 100; window.clearInterval(timer); }
      if (progressEl) progressEl.style.width = pct + "%";
      if (countEl) countEl.textContent = pct < 10 ? "0" + pct : String(pct);
      if (pct === 100) window.setTimeout(finish, 350);
    }, 130);

    window.addEventListener("load", function () {
      window.setTimeout(function () {
        if (!loaderEl.classList.contains("is-done")) { window.clearInterval(timer); finish(); }
      }, 2500);
    });
  })();

  /* ---------- 2. SCROLL REVEAL (IntersectionObserver) ---------- */
  (function reveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    els.forEach(function (el) { io.observe(el); });

    window.__observeReveal = function (el) {
      if (reduceMotion) { el.classList.add("is-visible"); return; }
      io.observe(el);
    };
  })();

  /* ---------- 3. MAGNETIC BUTTONS ---------- */
  (function magnetic() {
    if (reduceMotion || window.matchMedia("(hover: none)").matches) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      var strength = 0.3;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x * strength + "px," + y * strength + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  })();

  /* ---------- 4. PARALLAX ---------- */
  (function parallax() {
    if (reduceMotion) return;
    var layers = document.querySelectorAll("[data-parallax]");
    if (!layers.length) return;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      layers.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
        el.style.transform = "translate3d(0," + (y * speed) + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  })();

  /* ---------- 5. NAV hide-on-scroll-down ---------- */
  (function navScroll() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var last = 0;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y > last && y > 200) { nav.classList.add("is-hidden"); }
      else { nav.classList.remove("is-hidden"); }
      last = y;
    }, { passive: true });
  })();
})();
