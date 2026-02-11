"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="size-4 scale-100 rotate-0 transition-transform duration-150 ease-out dark:scale-0 dark:-rotate-90 motion-reduce:transition-none" aria-hidden="true" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-transform duration-150 ease-out dark:scale-100 dark:rotate-0 motion-reduce:transition-none" aria-hidden="true" />
    </Button>
  );
}
