"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialData = {
  name: "Jane Doe",
  email: "jane@example.com",
  bio: "Product designer with 8 years of experience building user-centered digital products.",
};

export default function Form03() {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(initialData);
  const [draft, setDraft] = useState(initialData);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setData(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(data);
    setEditing(false);
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Profile</CardTitle>
        {!editing && (
          <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
            <Pencil className="size-3.5" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {editing ? (
          <form className="grid gap-4" onSubmit={handleSave}>
            <div className="grid gap-2">
              <Label htmlFor="form03-name">Name</Label>
              <Input
                id="form03-name"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                autoComplete="name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="form03-email">Email</Label>
              <Input
                id="form03-email"
                type="email"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="form03-bio">Bio</Label>
              <Textarea
                id="form03-bio"
                value={draft.bio}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        ) : (
          <dl className="grid gap-4">
            <div className="grid gap-1">
              <dt className="text-sm text-muted-foreground">Name</dt>
              <dd className="text-sm">{data.name}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-sm text-muted-foreground">Email</dt>
              <dd className="text-sm">{data.email}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-sm text-muted-foreground">Bio</dt>
              <dd className="text-sm">{data.bio}</dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  );
}
