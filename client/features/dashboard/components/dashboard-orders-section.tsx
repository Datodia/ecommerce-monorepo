"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { Order } from "@/features/orders/types/order.types";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
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

const ORDER_STATUSES = ["paid", "pending", "processing", "shipped", "delivered", "cancelled"];

type StatusVariant = "warning" | "info" | "success" | "destructive" | "outline" | "secondary";

const statusVariant = (status: string): StatusVariant => {
  switch (status) {
    case "delivered":
      return "success";
    case "shipped":
      return "info";
    case "pending":
    case "paid":
      return "warning";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

type OrderFormState = {
  status: string;
  address: string;
  phoneNumber: string;
  buildingNumber: string;
};

type DashboardOrdersSectionProps = {
  orders: Order[];
  onUpdateOrder: (
    id: string,
    payload: {
      status?: string;
      address?: string;
      phoneNumber?: string;
      buildingNumber?: string;
    },
  ) => Promise<Order>;
  onDeleteOrder: (id: string) => Promise<void>;
};

export const DashboardOrdersSection = ({
  orders,
  onUpdateOrder,
  onDeleteOrder,
}: DashboardOrdersSectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<OrderFormState>({
    status: "",
    address: "",
    phoneNumber: "",
    buildingNumber: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const setField = (field: keyof OrderFormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const openEdit = (order: Order) => {
    setForm({
      status: order.status,
      address: order.address,
      phoneNumber: order.phoneNumber,
      buildingNumber: order.buildingNumber,
    });
    setEditId(order.id);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!editId) return;
    setSubmitting(true);
    try {
      await onUpdateOrder(editId, {
        status: form.status,
        address: form.address,
        phoneNumber: form.phoneNumber,
        buildingNumber: form.buildingNumber,
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
      <h2 className="text-xl font-semibold">Orders</h2>

      <Card>
        <CardContent className="overflow-x-auto pt-4">
          <table className="w-full min-w-175 text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Order ID
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  User ID
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Total
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2">
                    <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                      {order.id.slice(0, 8)}…
                    </span>
                  </td>
                  <td className="p-2">
                    <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                      {order.userId.slice(0, 8)}…
                    </span>
                  </td>
                  <td className="p-2">
                    <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                  </td>
                  <td className="p-2">${Number(order.totalAmount).toFixed(2)}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(order)}>
                        <Pencil className="mr-1 size-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDeleteOrder(order.id)}
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
            <DialogTitle>Edit Order</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setField("status", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={form.address} onChange={(e) => setField("address", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={form.phoneNumber}
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Building Number</Label>
                <Input
                  value={form.buildingNumber}
                  onChange={(e) => setField("buildingNumber", e.target.value)}
                />
              </div>
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
