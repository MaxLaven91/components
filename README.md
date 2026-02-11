# Scenes

Full-page, production-ready UI compositions for SaaS. Built with [shadcn/ui](https://ui.shadcn.com) and Tailwind CSS. Not individual components — complete pages with polished interactions.

Browse and preview at [scenes.so](https://scenes.so).

## Quick Start

### 1. Add the registry

Add the Scenes registry to your `components.json`:

```json
{
  "registries": {
    "@scenes": "https://scenes.so/r/{name}.json"
  }
}
```

### 2. Install a scene

```bash
npx shadcn@latest add @scenes/dashboard-01
```

The scene installs to `components/scenes/<category>/<scene>.tsx` in your project.

## Available Scenes

### Dashboard

| Scene | Description |
|-------|-------------|
| `dashboard-01` | Complete SaaS dashboard with collapsible sidebar, stat cards, revenue chart, and orders table |

### Authentication

| Scene | Description |
|-------|-------------|
| `auth-01` | Branded split-screen login and signup with social OAuth, magic link, and animated state transitions |

### Settings

| Scene | Description |
|-------|-------------|
| `settings-01` | Full settings page with tabs for profile, notifications, billing, and danger zone |

## Requirements

- React 18+
- Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com) initialized in your project

## Development

```bash
npm install
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Generate registry + production build |
| `npm run generate:registry` | Generate registry JSON files |
| `npm run validate:registry` | Validate all scenes and registry |
| `npm run validate:scene <id>` | Validate a single scene |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new scenes.

## License

[MIT](LICENSE)
