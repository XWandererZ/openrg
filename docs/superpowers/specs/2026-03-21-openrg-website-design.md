# OpenRG Website — Design Spec

## Overview

A static website for OpenRG (Open Reading Group) — a community-driven reading group covering biology, physics, ML, future tech, and STEM research. The website lists upcoming and past talks and provides basic info about the group.

## Tech Stack

- **Framework**: Astro (static site generator)
- **Content**: Markdown files via Astro Content Collections
- **Styling**: Plain CSS, light mode only
- **Deployment**: GitHub Pages via GitHub Actions
- **Visual Style**: Academic/formal — clean white background, blue accent (#0161ef), Inter font

## Pages

### 1. Talks Page (`/` — homepage)

**Sections:**
- **Navigation bar**: OpenRG logo (text) + links to Talks / About
- **Upcoming Talks**: List of future talks, or "no upcoming talks" message with CTA to present
- **Past Talks**: Chronological list (newest first) of past talk cards

**Talk Card Fields:**
- `title` (required) — talk topic
- `date` (required) — date of the talk
- `speaker` (required) — presenter name
- `affiliation` (optional) — institution or organization
- `slides` (optional) — link to slides
- `recording` (optional) — link to recording
- `description` (optional) — brief summary

**Talk data source:** Each talk is a Markdown file in `src/content/talks/`. Upcoming vs. past is determined by comparing the talk date to the current date at build time. A rebuild is needed after a talk date passes to move it from upcoming to past.

### 2. About Page (`/about`)

**Sections:**
- **Hero**: OpenRG name + "Open Reading Group" subtitle
- **Description**: Group mission and invitation to present
- **Topics**: Tag badges — Biology, Physics, Machine Learning, Future Tech, STEM Research
- **Schedule**: Every Saturday, 2:00–3:00 PM PST (Vancouver)
- **Discord**: Join button linking to https://discord.gg/4z2BNH5S
- **Organizers**: List of organizer names (starting with Danny Huang)

## Content Collection Schema

```typescript
// content.config.ts (project root, Astro v5+)
import { defineCollection, z } from 'astro:content';

const talks = defineCollection({
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

## Example Talk File

```markdown
# src/content/talks/2025-02-07-evolving-gene-networks.md
---
title: "Evolving Diverse Gene Networks"
date: 2025-02-07
speaker: "Qichen Huang"
---
```

## Project Structure

```
my-openrg/
├── src/
│   ├── content/
│   │   └── talks/          # Markdown files, one per talk
│   ├── layouts/
│   │   └── BaseLayout.astro # Shared nav + footer (footer: "© OpenRG" + Discord link)
│   ├── pages/
│   │   ├── index.astro      # Talks page (homepage)
│   │   └── about.astro      # About page
│   └── styles/
│       └── global.css        # Global styles
├── public/                   # Static assets
├── content.config.ts          # Astro content collection schema
├── astro.config.mjs
├── package.json
└── README.md
```

## Deployment

- GitHub Actions workflow builds on push to `main`
- Deploys to GitHub Pages
- Custom domain can be configured later

## Seed Data

Pre-populate with the following past talks:

| Date | Speaker | Title |
|------|---------|-------|
| 2025-02-21 | Xuzhe Xia | Belief Propagation |
| 2025-02-14 | Bryan Quesnel | Epidemiology of Cancer |
| 2025-02-07 | Qichen Huang | Evolving Diverse Gene Networks |
| 2025-01-24 | Tom | Untitled |
| 2025-01-17 | Xinwen Zhang | Untitled |
| 2025-01-10 | Xuzhe Xia | Graphical Models |

## Out of Scope

- Dark mode
- Search/filter functionality
- Speaker profiles
- Comments or discussion features
- Authentication
