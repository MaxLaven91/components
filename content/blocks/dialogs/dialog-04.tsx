"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const statuses = ["Active", "Inactive", "Pending", "Archived"];
const categories = ["Design", "Engineering", "Marketing", "Sales"];

function toggleItem(set: Set<string>, item: string): Set<string> {
  const next = new Set(set);
  if (next.has(item)) {
    next.delete(item);
  } else {
    next.add(item);
  }
  return next;
}

export default function Dialog04() {
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set(["Active"]));
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="tracking-tight">Filter results</DrawerTitle>
            <DrawerDescription>Narrow down the results by applying filters.</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 px-4">
            <fieldset className="grid gap-2">
              <legend className="text-sm font-medium">Status</legend>
              <div className="flex flex-wrap gap-2" role="group">
                {statuses.map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatuses.has(status) ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setSelectedStatuses((prev) => toggleItem(prev, status))}
                    aria-pressed={selectedStatuses.has(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </fieldset>
            <fieldset className="grid gap-2">
              <legend className="text-sm font-medium">Category</legend>
              <div className="flex flex-wrap gap-2" role="group">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategories.has(category) ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setSelectedCategories((prev) => toggleItem(prev, category))}
                    aria-pressed={selectedCategories.has(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </fieldset>
          </div>
          <DrawerFooter>
            <Button>Apply filters</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
