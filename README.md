# Ian Talbert &middot; Engineering Monograph & Portfolio

A bespoke, non-vibecoded personal website and engineering portfolio for **Ian Talbert** (Rose-Hulman Institute of Technology, B.S. Mechanical Engineering 2026).

Typeset in an antique, laid-bookpage aesthetic with **Berkeley Oldstyle / Newsreader** typography, old-style figures, small caps headers, dropped initial capitals, and classical technical plate engravings.

---

## Architecture & Design Principles

- **Node.js Platform:** Powered by Express with EJS templating. Blazingly fast, zero client-side framework bloat, and sub-millisecond server response times.
- **Anti-Vibecoded Philosophy:** Rejects trendy dark-mode neon gradient blobs, generic floating pill tags, and AI buzzwords in favor of tactile editorial craftsmanship, fine typographic rhythm, and deep technical substance.
- **Dual Runtime & Static Export:**
  - Run as a live Node.js application (`npm start` or `node server.js`).
  - Or export to pure, pre-rendered static HTML (`npm run build`) in `dist/` for zero-configuration hosting on GitHub Pages, Cloudflare Pages, Netlify, or Vercel.

---

## Page Catalog

1. **About Me (Landing Page `/`):** Frontispiece introducing Ian's engineering philosophy, Rose-Hulman background, competition championship metrics, and a book-style Table of Contents with dotted leaders.
2. **Curated Engineering Portfolio (`/portfolio`):** A comprehensive one-page engineering portfolio covering:
   - **Chapter I &middot; Senior Capstone Design:** *P42 Planetary / Subsea Sample Acquisition System* (JPL-inspired microspine differential gripper array, high-frequency zero-reaction oscillatory core toolhead with inline thrust load cell, and Geneva-drive multi-station storage carousel).
   - **Chapter II &middot; Combat Robotics Highlights:** Rose-Hulman Combat Robotics President, reigning 1lb & 3lb Midwest Robot Combat Association (MRCA) Champion, *Pipeline Punch* (3lb), *Razor Leaf* (3lb), *Normality* (NHRL 3lb), *Monster the Narwhal* (1lb), and motor/ESC tuning.
   - **Chapter III &middot; High School Robotics Highlights:** FRC Team 4270 (The Crusaders) mechanical leadership & CNC programming; VRC Team 42700B 12.0 lb ultra-lightweight half-cut Worlds sprinter and DR4B cube stacker.
   - **Chapter IV &middot; Industrial Practicum:** Automation engineering at **Broan-NuTone**, drone propulsion dynamometry at **VEX Robotics**, and autonomous mobile robots (AMRs) at **GE Appliances**.
3. **Curriculum Vitae / One-Pager Resume (`/resume`):** A letterpress-formatted one-page resume with an embedded preview toggle, direct PDF download (`/resume.pdf`), and dedicated `@media print` styling for exact 1-page paper printing.
4. **Universal Monograph Footer:** Contact coordinates (Honolulu, HI & Terre Haute, IN, email, phone) and links to GitHub, LinkedIn, NHRL match archives, and CAD repositories.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Development / Running the Server
```bash
cd ian-talbert-website
npm start
```
Visit `http://localhost:3000` in your browser.

### Building Static Assets (Optional)
To generate static HTML for deployment:
```bash
npm run build
```
All static pages and assets will be output to `dist/`.
