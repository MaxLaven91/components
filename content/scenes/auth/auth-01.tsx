"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, Layers, Mail } from "lucide-react";

type AuthView = "login" | "signup" | "magic-link" | "magic-link-sent";

function GoogleIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Auth01() {
  const [view, setView] = useState<AuthView>("login");

  return (
    <div className="flex min-h-screen w-full">
      {/* Left panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10">
            <Layers className="h-4 w-4" aria-hidden="true" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Acme Inc</span>
        </div>

        <blockquote className="max-w-md space-y-4">
          <p className="text-lg leading-relaxed opacity-90">
            &ldquo;Switching to Acme cut our onboarding time in half. The
            dashboard alone saved our team 10 hours a week.&rdquo;
          </p>
          <footer className="text-sm opacity-70">
            <span className="font-medium opacity-100">Sofia Martinez</span>
            <br />
            Head of Operations, Globex Corp
          </footer>
        </blockquote>

        <p className="text-xs opacity-50">
          &copy; {new Date().getFullYear()} Acme Inc. All rights reserved.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div className="relative w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layers className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Acme Inc
            </span>
          </div>

          {/* Login */}
          <div
            className={`transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              view === "login"
                ? "opacity-100"
                : "pointer-events-none absolute top-0 opacity-0"
            }`}
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl tracking-tight text-balance">
                  Welcome back
                </CardTitle>
                <CardDescription>
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-0">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2">
                    <GoogleIcon />
                    Google
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <GitHubIcon />
                    GitHub
                  </Button>
                </div>

                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    or
                  </span>
                </div>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <button
                        type="button"
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input id="login-password" type="password" />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </form>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full gap-2 text-muted-foreground"
                  onClick={() => setView("magic-link")}
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  Sign in with magic link
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="font-medium text-foreground hover:underline"
                    onClick={() => setView("signup")}
                  >
                    Sign up
                  </button>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Signup */}
          <div
            className={`transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              view === "signup"
                ? "opacity-100"
                : "pointer-events-none absolute top-0 opacity-0"
            }`}
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl tracking-tight text-balance">
                  Create an account
                </CardTitle>
                <CardDescription>
                  Get started with a free account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-0">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2">
                    <GoogleIcon />
                    Google
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <GitHubIcon />
                    GitHub
                  </Button>
                </div>

                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    or
                  </span>
                </div>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full name</Label>
                    <Input id="signup-name" placeholder="Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" />
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters
                    </p>
                  </div>
                  <Button type="submit" className="w-full">
                    Create account
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-medium text-foreground hover:underline"
                    onClick={() => setView("login")}
                  >
                    Sign in
                  </button>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Magic link */}
          <div
            className={`transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              view === "magic-link"
                ? "opacity-100"
                : "pointer-events-none absolute top-0 opacity-0"
            }`}
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl tracking-tight text-balance">
                  Magic link
                </CardTitle>
                <CardDescription>
                  We&apos;ll email you a link to sign in instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setView("magic-link-sent");
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="magic-email">Email</Label>
                    <Input
                      id="magic-email"
                      type="email"
                      placeholder="name@company.com"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Send magic link
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  <button
                    type="button"
                    className="font-medium text-foreground hover:underline"
                    onClick={() => setView("login")}
                  >
                    Back to sign in
                  </button>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Magic link sent */}
          <div
            className={`transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              view === "magic-link-sent"
                ? "opacity-100"
                : "pointer-events-none absolute top-0 opacity-0"
            }`}
          >
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center py-10 px-0 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Check
                    className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-balance">
                  Check your email
                </h2>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  We sent a magic link to your email. Click the link to sign in
                  — it expires in 10 minutes.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setView("login")}
                >
                  Back to sign in
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
