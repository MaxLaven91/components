"use client";

import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const steps = [
  { title: "Create account", description: "Enter your email and choose a password" },
  { title: "Your profile", description: "Tell us a bit about yourself" },
  { title: "Preferences", description: "Customize your experience" },
];

export default function Login05() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const progress = ((step + 1) / steps.length) * 100;

  function goToStep(next: number) {
    setVisible(false);
    setTimeout(() => {
      setStep(next);
      setVisible(true);
    }, 150);
  }

  return (
    <div className="flex min-h-[600px] w-full items-center justify-center px-4">
      <Card className="w-full max-w-sm overflow-hidden">
        <CardHeader>
          <div className="space-y-3">
            <Progress value={progress} className="h-1" aria-label={`Step ${step + 1} of ${steps.length}`} />
            <p className="text-xs text-muted-foreground tabular-nums" aria-live="polite">
              Step {step + 1} of {steps.length}
            </p>
          </div>
          <CardTitle className="text-2xl tracking-tight">{steps[step].title}</CardTitle>
          <CardDescription>{steps[step].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="transition-opacity duration-150 ease-out motion-reduce:transition-none"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {step === 0 && (
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  goToStep(1);
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="login05-email">Email</Label>
                  <Input
                    id="login05-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login05-password">Password</Label>
                  <Input id="login05-password" type="password" autoComplete="new-password" required />
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            )}

            {step === 1 && (
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  goToStep(2);
                }}
              >
                <div className="flex justify-center">
                  <Avatar className="size-20">
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login05-name">Full name</Label>
                  <Input id="login05-name" placeholder="Jane Doe" autoComplete="name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login05-username">Username</Label>
                  <Input id="login05-username" placeholder="janedoe" autoComplete="username" />
                </div>
                <div className="grid gap-2">
                  <Button type="submit" className="w-full">
                    Continue
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => goToStep(0)}
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="login05-role">What best describes your role?</Label>
                  <Input id="login05-role" placeholder="e.g. Designer, Developer, PM" autoComplete="off" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login05-company">Company (optional)</Label>
                  <Input id="login05-company" placeholder="Acme Inc." autoComplete="organization" />
                </div>
                <div className="grid gap-2">
                  <Button type="submit" className="w-full">
                    Get started
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => goToStep(1)}
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
