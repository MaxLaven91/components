# Contributing to Panes

Thanks for your interest in contributing. This guide covers everything you need to add a new block or improve an existing one.

## Setup

```bash
git clone https://github.com/MaxLaven91/panes.git
cd panes
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Adding a New Block

### 1. Create the component

Create `content/blocks/<category>/<block-id>.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyBlock() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Block</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

**Rules:**

- Must have a `default` export (the block component)
- Must be self-contained (no imports from other blocks)
- Use only shadcn/ui primitives + Tailwind for styling
- Include realistic placeholder/demo content
- Keep all demo data inline in the file

### 2. Register in blocks.ts

Add your block entry to `content/blocks.ts`:

```typescript
{
  id: "my-block-01",
  category: "cards",
  name: "My Block",
  description: "A short description of the block",
  tags: ["card", "layout"],
  registryDependencies: ["card", "button"],
  dependencies: [],
  component: () => import("./blocks/cards/my-block-01"),
}
```

- `registryDependencies`: shadcn/ui components your block imports (e.g., `card`, `button`)
- `dependencies`: npm packages your block imports (e.g., `recharts`, `lucide-react`)

### 3. Generate and validate

```bash
npm run generate:registry
npm run validate:block my-block-01
```

Fix any errors before submitting.

### 4. Test the preview

Visit `http://localhost:3000/preview/<category>/<block-id>` to confirm the block renders correctly in isolation.

## Quality Bar

Every block must meet these standards:

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
| `npm run validate:registry` | All blocks: source files, registry JSON, imports match metadata |
| `npm run validate:block <id>` | Single block: detailed validation with import analysis |

## Linting

We use [Biome](https://biomejs.dev) for formatting and linting:

```bash
npx @biomejs/biome check .
npx @biomejs/biome check --write .
```

## PR Checklist

Before submitting a pull request:

- [ ] Block renders correctly at `/preview/<category>/<block-id>`
- [ ] `npm run validate:block <block-id>` passes with 0 errors
- [ ] `npm run validate:registry` passes with 0 errors
- [ ] `npx @biomejs/biome check .` passes
- [ ] `npm run build` succeeds
