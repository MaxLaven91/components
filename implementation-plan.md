# Implementation Plan: Panes

## Overview

**Panes** — Clean, modern UI components for the web.

Build an open-source library of copy-paste UI components with a shadcn/ui registry, a showcase website with live previews, and CLI installation support. Hosted at **panes.so**. Modelled on [blocks.so](https://blocks.so) by Ephraim Duncan.

---

## Phase 1: Foundation & Proving the Loop (Week 1)

The goal of week 1 is not just scaffolding — it's **proving the full install loop works end-to-end with a single block**. If `npx shadcn@latest add @panes/stats-01` doesn't install cleanly into a fresh project by the end of this week, nothing else matters.

### 1.1 — Project Setup

- Initialise a Next.js app (App Router) with TypeScript and Tailwind CSS
- Use **Bun** as the package manager (fast, matches the ecosystem convention)
  - Note: document `bun install` vs `npm install` in contributor docs — don't rely on bun-only features so pnpm/npm users can still contribute
- Install core dependencies:
  - `shadcn/ui` — base component primitives
  - `@radix-ui` — accessible primitives underpinning shadcn
  - `biome` or `ultracite` — linting and formatting
- Set up the `components.json` with the `@panes` registry namespace
- Initialise a public GitHub repo with MIT license

### 1.2 — Project Structure

```
panes/
├── app/                          # Next.js pages (landing, category pages, block previews)
│   ├── page.tsx                  # Landing page
│   ├── preview/
│   │   └── [category]/
│   │       └── [block]/
│   │           └── page.tsx      # Isolated preview route (rendered in iframe)
│   ├── [category]/
│   │   └── page.tsx              # Category listing
│   └── [category]/[block]/
│       └── page.tsx              # Block showcase page (preview + code + install)
├── components/                   # Shared site UI (nav, footer, code viewer)
├── content/
│   ├── blocks/                   # Block implementations
│   │   ├── stats/
│   │   │   ├── stats-01.tsx
│   │   │   ├── stats-02.tsx
│   │   │   └── index.ts
│   │   ├── dialogs/
│   │   └── ...
│   └── blocks.ts                 # Single source of truth (metadata, categories, imports)
├── public/
│   └── r/                        # Generated registry JSON files (install manifests)
├── scripts/
│   ├── generate-registry.ts      # Builds registry JSON from blocks.ts
│   ├── generate-markdown.ts      # Auto-generates MDX docs
│   └── validate-registry.ts      # Validates registry structure + import checking
├── lib/                          # Utilities
├── registry.json                 # Main registry manifest
├── components.json               # shadcn config with @panes registry
├── biome.jsonc                   # Linter config
└── package.json
```

### 1.3 — Single Source of Truth: `content/blocks.ts`

Instead of separate metadata, category, and component mapping files that can drift out of sync, define everything in one file:

```typescript
export const categories = [
  { id: "stats", label: "Stats & Metrics", description: "Dashboard cards, KPIs, and metric displays", sort: 1 },
  { id: "login", label: "Login & Signup", description: "Authentication forms and flows", sort: 2 },
  // ...
] as const;

export const blocks = [
  {
    id: "stats-01",
    category: "stats",
    name: "Simple Stat Cards",
    description: "3-4 cards in a row with label, value, and change badge",
    tags: ["dashboard", "metrics", "cards"],
    registryDependencies: ["card", "badge"],
    dependencies: [],
    component: () => import("./blocks/stats/stats-01"),
  },
  // ...
] as const;
```

Everything derives from this: category pages, the registry generator, the preview map, and validation.

### 1.4 — Install Path Convention

**Critical distinction:** your registry JSON `files[].path` values are **install manifests** — they define where files land in the consumer's project, not where they live in your repo.

Convention for Panes:

```
components/panes/<category>/<block-id>.tsx
```

So the generated registry JSON for `stats-01` looks like:

```json
{
  "name": "stats-01",
  "type": "registry:block",
  "registryDependencies": ["card", "badge"],
  "dependencies": [],
  "files": [
    {
      "path": "components/panes/stats/stats-01.tsx",
      "type": "registry:component",
      "content": "..."
    }
  ]
}
```

When someone runs `npx shadcn@latest add @panes/stats-01`, the file lands at `components/panes/stats/stats-01.tsx` in their project — clean, namespaced, and predictable.

### 1.5 — Prove the Install Loop (End of Week 1 Gate)

Build `stats-01` (the simplest block) and test the full cycle:

1. Create the component in `content/blocks/stats/stats-01.tsx`
2. Add its entry to `content/blocks.ts`
3. Run the registry generator to output `/public/r/stats-01.json`
4. Deploy to Vercel (even on a temporary URL)
5. In a **separate fresh Next.js project**, add the registry and run:
   ```bash
   npx shadcn@latest add @panes/stats-01
   ```
6. Confirm it installs to the correct path with all dependencies resolved

**Do not proceed to Phase 2 until this works.** This is the single most important milestone in the entire project. Every bug you find here saves days later.

---

## Phase 2: First Blocks (Week 2–3)

### 2.1 — Launch Categories & Block Build List

Aim for **20 blocks across 5 categories** at launch. Build in the order listed — Stats first because they screenshot well and will be your marketing material.

**Week 2 target:** 10 blocks (stats + login + first dialogs) + preview system working.
**Week 3 target:** remaining 10 blocks + site polish.

---

#### Category 1: Stats & Metrics (5 blocks) — Build first

These are the hero screenshots for your landing page and social posts.

| Block | Description | Key components |
|---|---|---|
| `stats-01` | **Simple stat cards row** — 3-4 cards in a row showing a label, large number, and percentage change badge (green up / red down) | Card, Badge |
| `stats-02` | **Stat cards with sparkline** — same as above but each card includes a small inline area chart showing the trend | Card, Badge + Recharts |
| `stats-03` | **KPI grid** — 2x2 or 2x3 grid of metric tiles with icons, values, and subtle progress bars underneath | Card, Progress |
| `stats-04` | **Stats with comparison** — side-by-side cards showing "this period" vs "last period" with a delta indicator | Card, Badge |
| `stats-05` | **Revenue overview card** — a larger single card with a headline number, a line/bar chart below, and filter tabs (7d / 30d / 90d) | Card, Tabs + Recharts |

---

#### Category 2: Login & Signup (5 blocks) — Build second

Every project needs auth UI and these are highly searchable.

| Block | Description | Key components |
|---|---|---|
| `login-01` | **Simple centered login** — email + password fields, "Forgot password?" link, submit button, "Sign up" link below. Clean and minimal | Card, Input, Button, Label |
| `login-02` | **Social login** — same as above but with Google/GitHub/Apple OAuth buttons above the form with an "or" divider | Card, Input, Button, Separator |
| `login-03` | **Split screen login** — left side has a branded panel (gradient or image with a testimonial quote), right side has the login form | Card, Input, Button |
| `login-04` | **Magic link login** — email-only form that says "We'll send you a login link", with a success state showing a check icon and "Check your email" message | Card, Input, Button |
| `login-05` | **Sign up with steps** — multi-step registration: step 1 is email/password, step 2 is name/avatar, step 3 is preferences. Progress indicator at top | Card, Input, Button, Avatar, Progress |

---

#### Category 3: Dialogs (4 blocks) — Build third

Universal component, every app uses dialogs.

| Block | Description | Key components |
|---|---|---|
| `dialog-01` | **Confirmation dialog** — "Are you sure?" with destructive action styling. Icon at top, description text, Cancel + Confirm buttons | AlertDialog, Button |
| `dialog-02` | **Form dialog** — dialog containing a short form (e.g. "Create project" with name + description fields), with Cancel + Create buttons | Dialog, Input, Textarea, Button, Label |
| `dialog-03` | **Command palette** — ⌘K style search dialog with grouped results (pages, actions, settings), keyboard navigation, and search filtering | Command, Dialog |
| `dialog-04` | **Drawer dialog** — mobile-friendly bottom drawer with a drag handle, used for actions or filters. Falls back to a centered dialog on desktop | Drawer, Button |

---

#### Category 4: Cards (3 blocks) — Build fourth

Versatile and visually appealing. Good for showing design range.

| Block | Description | Key components |
|---|---|---|
| `card-01` | **Product card** — image thumbnail, title, short description, price, and an "Add to cart" button. Hover state lifts the card | Card, Button, Badge |
| `card-02` | **User profile card** — avatar, name, role, bio snippet, and social links row. Optional "Follow" button | Card, Avatar, Button |
| `card-03` | **Pricing card** — plan name, price with billing period toggle (monthly/annual), feature list with check icons, CTA button. "Popular" badge variant | Card, Button, Badge, Switch |

---

#### Category 5: Forms (3 blocks) — Build fifth

Practical, high reuse, and they demonstrate accessibility well.

| Block | Description | Key components |
|---|---|---|
| `form-01` | **Contact form** — name, email, subject dropdown, message textarea, submit button. Clean single-column layout with validation states | Input, Textarea, Select, Button, Label |
| `form-02` | **Settings form** — profile settings layout with sections (avatar upload area, name/email fields, notification toggles, danger zone with delete account) | Input, Switch, Button, Avatar, Separator |
| `form-03` | **Inline editable form** — a display view that switches to edit mode on click. Shows name, email, bio as text, clicking "Edit" turns them into inputs in-place | Input, Textarea, Button |

---

### Build Priority Order

| Order | Block | Reason |
|---|---|---|
| 1 | `stats-01` | Simplest to build, great first screenshot |
| 2 | `stats-02` | Adds Recharts, shows technical range |
| 3 | `stats-05` | Hero block — this is your landing page showpiece |
| 4 | `login-01` | Quick win, universally needed |
| 5 | `login-02` | Builds on login-01 with social buttons |
| 6 | `login-03` | Split screen is visually impressive |
| 7 | `dialog-01` | Simple, essential |
| 8 | `dialog-02` | Form-in-dialog is a common pattern |
| 9 | `dialog-03` | Command palette is a crowd favourite |
| 10 | `card-01` | Product card, quick build |
| 11 | `card-03` | Pricing card, highly shareable |
| 12 | `stats-03` | Fill out the stats category |
| 13 | `stats-04` | Fill out the stats category |
| 14 | `form-01` | Contact form, practical |
| 15 | `form-02` | Settings form, shows depth |
| 16 | `login-04` | Magic link, modern pattern |
| 17 | `login-05` | Multi-step, shows ambition |
| 18 | `dialog-04` | Drawer, mobile-first thinking |
| 19 | `card-02` | Profile card, rounds out the category |
| 20 | `form-03` | Inline edit, nice finishing touch |

### 2.2 — Block Development Workflow

For each block:

1. **Create the component** in `content/blocks/{category}/{block-id}.tsx`
   - Must be self-contained (no cross-block imports — block A must never import from block B)
   - Use only shadcn/ui primitives + Tailwind
   - Ensure full keyboard accessibility
   - Include sensible placeholder/demo content
   - Keep all demo data and helpers inline — only extract to a shared file if 3+ blocks need the same utility
2. **Register in `content/blocks.ts`** — add the block entry with explicit dependency metadata:
   ```typescript
   {
     id: "stats-02",
     category: "stats",
     name: "Stat Cards with Sparkline",
     description: "Stat cards with inline area charts showing trends",
     tags: ["dashboard", "metrics", "charts"],
     registryDependencies: ["card", "badge"],  // shadcn components used
     dependencies: ["recharts"],                // npm packages used
     component: () => import("./blocks/stats/stats-02"),
   }
   ```
3. **Export from category index** in `content/blocks/{category}/index.ts`
4. **Generate registry** — run `bun run generate:registry` to output the JSON
5. **Validate** — run `bun run validate:registry` to check imports match metadata

### 2.3 — Quality Bar

Every block must meet this bar before shipping:

- Fully responsive (mobile → desktop)
- Keyboard navigable
- Proper ARIA attributes where needed
- Clean, readable code (someone will copy-paste this)
- No hardcoded colours outside Tailwind/shadcn theme tokens
- Works in light mode (dark mode support is a nice bonus)
- **Recharts blocks:** wrap in `<ResponsiveContainer>` and handle SSR gracefully (use `"use client"` directive, consider lazy loading charts to avoid hydration mismatches)

---

## Phase 3: Website & Preview System (Week 3)

### 3.1 — Preview Strategy: Isolated Routes

Use the "isolated route" approach — each block renders on its own page at `/preview/{category}/{block}`, and the showcase page embeds it in an iframe. This is the safest approach because:

- Portals (dialogs, drawers, command palettes) behave naturally
- No CSS bleed between blocks
- Focus traps and scroll locks work correctly

Create a standard `<PreviewShell>` wrapper that provides:

- Fixed padding with a neutral background
- A device width toggle (just a `max-width` wrapper for mobile/tablet/desktop)
- `prefers-reduced-motion` support for accessibility testing

### 3.2 — Landing Page

Key elements:

- Hero with tagline: "Panes — Clean, modern UI components" and "Browse components" CTA
- Category grid with block count badges
- "Works on all React frameworks" + "Open Source" trust signals
- Setup instructions (registry config + CLI command)
- Footer with GitHub link

### 3.3 — Block Showcase Pages

Each block page at `/{category}/{block}` needs:

- **Live preview** in an iframe pointing to `/preview/{category}/{block}`
- **Code viewer** with syntax highlighting and a copy button
- **CLI install command** shown prominently: `npx shadcn@latest add @panes/dialog-01`
- **Dependencies listed** (which shadcn primitives + npm packages it uses)

### 3.4 — Registry Modal

A "Setup Registry" modal that shows:

1. The `components.json` registry config to paste
2. The CLI command to add components
3. The MCP server setup command (if applicable)

### 3.5 — SEO Per Block Page (Backfill Post-Launch)

Not required for launch, but add these to each block page over time to turn Panes into a search magnet:

- Short "When to use this" paragraph
- "Accessibility notes" section
- "Related blocks" links (same category + shared tags)
- Proper meta titles and descriptions per page

---

## Phase 4: Automation & Hardening (Week 4)

### 4.1 — Registry Generator (`scripts/generate-registry.ts`)

- Reads `content/blocks.ts` (single source of truth)
- For each block, reads the component source file and inlines the content
- Outputs `files[].path` using the **install path convention** (`components/panes/<category>/<block>.tsx`), not the internal source path
- Outputs individual JSON files to `/public/r/{block-name}.json`
- Outputs a combined `registry.json` manifest

### 4.2 — Validation Script (`scripts/validate-registry.ts`)

Two-layer validation — metadata correctness and import enforcement:

**Metadata checks:**
- Every block in `blocks.ts` has a corresponding component file
- Every component file has an entry in `blocks.ts`
- Every generated JSON file is valid and matches its metadata

**Import enforcement (parse each block's TypeScript imports):**
- Every non-relative package import is listed in `dependencies`
- Every `@/components/ui/*` import is listed in `registryDependencies`
- Every relative import resolves to a file included in the manifest
- No cross-block imports (block A must never import from block B)
- Flag hardcoded colour classes outside Tailwind/shadcn tokens (e.g. `text-red-500`)

Run as part of the build step and in CI.

### 4.3 — Block Validation Command (`scripts/validate-block.ts`)

A per-block dev command for quick checking during development:

```bash
bun run validate:block stats-01
```

Checks: file exists, default export present, no forbidden imports, basic a11y heuristics (e.g. `DialogTitle` present in dialog blocks, `Label` with `htmlFor` in form blocks).

### 4.4 — Snapshot Testing (Cheap Regression Safety)

Server-render each block's preview route and store HTML snapshots per block. Run in CI to catch missing imports, runtime errors, and major markup changes after refactors. Not full visual regression — just "does it render without crashing."

### 4.5 — Markdown Generator (`scripts/generate-markdown.ts`)

- Auto-generates MDX documentation from `blocks.ts` metadata
- Extracts component props and usage examples

### 4.6 — Package Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "bun run generate:registry && next build",
    "generate:registry": "bun run scripts/generate-registry.ts",
    "generate:markdown": "bun run scripts/generate-markdown.ts",
    "validate:registry": "bun run scripts/validate-registry.ts",
    "validate:block": "bun run scripts/validate-block.ts"
  }
}
```

---

## Phase 5: Launch & Distribution (Week 5)

### 5.1 — Pre-Launch Checklist

- [ ] `npx shadcn@latest add @panes/<any-block>` installs cleanly into a fresh project
- [ ] README with clear usage instructions and CLI examples
- [ ] CONTRIBUTING.md explaining how to add blocks
- [ ] MIT LICENSE
- [ ] All registry JSON files validated (imports match metadata)
- [ ] Landing page deployed and responsive
- [ ] OG image and meta tags set for social sharing
- [ ] At least 20 blocks across 5 categories
- [ ] Snapshot tests passing in CI

### 5.2 — Deploy

- **Vercel** for hosting (free tier, instant deploys from GitHub)
- Custom domain: **panes.so**

### 5.3 — Launch Channels

- GitHub — pin the repo, write a solid README
- X/Twitter — thread showing the blocks with screenshots/recordings
- Reddit — r/reactjs, r/webdev, r/nextjs
- Product Hunt — optional, works well for this type of project

### 5.4 — Post-Launch Growth

- Accept community contributions (new blocks in existing categories)
- Add 1–2 new blocks per week to keep the repo active
- Each new category or milestone = a new social post

---

## Phase 6: Expansion (Ongoing)

### Additional Categories to Add Over Time

Each wave should add 1–2 new categories. Prioritise based on what gets requested on GitHub issues.

**Wave 1 (Week 6–7):**

- **Tables** (5 blocks) — simple data table, sortable table, table with row actions, table with filters + search, expandable row table
- **Sidebars** (4 blocks) — collapsible sidebar with icons, sidebar with nested groups, mini sidebar (icon-only with tooltips), sidebar with user profile + logout

**Wave 2 (Week 8–9):**

- **File Upload** (4 blocks) — drag-and-drop zone, file list with progress bars, image upload with preview grid, avatar upload with crop
- **Command Menus** (3 blocks) — app-wide command palette, contextual right-click menu, inline slash-command menu

**Wave 3 (Week 10–11):**

- **AI Chat** (4 blocks) — simple chat interface, chat with message bubbles + timestamps, chat with streaming response animation, chat with file attachment support
- **Empty States** (3 blocks) — illustration + CTA empty state, search "no results" state, error state with retry button

**Wave 4 (Week 12+):**

- **Onboarding** (3 blocks) — welcome modal with steps, checklist sidebar, tooltip tour overlay
- **Notifications** (3 blocks) — toast stack, notification dropdown panel, notification settings page
- **Settings Pages** (3 blocks) — account settings layout, billing/subscription page, team members management

### Potential Enhancements

- **Dark mode toggle** on preview pages
- **Figma file exports** alongside code
- **Responsive preview** (toggle mobile/tablet/desktop)
- **Block search** with filtering by category and dependency
- **MCP server support** for AI-assisted installation

---

## Tech Stack Summary

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui + Radix UI |
| Package manager | Bun |
| Linting | Biome / Ultracite |
| Hosting | Vercel |
| Registry | shadcn CLI compatible JSON |

---

## Timeline Summary

**Key principle: prove the registry install UX with 1 block in week 1, not after building 20.**

| Week | Milestone |
|---|---|
| 1 | Scaffold + build `stats-01` + **prove full install loop end-to-end** |
| 2 | 10 blocks built + preview system working |
| 3 | Remaining 10 blocks + site polish |
| 4 | Automation, validation, snapshot tests, hardening |
| 5 | Public launch on GitHub, social, and community channels |
| 6–7 | Wave 1 expansion: Tables + Sidebars |
| 8–9 | Wave 2 expansion: File Upload + Command Menus |
| 10–11 | Wave 3 expansion: AI Chat + Empty States |
| 12+ | Wave 4 expansion: Onboarding, Notifications, Settings |
