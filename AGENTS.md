# AI Agent Guidelines — System Design Publication & GitHub Pages Deployment

This document contains mandatory instructions for any AI coding agent operating in the `learning-system-design` repository. Follow these workflows whenever modifying, adding, or deploying content.

---

## 1. Core Architecture & GitHub Pages Safety Rules

- **Site Type**: This repository is a standalone **GitHub Pages Project Site** hosted at:  
  `https://vinaytheprogrammer.github.io/learning-system-design/`
- **CRITICAL ISOLATION RULE**: **NEVER touch, modify, or redeploy the user's portfolio repository (`vinaytheprogrammer.github.io`)**.  
  This repository is deployed independently from the `main` branch root (`/`). All deployment actions must be scoped strictly to `learning-system-design`.
- **Static Asset Serving (`.nojekyll`)**: Always ensure `.nojekyll` exists at the root of the repository so GitHub Pages serves raw HTML files and special characters (e.g. `&`) without Jekyll interference.

---

## 2. Standard Workflow When Adding or Pushing New Files

Whenever the user provides a new `.html` learning module or file, execute the following steps in sequence:

### Step 1: Place and Validate File
- Save the `.html` file directly in the repository root (e.g. `NewTopic.html`).
- Inspect the file for:
  - Valid HTML5 structure (`<!doctype html>`, `<head>`, `<body>`, `</html>`).
  - Title and meta tags placed inside `<head>`, not inside `<body>`.
  - No duplicate attributes or unclosed tags.
  - Run `npx -y htmlhint <file>` to verify 0 syntax errors.

### Step 2: Include Shared Nav Styles & Scripts
Inside `<head>`, ensure the shared navigation assets are loaded:
```html
<link rel="stylesheet" href="./nav.css">
<script src="./nav.js" defer></script>
```

### Step 3: Embed Native Top Header Navigation
Immediately after `<body>`, include the static top navigation bar and chapter switcher overlay:
```html
<!-- ==================== UNIVERSAL PUBLICATION NAV ==================== -->
<nav class="lsd-top-nav">
  <div class="lsd-nav-container">
    <div class="lsd-nav-left">
      <a href="./index.html" class="lsd-hub-link" title="Back to All Guides">
        <span class="lsd-hub-badge">⌘</span>
        <span>All Guides</span>
      </a>
      <span class="lsd-divider"></span>
      <button class="lsd-chapter-trigger" id="lsdChapterToggle" onclick="document.getElementById('lsdMenuOverlay').classList.toggle('active')" aria-label="Open chapters menu">
        <span class="lsd-chapter-num">Chapter X/N</span>
        <span>[ICON]</span>
        <span class="lsd-chapter-name">[TITLE]</span>
        <span style="font-size:0.7rem;opacity:0.6;">▾</span>
      </button>
    </div>

    <div class="lsd-nav-right">
      <a href="./[PREV_FILE]" class="lsd-nav-btn" title="Previous: [PREV_TITLE]">← Prev</a>
      <a href="./[NEXT_FILE]" class="lsd-nav-btn" title="Next: [NEXT_TITLE]">Next →</a>
    </div>
  </div>
</nav>

<!-- Chapter Jump Modal / Dropdown -->
<div class="lsd-menu-overlay" id="lsdMenuOverlay" onclick="if(event.target===this)this.classList.remove('active')">
  <div class="lsd-menu-panel">
    <div class="lsd-menu-header">
      <span class="lsd-menu-title">📚 System Design Field Guide — Chapters</span>
      <button class="lsd-menu-close" onclick="document.getElementById('lsdMenuOverlay').classList.remove('active')" aria-label="Close menu">&times;</button>
    </div>
    <div class="lsd-menu-list">
      <!-- Links to all chapters, with the current chapter having class 'current' -->
    </div>
  </div>
</div>
```

### Step 4: Embed Bottom Pagination Cards (Connected Reading Flow)
Before `<footer>` or right before `</body>`, embed the bottom chapter pagination:
```html
<!-- ==================== ARTICLE BOTTOM PAGINATION ==================== -->
<div class="lsd-bottom-nav">
  <div class="lsd-pagination-grid">
    <a href="./[PREV_FILE]" class="lsd-pagination-card prev">
      <span class="lsd-pagination-label">← Previous Chapter</span>
      <span class="lsd-pagination-title">[PREV_ICON] [PREV_TITLE]</span>
    </a>
    <a href="./[NEXT_FILE]" class="lsd-pagination-card next">
      <span class="lsd-pagination-label">Next Chapter →</span>
      <span class="lsd-pagination-title">[NEXT_ICON] [NEXT_TITLE]</span>
    </a>
  </div>
  <div class="lsd-bottom-hub-bar">
    <a href="./index.html" class="lsd-bottom-hub-btn">
      <span>⌘</span>
      <span>View All System Design Topics & Simulators</span>
    </a>
  </div>
</div>
```

### Step 5: Maintain Continuous Circular Connection (No Dead Ends)
- **Previous File Link Update**: Update the previous file's `next` link to point to the newly added chapter.
- **Next File Link Update**: Set the new file's `next` link to either the subsequent chapter or loop back to `Caching.html` (Chapter 1) so readers never hit a dead end.
- Update the dropdown list in all existing files (or `nav.js`) to reflect the new chapter.

### Step 6: Update Central Hub & Docs
1. **`index.html`**: Add a new interactive card inside `<div class="grid" id="modulesGrid">` with:
   - Module title and description
   - Keyword tags for search filtering
   - Direct link (`href="./NewTopic.html"`)
2. **`README.md`**: Add an entry into the "Visual Learning Modules" markdown table.
3. **`nav.js`**: Add the new chapter entry into the `LSD_CHAPTERS` array.

### Step 7: Commit & Deploy
1. Run `git status` to verify modified and untracked files.
2. Commit with a descriptive message:
   ```bash
   git add .
   git commit -m "Add [Topic] visual learning guide and update navigation"
   git push origin main
   ```
3. GitHub Pages automatically builds and deploys within ~30-60 seconds. Verify the live HTTP status:
   ```bash
   curl -s -I "https://vinaytheprogrammer.github.io/learning-system-design/[NewTopic.html]"
   ```
