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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Layers,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

const steps = [
  { label: "Workspace", icon: Layers },
  { label: "Team", icon: Users },
  { label: "Configure", icon: Settings },
  { label: "Complete", icon: Sparkles },
];

export default function Onboarding01() {
  const [currentStep, setCurrentStep] = useState(0);
  const [workspaceName, setWorkspaceName] = useState("");

  function next() {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  }

  function back() {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Layers className="h-4 w-4" aria-hidden="true" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Acme Inc</span>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-center">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium tabular-nums transition-colors duration-150 ease-out motion-reduce:transition-none ${
                    i < currentStep
                      ? "bg-primary text-primary-foreground"
                      : i === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < currentStep ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`hidden text-xs sm:block ${
                    i <= currentStep
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <Separator
                  className={`mx-2 w-8 sm:mx-3 sm:w-12 ${
                    i < currentStep ? "bg-primary" : ""
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="relative">
          {/* Step 1: Workspace */}
          <div
            className={`transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              currentStep === 0
                ? "opacity-100"
                : "pointer-events-none absolute top-0 w-full opacity-0"
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="tracking-tight text-balance">
                  Create your workspace
                </CardTitle>
                <CardDescription>
                  Give your workspace a name to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workspace-name">Workspace name</Label>
                  <Input
                    id="workspace-name"
                    placeholder="Acme Corp"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workspace-slug">Workspace URL</Label>
                  <div className="flex items-center gap-0">
                    <span className="flex h-9 items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                      acme.app/
                    </span>
                    <Input
                      id="workspace-slug"
                      className="rounded-l-none"
                      placeholder="my-workspace"
                      defaultValue={workspaceName
                        .toLowerCase()
                        .replace(/\s+/g, "-")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workspace-industry">Industry</Label>
                  <Select defaultValue="saas">
                    <SelectTrigger id="workspace-industry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS / Software</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 2: Team */}
          <div
            className={`transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              currentStep === 1
                ? "opacity-100"
                : "pointer-events-none absolute top-0 w-full opacity-0"
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="tracking-tight text-balance">
                  Invite your team
                </CardTitle>
                <CardDescription>
                  Add team members by email. You can always do this later.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-1">Team member 1</Label>
                  <Input
                    id="invite-1"
                    type="email"
                    placeholder="colleague@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-2">Team member 2</Label>
                  <Input
                    id="invite-2"
                    type="email"
                    placeholder="colleague@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-3">Team member 3</Label>
                  <Input
                    id="invite-3"
                    type="email"
                    placeholder="colleague@company.com"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Invitations will be sent after you complete the setup.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Step 3: Configure */}
          <div
            className={`transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              currentStep === 2
                ? "opacity-100"
                : "pointer-events-none absolute top-0 w-full opacity-0"
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="tracking-tight text-balance">
                  Configure preferences
                </CardTitle>
                <CardDescription>
                  Set up your workspace preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">
                        Pacific Time (UTC-8)
                      </SelectItem>
                      <SelectItem value="utc-5">
                        Eastern Time (UTC-5)
                      </SelectItem>
                      <SelectItem value="utc+0">UTC (UTC+0)</SelectItem>
                      <SelectItem value="utc+1">
                        Central European (UTC+1)
                      </SelectItem>
                      <SelectItem value="utc+8">
                        China Standard (UTC+8)
                      </SelectItem>
                      <SelectItem value="utc+9">
                        Japan Standard (UTC+9)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Notifications</Label>
                  <label
                    htmlFor="notify-email"
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Checkbox id="notify-email" defaultChecked />
                    <div>
                      <span className="text-sm font-medium">
                        Email notifications
                      </span>
                      <p className="text-xs text-muted-foreground">
                        Receive updates about your workspace via email
                      </p>
                    </div>
                  </label>
                  <label
                    htmlFor="notify-weekly"
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Checkbox id="notify-weekly" defaultChecked />
                    <div>
                      <span className="text-sm font-medium">
                        Weekly digest
                      </span>
                      <p className="text-xs text-muted-foreground">
                        Get a summary of activity each week
                      </p>
                    </div>
                  </label>
                  <label
                    htmlFor="notify-marketing"
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Checkbox id="notify-marketing" />
                    <div>
                      <span className="text-sm font-medium">
                        Product updates
                      </span>
                      <p className="text-xs text-muted-foreground">
                        News about new features and improvements
                      </p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 4: Complete */}
          <div
            className={`transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              currentStep === 3
                ? "opacity-100"
                : "pointer-events-none absolute top-0 w-full opacity-0"
            }`}
          >
            <Card>
              <CardContent className="flex flex-col items-center py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Check
                    className="h-7 w-7 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-balance">
                  You're all set!
                </h2>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Your workspace is ready. Start exploring your dashboard,
                  invite more team members, or configure integrations.
                </p>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline">Invite more people</Button>
                  <Button>Go to dashboard</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation buttons */}
        {currentStep < 3 && (
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={back}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>
            <Button onClick={next} className="gap-2">
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
