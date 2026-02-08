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
