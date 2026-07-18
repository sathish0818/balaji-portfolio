/* ============================================================
   main.js — Content data + interactivity
   • WORKS + TESTIMONIALS data arrays (edit these!)
   • Renders Works & Testimonial cards
   • Video modal (YouTube iframe)
   • Custom audio player
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
  var WORKS = [
    { title: "Mookuthi Amman 2", role: "Assistant Editor", year: "2026", youtube: "dQw4w9WgXcQ", thumb: "assets/images/thumbnails/thumb-1.svg" },
    { title: "Aranmanai 4",      role: "Assistant Editor", year: "2024", youtube: "dQw4w9WgXcQ", thumb: "assets/images/thumbnails/thumb-2.svg" },
    { title: "Commercial Project", role: "Editor",         year: "2024", youtube: "dQw4w9WgXcQ", thumb: "assets/images/thumbnails/thumb-3.svg" },
    { title: "Documentary Edit", role: "Editor",           year: "2023", youtube: "dQw4w9WgXcQ", thumb: "assets/images/thumbnails/thumb-4.svg" },
    { title: "Music Video",      role: "Editor",           year: "2023", youtube: "dQw4w9WgXcQ", thumb: "assets/images/thumbnails/thumb-5.svg" },
    { title: "Short Film",       role: "Editor",           year: "2022", youtube: "dQw4w9WgXcQ", thumb: "assets/images/thumbnails/thumb-6.svg" },
    { title: "Brand Campaign",   role: "Editor",           year: "2022", youtube: "dQw4w9WgXcQ", thumb: "assets/images/thumbnails/thumb-7.svg" },
    { title: "Corporate Film",   role: "Editor",           year: "2021", youtube: "dQw4w9WgXcQ", thumb: "assets/images/thumbnails/thumb-8.svg" }
  ];

  /* ============================================================
     ⭐ TESTIMONIALS — EDIT THIS ARRAY
     `audio` = path to a voice-note in assets/audio/ (.mp3/.wav/.m4a)
     `avatar`= profile image in assets/images/
     Drop your own audio files into assets/audio/ and update paths.
     ============================================================ */
  var TESTIMONIALS = [
    { name: "Ravi Kumar",   role: "Director", quote: "Balaji finds the emotional beat every single time. A rare instinct.", audio: "assets/audio/voice-1.mp3", avatar: "assets/images/thumbnails/avatar-1.svg" },
    { name: "Meena S.",     role: "Producer", quote: "Deadlines met, story elevated. He is the calmest room in post.", audio: "assets/audio/voice-2.mp3", avatar: "assets/images/thumbnails/avatar-2.svg" },
    { name: "Arjun Dev",    role: "Cinematographer", quote: "My footage always looks better after his cut. Pure craft.", audio: "assets/audio/voice-3.mp3", avatar: "assets/images/thumbnails/avatar-3.svg" },
    { name: "Priya R.",     role: "Music Director", quote: "His sense of rhythm is musical. The montages sing.", audio: "assets/audio/voice-4.mp3", avatar: "assets/images/thumbnails/avatar-4.svg" },
    { name: "Karthik V.",   role: "Brand Manager", quote: "Turned a rough brief into a campaign that actually converted.", audio: "assets/audio/voice-5.mp3", avatar: "assets/images/thumbnails/avatar-5.svg" },
    { name: "Sana Iqbal",   role: "Documentary Lead", quote: "He respects the truth of the footage. Honest, powerful edits.", audio: "assets/audio/voice-6.mp3", avatar: "assets/images/thumbnails/avatar-6.svg" }
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
      card.setAttribute("aria-label", "Play " + w.title + ", " + w.role + ", " + w.year);
      card.dataset.youtube = w.youtube;
      card.dataset.caption = w.title + " — " + w.role + " · " + w.year;

      card.innerHTML =
        '<div class="work-card__thumb">' +
          '<img src="' + w.thumb + '" alt="' + w.title + ' thumbnail" loading="lazy" decoding="async" width="480" height="300" />' +
          '<span class="work-card__play"><span aria-hidden="true">▶</span></span>' +
        '</div>' +
        '<div class="work-card__meta">' +
          '<h3 class="work-card__title">' + w.title + '</h3>' +
          '<div class="work-card__tags"><span>' + w.role + '</span><span class="work-card__year">' + w.year + '</span></div>' +
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
     RENDER TESTIMONIALS + CUSTOM AUDIO PLAYER
     ============================================================ */
  (function renderTestimonials() {
    var grid = document.getElementById("testimonialsGrid");
    if (!grid) return;

    TESTIMONIALS.forEach(function (t) {
      var card = el("article", "testimonial reveal");
      card.innerHTML =
        '<div class="testimonial__head">' +
          '<img class="testimonial__avatar" src="' + t.avatar + '" alt="Photo of ' + t.name + '" loading="lazy" width="54" height="54" />' +
          '<div><p class="testimonial__name">' + t.name + '</p><p class="testimonial__role">' + t.role + '</p></div>' +
        '</div>' +
        '<div class="player">' +
          '<button class="player__btn" type="button" aria-label="Play voice note from ' + t.name + '">▶</button>' +
          '<div class="player__bar" role="slider" aria-label="Seek" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="player__fill"></span></div>' +
          '<span class="player__time">0:00 / 0:00</span>' +
          '<audio preload="none" src="' + t.audio + '"></audio>' +
        '</div>' +
        '<p class="testimonial__quote">' + t.quote + '</p>';

      grid.appendChild(card);
      if (window.__observeReveal) window.__observeReveal(card);
      wirePlayer(card);
    });
  })();

  /**
   * Custom audio player logic for one testimonial card.
   * Handles play/pause, progress fill, seek, time display,
   * and gracefully disables itself if the audio file is missing.
   */
  function wirePlayer(card) {
    var audio = card.querySelector("audio");
    var btn = card.querySelector(".player__btn");
    var bar = card.querySelector(".player__bar");
    var fill = card.querySelector(".player__fill");
    var time = card.querySelector(".player__time");
    if (!audio || !btn) return;

    function fmt(s) {
      if (!isFinite(s) || isNaN(s)) s = 0;
      var m = Math.floor(s / 60);
      var sec = Math.floor(s % 60);
      return m + ":" + (sec < 10 ? "0" + sec : sec);
    }
    function render() {
      var dur = audio.duration || 0;
      var pct = dur ? (audio.currentTime / dur) * 100 : 0;
      fill.style.width = pct + "%";
      bar.setAttribute("aria-valuenow", String(Math.round(pct)));
      time.textContent = fmt(audio.currentTime) + " / " + fmt(dur);
    }

    btn.addEventListener("click", function () {
      // Pause every other player first (single-play behaviour)
      document.querySelectorAll(".testimonial audio").forEach(function (a) {
        if (a !== audio) { a.pause(); }
      });
      if (audio.paused) {
        var p = audio.play();
        if (p && p.catch) p.catch(function () {
          time.textContent = "audio unavailable";
        });
      } else {
        audio.pause();
      }
    });

    audio.addEventListener("play", function () { btn.textContent = "❚❚"; });
    audio.addEventListener("pause", function () { btn.textContent = "▶"; });
    audio.addEventListener("ended", function () { btn.textContent = "▶"; fill.style.width = "0%"; });
    audio.addEventListener("timeupdate", render);
    audio.addEventListener("loadedmetadata", render);
    audio.addEventListener("error", function () { time.textContent = "add audio file"; btn.disabled = true; btn.style.opacity = "0.5"; });

    function seek(clientX) {
      var r = bar.getBoundingClientRect();
      var ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      if (audio.duration) audio.currentTime = ratio * audio.duration;
    }
    bar.addEventListener("click", function (e) { seek(e.clientX); });
    bar.addEventListener("keydown", function (e) {
      if (!audio.duration) return;
      if (e.key === "ArrowRight") { audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); e.preventDefault(); }
      if (e.key === "ArrowLeft")  { audio.currentTime = Math.max(0, audio.currentTime - 5); e.preventDefault(); }
    });
  }

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
