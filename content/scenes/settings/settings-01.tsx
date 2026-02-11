"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  CreditCard,
  Settings,
  Shield,
  User,
} from "lucide-react";

const notifications = [
  {
    id: "email-updates",
    label: "Product updates",
    description: "News about new features and improvements",
    defaultChecked: true,
  },
  {
    id: "email-security",
    label: "Security alerts",
    description: "Important alerts about your account security",
    defaultChecked: true,
  },
  {
    id: "email-marketing",
    label: "Marketing emails",
    description: "Tips, offers, and promotions from Acme",
    defaultChecked: false,
  },
  {
    id: "email-weekly",
    label: "Weekly digest",
    description: "A summary of activity on your account each week",
    defaultChecked: true,
  },
];

export default function Settings01() {
  const [name, setName] = useState("Jane Smith");
  const [email, setEmail] = useState("jane@acme.co");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-3 px-6">
          <Settings className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h1 className="text-lg font-semibold tracking-tight text-balance">Settings</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <Tabs defaultValue="general" className="space-y-8">
          <TabsList>
            <TabsTrigger value="general" className="gap-2">
              <User className="hidden h-4 w-4 sm:block" aria-hidden="true" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="hidden h-4 w-4 sm:block" aria-hidden="true" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="hidden h-4 w-4 sm:block" aria-hidden="true" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="danger" className="gap-2">
              <Shield className="hidden h-4 w-4 sm:block" aria-hidden="true" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* General */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Your public profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">JS</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <Button type="button" variant="outline" size="sm">
                        Change avatar
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG or GIF. 1MB max.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="settings-name">Full name</Label>
                      <Input
                        id="settings-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="settings-email">Email</Label>
                      <Input
                        id="settings-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="settings-role">Role</Label>
                    <Input
                      id="settings-role"
                      defaultValue="Head of Engineering"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      Contact your admin to change your role
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button type="submit">Save changes</Button>
                    <span
                      className={`text-sm text-emerald-600 dark:text-emerald-400 transition-opacity duration-150 ease-out motion-reduce:transition-none ${
                        saved ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Saved
                    </span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose what emails you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {notifications.map((item, i) => (
                  <div key={item.id}>
                    <label
                      htmlFor={item.id}
                      className="flex cursor-pointer items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Switch
                        id={item.id}
                        defaultChecked={item.defaultChecked}
                      />
                    </label>
                    {i < notifications.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      You are on the Pro plan
                    </CardDescription>
                  </div>
                  <Badge>Pro</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl font-bold tracking-tight tabular-nums">
                        $29
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Change plan
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Billed monthly. Next invoice on Feb 1, 2025.
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>API requests this month</span>
                    <span className="font-medium tabular-nums">
                      8,420 / 10,000
                    </span>
                  </div>
                  <Progress value={84} />
                  <p className="text-xs text-muted-foreground">
                    84% of your monthly limit used. Resets on Feb 1.
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Storage used</span>
                    <span className="font-medium tabular-nums">
                      2.4 GB / 5 GB
                    </span>
                  </div>
                  <Progress value={48} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Manage your payment details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-14 items-center justify-center rounded border bg-muted text-xs font-medium">
                      VISA
                    </div>
                    <div>
                      <p className="text-sm font-medium tabular-nums">
                        **** **** **** 4242
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Expires 12/2026
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security / Danger zone */}
          <TabsContent value="danger" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm new password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button type="submit">Update password</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-4 rounded-lg border border-destructive/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium">Delete account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="shrink-0">
                        Delete account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove all of your data from
                          our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90">
                          Delete account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
