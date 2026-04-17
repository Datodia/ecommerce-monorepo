"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, Upload, X } from "lucide-react";

import { Category } from "@/features/categories/types/category";
import { uploadFile } from "@/features/dashboard/services/admin.service";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Badge } from "@/shared/components/ui/badge";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

type CategoryFormState = {
  name: string;
  slug: string;
  images: string;
};

type DashboardCategoriesSectionProps = {
  categories: Category[];
  onCreateCategory: (payload: { name: string; slug: string; images?: string }) => Promise<Category>;
  onUpdateCategory: (
    id: string,
    payload: { name?: string; slug?: string; images?: string },
  ) => Promise<Category>;
  onDeleteCategory: (id: string) => Promise<void>;
};

const defaultForm: CategoryFormState = { name: "", slug: "", images: "" };

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const DashboardCategoriesSection = ({
  categories,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
}: DashboardCategoriesSectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryFormState>(defaultForm);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const previewUrl = useMemo(
    () => (pendingFile ? URL.createObjectURL(pendingFile) : null),
    [pendingFile],
  );

  const setField = (field: keyof CategoryFormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const openCreate = () => {
    setForm(defaultForm);
    setPendingFile(null);
    setEditId(null);
    setDialogMode("create");
    setDialogOpen(true);
  };

  const openEdit = (category: Category) => {
    setForm({ name: category.name, slug: category.slug, images: category.images || "" });
    setPendingFile(null);
    setEditId(category.id);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      ...(dialogMode === "create" ? { slug: toSlug(value) } : {}),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    e.target.value = "";
  };

  const clearImage = () => {
    setPendingFile(null);
    setField("images", "");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.slug) {
      toast.error("Name and slug are required");
      return;
    }
    setSubmitting(true);
    try {
      let imagesUrl = form.images;
      if (pendingFile) {
        const { url } = await uploadFile(pendingFile);
        imagesUrl = url;
      }
      if (dialogMode === "create") {
        await onCreateCategory({
          name: form.name,
          slug: form.slug,
          images: imagesUrl || undefined,
        });
      } else if (editId) {
        await onUpdateCategory(editId, {
          name: form.name,
          slug: form.slug,
          images: imagesUrl || undefined,
        });
      }
      setDialogOpen(false);
    } catch {
      // toast shown by hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button size="sm" onClick={openCreate}>
          <Plus className="mr-1 size-4" />
          New Category
        </Button>
      </div>

      <Card>
        <CardContent className="overflow-x-auto pt-4">
          <table className="w-full min-w-100 text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Name
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Slug
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 font-medium">{category.name}</td>
                  <td className="p-2">
                    <Badge variant="outline">{category.slug}</Badge>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(category)}>
                        <Pencil className="mr-1 size-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDeleteCategory(category.id)}
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
            <DialogTitle>
              {dialogMode === "create" ? "New Category" : "Edit Category"}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => handleNameChange(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={form.slug} onChange={(e) => setField("slug", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              {(previewUrl || form.images) && (
                <div className="relative w-fit">
                  <img
                    src={previewUrl ?? form.images}
                    alt="preview"
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -right-1.5 -top-1.5 rounded-full bg-destructive p-0.5 text-destructive-foreground"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              )}
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground hover:border-primary">
                <Upload className="size-4" />
                Upload image (max 2MB)
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Saving..." : dialogMode === "create" ? "Create" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
