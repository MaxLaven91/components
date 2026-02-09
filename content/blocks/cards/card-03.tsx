"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const [animating, setAnimating] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current === value) return;
    prevValue.current = value;
    setAnimating(true);
    const timer = setTimeout(() => {
      setDisplay(value);
      setAnimating(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <span
      className="inline-block transition-all duration-100 ease-out tabular-nums motion-reduce:transition-none"
      style={{
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      ${display}
    </span>
  );
}

export default function Card03() {
  const [annual, setAnnual] = useState(false);
  const price = annual ? 19 : 24;

  return (
    <Card className="relative w-full max-w-xs shadow-none">
      <Badge className="absolute -top-2.5 right-4">Popular</Badge>
      <CardHeader>
        <CardTitle className="text-lg">Pro Plan</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight" aria-live="polite">
            <AnimatedPrice value={price} />
          </span>
          <span className="text-muted-foreground">/mo</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <Switch id="card03-billing" checked={annual} onCheckedChange={setAnnual} />
          <Label htmlFor="card03-billing" className="text-sm text-muted-foreground">
            Annual billing{" "}
            <span
              className="inline-block transition-opacity duration-150 ease-out motion-reduce:transition-none"
              style={{ opacity: annual ? 1 : 0 }}
              aria-hidden={!annual}
            >
              <span className="text-primary">(save 20%)</span>
            </span>
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
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
