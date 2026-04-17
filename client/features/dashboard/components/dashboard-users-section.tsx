"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { AdminUser } from "@/features/dashboard/types/admin.types";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Badge } from "@/shared/components/ui/badge";
import { Switch } from "@/shared/components/ui/switch";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

type UserFormState = {
  fullName: string;
  email: string;
  isAdmin: boolean;
};

type DashboardUsersSectionProps = {
  users: AdminUser[];
  onUpdateUser: (
    id: string,
    payload: { fullName?: string; email?: string; isAdmin?: boolean },
  ) => Promise<void>;
  onDeleteUser: (id: string) => Promise<void>;
};

export const DashboardUsersSection = ({
  users,
  onUpdateUser,
  onDeleteUser,
}: DashboardUsersSectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<UserFormState>({ fullName: "", email: "", isAdmin: false });
  const [submitting, setSubmitting] = useState(false);

  const setField = <K extends keyof UserFormState>(field: K, value: UserFormState[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const openEdit = (user: AdminUser) => {
    setForm({ fullName: user.fullName, email: user.email, isAdmin: user.isAdmin });
    setEditId(user.id);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!editId) return;
    setSubmitting(true);
    try {
      await onUpdateUser(editId, {
        fullName: form.fullName,
        email: form.email,
        isAdmin: form.isAdmin,
      });
      setDialogOpen(false);
    } catch {
      // toast shown by hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Users</h2>

      <Card>
        <CardContent className="overflow-x-auto pt-4">
          <table className="w-full min-w-125 text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Name
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Email
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Role
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 font-medium">{user.fullName}</td>
                  <td className="p-2 text-muted-foreground">{user.email}</td>
                  <td className="p-2">
                    <Badge variant={user.isAdmin ? "success" : "outline"}>
                      {user.isAdmin ? "Admin" : "User"}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(user)}>
                        <Pencil className="mr-1 size-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDeleteUser(user.id)}
                      >
                        <Trash2 className="mr-1 size-3" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={form.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.isAdmin}
                onCheckedChange={(v) => setField("isAdmin", v)}
              />
              <Label>Admin access</Label>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
