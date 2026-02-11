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
  {
    id: "pricing",
    label: "Pricing",
    description: "SaaS pricing pages with plan comparison and FAQ",
    sort: 4,
  },
  {
    id: "onboarding",
    label: "Onboarding",
    description: "Multi-step onboarding wizards with progress tracking and form flows",
    sort: 5,
  },
  {
    id: "error",
    label: "Error Pages",
    description: "Branded 404 and error pages with search and quick navigation",
    sort: 6,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Data visualization dashboards with charts, KPIs, and traffic insights",
    sort: 7,
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
  {
    id: "pricing-01",
    category: "pricing",
    name: "SaaS Pricing",
    description:
      "Full pricing page with monthly/annual toggle, plan cards, feature comparison table, and FAQ accordion",
    tags: ["pricing", "plans", "faq", "saas", "comparison"],
    registryDependencies: [
      "accordion",
      "badge",
      "button",
      "card",
      "separator",
      "table",
      "tabs",
    ],
    dependencies: ["lucide-react"],
    component: () => import("./scenes/pricing/pricing-01"),
  },
  {
    id: "onboarding-01",
    category: "onboarding",
    name: "Setup Wizard",
    description:
      "Multi-step onboarding wizard with progress indicator, form steps, and animated transitions",
    tags: ["onboarding", "wizard", "steps", "forms", "setup"],
    registryDependencies: [
      "button",
      "card",
      "checkbox",
      "input",
      "label",
      "select",
      "separator",
    ],
    dependencies: ["lucide-react"],
    component: () => import("./scenes/onboarding/onboarding-01"),
  },
  {
    id: "error-01",
    category: "error",
    name: "404 Page",
    description:
      "Branded 404 error page with search input and quick navigation links",
    tags: ["404", "error", "not-found", "search"],
    registryDependencies: ["button", "input"],
    dependencies: ["lucide-react"],
    component: () => import("./scenes/error/error-01"),
  },
  {
    id: "analytics-01",
    category: "analytics",
    name: "Traffic Analytics",
    description:
      "Analytics dashboard with KPI cards, traffic chart, channel breakdown, and top pages table",
    tags: ["analytics", "charts", "kpi", "traffic", "data"],
    registryDependencies: [
      "badge",
      "button",
      "card",
      "chart",
      "table",
      "tabs",
    ],
    dependencies: ["lucide-react", "recharts"],
    component: () => import("./scenes/analytics/analytics-01"),
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
