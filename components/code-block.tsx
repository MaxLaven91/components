import { codeToHtml } from "shiki";

import { CopyButton } from "@/components/copy-button";

export async function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const html = await codeToHtml(code, {
    lang: "tsx",
    theme: "github-dark-default",
  });

  return (
    <div className="relative rounded-lg border bg-[#0d1117]">
      {filename && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <span className="text-xs text-white/50">{filename}</span>
          <CopyButton value={code} className="size-7 text-white/50 hover:text-white" />
        </div>
      )}
      {!filename && (
        <CopyButton
          value={code}
          className="absolute right-2 top-2 size-7 text-white/50 hover:text-white"
        />
      )}
      <div
        className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_code]:!bg-transparent"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates trusted HTML
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
