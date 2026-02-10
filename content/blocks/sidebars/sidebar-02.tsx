import {
  BarChart3,
  Bell,
  FileText,
  Home,
  Inbox,
  Settings,
  Shield,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type NavItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
  count?: number;
};

type NavSection = {
  header: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    header: "Overview",
    items: [
      { label: "Home", icon: Home, active: true },
      { label: "Inbox", icon: Inbox, count: 12 },
      { label: "Notifications", icon: Bell, count: 3 },
    ],
  },
  {
    header: "Content",
    items: [
      { label: "Documents", icon: FileText },
      { label: "Team Members", icon: Users },
      { label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    header: "System",
    items: [
      { label: "Settings", icon: Settings },
      { label: "Security", icon: Shield },
    ],
  },
];

export default function Sidebar02() {
  return (
    <div className="flex h-[600px] w-64 flex-col border-r bg-background p-4">
      <div className="flex items-center gap-2 px-2 py-1">
        <span className="text-lg font-semibold tracking-tight">Workspace</span>
      </div>

      <Separator className="my-4" />

      <nav aria-label="Main navigation" className="flex flex-1 flex-col gap-4">
        {sections.map((section) => (
          <div key={section.header}>
            <h3 className="mb-1 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {section.header}
            </h3>
            <ul role="list" className="flex flex-col gap-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <Button
                    variant={item.active ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                    asChild
                  >
                    <a href="#" {...(item.active ? { "aria-current": "page" as const } : {})}>
                      <item.icon className="size-4" aria-hidden="true" />
                      {item.label}
                      {item.count != null && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.count}
                        </Badge>
                      )}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
