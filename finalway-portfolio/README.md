# Final Way Production — Portfolio Website

A complete, free, animated portfolio website for cinematography, photography,
and video editing — branded around the **Final Way Production** logo.
Pure HTML/CSS/JS + GSAP. No build step, no framework, no paid hosting required.

```
portfolio/
├── index.html          ← Home page (hero, services, work preview, process, testimonials)
├── about.html           ← Studio story, timeline, skills, gear
├── portfolio.html        ← Full filterable work gallery (12 placeholder pieces)
├── contact.html          ← Contact form, channels, FAQ accordion
├── css/
│   ├── style.css         ← Design system: colors, type, layout
│   └── animation.css     ← Keyframes + scroll-reveal utility classes
├── js/
│   ├── main.js            ← Nav, filtering, lightbox, FAQ, contact form, fallback reveals
│   └── gsap.js             ← GSAP + ScrollTrigger scroll animations
├── images/
│   └── logo.png            ← Your uploaded Final Way Production logo
├── videos/                  ← Empty — drop your video files or posters here
├── assets/                   ← Empty — for any extra brand assets (favicon variants, etc.)
└── README.md                  ← This file
```

---

## 1. Design — what's already built in

- **Palette pulled directly from your logo**: deep ink black background, teal
  (`#16646F`) structural color, production-orange (`#E8853C`) as the single
  signature accent, warm white text.
- **Typography**: Anton (bold condensed display) + Inter (body) + JetBrains
  Mono (technical metadata like camera specs, timecodes) — matches the bold
  wordmark style of your logo.
- **Signature motif**: the road-winding-to-a-rising-sun line from your logo,
  redrawn as an animated SVG path in the homepage hero (it draws itself in
  on page load) — ties every page back to the brand mark instead of just
  pasting the logo in a corner.
- **Animations**: staggered hero entrance, scroll-triggered reveals on every
  section (via GSAP ScrollTrigger, with a pure-CSS fallback if GSAP fails to
  load), animated skill bars on the About page, FAQ accordion, hover
  micro-interactions on buttons/cards/gallery tiles, and a subtle parallax
  drift on the hero road graphic.
- **Respects `prefers-reduced-motion`** — all animation is skipped for
  visitors who've asked their OS to reduce motion.

---

## 2. Make it yours (10–15 minutes)

| What | Where | Find |
|---|---|---|
| Logo | `images/logo.png` | already in place — replace the file directly to update everywhere |
| Hero headline | `index.html` → `.hero-title` | "Every story has a final way to tell." |
| Stats | `index.html` → `.hero-meta` | "120+", "8", "14" |
| Studio story / timeline | `about.html` | placeholder paragraphs + 2018–2026 timeline |
| Gear list | `about.html` and reused styling in `#kit` | Sony A7S III, etc. |
| Portfolio images/videos | every `.frame` block in `portfolio.html` and `index.html` | see below |
| Testimonials | `.testi-card` blocks in `index.html` | placeholder quotes |
| Email / Instagram / phone | `contact.html`, footer on every page, and `js/main.js` (`mailto:` line) | "Finalwayproduction@gmail.com" |
| FAQ answers | `contact.html` → `.faq-list` | placeholder Q&A |

### Adding your own photos
1. Put image files in `images/` (e.g. `images/coastline-01.jpg`).
2. In each `.frame` div, delete the `<div class="frame-placeholder">...</div>` line and add, right after the `frame-tick`/`frame-cat` spans:
   ```html
   <img src="images/coastline-01.jpg" alt="Short description">
   ```
   The CSS already handles cropping and the hover zoom.

### Adding your own video work
Two free options:
- **Self-hosted clip**: put the file in `videos/`, then inside the `.frame`:
  ```html
  <video src="videos/wildfire-trailer.mp4" muted loop playsinline></video>
  ```
- **YouTube/Vimeo embed** (recommended — no file size limits, free streaming): use this inside the lightbox preview area instead, or directly in a frame:
  ```html
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen style="width:100%;height:100%;"></iframe>
  ```

---

## 3. Host it for free — pick ONE option

All three are genuinely free, no credit card, real public URL, free HTTPS.
**GitHub Pages** is the most durable pick if you're not sure.

### Option A — GitHub Pages (recommended, most durable)
1. Create a free account at github.com if you don't have one.
2. Create a new repository, e.g. `final-way-production` (set it **Public**).
3. Upload `index.html`, `about.html`, `portfolio.html`, `contact.html`, and
   the `css/`, `js/`, `images/`, `videos/`, `assets/` folders — drag-and-drop
   works in the GitHub web UI ("Add file → Upload files").
4. Go to **Settings → Pages**.
5. Under "Build and deployment": **Source: Deploy from a branch**, branch
   `main`, folder `/ (root)`. Save.
6. Wait ~1 minute. Your site is live at:
   `https://YOUR-USERNAME.github.io/final-way-production/`
7. (Optional) Add a custom domain later from the same Pages settings screen.

### Option B — Netlify (fastest, pure drag-and-drop)
1. Go to **netlify.com** → sign up free.
2. **Sites → Add new site → Deploy manually**.
3. Drag your whole `portfolio` folder onto the upload box.
4. Done — instant live URL (e.g. `final-way-production.netlify.app`).
5. Rename the subdomain for free under **Site settings → Change site name**.

### Option C — Vercel (also drag-and-drop)
1. Go to **vercel.com** → sign up free.
2. **Add New → Project → Upload** the folder (or connect a GitHub repo for
   auto-deploys whenever you push changes).
3. Deploy — free `yourproject.vercel.app` URL with HTTPS.

> All three let you connect a custom domain (e.g. `finalwayproduction.com`)
> for free if you buy one separately — hosting itself stays free either way.

---

## 4. Contact form — making it actually receive messages

Right now the form opens the visitor's email app, pre-filled with their
message (zero setup needed). To get a real "message sent" form **without
writing backend code**, free options:

- **Formspree.io** (free tier): sign up, get a form endpoint URL, then in
  `contact.html` change:
  ```html
  <form class="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
  ```
  and remove the `preventDefault` / mailto logic for the form in `js/main.js`.
- **Web3Forms.com**: same idea, free, no signup wall to get started.

---

## 5. GSAP — how the animation files work together

- `js/main.js` runs first: handles navigation, the work filter, lightbox,
  FAQ accordion, the contact form, and a plain CSS/IntersectionObserver
  fallback reveal — so the site still animates even if GSAP fails to load
  (e.g. no internet on first preview).
- `js/gsap.js` runs second: if the GSAP + ScrollTrigger `<script>` tags
  (loaded via CDN at the bottom of each HTML page) succeeded, this file
  defines all the richer scroll-triggered animations — staggered card
  reveals, the animated skill bars, the parallax hero road line, etc.
- Both files check `prefers-reduced-motion` and back off automatically.

If you ever want to swap GSAP for a different CDN version, just change the
two `<script src="https://cdnjs.cloudflare.com/...">` lines at the bottom of
each HTML file — `js/gsap.js` itself doesn't need to change.

---

## 6. Performance & SEO checklist (already done for you)
- ✅ No heavy framework — loads fast on any free host
- ✅ Responsive down to small mobile screens, with a slide-in mobile nav
- ✅ Keyboard-navigable (focus states, tab-accessible gallery, Escape closes lightbox)
- ✅ Respects reduced-motion preference
- ✅ Meta description + Open Graph tags for link previews (edit in each `<head>`)
- ✅ Favicon already wired to your logo

**Before you publish:** compress your real photos (use **squoosh.app**, free,
no upload limit) to under ~300KB each so the site stays fast, and compress
video clips or prefer YouTube/Vimeo embeds over self-hosted video files.

---

## 7. Local preview before you upload anywhere
If you have Python installed, from inside the `portfolio` folder run:
```
python3 -m http.server 8000
```
then open `http://localhost:8000` in your browser. (GSAP animations need an
internet connection to load from the CDN — the site still works offline,
just with the simpler CSS fallback animations instead.)
