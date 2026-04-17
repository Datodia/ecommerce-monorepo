"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  createAdminCategory,
  createAdminProduct,
  deleteAdminCategory,
  deleteAdminOrder,
  deleteAdminProduct,
  deleteAdminUser,
  updateAdminCategory,
  updateAdminOrder,
  updateAdminProduct,
  updateAdminUser,
} from "@/features/dashboard/services/admin.service";
import {
  DashboardInitialData,
  DashboardSection,
  DashboardStats,
} from "@/features/dashboard/types/admin.types";

export const useDashboardManager = (initialData: DashboardInitialData) => {
  const [section, setSection] = useState<DashboardSection>("overview");
  const [products, setProducts] = useState(initialData.products);
  const [categories, setCategories] = useState(initialData.categories);
  const [users, setUsers] = useState(initialData.users);
  const [orders, setOrders] = useState(initialData.orders);
  const [stats, setStats] = useState<DashboardStats>(initialData.stats);

  const chartMax = Math.max(stats.users, stats.products, stats.categories, stats.orders, 1);

  const createProduct = async (payload: {
    name: string;
    description?: string;
    price: number;
    categoryId: string;
    thumbnail?: string;
    images?: string[];
  }) => {
    const created = await createAdminProduct(payload);
    setProducts((prev) => [created, ...prev]);
    setStats((prev) => ({ ...prev, products: prev.products + 1 }));
    toast.success("Product created");
    return created;
  };

  const updateProduct = async (
    id: string,
    payload: {
      name?: string;
      description?: string;
      price?: number;
      categoryId?: string;
      thumbnail?: string;
    },
  ) => {
    const updated = await updateAdminProduct(id, payload);
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    toast.success("Product updated");
    return updated;
  };

  const deleteProduct = async (id: string) => {
    await deleteAdminProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setStats((prev) => ({ ...prev, products: Math.max(0, prev.products - 1) }));
    toast.success("Product deleted");
  };

  const createCategory = async (payload: { name: string; slug: string; images?: string }) => {
    const created = await createAdminCategory(payload);
    setCategories((prev) => [created, ...prev]);
    setStats((prev) => ({ ...prev, categories: prev.categories + 1 }));
    toast.success("Category created");
    return created;
  };

  const updateCategory = async (
    id: string,
    payload: { name?: string; slug?: string; images?: string },
  ) => {
    const updated = await updateAdminCategory(id, payload);
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    toast.success("Category updated");
    return updated;
  };

  const deleteCategory = async (id: string) => {
    await deleteAdminCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setStats((prev) => ({ ...prev, categories: Math.max(0, prev.categories - 1) }));
    toast.success("Category deleted");
  };

  const updateUser = async (
    id: string,
    payload: { fullName?: string; email?: string; isAdmin?: boolean },
  ) => {
    await updateAdminUser(id, payload);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...payload } : u)));
    toast.success("User updated");
  };

  const deleteUser = async (id: string) => {
    await deleteAdminUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setStats((prev) => ({ ...prev, users: Math.max(0, prev.users - 1) }));
    toast.success("User deleted");
  };

  const updateOrder = async (
    id: string,
    payload: {
      status?: string;
      address?: string;
      phoneNumber?: string;
      buildingNumber?: string;
    },
  ) => {
    const updated = await updateAdminOrder(id, payload);
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    toast.success("Order updated");
    return updated;
  };

  const deleteOrder = async (id: string) => {
    await deleteAdminOrder(id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setStats((prev) => ({ ...prev, orders: Math.max(0, prev.orders - 1) }));
    toast.success("Order deleted");
  };

  return {
    section,
    setSection,
    products,
    categories,
    users,
    orders,
    stats,
    chartMax,
    createProduct,
    updateProduct,
    deleteProduct,
    createCategory,
    updateCategory,
    deleteCategory,
    updateUser,
    deleteUser,
    updateOrder,
    deleteOrder,
  };
};
