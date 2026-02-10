"use client";

import { useState } from "react";
import {
  BarChart3,
  FileText,
  Home,
  PanelLeft,
  PanelLeftClose,
  Settings,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Analytics", icon: BarChart3, active: false },
  { label: "Customers", icon: Users, active: false },
  { label: "Documents", icon: FileText, active: false },
];

export default function Sidebar03() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <div
        className={`flex h-[600px] flex-col border-r bg-background p-4 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary">
              <Home
                className="size-4 text-primary-foreground"
                aria-hidden="true"
              />
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold tracking-tight">
                Acme
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="shrink-0"
          >
            {collapsed ? (
              <PanelLeft className="size-4" aria-hidden="true" />
            ) : (
              <PanelLeftClose className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>

        <Separator className="my-4" />

        <nav aria-label="Main navigation" className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={item.active ? "secondary" : "ghost"}
                        size="icon"
                        className="w-full"
                        asChild
                      >
                        <a href="#" aria-label={item.label} {...(item.active ? { "aria-current": "page" as const } : {})}>
                          <item.icon className="size-4" aria-hidden="true" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                ) : (
                  <Button
                    variant={item.active ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                    asChild
                  >
                    <a href="#" {...(item.active ? { "aria-current": "page" as const } : {})}>
                      <item.icon className="size-4" aria-hidden="true" />
                      {item.label}
                    </a>
                  </Button>
                )}
              </li>
            ))}

            <li className="mt-auto">
              <Separator className="mb-4" />
              {collapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full"
                      asChild
                    >
                      <a href="#" aria-label="Settings">
                        <Settings className="size-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  asChild
                >
                  <a href="#">
                    <Settings className="size-4" aria-hidden="true" />
                    Settings
                  </a>
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </TooltipProvider>
  );
}
