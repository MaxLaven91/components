import {
  BarChart3,
  Bell,
  FileText,
  Home,
  LogOut,
  Settings,
  Users,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Analytics", icon: BarChart3 },
  { label: "Team", icon: Users, badge: "3" },
  { label: "Documents", icon: FileText },
  { label: "Notifications", icon: Bell, badge: "5" },
];

export default function Sidebar04() {
  return (
    <div className="flex h-[600px] w-64 flex-col border-r bg-background p-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage alt="Jane Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Jane Doe</span>
          <span className="text-xs text-muted-foreground">jane@acme.com</span>
        </div>
      </div>

      <Separator className="my-4" />

      <nav aria-label="Main navigation" className="flex flex-col gap-1">
        <ul role="list" className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <Button
                  variant={item.active ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  {...(item.active ? { "aria-current": "page" as const } : {})}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-1">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="size-4" aria-hidden="true" />
          Settings
        </Button>

        <Separator className="my-2" />

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Logout
        </Button>
      </div>
    </div>
  );
}
