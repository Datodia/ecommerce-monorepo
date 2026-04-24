"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, Upload, X } from "lucide-react";

import { Product } from "@/features/products/types/product";
import { Category } from "@/features/categories/types/category";
import { uploadFile } from "@/features/dashboard/services/admin.service";
import { DASHBOARD_PAGE_SIZE } from "@/features/dashboard/types/admin.types";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Badge } from "@/shared/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { DeleteConfirmationModal } from "@/features/dashboard/components/delete-confirmation-modal";
import { Pagination } from "@/features/dashboard/components/pagination";

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  thumbnail: string;
};

type DashboardProductsSectionProps = {
  products: Product[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => Promise<unknown>;
  categories: Category[];
  onCreateProduct: (payload: {
    name: string;
    description?: string;
    price: number;
    categoryId: string;
    thumbnail?: string;
  }) => Promise<Product>;
  onUpdateProduct: (
    id: string,
    payload: {
      name?: string;
      description?: string;
      price?: number;
      categoryId?: string;
      thumbnail?: string;
    },
  ) => Promise<Product>;
  onDeleteProduct: (id: string) => Promise<void>;
};

const defaultForm: ProductFormState = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  thumbnail: "",
};

export const DashboardProductsSection = ({
  products,
  currentPage,
  totalItems,
  totalPages,
  isLoading = false,
  onPageChange,
  categories,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
}: DashboardProductsSectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormState>(defaultForm);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const itemsPerPage = DASHBOARD_PAGE_SIZE;

  const previewUrl = useMemo(
    () => (pendingFile ? URL.createObjectURL(pendingFile) : null),
    [pendingFile],
  );

  const setField = (field: keyof ProductFormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const openCreate = () => {
    setForm(defaultForm);
    setPendingFile(null);
    setEditId(null);
    setDialogMode("create");
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description || "",
      price: String(product.price),
      categoryId: product.category?.id || "",
      thumbnail: product.thumbnail || "",
    });
    setPendingFile(null);
    setEditId(product.id);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    e.target.value = "";
  };

  const clearImage = () => {
    setPendingFile(null);
    setField("thumbnail", "");
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      await onDeleteProduct(productToDelete.id);
      setDeleteConfirmOpen(false);
      setProductToDelete(null);
    } catch {
      // toast shown by hook
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.categoryId || !form.price) {
      toast.error("Name, category and price are required");
      return;
    }
    setSubmitting(true);
    try {
      let thumbnailUrl = form.thumbnail;
      if (pendingFile) {
        const { url } = await uploadFile(pendingFile);
        thumbnailUrl = url;
      }
      if (dialogMode === "create") {
        await onCreateProduct({
          name: form.name,
          description: form.description || undefined,
          price: Number(form.price),
          categoryId: form.categoryId,
          thumbnail: thumbnailUrl || undefined,
        });
      } else if (editId) {
        await onUpdateProduct(editId, {
          name: form.name,
          description: form.description || undefined,
          price: Number(form.price),
          categoryId: form.categoryId,
          thumbnail: thumbnailUrl || undefined,
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
        <h2 className="text-xl font-semibold">Products</h2>
        <Button size="sm" onClick={openCreate}>
          <Plus className="mr-1 size-4" />
          New Product
        </Button>
      </div>

      <Card>
        <CardContent className="overflow-x-auto pt-4">
          <table className="w-full min-w-150 text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Name
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Category
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Price
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 font-medium">{product.name}</td>
                  <td className="p-2">
                    <Badge variant="secondary">{product.category?.name}</Badge>
                  </td>
                  <td className="p-2">${Number(product.price).toFixed(2)}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(product)}>
                        <Pencil className="mr-1 size-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <Trash2 className="mr-1 size-3" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-sm text-muted-foreground">
                    {isLoading ? "Loading products..." : "No products found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => void onPageChange(page)}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />

      <DeleteConfirmationModal
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
        itemName={productToDelete?.name}
        isLoading={deleting}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMode === "create" ? "New Product" : "Edit Product"}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setField("name", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setField("price", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.categoryId} onValueChange={(v) => setField("categoryId", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Thumbnail</Label>
              {(previewUrl || form.thumbnail) && (
                <div className="relative w-fit">
                  <Image
                    src={previewUrl ?? form.thumbnail}
                    alt="preview"
                    width={80}
                    height={80}
                    unoptimized
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
