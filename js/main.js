/* ============================================================
   main.js — Content data + interactivity
   • WORKS + VOICES data arrays (edit these!)
   • Renders Works & Collaborator cards
   • Video modal (YouTube iframe)
   • Contact form validation + success animation
   • Mobile menu, smooth scroll, footer year
============================================================ */
(function () {
  "use strict";

  /* ============================================================
     ⭐ FEATURED WORKS — EDIT THIS ARRAY
     `youtube` = the YouTube video ID (the part after ?v=).
     `thumb`   = path to a thumbnail image in assets/images/thumbnails/
     ============================================================ */
  // Covers are pulled straight from each YouTube video (maxres → hq fallback),
  // so the artwork always matches the link. `thumb` is the local placeholder used
  // only if YouTube is unreachable.
  var WORKS = [
    { title: "Olti Vudu",              role: "Music Video Editor",     year: "2024", youtube: "bXeETRsEP3I", thumb: "assets/images/thumbnails/thumb-1.svg" },
    { title: "170CM — Live Session",   role: "Live Performance Editor", year: "2023", youtube: "eItDgBaHmPI", thumb: "assets/images/thumbnails/thumb-2.svg" },
    { title: "Parotta Varatta",        role: "Music Video Editor",     year: "2023", youtube: "TYO5BFj12Aw", thumb: "assets/images/thumbnails/thumb-3.svg" },
    { title: "Hey Siri",               role: "Music Video Editor",     year: "2023", youtube: "8Mks9vU2aGA", thumb: "assets/images/thumbnails/thumb-4.svg" },
    { title: "Yedhudhaan Inga Sandhosam", role: "Music Video Editor",  year: "2023", youtube: "hREr2C-W-TQ", thumb: "assets/images/thumbnails/thumb-5.svg" },
    { title: "Pozhudhugal",            role: "Music Video Editor",     year: "2023", youtube: "cYHuNU8nEPw", thumb: "assets/images/thumbnails/thumb-6.svg" },
    { title: "Natpukaage — NOVP Tribute", role: "Music Video Editor",  year: "2024", youtube: "0ztP0IZ_8Kg", thumb: "assets/images/thumbnails/thumb-7.svg" },
    { title: "Thangamae Thalli Pogathadi", role: "Music Video Editor", year: "2023", youtube: "NGDrSuXJpu8", thumb: "assets/images/thumbnails/thumb-8.svg" },
    { title: "Rock On Harris 2.0 — Teaser", role: "Promo / Teaser Editor", year: "2023", youtube: "WOQV20cZxb0", thumb: "assets/images/thumbnails/thumb-1.svg" }
  ];

  /* ============================================================
     ⭐ VOICES / COLLABORATORS — EDIT THIS ARRAY
     `img` = profile photo in assets/images/voices/ (save each person's
             Instagram picture there; a colored-initials avatar shows
             automatically until the file exists).
     `hex` = fallback avatar colour. `c` = accent CSS var for the card.
     ============================================================ */
  var VOICES = [
    { name: "Venkat Balamurali",  role: "Reels & Music Videos", handle: "@venkat_balamurali",     url: "https://www.instagram.com/venkat_balamurali",     img: "assets/images/voices/venkat.jpg",      blurb: "Teamed up on a run of Instagram reels and music videos — fast turnarounds, sharp cuts, always on the beat.", c: "var(--c-pink)",   hex: "#EC4899" },
    { name: "Subramanian Sethu",  role: "Instagram Videos",     handle: "@subramanian__sethu",     url: "https://www.instagram.com/subramanian__sethu",     img: "assets/images/voices/subramanian.jpg", blurb: "Collaborated on a series of Instagram videos — Balaji shaped the pacing and made every frame land.", c: "var(--c-teal)",   hex: "#14B8A6" },
    { name: "Arunachalam",        role: "Instagram Videos",     handle: "@arunachaleswaran.pa",    url: "https://www.instagram.com/arunachaleswaran.pa",    img: "assets/images/voices/arunachalam.jpg", blurb: "Worked together on Instagram videos — clean, snappy edits that kept the audience watching.", c: "var(--c-yellow)", hex: "#F5B912" },
    { name: "Oliver Nathaneal",   role: "Short Films",          handle: "@oliver_nathaneal",       url: "https://www.instagram.com/oliver_nathaneal",       img: "assets/images/voices/oliver.jpg",      blurb: "Partnered on short films — Balaji brought structure and emotion to the edit, scene after scene.", c: "var(--c-purple)", hex: "#7C3AED" },
    { name: "Blueleaf Projects",  role: "Reels",                handle: "@blueleafprojectsindia",  url: "https://www.instagram.com/blueleafprojectsindia",  img: "assets/images/voices/blueleaf.jpg",    blurb: "Behind a batch of scroll-stopping reels — Balaji's rhythm and timing did the heavy lifting.", c: "var(--c-blue)",   hex: "#3B82F6" },
    { name: "DAC Developers",     role: "Reel Edits",           handle: "@dacdeveloperspvtltd",    url: "https://www.instagram.com/dacdeveloperspvtltd",    img: "assets/images/voices/dac.jpg",         blurb: "Cut a set of brand reels — crisp edits that kept the message clear and the scroll stopping.", c: "var(--c-coral)",  hex: "#FB7185" }
  ];

  /* small helper */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* ============================================================
     RENDER FEATURED WORKS
     ============================================================ */
  (function renderWorks() {
    var grid = document.getElementById("worksGrid");
    if (!grid) return;

    WORKS.forEach(function (w, i) {
      var card = el("button", "work-card reveal");
      card.setAttribute("role", "listitem");
      card.setAttribute("aria-label", "Play " + w.title + ", " + w.role);
      card.dataset.youtube = w.youtube;
      card.dataset.caption = w.title + " — " + w.role;

      // Cover priority: YouTube maxres → YouTube hq → local SVG placeholder
      var ytMax = "https://i.ytimg.com/vi/" + w.youtube + "/maxresdefault.jpg";
      var ytHq  = "https://i.ytimg.com/vi/" + w.youtube + "/hqdefault.jpg";
      var onErr = "if(!this.dataset.f){this.dataset.f=1;this.src='" + ytHq + "';}" +
                  "else if(this.dataset.f==1){this.dataset.f=2;this.src='" + w.thumb + "';}";

      card.innerHTML =
        '<div class="work-card__thumb">' +
          '<img src="' + ytMax + '" alt="' + w.title + ' — cover" loading="lazy" decoding="async" width="480" height="300" onerror="' + onErr + '" />' +
          '<span class="work-card__play"><span aria-hidden="true">▶</span></span>' +
        '</div>' +
        '<div class="work-card__meta">' +
          '<h3 class="work-card__title">' + w.title + '</h3>' +
          '<div class="work-card__tags"><span>' + w.role + '</span></div>' +
        '</div>';

      card.addEventListener("click", function () { openModal(w.youtube, card.dataset.caption); });
      grid.appendChild(card);
      if (window.__observeReveal) window.__observeReveal(card);
    });
  })();

  /* ============================================================
     VIDEO MODAL (YouTube iframe embed)
     ============================================================ */
  var modal = document.getElementById("videoModal");
  var iframe = document.getElementById("modalIframe");
  var caption = document.getElementById("modalCaption");
  var lastFocused = null;

  function openModal(youtubeId, cap) {
    if (!modal || !iframe) return;
    lastFocused = document.activeElement;
    iframe.src = "https://www.youtube.com/embed/" + youtubeId + "?autoplay=1&rel=0";
    if (caption) caption.textContent = cap || "";
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    var closeBtn = document.getElementById("modalClose");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal || !iframe) return;
    modal.setAttribute("hidden", "");
    iframe.src = ""; // stop playback
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  if (modal) {
    document.getElementById("modalClose").addEventListener("click", closeModal);
    modal.querySelectorAll("[data-close-modal]").forEach(function (o) {
      o.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hasAttribute("hidden")) closeModal();
    });
  }

  /* ============================================================
     RENDER VOICES / COLLABORATORS (name, blurb, profile link, photo)
     ============================================================ */
  (function renderVoices() {
    var grid = document.getElementById("testimonialsGrid");
    if (!grid) return;

    function initials(name) {
      var p = name.trim().split(/\s+/);
      return (p.length > 1 ? p[0][0] + p[1][0] : name.slice(0, 2)).toUpperCase();
    }
    // Colored-initials avatar used until a real photo is dropped in assets/images/voices/
    function fallbackAvatar(name, hex) {
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">' +
        '<rect width="120" height="120" rx="60" fill="' + hex + '"/>' +
        '<text x="60" y="76" font-family="Syne, Arial, sans-serif" font-size="46" font-weight="800" fill="#ffffff" text-anchor="middle">' + initials(name) + '</text></svg>';
      return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    }

    VOICES.forEach(function (v) {
      var card = el("article", "testimonial reveal");
      card.style.setProperty("--c", v.c);
      card.innerHTML =
        '<div class="testimonial__head">' +
          '<img class="testimonial__avatar" src="' + v.img + '" alt="' + v.name + '" loading="lazy" width="54" height="54" />' +
          '<div><p class="testimonial__name">' + v.name + '</p><p class="testimonial__role">' + v.role + '</p></div>' +
        '</div>' +
        '<p class="testimonial__blurb" style="font-size:1rem;color:var(--text)">' + v.blurb + '</p>' +
        '<a class="testimonial__link" href="' + v.url + '" target="_blank" rel="noopener noreferrer" ' +
          'style="margin-top:auto;display:inline-flex;align-items:center;gap:0.35rem;font-weight:700;font-size:0.9rem;color:var(--c)">' +
          v.handle + ' <span aria-hidden="true">↗</span></a>';

      var img = card.querySelector(".testimonial__avatar");
      img.addEventListener("error", function () { this.onerror = null; this.src = fallbackAvatar(v.name, v.hex); });

      grid.appendChild(card);
      if (window.__observeReveal) window.__observeReveal(card);
    });
  })();

  /* ============================================================
     CONTACT FORM — validation + success animation (no backend)
     ============================================================ */
  (function contactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    var success = document.getElementById("formSuccess");

    function setError(name, msg) {
      var field = form.querySelector('[name="' + name + '"]').closest(".field");
      var small = form.querySelector('[data-error-for="' + name + '"]');
      if (msg) { field.classList.add("is-invalid"); if (small) small.textContent = msg; }
      else { field.classList.remove("is-invalid"); if (small) small.textContent = ""; }
      return !msg;
    }

    function validate() {
      var ok = true;
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      var type = form.projectType.value;
      var message = form.message.value.trim();

      ok = setError("name", name.length < 2 ? "Please enter your name." : "") && ok;
      ok = setError("email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Enter a valid email." : "") && ok;
      // Phone is optional, but if present validate loosely
      ok = setError("phone", phone && !/^[+\d][\d\s\-()]{6,}$/.test(phone) ? "Enter a valid phone number." : "") && ok;
      ok = setError("projectType", !type ? "Choose a project type." : "") && ok;
      ok = setError("message", message.length < 10 ? "Tell me a little more (10+ chars)." : "") && ok;
      return ok;
    }

    // Live-clear errors as the user types
    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        if (input.closest(".field").classList.contains("is-invalid")) validate();
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstBad = form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea");
        if (firstBad) firstBad.focus();
        return;
      }
      // No backend: reveal success animation. (Wire to Formspree/Netlify Forms if desired.)
      form.querySelectorAll(".field, .btn").forEach(function (n) { n.style.display = "none"; });
      if (success) { success.hidden = false; }
    });
  })();

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  (function mobileMenu() {
    var burger = document.getElementById("navBurger");
    var menu = document.getElementById("mobileMenu");
    if (!burger || !menu) return;

    function toggle(open) {
      burger.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    }
    burger.addEventListener("click", function () { toggle(!menu.classList.contains("is-open")); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { toggle(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  })();

  /* ============================================================
     SMOOTH ANCHOR SCROLL (respects fixed nav offset)
     ============================================================ */
  (function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (id === "#" || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  })();

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
