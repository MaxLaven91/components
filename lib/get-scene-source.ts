import fs from "node:fs";
import path from "node:path";

const scenePaths: Record<string, string> = {
  "dashboard-01": "content/scenes/dashboard/dashboard-01.tsx",
  "auth-01": "content/scenes/auth/auth-01.tsx",
  "settings-01": "content/scenes/settings/settings-01.tsx",
};

export function getSceneSource(sceneId: string): string {
  const relativePath = scenePaths[sceneId];
  if (!relativePath) return "";
  const fullPath = path.join(process.cwd(), relativePath);
  return fs.readFileSync(fullPath, "utf-8");
}
