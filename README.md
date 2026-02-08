# Panes

Clean, modern UI components for React. Open-source copy-paste components built with [shadcn/ui](https://ui.shadcn.com) and Tailwind CSS.

Browse and preview at [panes.so](https://panes.so).

## Quick Start

### 1. Add the registry

Add the Panes registry to your `components.json`:

```json
{
  "registries": {
    "@panes": "https://panes.so/r/{name}.json"
  }
}
```

### 2. Install a component

```bash
npx shadcn@latest add @panes/stats-01
```

The component installs to `components/panes/<category>/<block>.tsx` in your project.

## Available Components

### Stats & Metrics

| Component | Description |
|-----------|-------------|
| `stats-01` | Simple stat cards with label, value, and change badge |
| `stats-02` | Stat cards with inline sparkline charts |
| `stats-03` | KPI grid with icons and progress bars |
| `stats-04` | Comparison cards (this period vs last period) |
| `stats-05` | Revenue overview card with bar chart and period tabs |

### Login & Signup

| Component | Description |
|-----------|-------------|
| `login-01` | Simple centered login form |
| `login-02` | Social login with Google/GitHub buttons |
| `login-03` | Split screen login with branded panel |
| `login-04` | Magic link login with success state |
| `login-05` | Multi-step signup with progress indicator |

### Dialogs

| Component | Description |
|-----------|-------------|
| `dialog-01` | Confirmation dialog with destructive action |
| `dialog-02` | Form dialog for creating items |
| `dialog-03` | Command palette with search and keyboard nav |
| `dialog-04` | Mobile-friendly drawer with filters |

### Cards

| Component | Description |
|-----------|-------------|
| `card-01` | Product card with image, price, and add to cart |
| `card-02` | User profile card with avatar and social links |
| `card-03` | Pricing card with monthly/annual toggle |

### Forms

| Component | Description |
|-----------|-------------|
| `form-01` | Contact form with subject dropdown and message |
| `form-02` | Settings form with avatar, toggles, and danger zone |
| `form-03` | Inline editable form with display/edit modes |

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
| `npm run validate:registry` | Validate all blocks and registry |
| `npm run validate:block <id>` | Validate a single block |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new components.

## License

[MIT](LICENSE)
