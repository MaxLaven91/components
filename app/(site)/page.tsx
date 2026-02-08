import Link from "next/link";
import { CliCommand } from "@/components/cli-command";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { blocks, categories } from "@/content/blocks";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Hero */}
      <section className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Clean, modern UI components
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          Open-source copy-paste components for React. Browse, preview, and install with the shadcn
          CLI.
        </p>
        <div className="mt-8 flex gap-3">
          <Button size="lg" asChild>
            <a href="#categories">Browse components</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/MaxLaven91/panes"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Setup */}
      <section className="mx-auto mt-24 max-w-xl">
        <h2 className="text-center text-sm font-medium text-muted-foreground">Get started</h2>
        <div className="mt-4 space-y-3">
          <CliCommand command="npx shadcn@latest add @panes/stats-01" />
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Add the registry to your{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">components.json</code> first.{" "}
          <Link href="/setup" className="underline underline-offset-4">
            Setup guide
          </Link>
        </p>
      </section>

      {/* Categories */}
      <section id="categories" className="mt-24 scroll-mt-20">
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        <p className="mt-1 text-muted-foreground">
          {blocks.length} components across {categories.length} categories.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories
            .sort((a, b) => a.sort - b.sort)
            .map((category) => {
              const count = blocks.filter((b) => b.category === category.id).length;
              return (
                <Link key={category.id} href={`/${category.id}`}>
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{category.label}</CardTitle>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>
          Built by{" "}
          <a
            href="https://github.com/MaxLaven91"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Max Lavender
          </a>
          . Open source on{" "}
          <a
            href="https://github.com/MaxLaven91/panes"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
