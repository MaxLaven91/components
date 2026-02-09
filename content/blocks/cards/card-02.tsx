import { Github, Linkedin, Twitter } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Card02() {
  return (
    <Card className="w-full max-w-xs shadow-none">
      <CardContent className="pt-6 text-center">
        <Avatar className="mx-auto size-20">
          <AvatarFallback className="text-lg">SD</AvatarFallback>
        </Avatar>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">Sofia Davis</h3>
        <p className="text-sm text-muted-foreground">Product Designer</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Designing user experiences that feel effortless. Previously at Stripe and Figma.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Button variant="ghost" size="icon" className="size-8" aria-label="Twitter profile">
            <Twitter className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8" aria-label="GitHub profile">
            <Github className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8" aria-label="LinkedIn profile">
            <Linkedin className="size-4" />
          </Button>
        </div>
        <Button className="mt-4 w-full">Follow</Button>
      </CardContent>
    </Card>
  );
}
