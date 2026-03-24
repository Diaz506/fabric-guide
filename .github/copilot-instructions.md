# Copilot Instructions — Microsoft Fabric Best Practices Guide

## Project Overview

Static documentation site for Microsoft Fabric best practices, hosted on Azure Static Web Apps at `fabric.diazlabs.xyz`. Pure HTML/CSS/JS — no frameworks, no build step, no package.json.

## Local Development

```bash
npx serve .
```

There is no build, test, or lint step.

## Deployment

Pushes to `main` auto-deploy via GitHub Actions (`Azure/static-web-apps-deploy`). The workflow sets `skip_app_build: true` because there is no build step. Manual deploy uses `StaticSitesClient.exe` from a staging folder (not `swa` CLI, which is broken with Node v24+).

**OneDrive caveat:** The working copy lives in OneDrive, which corrupts `.git` folders. Never deploy directly from OneDrive — copy to a staging folder first.

## Architecture

### Page Structure

Every content page is a standalone `.html` file with full content (no client-side routing). Pages share three JS files loaded in order:

```html
<script src="js/nav.js"></script>
<script>injectNav('page-id');</script>   <!-- page-id must match pageSections key in nav.js -->
<script src="js/main.js"></script>
<script src="js/features.js"></script>
```

`playground.html` is the exception — it loads `playground.js` instead of `features.js`.

### JavaScript Layers

| File | Role |
|------|------|
| `nav.js` | Injects header, sidebar, footer, search, and TOC into every page via `injectNav()`. Contains the `pageSections` registry that defines all page sections and navigation structure. |
| `main.js` | Core interactions: sidebar toggle, scroll spy, back-to-top, code copy buttons, checklist persistence. |
| `features.js` | Enhancement layer: dark mode, i18n (EN/ES), reading progress, bookmarks, capacity calculator, architecture wizard, migration recommender, readiness quiz. ~210 KB due to inline translation dictionary. |
| `playground.js` | Standalone drag-drop architecture canvas with SVG rendering, icon registry, undo/redo, zoom, and PNG/SVG export. Not a documentation page — a design tool. |

Both `main.js` and `features.js` check for element existence before initializing, so they work on any page without errors.

### Adding a New Page

1. Create `new-page.html` following the section structure: `<main class="main-content">` → `<section id="..." class="section">` → `<div class="section-header">`
2. Register the page and its sections in the `pageSections` object in `nav.js`
3. Add a route in `staticwebapp.config.json`
4. Include the standard three `<script>` tags with the correct page ID in `injectNav()`

### Navigation & Search

No nav HTML exists in page files — `nav.js` generates it all. The client-side search indexes `allPages`, `pageSections`, and `keywords` arrays defined in `nav.js`. To make content searchable, add entries there.

## Key Conventions

### CSS Theming

All colors use CSS custom properties defined in `:root` and overridden in `[data-theme="dark"]`. Never use hardcoded colors — always reference variables like `var(--bg-primary)`, `var(--text-secondary)`, `var(--accent-blue)`.

Key layout variables: `--sidebar-width: 280px`, `--header-height: 60px`.

Typography: `--font-sans` (Segoe UI), `--font-mono` (Cascadia Code).

### Dark Mode

A synchronous inline `<script>` in each page's `<head>` reads `localStorage('fabric-theme')` and sets `data-theme="dark"` before first paint to prevent flash. The toggle logic lives in `features.js`.

### i18n (Spanish Translation)

Translations are a flat key-value dictionary in `features.js` (`translations` object). Language state is stored in `localStorage('fabric-lang')`. The toggle traverses the DOM and replaces matching text nodes.

### HTML Patterns

- Sections: `<section id="..." class="section">` with `<div class="section-header">`
- Card layouts: `.card-grid` > `.card`
- Info callouts: `.info-box`, `.info-box.important`, `.info-box.warning`
- Code blocks: `.code-block` > `.code-header` + `<pre>` with `.code-copy-btn`
- Collapsibles: `.journey-card` / `.scenario-card` with `.expanded` toggle

### External API Proxy

The roadmap page fetches from `fabric-gps.com` via `api.allorigins.win` as a CORS proxy (fabric-gps.com lacks CORS headers). The CSP in `staticwebapp.config.json` whitelists both domains in `connect-src`. Note: allorigins.win is a free service and may have occasional outages.

## Security Headers

`staticwebapp.config.json` defines global security headers including a strict CSP. When adding new external resources, update the CSP accordingly.
