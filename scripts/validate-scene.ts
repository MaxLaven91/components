import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const sceneId = process.argv[2];

if (!sceneId) {
  console.error("Usage: npx tsx scripts/validate-scene.ts <scene-id>");
  console.error("Example: npx tsx scripts/validate-scene.ts stats-01");
  process.exit(1);
}

// Known shadcn/ui component names
const KNOWN_SHADCN_COMPONENTS = new Set([
  "alert-dialog",
  "avatar",
  "badge",
  "button",
  "card",
  "chart",
  "command",
  "dialog",
  "drawer",
  "input",
  "label",
  "progress",
  "select",
  "separator",
  "switch",
  "tabs",
  "textarea",
]);

const KNOWN_NPM_PACKAGES = new Set(["lucide-react", "recharts"]);

interface SceneEntry {
  id: string;
  category: string;
  registryDependencies: string[];
  dependencies: string[];
}

function parseScenesTs(): SceneEntry[] {
  const content = fs.readFileSync(path.join(ROOT, "content/scenes.ts"), "utf-8");
  const entries: SceneEntry[] = [];

  const sceneRegex =
    /\{\s*id:\s*"([^"]+)",\s*category:\s*"([^"]+)"[\s\S]*?registryDependencies:\s*\[([^\]]*)\][\s\S]*?dependencies:\s*\[([^\]]*)\]/g;

  for (const match of content.matchAll(sceneRegex)) {
    const id = match[1];
    const category = match[2];
    const registryDeps = match[3]
      .split(",")
      .map((s) => s.trim().replace(/"/g, ""))
      .filter(Boolean);
    const deps = match[4]
      .split(",")
      .map((s) => s.trim().replace(/"/g, ""))
      .filter(Boolean);
    entries.push({ id, category, registryDependencies: registryDeps, dependencies: deps });
  }

  return entries;
}

function parseImports(filePath: string): {
  shadcnImports: string[];
  packageImports: string[];
  relativeImports: string[];
} {
  const content = fs.readFileSync(filePath, "utf-8");
  const shadcnImports: string[] = [];
  const packageImports: string[] = [];
  const relativeImports: string[] = [];

  const importRegex = /import\s+(?:[\s\S]*?)\s+from\s+["']([^"']+)["']/g;

  for (const match of content.matchAll(importRegex)) {
    const specifier = match[1];

    if (specifier.startsWith("@/components/ui/")) {
      const componentName = specifier.replace("@/components/ui/", "");
      shadcnImports.push(componentName);
    } else if (specifier.startsWith(".") || specifier.startsWith("@/")) {
      relativeImports.push(specifier);
    } else if (!specifier.startsWith("react") && !specifier.startsWith("next")) {
      const packageName = specifier.startsWith("@")
        ? specifier.split("/").slice(0, 2).join("/")
        : specifier.split("/")[0];
      packageImports.push(packageName);
    }
  }

  return { shadcnImports, packageImports, relativeImports };
}

let errors = 0;
let warnings = 0;

function error(msg: string) {
  console.error(`  ERROR: ${msg}`);
  errors++;
}

function warn(msg: string) {
  console.warn(`  WARN:  ${msg}`);
  warnings++;
}

function main() {
  console.log(`\nValidating scene "${sceneId}"...\n`);

  const allScenes = parseScenesTs();
  const scene = allScenes.find((s) => s.id === sceneId);

  if (!scene) {
    console.error(`  Scene "${sceneId}" not found in content/scenes.ts`);
    console.error(`  Available scenes: ${allScenes.map((s) => s.id).join(", ")}`);
    process.exit(1);
  }

  // 1. Source file exists
  const filePath = path.join(ROOT, "content/scenes", scene.category, `${scene.id}.tsx`);
  if (!fs.existsSync(filePath)) {
    error(`Source file not found: content/scenes/${scene.category}/${scene.id}.tsx`);
  } else {
    console.log(`  Source file: content/scenes/${scene.category}/${scene.id}.tsx`);
  }

  // 2. Registry JSON exists and is valid
  const jsonPath = path.join(ROOT, "public/r", `${scene.id}.json`);
  if (!fs.existsSync(jsonPath)) {
    error(`Registry JSON not found: public/r/${scene.id}.json (run npm run generate:registry)`);
  } else {
    const json = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    if (json.name !== scene.id) {
      error(`Registry JSON name mismatch: expected "${scene.id}", got "${json.name}"`);
    }
    if (!json.files || json.files.length === 0) {
      error("Registry JSON has no files");
    }
    const expectedPath = `components/scenes/${scene.category}/${scene.id}.tsx`;
    if (json.files?.[0]?.path !== expectedPath) {
      error(
        `Registry JSON install path mismatch: expected "${expectedPath}", got "${json.files?.[0]?.path}"`,
      );
    }
    console.log(`  Registry JSON: public/r/${scene.id}.json`);
  }

  // 3. Import enforcement
  if (fs.existsSync(filePath)) {
    const { shadcnImports, packageImports, relativeImports } = parseImports(filePath);

    // Check shadcn imports match registryDependencies
    for (const imp of shadcnImports) {
      if (!scene.registryDependencies.includes(imp)) {
        error(`Imports @/components/ui/${imp} but "${imp}" not in registryDependencies`);
      }
    }

    // Check declared registryDependencies are actually imported
    for (const dep of scene.registryDependencies) {
      if (!shadcnImports.includes(dep)) {
        warn(`registryDependency "${dep}" declared but not imported`);
      }
    }

    // Check package imports match dependencies
    for (const pkg of packageImports) {
      if (!scene.dependencies.includes(pkg)) {
        error(`Imports "${pkg}" but it's not in dependencies`);
      }
    }

    // Check declared dependencies are actually imported
    for (const dep of scene.dependencies) {
      if (!packageImports.includes(dep)) {
        warn(`Dependency "${dep}" declared but not imported`);
      }
    }

    // Check for cross-scene imports
    for (const rel of relativeImports) {
      if (rel.includes("/scenes/") && !rel.startsWith(`@/content/scenes/${scene.category}`)) {
        error(`Cross-scene import detected: "${rel}"`);
      }
    }

    // Check registryDependencies are known
    for (const dep of scene.registryDependencies) {
      if (!KNOWN_SHADCN_COMPONENTS.has(dep)) {
        warn(`registryDependency "${dep}" is not a known shadcn/ui component`);
      }
    }

    // Check dependencies are known
    for (const dep of scene.dependencies) {
      if (!KNOWN_NPM_PACKAGES.has(dep)) {
        warn(`Dependency "${dep}" is not in the known npm packages list`);
      }
    }

    console.log(
      `  shadcn imports: ${shadcnImports.length > 0 ? shadcnImports.join(", ") : "(none)"}`,
    );
    console.log(
      `  npm imports: ${packageImports.length > 0 ? packageImports.join(", ") : "(none)"}`,
    );
  }

  // Summary
  console.log(`\n  Result: ${errors} error(s), ${warnings} warning(s)`);
  if (errors > 0) {
    process.exit(1);
  } else {
    console.log("  Scene is valid.\n");
  }
}

main();
