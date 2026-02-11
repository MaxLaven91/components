import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// Known shadcn/ui component names (what registryDependencies can reference)
const KNOWN_SHADCN_COMPONENTS = new Set([
  "accordion",
  "alert-dialog",
  "avatar",
  "badge",
  "button",
  "card",
  "chart",
  "checkbox",
  "command",
  "dialog",
  "drawer",
  "dropdown-menu",
  "input",
  "label",
  "progress",
  "select",
  "separator",
  "switch",
  "table",
  "tabs",
  "textarea",
  "tooltip",
]);

// Known npm packages that scenes can use
const KNOWN_NPM_PACKAGES = new Set(["lucide-react", "recharts"]);

interface SceneEntry {
  id: string;
  category: string;
  registryDependencies: string[];
  dependencies: string[];
}

// Parse scenes.ts to extract scene metadata (simple regex parsing — no JSX needed)
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

// Parse imports from a TypeScript/TSX file
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
      // Extract shadcn component name from path
      const componentName = specifier.replace("@/components/ui/", "");
      shadcnImports.push(componentName);
    } else if (specifier.startsWith(".") || specifier.startsWith("@/")) {
      relativeImports.push(specifier);
    } else if (!specifier.startsWith("react") && !specifier.startsWith("next")) {
      // External npm package — extract the package name (handle scoped packages)
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
  console.log("Validating registry...\n");

  const sceneEntries = parseScenesTs();
  console.log(`  Found ${sceneEntries.length} scene(s) in scenes.ts\n`);

  // --- Metadata checks ---
  console.log("  [1/4] Checking scene source files exist...");
  for (const scene of sceneEntries) {
    const filePath = path.join(ROOT, "content/scenes", scene.category, `${scene.id}.tsx`);
    if (!fs.existsSync(filePath)) {
      error(`Scene "${scene.id}" registered in scenes.ts but file not found: ${filePath}`);
    }
  }

  // Check for orphan files (component files with no scenes.ts entry)
  console.log("  [2/4] Checking for orphan component files...");
  const sceneDirs = ["dashboard", "auth", "settings", "pricing", "onboarding", "error", "analytics"];
  for (const dir of sceneDirs) {
    const dirPath = path.join(ROOT, "content/scenes", dir);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs
      .readdirSync(dirPath)
      .filter((f) => f.endsWith(".tsx") && !f.startsWith("index"));
    for (const file of files) {
      const sceneId = file.replace(".tsx", "");
      if (!sceneEntries.find((s) => s.id === sceneId)) {
        warn(`File "${dir}/${file}" has no entry in scenes.ts`);
      }
    }
  }

  // Check generated registry JSON files exist
  console.log("  [3/4] Checking generated registry JSON files...");
  const registryDir = path.join(ROOT, "public/r");
  if (!fs.existsSync(registryDir)) {
    error("Registry directory public/r/ does not exist. Run npm run generate:registry first.");
  } else {
    for (const scene of sceneEntries) {
      const jsonPath = path.join(registryDir, `${scene.id}.json`);
      if (!fs.existsSync(jsonPath)) {
        error(`Registry JSON not found for "${scene.id}": ${jsonPath}`);
      } else {
        // Validate JSON structure
        const json = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
        if (json.name !== scene.id) {
          error(
            `Registry JSON name mismatch for "${scene.id}": expected "${scene.id}", got "${json.name}"`,
          );
        }
        if (!json.files || json.files.length === 0) {
          error(`Registry JSON for "${scene.id}" has no files`);
        }
        if (json.files?.[0]?.path !== `components/scenes/${scene.category}/${scene.id}.tsx`) {
          error(
            `Registry JSON install path mismatch for "${scene.id}": expected "components/scenes/${scene.category}/${scene.id}.tsx", got "${json.files?.[0]?.path}"`,
          );
        }
      }
    }
  }

  // --- Import enforcement ---
  console.log("  [4/4] Checking import enforcement...\n");
  for (const scene of sceneEntries) {
    const categoryDir = scene.category;
    const filePath = path.join(ROOT, "content/scenes", categoryDir, `${scene.id}.tsx`);
    if (!fs.existsSync(filePath)) continue;

    const { shadcnImports, packageImports, relativeImports } = parseImports(filePath);

    // Check shadcn imports match registryDependencies
    for (const imp of shadcnImports) {
      if (!scene.registryDependencies.includes(imp)) {
        error(
          `${scene.id}: imports @/components/ui/${imp} but "${imp}" not in registryDependencies`,
        );
      }
    }

    // Check package imports match dependencies
    for (const pkg of packageImports) {
      if (!scene.dependencies.includes(pkg)) {
        error(`${scene.id}: imports "${pkg}" but it's not in dependencies`);
      }
    }

    // Check for cross-scene imports
    for (const rel of relativeImports) {
      if (rel.includes("/scenes/") && !rel.startsWith(`@/content/scenes/${categoryDir}`)) {
        error(`${scene.id}: cross-scene import detected: "${rel}"`);
      }
    }

    // Check registryDependencies are known shadcn components
    for (const dep of scene.registryDependencies) {
      if (!KNOWN_SHADCN_COMPONENTS.has(dep)) {
        warn(`${scene.id}: registryDependency "${dep}" is not a known shadcn/ui component`);
      }
    }

    // Check dependencies are known npm packages
    for (const dep of scene.dependencies) {
      if (!KNOWN_NPM_PACKAGES.has(dep)) {
        warn(`${scene.id}: dependency "${dep}" is not in the known npm packages list`);
      }
    }
  }

  // Summary
  console.log(`\n  Validation complete: ${errors} error(s), ${warnings} warning(s)`);
  if (errors > 0) {
    process.exit(1);
  }
}

main();
