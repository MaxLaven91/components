"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const features = [
  "Unlimited projects",
  "Priority support",
  "Custom integrations",
  "Advanced analytics",
  "Team collaboration",
];

export default function Card03() {
  const [annual, setAnnual] = useState(false);
  const price = annual ? 19 : 24;

  return (
    <Card className="relative w-full max-w-xs">
      <Badge className="absolute -top-2.5 right-4">Popular</Badge>
      <CardHeader>
        <CardTitle className="text-lg">Pro Plan</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight tabular-nums">${price}</span>
          <span className="text-muted-foreground">/{annual ? "mo" : "mo"}</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <Switch id="card03-billing" checked={annual} onCheckedChange={setAnnual} />
          <Label htmlFor="card03-billing" className="text-sm text-muted-foreground">
            Annual billing {annual && <span className="text-primary">(save 20%)</span>}
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="size-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Get started</Button>
      </CardFooter>
    </Card>
  );
}
