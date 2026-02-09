"use client";

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

export default function Dialog04() {
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
                {["Active", "Inactive", "Pending", "Archived"].map((status) => (
                  <Button key={status} variant="outline" size="sm" className="rounded-full">
                    {status}
                  </Button>
                ))}
              </div>
            </fieldset>
            <fieldset className="grid gap-2">
              <legend className="text-sm font-medium">Category</legend>
              <div className="flex flex-wrap gap-2" role="group">
                {["Design", "Engineering", "Marketing", "Sales"].map((category) => (
                  <Button key={category} variant="outline" size="sm" className="rounded-full">
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
