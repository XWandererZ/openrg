# OpenRG Website

Website for the Open Reading Group — a community covering biology, physics, ML, future tech, and STEM research.

## Adding a Talk

Create a new Markdown file in `src/content/talks/`:

```markdown
---
title: "Your Talk Title"
date: 2025-03-15
speaker: "Your Name"
affiliation: "Your Institution" # optional
slides: "https://link-to-slides" # optional
recording: "https://link-to-recording" # optional
description: "Brief summary" # optional
---
```

File naming convention: `YYYY-MM-DD-short-title.md`

## Development

```bash
npm install
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deployment

Automatically deploys to GitHub Pages on push to `main`.

## Discord

Join us: https://discord.gg/4z2BNH5S
