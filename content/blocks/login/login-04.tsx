"use client";

import { CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login04() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-[600px] w-full items-center justify-center px-4">
      <div className="relative w-full max-w-sm">
        {/* Success state */}
        <div
          className="transition-all duration-200 ease-out motion-reduce:transition-none"
          style={{
            opacity: submitted ? 1 : 0,
            transform: submitted ? "scale(1)" : "scale(0.97)",
            pointerEvents: submitted ? "auto" : "none",
            position: submitted ? "relative" : "absolute",
            inset: submitted ? undefined : 0,
          }}
        >
          <Card className="w-full text-center">
            <CardHeader>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-6 text-primary" />
              </div>
              <CardTitle className="text-2xl tracking-tight">Check your email</CardTitle>
              <CardDescription>
                We&apos;ve sent a login link to your email address. Click the link to sign in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                Back to login
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Form state */}
        <div
          className="transition-all duration-200 ease-out motion-reduce:transition-none"
          style={{
            opacity: submitted ? 0 : 1,
            transform: submitted ? "scale(0.97)" : "scale(1)",
            pointerEvents: submitted ? "none" : "auto",
            position: submitted ? "absolute" : "relative",
            inset: submitted ? 0 : undefined,
          }}
        >
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="size-6 text-primary" />
              </div>
              <CardTitle className="text-2xl tracking-tight">Sign in with email</CardTitle>
              <CardDescription>
                We&apos;ll send you a magic link to sign in. No password needed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="login04-email">Email address</Label>
                  <Input
                    id="login04-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send magic link
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
