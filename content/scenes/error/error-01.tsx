"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, HelpCircle, Home, Layers, Search } from "lucide-react";

export default function Error01() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-6">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Layers className="h-4 w-4" aria-hidden="true" />
      </div>

      <p className="mt-8 text-[8rem] leading-none font-bold tracking-tight tabular-nums text-muted-foreground/20 sm:text-[10rem]">
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-center text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
        Try searching or head back to the homepage.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 flex w-full max-w-sm gap-2"
      >
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search for a page..."
            className="pl-9"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline" className="gap-2">
          <Home className="h-4 w-4" aria-hidden="true" />
          Home
        </Button>
        <Button variant="outline" className="gap-2">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
          Help Center
        </Button>
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Go back
        </Button>
      </div>
    </div>
  );
}
