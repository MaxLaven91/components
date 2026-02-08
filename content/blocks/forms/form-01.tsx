import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Form01() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">Contact us</CardTitle>
        <CardDescription>
          Fill out the form below and we&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="form01-firstname">First name</Label>
              <Input id="form01-firstname" placeholder="Jane" autoComplete="given-name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="form01-lastname">Last name</Label>
              <Input id="form01-lastname" placeholder="Doe" autoComplete="family-name" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="form01-email">Email</Label>
            <Input
              id="form01-email"
              type="email"
              placeholder="jane@example.com"
              autoComplete="email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="form01-subject">Subject</Label>
            <Select>
              <SelectTrigger id="form01-subject">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General inquiry</SelectItem>
                <SelectItem value="support">Technical support</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="form01-message">Message</Label>
            <Textarea id="form01-message" placeholder="How can we help you?" rows={4} />
          </div>
          <Button type="submit" className="w-full sm:w-auto sm:justify-self-end">
            Send message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
