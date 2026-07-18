# BALAJI G — Colorful Film Editor Portfolio

A modern, playful, fully-responsive single-page portfolio for film editor
**Balaji G**. Purple-primary with a bright multi-colour accent palette, floating
sticker doodles, and a light **and** dark mode. Built with plain
**HTML5 + CSS3 + Vanilla JavaScript** — no frameworks, no build step, no
dependencies (except Google Fonts).

> *"A visual treat — creative-agency energy for a film editor."*

**Live demo:** enable GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).

---

## ✨ Features

- **Colorful playful design** — purple primary + pink / teal / yellow / blue / coral accents, rounded cards, floating doodle stickers
- **Light & Dark mode** — floating toggle, saved to `localStorage` (follows OS preference on first visit; light is the default)
- **Hero with your photo** — greeting chip, big highlighted headline, animated sticker badges (Balaji's image appears in the Hero **and** About sections)
- **What I Do** — 6 colour-coded service cards
- **My Work** — 8 project cards → YouTube video in a modal (data-driven array)
- **Experience** — animated dashed timeline with colour dots
- **About** — photo, bio, colourful skill chips
- **Voices** — 6 voice-note testimonials, each with a custom audio player
- **Social** + **contact form** with live validation & success animation
- **Accessible & SEO-ready** — semantic HTML, ARIA, keyboard nav, skip link, JSON-LD, Open Graph
- **Performant** — deferred scripts, lazy images, `prefers-reduced-motion` support

---

## 📁 Structure

```
balaji-portfolio/
├── index.html
├── css/
│   ├── style.css        # tokens, reset, base, buttons, loader, toggle
│   ├── components.css   # nav, hero, doodles, cards, sections, modal
│   └── responsive.css   # mobile / tablet / desktop breakpoints
├── js/
│   ├── main.js          # data arrays, cards, modal, audio player, form
│   ├── darkmode.js      # theme toggle + localStorage
│   └── animations.js    # loader, reveal, magnetic buttons, nav
└── assets/
    ├── images/          # balaji-placeholder.svg + thumbnails/ & avatars
    ├── icons/  audio/
```

---

## 📸 Add Balaji's real photo

Drop the photo in at **`assets/images/balaji.jpg`** — that's it.
The Hero and About sections already point there and fall back to a colourful
placeholder until the file exists, so nothing breaks in the meantime.

- Recommended: a portrait-orientation image, ~1000×1200px, `.jpg`.
- Different filename/format? Change the two `<img src="assets/images/balaji.jpg" ...>` tags in `index.html`.

---

## 🛠 Customise

| What | Where |
|------|-------|
| **Works** (title, role, year, YouTube ID, thumbnail) | `js/main.js` → `WORKS` array |
| **Testimonials** (name, role, quote, audio, avatar) | `js/main.js` → `TESTIMONIALS` array |
| **Colours** | `css/style.css` → `:root` and `:root[data-theme="dark"]` |
| **Bio, services, experience, contact** | `index.html` |
| **Voice notes** | drop `.mp3/.wav/.m4a` into `assets/audio/` |

> **YouTube IDs:** the placeholders use `dQw4w9WgXcQ`. Replace each `youtube`
> value in the `WORKS` array with the real video ID (the part after `?v=`).

---

## 🚀 Deploy

Static site — host the folder anywhere, no config:

- **GitHub Pages** — Settings → Pages → deploy from branch `main` (root)
- **Netlify** — drag the folder in, or connect this repo
- **Vercel** — import project (Framework preset: *Other*)
- **Hostinger / cPanel** — upload folder contents to `public_html`

Locally:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```
