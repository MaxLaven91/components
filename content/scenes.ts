import type { ComponentType } from "react";

export interface Category {
  id: string;
  label: string;
  description: string;
  sort: number;
}

export interface Scene {
  id: string;
  category: string;
  name: string;
  description: string;
  tags: string[];
  registryDependencies: string[];
  dependencies: string[];
  component: () => Promise<{ default: ComponentType }>;
}

export const categories: Category[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Complete SaaS dashboards with navigation, charts, and data tables",
    sort: 1,
  },
  {
    id: "auth",
    label: "Authentication",
    description: "Branded login and signup pages with social OAuth and magic links",
    sort: 2,
  },
  {
    id: "settings",
    label: "Settings",
    description: "Account settings pages with profile, notifications, and billing",
    sort: 3,
  },
];

export const scenes: Scene[] = [
  {
    id: "dashboard-01",
    category: "dashboard",
    name: "SaaS Dashboard",
    description:
      "Complete dashboard with collapsible sidebar, stat cards, revenue chart, and orders table",
    tags: ["dashboard", "sidebar", "charts", "table", "saas"],
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
    component: () => import("./scenes/dashboard/dashboard-01"),
  },
  {
    id: "auth-01",
    category: "auth",
    name: "Split Screen Auth",
    description:
      "Branded split-screen login and signup with social OAuth, magic link, and animated state transitions",
    tags: ["auth", "login", "signup", "oauth", "split-screen"],
    registryDependencies: ["button", "card", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    component: () => import("./scenes/auth/auth-01"),
  },
  {
    id: "settings-01",
    category: "settings",
    name: "Account Settings",
    description:
      "Full settings page with tabs for profile, notifications, billing, and danger zone",
    tags: ["settings", "profile", "billing", "form", "tabs"],
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
    component: () => import("./scenes/settings/settings-01"),
  },
];

export function getScenesByCategory(categoryId: string): Scene[] {
  return scenes.filter((s) => s.category === categoryId);
}

export function getScene(sceneId: string): Scene | undefined {
  return scenes.find((s) => s.id === sceneId);
}

export function getCategory(categoryId: string): Category | undefined {
  return categories.find((c) => c.id === categoryId);
}
