import { CopyButton } from "@/components/copy-button";

export function CliCommand({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm">
      <span className="text-muted-foreground">$</span>
      <code className="flex-1">{command}</code>
      <CopyButton value={command} className="size-7 shrink-0" />
    </div>
  );
}
