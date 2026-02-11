# Contributing to Scenes

Thanks for your interest in contributing. This guide covers everything you need to add a new scene or improve an existing one.

## Setup

```bash
git clone https://github.com/MaxLaven91/scenes.git
cd scenes
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Adding a New Scene

### 1. Create the component

Create `content/scenes/<category>/<scene-id>.tsx`. Each scene is a **full-page composition** — not an individual component.

**Rules:**

- Must have a `default` export (the scene component)
- Must be self-contained (no imports from other scenes)
- Use only shadcn/ui primitives + Tailwind for styling
- Include realistic placeholder/demo content (company names, plausible numbers, proper dates)
- Keep all demo data inline in the file
- Should be a complete page (300-500 lines) with polished interactions
- Add `"use client"` since scenes are interactive
- Use `motion-reduce:transition-none` on all animations

### 2. Register in scenes.ts

Add your scene entry to `content/scenes.ts`:

```typescript
{
  id: "my-scene-01",
  category: "dashboard",
  name: "My Scene",
  description: "A full-page scene with sidebar, charts, and data table",
  tags: ["dashboard", "charts", "table"],
  registryDependencies: ["card", "button", "table", "chart"],
  dependencies: ["lucide-react", "recharts"],
  component: () => import("./scenes/dashboard/my-scene-01"),
}
```

- `registryDependencies`: shadcn/ui components your scene imports (e.g., `card`, `button`)
- `dependencies`: npm packages your scene imports (e.g., `recharts`, `lucide-react`)

### 3. Generate and validate

```bash
npm run generate:registry
npm run validate:scene my-scene-01
```

Fix any errors before submitting.

### 4. Test the preview

Visit `http://localhost:3000/preview/<category>/<scene-id>` to confirm the scene renders correctly in isolation.

## Quality Bar

Every scene must meet these standards:

- **Responsive** from mobile to desktop
- **Keyboard navigable** with proper focus management
- **Accessible** with ARIA attributes where needed
- **Clean code** that someone would want to copy-paste
- **Theme tokens only** (no hardcoded colors outside Tailwind/shadcn)
- **Forms** wrapped in `<form>` with `htmlFor` on all labels
- **Icon buttons** must have `aria-label`
- **Decorative SVGs** must have `aria-hidden="true"`
- **Recharts** components must use `isAnimationActive={false}` for SSR safety

## Validation Commands

| Command | What it checks |
|---------|---------------|
| `npm run validate:registry` | All scenes: source files, registry JSON, imports match metadata |
| `npm run validate:scene <id>` | Single scene: detailed validation with import analysis |

## Linting

We use [Biome](https://biomejs.dev) for formatting and linting:

```bash
npx @biomejs/biome check .
npx @biomejs/biome check --write .
```

## PR Checklist

Before submitting a pull request:

- [ ] Scene renders correctly at `/preview/<category>/<scene-id>`
- [ ] `npm run validate:scene <scene-id>` passes with 0 errors
- [ ] `npm run validate:registry` passes with 0 errors
- [ ] `npx @biomejs/biome check .` passes
- [ ] `npm run build` succeeds
