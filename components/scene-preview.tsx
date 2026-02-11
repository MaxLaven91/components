"use client";

import { Maximize2, Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const devices = [
  { id: "desktop", icon: Monitor, width: "100%", label: "Desktop" },
  { id: "tablet", icon: Tablet, width: "768px", label: "Tablet" },
  { id: "mobile", icon: Smartphone, width: "375px", label: "Mobile" },
] as const;

export function ScenePreview({ category, sceneId }: { category: string; sceneId: string }) {
  const [device, setDevice] = useState<string>("desktop");
  const currentDevice = devices.find((d) => d.id === device) ?? devices[0];

  return (
    <div className="rounded-lg border">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-sm font-medium">Preview</span>
        <div className="flex items-center gap-2">
          <Tabs value={device} onValueChange={setDevice}>
            <TabsList className="h-8">
              {devices.map((d) => {
                const Icon = d.icon;
                return (
                  <TabsTrigger key={d.id} value={d.id} className="px-2" aria-label={d.label}>
                    <Icon className="size-3.5" />
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            asChild
            aria-label="Open preview in new tab"
          >
            <a href={`/preview/${category}/${sceneId}`} target="_blank" rel="noopener noreferrer">
              <Maximize2 className="size-3.5" />
            </a>
          </Button>
        </div>
      </div>
      <div className="flex justify-center bg-muted/30 p-4">
        <iframe
          src={`/preview/${category}/${sceneId}`}
          title={`Preview of ${sceneId}`}
          className="rounded border bg-background transition-[width] duration-200"
          style={{ width: currentDevice.width, height: "800px" }}
        />
      </div>
    </div>
  );
}
