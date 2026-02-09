import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login01() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl tracking-tight">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="login01-email">Email</Label>
              <Input
                id="login01-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login01-password">Password</Label>
                <a
                  href="/forgot-password"
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input id="login01-password" type="password" autoComplete="current-password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="text-foreground underline-offset-4 hover:underline">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
