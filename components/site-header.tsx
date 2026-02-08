import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Panes
        </Link>
        <Button variant="outline" size="sm" asChild>
          <a href="https://github.com/maxlavender/panes" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Button>
      </div>
    </header>
  );
}
