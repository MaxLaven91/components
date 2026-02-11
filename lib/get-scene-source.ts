import fs from "node:fs";
import path from "node:path";

const scenePaths: Record<string, string> = {
  "dashboard-01": "content/scenes/dashboard/dashboard-01.tsx",
  "auth-01": "content/scenes/auth/auth-01.tsx",
  "settings-01": "content/scenes/settings/settings-01.tsx",
  "pricing-01": "content/scenes/pricing/pricing-01.tsx",
  "onboarding-01": "content/scenes/onboarding/onboarding-01.tsx",
  "error-01": "content/scenes/error/error-01.tsx",
  "analytics-01": "content/scenes/analytics/analytics-01.tsx",
};

export function getSceneSource(sceneId: string): string {
  const relativePath = scenePaths[sceneId];
  if (!relativePath) return "";
  const fullPath = path.join(process.cwd(), relativePath);
  return fs.readFileSync(fullPath, "utf-8");
}
