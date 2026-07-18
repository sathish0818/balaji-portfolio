/* ============================================================
   darkmode.js — Dark / Light theme toggle with localStorage
============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "balaji-theme";
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");

  /**
   * Resolve the initial theme:
   * 1. Saved preference in localStorage
   * 2. OS-level prefers-color-scheme
   * 3. Fallback to "light" (the colourful site's default)
   */
  function getInitialTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) { /* localStorage may be blocked */ }

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light"; /* colourful light theme is the default */
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    // Keep the mobile browser UI colour in sync
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#120C22" : "#7C3AED");
    if (toggle) toggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  function setTheme(theme) {
    applyTheme(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
  }

  // Apply immediately to avoid a flash of the wrong theme
  applyTheme(getInitialTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      setTheme(next);
    });
  }
})();
