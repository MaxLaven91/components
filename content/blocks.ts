import type { ComponentType } from "react";

export interface Category {
  id: string;
  label: string;
  description: string;
  sort: number;
}

export interface Block {
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
    id: "stats",
    label: "Stats & Metrics",
    description: "Dashboard cards, KPIs, and metric displays",
    sort: 1,
  },
  {
    id: "login",
    label: "Login & Signup",
    description: "Authentication forms and flows",
    sort: 2,
  },
  {
    id: "dialogs",
    label: "Dialogs",
    description: "Modals, drawers, and command palettes",
    sort: 3,
  },
  {
    id: "cards",
    label: "Cards",
    description: "Product cards, profile cards, and pricing cards",
    sort: 4,
  },
  {
    id: "forms",
    label: "Forms",
    description: "Contact forms, settings, and inline editing",
    sort: 5,
  },
];

export const blocks: Block[] = [
  // Stats & Metrics
  {
    id: "stats-01",
    category: "stats",
    name: "Simple Stat Cards",
    description: "3-4 cards in a row showing a label, large number, and percentage change badge",
    tags: ["dashboard", "metrics", "cards"],
    registryDependencies: ["card", "badge"],
    dependencies: ["lucide-react"],
    component: () => import("./blocks/stats/stats-01"),
  },
  {
    id: "stats-02",
    category: "stats",
    name: "Stat Cards with Sparkline",
    description: "Stat cards with inline area charts showing trends",
    tags: ["dashboard", "metrics", "charts"],
    registryDependencies: ["card", "badge", "chart"],
    dependencies: ["lucide-react", "recharts"],
    component: () => import("./blocks/stats/stats-02"),
  },
  {
    id: "stats-03",
    category: "stats",
    name: "KPI Grid",
    description: "Grid of metric tiles with icons, values, and progress bars",
    tags: ["dashboard", "metrics", "kpi"],
    registryDependencies: ["card", "progress"],
    dependencies: ["lucide-react"],
    component: () => import("./blocks/stats/stats-03"),
  },
  {
    id: "stats-04",
    category: "stats",
    name: "Stats with Comparison",
    description: "Side-by-side cards showing this period vs last period with a delta indicator",
    tags: ["dashboard", "metrics", "comparison"],
    registryDependencies: ["card", "badge"],
    dependencies: ["lucide-react"],
    component: () => import("./blocks/stats/stats-04"),
  },
  {
    id: "stats-05",
    category: "stats",
    name: "Revenue Overview Card",
    description: "Large card with headline number, bar chart, and filter tabs",
    tags: ["dashboard", "metrics", "charts", "revenue"],
    registryDependencies: ["card", "tabs", "chart"],
    dependencies: ["recharts"],
    component: () => import("./blocks/stats/stats-05"),
  },

  // Login & Signup
  {
    id: "login-01",
    category: "login",
    name: "Simple Centered Login",
    description: "Clean minimal login form with email, password, and forgot password link",
    tags: ["auth", "login", "form"],
    registryDependencies: ["card", "input", "button", "label"],
    dependencies: [],
    component: () => import("./blocks/login/login-01"),
  },
  {
    id: "login-02",
    category: "login",
    name: "Social Login",
    description: "Login with Google/GitHub OAuth buttons and an email/password fallback",
    tags: ["auth", "login", "oauth", "social"],
    registryDependencies: ["card", "input", "button", "label", "separator"],
    dependencies: [],
    component: () => import("./blocks/login/login-02"),
  },
  {
    id: "login-03",
    category: "login",
    name: "Split Screen Login",
    description: "Left branded panel with testimonial, right side login form",
    tags: ["auth", "login", "split"],
    registryDependencies: ["input", "button", "label"],
    dependencies: [],
    component: () => import("./blocks/login/login-03"),
  },
  {
    id: "login-04",
    category: "login",
    name: "Magic Link Login",
    description: "Email-only login with magic link and a success confirmation state",
    tags: ["auth", "login", "magic-link", "passwordless"],
    registryDependencies: ["card", "input", "button", "label"],
    dependencies: ["lucide-react"],
    component: () => import("./blocks/login/login-04"),
  },
  {
    id: "login-05",
    category: "login",
    name: "Sign Up with Steps",
    description: "Multi-step registration: email/password, profile, and preferences",
    tags: ["auth", "signup", "multi-step", "wizard"],
    registryDependencies: ["card", "input", "button", "label", "avatar", "progress"],
    dependencies: [],
    component: () => import("./blocks/login/login-05"),
  },

  // Dialogs
  {
    id: "dialog-01",
    category: "dialogs",
    name: "Confirmation Dialog",
    description:
      "Destructive action confirmation with icon, description, and cancel/confirm buttons",
    tags: ["dialog", "modal", "confirmation", "destructive"],
    registryDependencies: ["alert-dialog", "button"],
    dependencies: ["lucide-react"],
    component: () => import("./blocks/dialogs/dialog-01"),
  },
  {
    id: "dialog-02",
    category: "dialogs",
    name: "Form Dialog",
    description: "Dialog containing a short form with name and description fields",
    tags: ["dialog", "modal", "form"],
    registryDependencies: ["dialog", "input", "textarea", "button", "label"],
    dependencies: [],
    component: () => import("./blocks/dialogs/dialog-02"),
  },
  {
    id: "dialog-03",
    category: "dialogs",
    name: "Command Palette",
    description: "Command-K style search with grouped results and keyboard shortcuts",
    tags: ["command", "search", "palette", "keyboard"],
    registryDependencies: ["command"],
    dependencies: ["lucide-react"],
    component: () => import("./blocks/dialogs/dialog-03"),
  },
  {
    id: "dialog-04",
    category: "dialogs",
    name: "Drawer Dialog",
    description: "Mobile-friendly bottom drawer with filter options and drag handle",
    tags: ["drawer", "mobile", "filters"],
    registryDependencies: ["drawer", "button"],
    dependencies: [],
    component: () => import("./blocks/dialogs/dialog-04"),
  },

  // Cards
  {
    id: "card-01",
    category: "cards",
    name: "Product Card",
    description: "Product card with image placeholder, title, description, price, and add to cart",
    tags: ["card", "product", "ecommerce"],
    registryDependencies: ["card", "button", "badge"],
    dependencies: ["lucide-react"],
    component: () => import("./blocks/cards/card-01"),
  },
  {
    id: "card-02",
    category: "cards",
    name: "User Profile Card",
    description: "Profile card with avatar, name, role, bio, social links, and follow button",
    tags: ["card", "profile", "user"],
    registryDependencies: ["card", "avatar", "button"],
    dependencies: ["lucide-react"],
    component: () => import("./blocks/cards/card-02"),
  },
  {
    id: "card-03",
    category: "cards",
    name: "Pricing Card",
    description: "Pricing plan card with monthly/annual toggle, feature list, and CTA",
    tags: ["card", "pricing", "billing"],
    registryDependencies: ["card", "button", "badge", "switch", "label"],
    dependencies: ["lucide-react"],
    component: () => import("./blocks/cards/card-03"),
  },

  // Forms
  {
    id: "form-01",
    category: "forms",
    name: "Contact Form",
    description: "Contact form with name, email, subject dropdown, message, and submit",
    tags: ["form", "contact", "input"],
    registryDependencies: ["card", "input", "textarea", "select", "button", "label"],
    dependencies: [],
    component: () => import("./blocks/forms/form-01"),
  },
  {
    id: "form-02",
    category: "forms",
    name: "Settings Form",
    description: "Profile settings with avatar, name/email, notification toggles, and danger zone",
    tags: ["form", "settings", "profile"],
    registryDependencies: ["card", "input", "button", "avatar", "separator", "switch", "label"],
    dependencies: [],
    component: () => import("./blocks/forms/form-02"),
  },
  {
    id: "form-03",
    category: "forms",
    name: "Inline Editable Form",
    description: "Display view that switches to edit mode on click with save/cancel",
    tags: ["form", "inline", "editable"],
    registryDependencies: ["card", "input", "textarea", "button", "label"],
    dependencies: ["lucide-react"],
    component: () => import("./blocks/forms/form-03"),
  },
];

export function getBlocksByCategory(categoryId: string): Block[] {
  return blocks.filter((b) => b.category === categoryId);
}

export function getBlock(blockId: string): Block | undefined {
  return blocks.find((b) => b.id === blockId);
}

export function getCategory(categoryId: string): Category | undefined {
  return categories.find((c) => c.id === categoryId);
}
