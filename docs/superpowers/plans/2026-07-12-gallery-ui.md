# Pet Gallery UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing pet asset repository into a minimal, deployable storefront with a gallery home page, animated pet details, downloads, contribution guidance, and additional pets.

**Architecture:** Keep the repository dependency-light: a Node build script reads every `pets/*/pet.json`, validates the v2 sprite asset, and emits a static `site/pets.json` plus copied assets. Vanilla HTML, CSS, and ES modules render a responsive home page and query-string detail page. GitHub Actions builds and deploys `site/` to Pages.

**Tech Stack:** HTML5, modern CSS, browser ES modules, Node.js built-in test runner, GitHub Actions, GitHub Pages.

## Global Constraints

- UI must be simple, editorial, responsive, keyboard accessible, and free of generic AI visual patterns.
- Existing pet packages remain installable without schema changes.
- Pet animation uses the Codex v2 8x11, 192x208-cell sprite contract.
- Respect `prefers-reduced-motion` and preserve 44px touch targets.
- Deployment target is GitHub Pages.

---

### Task 1: Gallery data pipeline

**Files:**
- Create: `package.json`
- Create: `scripts/gallery-lib.mjs`
- Create: `scripts/build-gallery.mjs`
- Create: `tests/gallery-lib.test.mjs`

**Interfaces:**
- Produces `readPetCatalog(root): PetRecord[]`, `frameStyle(row, frame): CSSProperties`, and `site/pets.json`.

- [ ] Write tests for pet manifest normalization, action row metadata, and sprite background positioning.
- [ ] Run `npm test` and confirm failure because the module is missing.
- [ ] Implement the catalog and frame helpers.
- [ ] Run `npm test` and confirm all tests pass.

### Task 2: Editorial storefront UI

**Files:**
- Create: `site/index.html`
- Create: `site/pet.html`
- Create: `site/styles.css`
- Create: `site/app.js`
- Create: `site/pet.js`
- Create: `site/shared.js`

**Interfaces:**
- Consumes `site/pets.json` and `site/pets/<id>/spritesheet.webp`.
- Produces gallery filters, pet cards, animated detail previews, download links, and contribution CTA.

- [ ] Add semantic page shells and loading/error states.
- [ ] Implement catalog rendering and detail routing.
- [ ] Implement sprite animation previews using the v2 row metadata.
- [ ] Add responsive editorial CSS, keyboard focus, and reduced-motion handling.
- [ ] Run the build and inspect at mobile and desktop widths.

### Task 3: Pet additions and repository documentation

**Files:**
- Add: `pets/anya/`
- Modify: `README.md`
- Modify: `CONTRIBUTING.md`

**Interfaces:**
- New pets use the existing `pet.json` and `spritesheet.webp` contract.

- [ ] Add the validated Anya v2 package.
- [ ] Add generated original pets after hatch-pet QA.
- [ ] Document local preview, build, download, and submission workflows.
- [ ] Rebuild the catalog and confirm every pet appears.

### Task 4: GitHub Pages deployment

**Files:**
- Create: `.github/workflows/pages.yml`

**Interfaces:**
- Consumes `npm run build`; deploys `site/`.

- [ ] Add a Pages workflow for pushes to `main` and manual runs.
- [ ] Run tests and production build locally.
- [ ] Verify generated links use repository-relative URLs.
- [ ] Commit and push only after user-authorized repository publication.

