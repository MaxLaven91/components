import fs from "node:fs";
import path from "node:path";

const blockPaths: Record<string, string> = {
  "stats-01": "content/blocks/stats/stats-01.tsx",
  "stats-02": "content/blocks/stats/stats-02.tsx",
  "stats-03": "content/blocks/stats/stats-03.tsx",
  "stats-04": "content/blocks/stats/stats-04.tsx",
  "stats-05": "content/blocks/stats/stats-05.tsx",
  "login-01": "content/blocks/login/login-01.tsx",
  "login-02": "content/blocks/login/login-02.tsx",
  "login-03": "content/blocks/login/login-03.tsx",
  "login-04": "content/blocks/login/login-04.tsx",
  "login-05": "content/blocks/login/login-05.tsx",
  "dialog-01": "content/blocks/dialogs/dialog-01.tsx",
  "dialog-02": "content/blocks/dialogs/dialog-02.tsx",
  "dialog-03": "content/blocks/dialogs/dialog-03.tsx",
  "dialog-04": "content/blocks/dialogs/dialog-04.tsx",
  "card-01": "content/blocks/cards/card-01.tsx",
  "card-02": "content/blocks/cards/card-02.tsx",
  "card-03": "content/blocks/cards/card-03.tsx",
  "form-01": "content/blocks/forms/form-01.tsx",
  "form-02": "content/blocks/forms/form-02.tsx",
  "form-03": "content/blocks/forms/form-03.tsx",
  "table-01": "content/blocks/tables/table-01.tsx",
  "table-02": "content/blocks/tables/table-02.tsx",
  "table-03": "content/blocks/tables/table-03.tsx",
  "table-04": "content/blocks/tables/table-04.tsx",
  "table-05": "content/blocks/tables/table-05.tsx",
  "sidebar-01": "content/blocks/sidebars/sidebar-01.tsx",
  "sidebar-02": "content/blocks/sidebars/sidebar-02.tsx",
  "sidebar-03": "content/blocks/sidebars/sidebar-03.tsx",
  "sidebar-04": "content/blocks/sidebars/sidebar-04.tsx",
};

export function getBlockSource(blockId: string): string {
  const relativePath = blockPaths[blockId];
  if (!relativePath) return "";
  const fullPath = path.join(process.cwd(), relativePath);
  return fs.readFileSync(fullPath, "utf-8");
}
