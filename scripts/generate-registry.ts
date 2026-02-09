import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We can't import blocks.ts directly (it has JSX/import() calls),
// so we maintain a parallel list here. The validate script checks they stay in sync.

interface BlockMeta {
  id: string;
  category: string;
  name: string;
  description: string;
  registryDependencies: string[];
  dependencies: string[];
  file: string; // relative to project root
}

const BLOCKS: BlockMeta[] = [
  // Stats & Metrics
  {
    id: "stats-01",
    category: "stats",
    name: "Simple Stat Cards",
    description: "3-4 cards in a row showing a label, large number, and percentage change badge",
    registryDependencies: ["card", "badge"],
    dependencies: ["lucide-react"],
    file: "content/blocks/stats/stats-01.tsx",
  },
  {
    id: "stats-02",
    category: "stats",
    name: "Stat Cards with Sparkline",
    description: "Stat cards with inline area charts showing trends",
    registryDependencies: ["card", "badge", "chart"],
    dependencies: ["lucide-react", "recharts"],
    file: "content/blocks/stats/stats-02.tsx",
  },
  {
    id: "stats-03",
    category: "stats",
    name: "KPI Grid",
    description: "Grid of metric tiles with icons, values, and progress bars",
    registryDependencies: ["card", "progress"],
    dependencies: ["lucide-react"],
    file: "content/blocks/stats/stats-03.tsx",
  },
  {
    id: "stats-04",
    category: "stats",
    name: "Stats with Comparison",
    description: "Side-by-side cards showing this period vs last period with a delta indicator",
    registryDependencies: ["card", "badge"],
    dependencies: ["lucide-react"],
    file: "content/blocks/stats/stats-04.tsx",
  },
  {
    id: "stats-05",
    category: "stats",
    name: "Revenue Overview Card",
    description: "Large card with headline number, bar chart, and filter tabs",
    registryDependencies: ["card", "tabs", "chart"],
    dependencies: ["recharts"],
    file: "content/blocks/stats/stats-05.tsx",
  },

  // Login & Signup
  {
    id: "login-01",
    category: "login",
    name: "Simple Centered Login",
    description: "Clean minimal login form with email, password, and forgot password link",
    registryDependencies: ["card", "input", "button", "label"],
    dependencies: [],
    file: "content/blocks/login/login-01.tsx",
  },
  {
    id: "login-02",
    category: "login",
    name: "Social Login",
    description: "Login with Google/GitHub OAuth buttons and an email/password fallback",
    registryDependencies: ["card", "input", "button", "label", "separator"],
    dependencies: [],
    file: "content/blocks/login/login-02.tsx",
  },
  {
    id: "login-03",
    category: "login",
    name: "Split Screen Login",
    description: "Left branded panel with testimonial, right side login form",
    registryDependencies: ["input", "button", "label"],
    dependencies: [],
    file: "content/blocks/login/login-03.tsx",
  },
  {
    id: "login-04",
    category: "login",
    name: "Magic Link Login",
    description: "Email-only login with magic link and a success confirmation state",
    registryDependencies: ["card", "input", "button", "label"],
    dependencies: ["lucide-react"],
    file: "content/blocks/login/login-04.tsx",
  },
  {
    id: "login-05",
    category: "login",
    name: "Sign Up with Steps",
    description: "Multi-step registration: email/password, profile, and preferences",
    registryDependencies: ["card", "input", "button", "label", "avatar", "progress"],
    dependencies: [],
    file: "content/blocks/login/login-05.tsx",
  },

  // Dialogs
  {
    id: "dialog-01",
    category: "dialogs",
    name: "Confirmation Dialog",
    description:
      "Destructive action confirmation with icon, description, and cancel/confirm buttons",
    registryDependencies: ["alert-dialog", "button"],
    dependencies: ["lucide-react"],
    file: "content/blocks/dialogs/dialog-01.tsx",
  },
  {
    id: "dialog-02",
    category: "dialogs",
    name: "Form Dialog",
    description: "Dialog containing a short form with name and description fields",
    registryDependencies: ["dialog", "input", "textarea", "button", "label"],
    dependencies: [],
    file: "content/blocks/dialogs/dialog-02.tsx",
  },
  {
    id: "dialog-03",
    category: "dialogs",
    name: "Command Palette",
    description: "Command-K style search with grouped results and keyboard shortcuts",
    registryDependencies: ["command"],
    dependencies: ["lucide-react"],
    file: "content/blocks/dialogs/dialog-03.tsx",
  },
  {
    id: "dialog-04",
    category: "dialogs",
    name: "Drawer Dialog",
    description: "Mobile-friendly bottom drawer with filter options and drag handle",
    registryDependencies: ["drawer", "button"],
    dependencies: [],
    file: "content/blocks/dialogs/dialog-04.tsx",
  },

  // Cards
  {
    id: "card-01",
    category: "cards",
    name: "Product Card",
    description: "Product card with image placeholder, title, description, price, and add to cart",
    registryDependencies: ["card", "button", "badge"],
    dependencies: ["lucide-react"],
    file: "content/blocks/cards/card-01.tsx",
  },
  {
    id: "card-02",
    category: "cards",
    name: "User Profile Card",
    description: "Profile card with avatar, name, role, bio, social links, and follow button",
    registryDependencies: ["card", "avatar", "button"],
    dependencies: ["lucide-react"],
    file: "content/blocks/cards/card-02.tsx",
  },
  {
    id: "card-03",
    category: "cards",
    name: "Pricing Card",
    description: "Pricing plan card with monthly/annual toggle, feature list, and CTA",
    registryDependencies: ["card", "button", "badge", "switch", "label"],
    dependencies: ["lucide-react"],
    file: "content/blocks/cards/card-03.tsx",
  },

  // Forms
  {
    id: "form-01",
    category: "forms",
    name: "Contact Form",
    description: "Contact form with name, email, subject dropdown, message, and submit",
    registryDependencies: ["card", "input", "textarea", "select", "button", "label"],
    dependencies: [],
    file: "content/blocks/forms/form-01.tsx",
  },
  {
    id: "form-02",
    category: "forms",
    name: "Settings Form",
    description: "Profile settings with avatar, name/email, notification toggles, and danger zone",
    registryDependencies: ["card", "input", "button", "avatar", "separator", "switch", "label"],
    dependencies: [],
    file: "content/blocks/forms/form-02.tsx",
  },
  {
    id: "form-03",
    category: "forms",
    name: "Inline Editable Form",
    description: "Display view that switches to edit mode on click with save/cancel",
    registryDependencies: ["card", "input", "textarea", "button", "label"],
    dependencies: ["lucide-react"],
    file: "content/blocks/forms/form-03.tsx",
  },

  // Tables
  {
    id: "table-01",
    category: "tables",
    name: "Simple Data Table",
    description: "Clean minimal table with 5 columns and formatted numbers",
    registryDependencies: ["card", "table"],
    dependencies: [],
    file: "content/blocks/tables/table-01.tsx",
  },
  {
    id: "table-02",
    category: "tables",
    name: "Status & Actions Table",
    description: "Data table with status badges and row action dropdown menus",
    registryDependencies: ["card", "table", "badge", "button", "dropdown-menu"],
    dependencies: ["lucide-react"],
    file: "content/blocks/tables/table-02.tsx",
  },
  {
    id: "table-03",
    category: "tables",
    name: "Sortable Table",
    description: "Click column headers to sort with arrow indicators",
    registryDependencies: ["card", "table", "button"],
    dependencies: ["lucide-react"],
    file: "content/blocks/tables/table-03.tsx",
  },
  {
    id: "table-04",
    category: "tables",
    name: "Filterable Table",
    description: "Search input and category filter dropdown to narrow rows",
    registryDependencies: ["card", "table", "input", "select", "badge"],
    dependencies: [],
    file: "content/blocks/tables/table-04.tsx",
  },
  {
    id: "table-05",
    category: "tables",
    name: "Full-Featured Table",
    description: "Search, pagination, and bulk checkbox selection",
    registryDependencies: ["card", "table", "input", "button", "checkbox", "badge"],
    dependencies: [],
    file: "content/blocks/tables/table-05.tsx",
  },

  // Sidebars
  {
    id: "sidebar-01",
    category: "sidebars",
    name: "Simple Sidebar",
    description: "Navigation sidebar with icons and active state",
    registryDependencies: ["button", "separator"],
    dependencies: ["lucide-react"],
    file: "content/blocks/sidebars/sidebar-01.tsx",
  },
  {
    id: "sidebar-02",
    category: "sidebars",
    name: "Grouped Sidebar",
    description: "Sidebar with grouped sections, headers, and count badges",
    registryDependencies: ["button", "separator", "badge"],
    dependencies: ["lucide-react"],
    file: "content/blocks/sidebars/sidebar-02.tsx",
  },
  {
    id: "sidebar-03",
    category: "sidebars",
    name: "Collapsible Sidebar",
    description: "Toggle between full and icon-only mode with tooltips",
    registryDependencies: ["button", "separator", "tooltip"],
    dependencies: ["lucide-react"],
    file: "content/blocks/sidebars/sidebar-03.tsx",
  },
  {
    id: "sidebar-04",
    category: "sidebars",
    name: "Profile Sidebar",
    description: "User profile avatar at top, nav items, and logout at bottom",
    registryDependencies: ["button", "separator", "avatar", "badge"],
    dependencies: ["lucide-react"],
    file: "content/blocks/sidebars/sidebar-04.tsx",
  },
];

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "r");

function rewriteImports(source: string): string {
  // Rewrite @/components/ui/* imports to shadcn convention
  // These resolve in the consumer's project via their own components.json aliases
  return source;
}

function generateItemJson(block: BlockMeta): object {
  const filePath = path.join(ROOT, block.file);
  const content = fs.readFileSync(filePath, "utf-8");

  // Install path convention: components/panes/<category>/<block-id>.tsx
  const installPath = `components/panes/${block.category}/${block.id}.tsx`;

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: block.id,
    type: "registry:block",
    title: block.name,
    description: block.description,
    registryDependencies: block.registryDependencies,
    dependencies: block.dependencies,
    files: [
      {
        path: installPath,
        type: "registry:component",
        content: rewriteImports(content),
      },
    ],
    categories: [block.category],
  };
}

function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const registryItems: object[] = [];

  for (const block of BLOCKS) {
    const item = generateItemJson(block);
    const outPath = path.join(OUT_DIR, `${block.id}.json`);
    fs.writeFileSync(outPath, `${JSON.stringify(item, null, 2)}\n`);
    registryItems.push(item);
    console.log(`  Generated ${block.id}.json`);
  }

  // Write combined registry.json
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "components",
    homepage: "https://components.so",
    items: registryItems,
  };

  fs.writeFileSync(
    path.join(ROOT, "public", "r", "index.json"),
    `${JSON.stringify(registry, null, 2)}\n`,
  );

  console.log(`\n  Registry generated: ${registryItems.length} block(s) → public/r/`);
}

main();
