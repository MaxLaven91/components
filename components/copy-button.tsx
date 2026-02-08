"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={handleCopy}
      aria-label="Copy to clipboard"
    >
      <span className="relative size-4">
        <Check
          className="absolute inset-0 size-4 transition-all duration-150 ease-out motion-reduce:transition-none"
          style={{ opacity: copied ? 1 : 0, transform: copied ? "scale(1)" : "scale(0.5)" }}
        />
        <Copy
          className="absolute inset-0 size-4 transition-all duration-150 ease-out motion-reduce:transition-none"
          style={{ opacity: copied ? 0 : 1, transform: copied ? "scale(0.5)" : "scale(1)" }}
        />
      </span>
    </Button>
  );
}
