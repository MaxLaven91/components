import {
  BarChart3,
  FileText,
  HelpCircle,
  Home,
  Settings,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Analytics", icon: BarChart3, active: false },
  { label: "Customers", icon: Users, active: false },
  { label: "Documents", icon: FileText, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export default function Sidebar01() {
  return (
    <div className="flex h-[600px] w-64 flex-col border-r bg-background p-4">
      <div className="flex items-center gap-2 px-2 py-1">
        <div className="flex size-7 items-center justify-center rounded-md bg-primary">
          <Home className="size-4 text-primary-foreground" aria-hidden="true" />
        </div>
        <span className="text-lg font-semibold tracking-tight">Acme</span>
      </div>

      <Separator className="my-4" />

      <nav aria-label="Main navigation" className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Button
                variant={item.active ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                {...(item.active ? { "aria-current": "page" as const } : {})}
              >
                <item.icon className="size-4" aria-hidden="true" />
                {item.label}
              </Button>
            </li>
          ))}

          <li className="mt-auto">
            <Separator className="mb-4" />
            <Button variant="ghost" className="w-full justify-start gap-2">
              <HelpCircle className="size-4" aria-hidden="true" />
              Help & Support
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
