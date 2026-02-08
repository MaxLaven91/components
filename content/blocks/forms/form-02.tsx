import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function Form02() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <Button type="button" variant="outline" size="sm">
                Change avatar
              </Button>
              <p className="text-xs text-muted-foreground">JPG, PNG or GIF. 1MB max.</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="form02-name">Name</Label>
              <Input id="form02-name" defaultValue="Jane Doe" autoComplete="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="form02-email">Email</Label>
              <Input
                id="form02-email"
                type="email"
                defaultValue="jane@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Notifications</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="form02-email-notif" className="flex flex-col gap-1">
                <span>Email notifications</span>
                <span className="font-normal text-muted-foreground">
                  Receive emails about account activity
                </span>
              </Label>
              <Switch id="form02-email-notif" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="form02-marketing" className="flex flex-col gap-1">
                <span>Marketing emails</span>
                <span className="font-normal text-muted-foreground">
                  Receive emails about new features and updates
                </span>
              </Label>
              <Switch id="form02-marketing" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-destructive">Danger zone</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data.
            </p>
            <Button type="button" variant="destructive" size="sm">
              Delete account
            </Button>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
