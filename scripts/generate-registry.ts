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
  {
    id: "stats-01",
    category: "stats",
    name: "Simple Stat Cards",
    description: "3-4 cards in a row showing a label, large number, and percentage change badge",
    registryDependencies: ["card", "badge"],
    dependencies: ["lucide-react"],
    file: "content/blocks/stats/stats-01.tsx",
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
    fs.writeFileSync(outPath, JSON.stringify(item, null, 2) + "\n");
    registryItems.push(item);
    console.log(`  Generated ${block.id}.json`);
  }

  // Write combined registry.json
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "panes",
    homepage: "https://panes.so",
    items: registryItems,
  };

  fs.writeFileSync(
    path.join(ROOT, "public", "r", "index.json"),
    JSON.stringify(registry, null, 2) + "\n",
  );

  console.log(`\n  Registry generated: ${registryItems.length} block(s) → public/r/`);
}

main();
