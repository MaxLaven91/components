import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login03() {
  return (
    <div className="grid min-h-[600px] lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-primary p-10 text-primary-foreground">
        <div className="text-lg font-semibold tracking-tight">Acme Inc.</div>
        <blockquote className="space-y-2">
          <p className="text-lg leading-relaxed">
            &ldquo;This platform has completely transformed how we manage our workflow. The
            interface is clean and the team collaboration features are outstanding.&rdquo;
          </p>
          <footer className="text-sm text-primary-foreground/80">
            Sofia Davis, CEO at TechCorp
          </footer>
        </blockquote>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="login03-email">Email</Label>
              <Input
                id="login03-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="login03-password">Password</Label>
              <Input id="login03-password" type="password" autoComplete="current-password" />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="text-foreground underline-offset-4 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
