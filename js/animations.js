/* ============================================================
   animations.js — Loader, scroll reveal, custom cursor,
   magnetic buttons, parallax, nav hide/show
   Pure vanilla JS. Respects prefers-reduced-motion.
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

    // Story runs for a fixed duration so the journey (cycle -> bike -> car -> desk) plays out.
    var DURATION = reduceMotion ? 300 : 3000;
    var done = false;

    function now() { return (window.performance && performance.now) ? performance.now() : Date.now(); }
    var start = now();

    function finish() {
      if (done) return;
      done = true;
      loaderEl.classList.add("is-done");
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-loaded"); // triggers hero text reveal
      window.setTimeout(function () { loaderEl.setAttribute("hidden", ""); }, 800);
    }

    function tick() {
      var t = Math.min(1, (now() - start) / DURATION);
      if (progressEl) progressEl.style.width = (t * 100) + "%";
      if (t < 1) { requestAnimationFrame(tick); } else { finish(); }
    }
    requestAnimationFrame(tick);

    // Safety: never trap the user behind the loader
    window.addEventListener("load", function () {
      window.setTimeout(finish, DURATION + 1200);
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

    // Expose so dynamically-injected cards can register themselves
    window.__observeReveal = function (el) {
      if (reduceMotion) { el.classList.add("is-visible"); return; }
      io.observe(el);
    };
  })();

  /* ---------- 3. CUSTOM CURSOR (mouse-follow) ---------- */
  (function cursor() {
    var ring = document.getElementById("cursor");
    var dot = document.getElementById("cursorDot");
    if (!ring || !dot || reduceMotion || window.matchMedia("(hover: none)").matches) return;

    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    });

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Enlarge cursor over interactive elements
    document.querySelectorAll("a, button, .work-card, .skill-card, [data-magnetic]").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("is-hover"); });
    });
  })();

  /* ---------- 4. MAGNETIC BUTTONS ---------- */
  (function magnetic() {
    if (reduceMotion || window.matchMedia("(hover: none)").matches) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      var strength = 0.35;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x * strength + "px," + y * strength + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  })();

  /* ---------- 5. PARALLAX ---------- */
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

  /* ---------- 6. NAV hide-on-scroll-down ---------- */
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
