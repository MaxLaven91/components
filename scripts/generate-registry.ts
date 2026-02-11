import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We can't import scenes.ts directly (it has JSX/import() calls),
// so we maintain a parallel list here. The validate script checks they stay in sync.

interface SceneMeta {
  id: string;
  category: string;
  name: string;
  description: string;
  registryDependencies: string[];
  dependencies: string[];
  file: string; // relative to project root
}

const SCENES: SceneMeta[] = [
  {
    id: "dashboard-01",
    category: "dashboard",
    name: "SaaS Dashboard",
    description:
      "Complete dashboard with collapsible sidebar, stat cards, revenue chart, and orders table",
    registryDependencies: [
      "badge",
      "button",
      "card",
      "chart",
      "dropdown-menu",
      "separator",
      "table",
      "tabs",
      "tooltip",
    ],
    dependencies: ["lucide-react", "recharts"],
    file: "content/scenes/dashboard/dashboard-01.tsx",
  },
  {
    id: "auth-01",
    category: "auth",
    name: "Split Screen Auth",
    description:
      "Branded split-screen login and signup with social OAuth, magic link, and animated state transitions",
    registryDependencies: ["button", "card", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    file: "content/scenes/auth/auth-01.tsx",
  },
  {
    id: "settings-01",
    category: "settings",
    name: "Account Settings",
    description:
      "Full settings page with tabs for profile, notifications, billing, and danger zone",
    registryDependencies: [
      "alert-dialog",
      "avatar",
      "badge",
      "button",
      "card",
      "input",
      "label",
      "progress",
      "separator",
      "switch",
      "tabs",
    ],
    dependencies: ["lucide-react"],
    file: "content/scenes/settings/settings-01.tsx",
  },
];

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "r");

function rewriteImports(source: string): string {
  // Rewrite @/components/ui/* imports to shadcn convention
  // These resolve in the consumer's project via their own components.json aliases
  return source;
}

function generateItemJson(scene: SceneMeta): object {
  const filePath = path.join(ROOT, scene.file);
  const content = fs.readFileSync(filePath, "utf-8");

  // Install path convention: components/scenes/<category>/<scene-id>.tsx
  const installPath = `components/scenes/${scene.category}/${scene.id}.tsx`;

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: scene.id,
    type: "registry:block",
    title: scene.name,
    description: scene.description,
    registryDependencies: scene.registryDependencies,
    dependencies: scene.dependencies,
    files: [
      {
        path: installPath,
        type: "registry:component",
        content: rewriteImports(content),
      },
    ],
    categories: [scene.category],
  };
}

function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const registryItems: object[] = [];

  for (const scene of SCENES) {
    const item = generateItemJson(scene);
    const outPath = path.join(OUT_DIR, `${scene.id}.json`);
    fs.writeFileSync(outPath, `${JSON.stringify(item, null, 2)}\n`);
    registryItems.push(item);
    console.log(`  Generated ${scene.id}.json`);
  }

  // Write combined registry.json
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "scenes",
    homepage: "https://scenes.so",
    items: registryItems,
  };

  fs.writeFileSync(
    path.join(ROOT, "public", "r", "index.json"),
    `${JSON.stringify(registry, null, 2)}\n`,
  );

  console.log(`\n  Registry generated: ${registryItems.length} scene(s) → public/r/`);
}

main();
