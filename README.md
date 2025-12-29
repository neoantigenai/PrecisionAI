# Precision AI — Static Marketing Site

A small static multi-page marketing site for Precision AI — an immunotherapy / vaccine design company. The site is intended as a front-end marketing and informational presence showcasing products, platform features, company pages, and demo contact/application forms.

## 🔍 What this repo contains

- Pages (static HTML): `index.html`, `vaxidl.html`, `vaxelan.html`, `neoantigen.html`, `life-science.html`, `finance.html`, `careers.html`, `apply.html`, `contact.html`
- Shared fragment: `navbar.html` (loaded dynamically into pages)
- Scripts:
  - `include-navbar.js` – fetches and injects the navbar fragment into each page
  - `script.js` – navigation behaviors, scroll animations, and demo form handlers
- Styles: `style.css` – theme variables, layout, responsiveness, and animations

## Key behaviors

- Navbar is injected at runtime from `navbar.html` into the `<div id="site-navbar">` placeholder on each page.
- `script.js` exposes `initNav()` which initializes mobile toggle, dropdowns, keyboard support, and scroll visibility animations.
- Forms (contact + apply) are client‑side demos: they show simulated success messages and do not send data to a server.
- Images are hotlinked externally; check licensing before production use.

## How to run locally 💻

This is a static site — you can preview it by opening `index.html` in your browser or by running a local static server.

Recommended (Python 3):

```bash
# from the project root
python -m http.server 8000
# then open http://localhost:8000
```

Or use VS Code Live Server extension for live reload.

## Accessibility & SEO notes ⚠️

- Dropdowns have ARIA attributes and keyboard support; images include `alt` text.
- Add `meta` description, Open Graph tags, and a `favicon` for better SEO.
- Consider `rel="noopener noreferrer"` on external links that open in new tabs.

## Suggested next steps ✨

- Implement a backend (Node/Express or serverless) to handle contact and application submissions securely (with validation and anti-spam).
- Consolidate repeated footer into a fragment and inject it (like the navbar) to reduce duplication.
- Self-host key images or ensure their licenses for production.
- Add tests, a `LICENSE`, and CI (linting / accessibility checks).

## License & Contact

This repository currently has no license file. Add a `LICENSE` that matches your intentions (e.g., MIT, Apache-2.0) if you plan to share or open-source.

For questions or to request changes, contact: `precisionai001@gmail.com`.
