import Link from "next/link";

import { CliCommand } from "@/components/cli-command";

export const metadata = {
  title: "Setup",
  description: "Add the Scenes registry to your project and start installing scenes.",
};

export default function SetupPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div>
        <Link href="/" className="text-sm text-muted-foreground hover:underline underline-offset-4">
          Home
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-sm">Setup</span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Setup guide</h1>
      <p className="mt-2 text-muted-foreground">
        Add the Scenes registry to your project in two steps.
      </p>

      <div className="mt-10 space-y-10">
        {/* Step 1 */}
        <section>
          <h2 className="text-lg font-semibold tracking-tight">1. Add the registry</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Open your <code className="rounded bg-muted px-1.5 py-0.5 text-xs">components.json</code> and
            add the registry URL under the <code className="rounded bg-muted px-1.5 py-0.5 text-xs">registries</code> key.
          </p>
          <div className="mt-4 rounded-lg border bg-muted/50 p-4 font-mono text-sm">
            <pre>{`{
  "registries": {
    "@scenes": "https://scenes.so/r/{name}.json"
  }
}`}</pre>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            If you don&apos;t have a <code className="rounded bg-muted px-1.5 py-0.5 text-xs">registries</code> key
            yet, add it at the top level of the file.
          </p>
        </section>

        {/* Step 2 */}
        <section>
          <h2 className="text-lg font-semibold tracking-tight">2. Install a scene</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use the shadcn CLI to install any scene. For example:
          </p>
          <div className="mt-4 space-y-3">
            <CliCommand command="npx shadcn@latest add @scenes/dashboard-01" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            The scene and its shadcn/ui dependencies will be installed automatically.
          </p>
        </section>

        {/* Browse */}
        <section>
          <h2 className="text-lg font-semibold tracking-tight">3. Browse scenes</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            That&apos;s it. Browse all available scenes and copy the install command from any scene page.
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className="text-sm font-medium underline underline-offset-4"
            >
              View all scenes
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
