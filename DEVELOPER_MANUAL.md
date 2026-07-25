# Broad Peak Adventures — Developer & Troubleshooting Manual

Welcome to the **Broad Peak Adventures** codebase. This manual provides a complete guide to the architecture, key systems, local development workflow, and troubleshooting procedures for checking errors and verifying application correctness.

---

## 1. Project Overview & Tech Stack

This project is a high-performance, responsive single-page application (SPA) built for a luxury adventure tourism agency. 

- **Frontend Core**: React 18+ (with TypeScript)
- **Bundler & Server**: Vite 6+
- **Styling**: Vanilla CSS (modularised into `index.css`, `style.css`, and `responsive.css`)
- **Icon Pack**: Remix Icon (`ri-` classes)
- **Animation Framework**: GSAP & ScrollTrigger (loaded via static assets)

---

## 2. Core Directory Structure

```text
tourism/
├── public/
│   ├── assets/              # Media resources (images, video, hero content)
│   └── js/
│       ├── main.js          # Core vanilla JS integrations (Testimonials slider, global popups)
│       └── animations.js    # GSAP scrolltrigger timelines and load animations
├── src/
│   ├── css/
│   │   ├── style.css        # Main page styles, grid definitions, and element shapes
│   │   └── responsive.css   # Mobile media queries and viewport adjustments
│   ├── data/
│   │   ├── blogsData.ts     # Static database for Travel Guides and articles
│   │   └── expeditionsData.ts # Static database for featured adventures
│   ├── pages/               # Page components (Home, Expeditions, TravelGuides, FAQ, etc.)
│   ├── App.tsx              # Main routing engine, global events, and script re-init
│   ├── index.css            # Tailwind base layer + custom premium styles and overrides
│   └── main.tsx             # React entry point
└── package.json             # Scripts and dependencies
```

---

## 3. SPA Routing Engine (`src/App.tsx`)

Because the application avoids standard heavy routers (like `react-router-dom`) to maintain high-performance, it implements a **custom SPA Routing Engine** in `src/App.tsx`.

### Route Interception & Resolution
- A global click interceptor (`handleGlobalLinkClicks`) listens to all local `<a>` tag clicks.
- It prevents default browser reloads, pushes the path to the history stack (`window.history.pushState`), and dispatches a custom `pushstate` event.
- State `currentPath` is updated dynamically, resolving routes via a standard `switch-case` block in `App.renderRoute`.

### Scripts Re-initialization
Since pages mount and unmount dynamically inside React, static script tags in `index.html` would fail to re-bind event listeners to new DOM nodes. 
To resolve this, `App.tsx` runs an effect on every route change:
1. It scrolls the viewport back to top.
2. It sets a clean `80ms` timeout to wait for React's lazy-loaded components to complete rendering.
3. It calls `window.initMainJS()` and `window.initAnimationsJS()` to bind listeners (like FAQ Accordions, Hero Video playback, and Testimonial auto-scrolling) to the freshly mounted DOM.

---

## 4. Key Systems & Troubleshooting Procedures

### 4.1 Navbar Glassmorphism & Active State Highlighting
- **Implementation**: The navbar is designed with a premium floating dark-glassmorphism pill (`background: rgba(15,15,15,0.65)`, `backdrop-filter: blur(25px)`). 
- **Active State**: The active navigation tab is styled with a bright purple gradient (`linear-gradient(135deg, #a855f7 to #7c3aed)`) resembling the concept style.
- **Under the Hood**: On route change, `App.tsx` sets a `data-current-path` attribute on `document.body` (e.g. `data-current-path="/expeditions"`). The CSS in `src/index.css` matches the active links using this attribute:
  ```css
  body[data-current-path="/expeditions"] .navbar .navbar__menu a[href="/expeditions"] { ... }
  ```
- **How to Debug**: If navbar highlighting is missing or incorrect:
  1. Open Chrome DevTools and inspect the `<body>` element. Ensure it has the correct `data-current-path` value (e.g. `/blog`).
  2. Verify that the anchor tags `<a href="...">` in the page template have the exact matching `href` attribute (including slashes).

### 4.2 Featured Expeditions Carousel Slider
- **Implementation**: The slider container uses CSS `scroll-snap-type: x mandatory` for smooth card alignments.
- **Controls**: The navigation next/prev buttons, slide offset math, and active dot calculations are managed natively in `src/pages/Home.tsx` using `useRef` and React state to avoid timing race conditions.
- **How to Debug**: If next/prev navigation buttons or pagination dots do not scroll:
  1. Check if the slider overflows (resizing window to `< 1200px`). The controls are automatically deactivated if the whole slider fits on the screen.
  2. In `Home.tsx`, verify that the outer wrapper has `ref={sliderRef}` and the progress bar has `ref={progressBarRef}`.

### 4.3 Travel Guides Category Filter
- **Implementation**: Located in `src/pages/TravelGuides.tsx`. Provides categorical filtering (Trekking, Culture, Logistics, etc.) for articles.
- **Controls**: Clicking a category updates the React state, filtering the `blogsData` array. An active filter automatically displays a "Clear Filter" badge and triggers a smooth scroll to the results grid.
- **How to Debug**: If clicking a category card does not filter guides:
  1. Check that the category key in the card matching function matches the `category` property inside `src/data/blogsData.ts` (e.g., `'Travel Logistics'` vs `'Logistics'`).
  2. Inspect console logs for any undefined object maps during filter executions.

---

## 5. Development & Testing Workflow

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **NPM** or **Yarn**

### Installation
Run the following command in the project root to restore dependencies:
```powershell
npm install
```

### Running Locally
To launch the Vite hot-reloading development server:
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verifying Build & TypeScript Compilation
To compile the static production bundle and assert that there are no TypeScript syntax or CSS imports errors:
```powershell
npm run build
```
Ensure that the output finishes with `Exit code: 0` and compiles all pages into the `dist/` directory.

---

## 6. How to Diagnose Common Errors

| Error Symptom | Common Root Cause | Diagnostic Steps |
| :--- | :--- | :--- |
| **"Uncaught TypeError: Cannot read properties of null..."** in console | A script in `main.js` or `animations.js` is trying to query a DOM node that is missing on the current page. | 1. Identify which function threw the error.<br>2. Add safety guards (e.g. `if (!element) return;`) to prevent halting script execution on unrelated routes. |
| **Navbar links not highlighted** | `data-current-path` body attribute does not match the link's `href` attribute. | 1. Check body attribute in DevTools.<br>2. Align anchor `href` values with the resolved route path. |
| **FAQ Accordions do not expand** | Event listeners were not bound to the new DOM nodes. | 1. Verify `initMainJS()` is fired by checking the console log output `Route changed to...`<br>2. Verify event delegation targets `.faq-accordion__header` inside `App.tsx`. |
| **Build fails with TS/JS compile warnings** | Syntax errors or type mismatches in components. | 1. Run `npx tsc --noEmit` to verify type safety.<br>2. Check that imports in data sheets (`blogsData.ts`, `expeditionsData.ts`) match interface definitions. |
