# OpenRG Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static website for OpenRG with a Talks listing page and an About page, deployed to GitHub Pages.

**Architecture:** Astro static site with Content Collections for talk data (one Markdown file per talk). Two pages share a common layout. Date comparison at build time separates upcoming from past talks.

**Tech Stack:** Astro v5+, plain CSS, GitHub Actions for deployment

**Spec:** `docs/superpowers/specs/2026-03-21-openrg-website-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies and scripts |
| `astro.config.mjs` | Astro configuration (static output, site URL) |
| `content.config.ts` | Content collection schema for talks |
| `src/styles/global.css` | Global styles — typography, colors, layout, cards |
| `src/layouts/BaseLayout.astro` | Shared shell: `<head>`, nav bar, footer, slot for page content |
| `src/pages/index.astro` | Talks page — queries talks collection, splits upcoming/past, renders cards |
| `src/pages/about.astro` | About page — static content with group info |
| `src/content/talks/*.md` | One file per talk (seed data: 6 files) |
| `.github/workflows/deploy.yml` | GitHub Actions workflow for GitHub Pages deployment |
| `.gitignore` | Ignore node_modules, dist, .astro, .superpowers |

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `.gitignore`

- [ ] **Step 1: Initialize git repo**

```bash
cd /Users/dannyhuang/Developer/_my/my-openrg
git init
```

- [ ] **Step 2: Create package.json**

```json
{
  "name": "my-openrg",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0"
  }
}
```

- [ ] **Step 3: Create astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://your-username.github.io', // TODO: replace with actual GitHub username
  base: '/my-openrg',
  output: 'static',
});
```

- [ ] **Step 4: Create .gitignore**

```
node_modules/
dist/
.astro/
.superpowers/
.DS_Store
```

- [ ] **Step 5: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, `package-lock.json` generated

- [ ] **Step 6: Verify Astro runs**

Run: `npx astro check` (may warn about no pages yet — that's fine)
Expected: No crash, Astro CLI responds

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json astro.config.mjs .gitignore
git commit -m "chore: scaffold Astro project"
```

---

### Task 2: Content Collection Schema + Seed Data

**Files:**
- Create: `content.config.ts`
- Create: `src/content/talks/2025-01-10-graphical-models.md`
- Create: `src/content/talks/2025-01-17-xinwen-zhang.md`
- Create: `src/content/talks/2025-01-24-tom.md`
- Create: `src/content/talks/2025-02-07-evolving-gene-networks.md`
- Create: `src/content/talks/2025-02-14-epidemiology-of-cancer.md`
- Create: `src/content/talks/2025-02-21-belief-propagation.md`

- [ ] **Step 1: Create content.config.ts**

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    speaker: z.string(),
    affiliation: z.string().optional(),
    slides: z.string().url().optional(),
    recording: z.string().url().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { talks };
```

- [ ] **Step 2: Create seed talk files**

`src/content/talks/2025-01-10-graphical-models.md`:
```markdown
---
title: "Graphical Models"
date: 2025-01-10
speaker: "Xuzhe Xia"
---
```

`src/content/talks/2025-01-17-xinwen-zhang.md`:
```markdown
---
title: "Untitled"
date: 2025-01-17
speaker: "Xinwen Zhang"
---
```

`src/content/talks/2025-01-24-tom.md`:
```markdown
---
title: "Untitled"
date: 2025-01-24
speaker: "Tom"
---
```

`src/content/talks/2025-02-07-evolving-gene-networks.md`:
```markdown
---
title: "Evolving Diverse Gene Networks"
date: 2025-02-07
speaker: "Qichen Huang"
---
```

`src/content/talks/2025-02-14-epidemiology-of-cancer.md`:
```markdown
---
title: "Epidemiology of Cancer"
date: 2025-02-14
speaker: "Bryan Quesnel"
---
```

`src/content/talks/2025-02-21-belief-propagation.md`:
```markdown
---
title: "Belief Propagation"
date: 2025-02-21
speaker: "Xuzhe Xia"
---
```

- [ ] **Step 3: Commit**

```bash
git add content.config.ts src/content/talks/
git commit -m "feat: add content collection schema and seed talk data"
```

---

### Task 3: Global Styles

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

:root {
  --color-primary: #0161ef;
  --color-text: #111;
  --color-text-secondary: #666;
  --color-bg: #fff;
  --color-card-bg: #fafafa;
  --color-border: #e5e7eb;
  --font-family: 'Inter', system-ui, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Navigation */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  border-bottom: 1px solid var(--color-border);
  max-width: 900px;
  margin: 0 auto;
}

.nav-logo {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-text);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 24px;
  font-size: 14px;
}

.nav-links a {
  color: var(--color-text-secondary);
  text-decoration: none;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--color-primary);
  font-weight: 600;
}

/* Section headers */
.section-title {
  font-size: 28px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 8px;
}

.section-subtitle {
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-align: center;
  text-transform: uppercase;
}

.section {
  padding: 40px 32px 20px;
  max-width: 900px;
  margin: 0 auto;
}

/* Talk cards */
.talk-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px 20px;
  background: var(--color-card-bg);
}

.talk-card + .talk-card {
  margin-top: 12px;
}

.talk-card-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.talk-card-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 6px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.talk-card-links {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  font-size: 13px;
}

/* About page */
.about-hero {
  text-align: center;
  padding: 48px 32px 32px;
  max-width: 640px;
  margin: 0 auto;
}

.about-hero h1 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
}

.about-section {
  padding: 0 32px 32px;
  max-width: 640px;
  margin: 0 auto;
}

.about-section h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #eff6ff;
  color: var(--color-primary);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
}

.discord-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #5865F2;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.discord-btn:hover {
  text-decoration: none;
  opacity: 0.9;
}

.organizer-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.organizer {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px 16px;
  background: var(--color-card-bg);
  font-size: 14px;
}

/* Footer */
.footer {
  text-align: center;
  padding: 24px 32px;
  border-top: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-secondary);
  max-width: 900px;
  margin: 0 auto;
}

/* Empty state */
.empty-state {
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 14px;
  padding: 16px 0;
}

/* Text styles */
.text-body {
  color: #444;
  font-size: 15px;
  line-height: 1.7;
}

.text-body + .text-body {
  margin-top: 12px;
}

.text-small {
  color: #444;
  font-size: 14px;
}

.talk-card-description {
  margin-top: 8px;
  font-size: 14px;
  color: #444;
}

.text-center {
  text-align: center;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global styles"
```

---

### Task 4: Base Layout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create BaseLayout.astro**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  activePage?: 'talks' | 'about';
}

const { title, activePage = 'talks' } = Astro.props;
const base = import.meta.env.BASE_URL;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title} — OpenRG</title>
  </head>
  <body>
    <nav class="nav">
      <a href={base} class="nav-logo">OpenRG</a>
      <div class="nav-links">
        <a href={base} class={activePage === 'talks' ? 'active' : ''}>Talks</a>
        <a href={`${base}about/`} class={activePage === 'about' ? 'active' : ''}>About</a>
      </div>
    </nav>

    <main>
      <slot />
    </main>

    <footer class="footer">
      © OpenRG · <a href="https://discord.gg/4z2BNH5S">Discord</a>
    </footer>
  </body>
</html>
```

Note: `import.meta.env.BASE_URL` reads from `astro.config.mjs`'s `base` setting. CSS is imported in the frontmatter so Astro handles bundling.

- [ ] **Step 2: Verify dev server starts**

Run: `npm run dev`
Expected: Astro dev server starts (no pages yet, but no crash). Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add base layout with nav and footer"
```

---

### Task 5: Talks Page (Homepage)

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create index.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const allTalks = await getCollection('talks');
const now = new Date();

const upcomingTalks = allTalks
  .filter((talk) => talk.data.date >= now)
  .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());

const pastTalks = allTalks
  .filter((talk) => talk.data.date < now)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
---

<BaseLayout title="Talks" activePage="talks">
  <div class="section">
    <h2 class="section-title">Upcoming Talks</h2>
    <p class="section-subtitle">Find details about the next talks and what's coming up</p>
  </div>

  <div class="section">
    {upcomingTalks.length === 0 ? (
      <p class="empty-state">
        No upcoming talks at the moment. DM or reply in
        <a href="https://discord.gg/4z2BNH5S">Discord</a> if you want to present!
      </p>
    ) : (
      upcomingTalks.map((talk) => (
        <div class="talk-card">
          <div class="talk-card-title">{talk.data.title}</div>
          <div class="talk-card-meta">
            <span>📅 {formatDate(talk.data.date)}</span>
            <span>👤 {talk.data.speaker}</span>
            {talk.data.affiliation && <span>🏛️ {talk.data.affiliation}</span>}
          </div>
          {talk.data.description && <p class="talk-card-description">{talk.data.description}</p>}
        </div>
      ))
    )}
  </div>

  <div class="section">
    <h2 class="section-title">Past Talks</h2>
    <p class="section-subtitle">Look back at previous talks and speakers</p>
  </div>

  <div class="section">
    {pastTalks.map((talk) => (
      <div class="talk-card">
        <div class="talk-card-title">{talk.data.title}</div>
        <div class="talk-card-meta">
          <span>📅 {formatDate(talk.data.date)}</span>
          <span>👤 {talk.data.speaker}</span>
          {talk.data.affiliation && <span>🏛️ {talk.data.affiliation}</span>}
        </div>
        {talk.data.description && <p class="talk-card-description">{talk.data.description}</p>}
        {(talk.data.slides || talk.data.recording) && (
          <div class="talk-card-links">
            {talk.data.slides && <a href={talk.data.slides}>📄 Slides</a>}
            {talk.data.recording && <a href={talk.data.recording}>🎥 Recording</a>}
          </div>
        )}
      </div>
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`
Open: `http://localhost:4321/my-openrg/`
Expected: Talks page renders with nav, "no upcoming talks" message, and 6 past talk cards sorted newest first.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add talks page with upcoming/past sections"
```

---

### Task 6: About Page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create about.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About" activePage="about">
  <div class="about-hero">
    <h1>OpenRG</h1>
    <p class="section-subtitle">Open Reading Group</p>
  </div>

  <div class="about-section">
    <p class="text-body">
      We're kicking off a new round of monthly RG talks + open discussion
      covering biology, physics, ML, and related research topics. Everyone is
      welcome — come listen, share ideas, and chat!
    </p>
    <p class="text-body">
      Feel free to DM or reply in Discord if you want to present!
    </p>
  </div>

  <div class="about-section">
    <h3>Topics We Cover</h3>
    <div class="tag-list">
      <span class="tag">Biology</span>
      <span class="tag">Physics</span>
      <span class="tag">Machine Learning</span>
      <span class="tag">Future Tech</span>
      <span class="tag">STEM Research</span>
    </div>
  </div>

  <div class="about-section">
    <h3>Schedule</h3>
    <p class="text-small">Every Saturday, 2:00 PM – 3:00 PM PST (Vancouver)</p>
  </div>

  <div class="about-section text-center">
    <a href="https://discord.gg/4z2BNH5S" class="discord-btn">💬 Join Our Discord</a>
  </div>

  <div class="about-section">
    <h3>Organizers</h3>
    <div class="organizer-list">
      <div class="organizer">Danny Huang</div>
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev` (if not already running)
Open: `http://localhost:4321/my-openrg/about/`
Expected: About page renders with intro, topic tags, schedule, Discord button, and organizer name.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add about page"
```

---

### Task 7: Build Verification + GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: `dist/` folder created with static HTML files

- [ ] **Step 2: Preview production build**

Run: `npm run preview`
Open: `http://localhost:4321/my-openrg/`
Expected: Site works correctly in preview mode. Stop with Ctrl+C.

- [ ] **Step 3: Create GitHub Actions workflow**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deployment workflow"
```

---

### Task 8: Final Polish + README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README.md**

```markdown
# OpenRG Website

Website for the Open Reading Group — a community covering biology, physics, ML, future tech, and STEM research.

## Adding a Talk

Create a new Markdown file in `src/content/talks/`:

\```markdown
---
title: "Your Talk Title"
date: 2025-03-15
speaker: "Your Name"
affiliation: "Your Institution" # optional
slides: "https://link-to-slides" # optional
recording: "https://link-to-recording" # optional
description: "Brief summary" # optional
---
\```

File naming convention: `YYYY-MM-DD-short-title.md`

## Development

\```bash
npm install
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production
npm run preview  # Preview production build
\```

## Deployment

Automatically deploys to GitHub Pages on push to `main`.

## Discord

Join us: https://discord.gg/4z2BNH5S
\```
```

- [ ] **Step 2: Final build check**

Run: `npm run build`
Expected: Clean build with no errors

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add README with contribution guide"
```
