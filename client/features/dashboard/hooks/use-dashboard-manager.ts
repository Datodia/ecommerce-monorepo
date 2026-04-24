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
  getAdminCategories,
  getAdminProducts,
  updateAdminCategory,
  updateAdminOrder,
  updateAdminProduct,
  updateAdminUser,
} from "@/features/dashboard/services/admin.service";
import {
  DASHBOARD_PAGE_SIZE,
  DashboardInitialData,
  DashboardSection,
  DashboardStats,
} from "@/features/dashboard/types/admin.types";

export const useDashboardManager = (initialData: DashboardInitialData) => {
  const [section, setSection] = useState<DashboardSection>("overview");
  const [productsResponse, setProductsResponse] = useState(initialData.products);
  const [categoriesResponse, setCategoriesResponse] = useState(initialData.categories);
  const [users, setUsers] = useState(initialData.users);
  const [orders, setOrders] = useState(initialData.orders);
  const [stats, setStats] = useState<DashboardStats>(initialData.stats);
  const [productsLoading, setProductsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const chartMax = Math.max(stats.users, stats.products, stats.categories, stats.orders, 1);

  const loadProducts = async (page = productsResponse.page) => {
    setProductsLoading(true);
    try {
      const nextProducts = await getAdminProducts(page, DASHBOARD_PAGE_SIZE);
      setProductsResponse(nextProducts);
      return nextProducts;
    } finally {
      setProductsLoading(false);
    }
  };

  const loadCategories = async (page = categoriesResponse.page) => {
    setCategoriesLoading(true);
    try {
      const nextCategories = await getAdminCategories(page, DASHBOARD_PAGE_SIZE);
      setCategoriesResponse(nextCategories);
      return nextCategories;
    } finally {
      setCategoriesLoading(false);
    }
  };

  const createProduct = async (payload: {
    name: string;
    description?: string;
    price: number;
    categoryId: string;
    thumbnail?: string;
    images?: string[];
  }) => {
    const created = await createAdminProduct(payload);
    setStats((prev) => ({ ...prev, products: prev.products + 1 }));
    await loadProducts(1);
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
    setProductsResponse((prev) => ({
      ...prev,
      data: prev.data.map((product) => (product.id === updated.id ? updated : product)),
    }));
    toast.success("Product updated");
    return updated;
  };

  const deleteProduct = async (id: string) => {
    await deleteAdminProduct(id);
    setStats((prev) => ({ ...prev, products: Math.max(0, prev.products - 1) }));
    const nextPage =
      productsResponse.data.length === 1 && productsResponse.page > 1
        ? productsResponse.page - 1
        : productsResponse.page;
    await loadProducts(nextPage);
    toast.success("Product deleted");
  };

  const createCategory = async (payload: { name: string; slug: string; images?: string }) => {
    const created = await createAdminCategory(payload);
    setStats((prev) => ({ ...prev, categories: prev.categories + 1 }));
    await loadCategories(1);
    toast.success("Category created");
    return created;
  };

  const updateCategory = async (
    id: string,
    payload: { name?: string; slug?: string; images?: string },
  ) => {
    const updated = await updateAdminCategory(id, payload);
    setCategoriesResponse((prev) => ({
      ...prev,
      data: prev.data.map((category) => (category.id === updated.id ? updated : category)),
    }));
    toast.success("Category updated");
    return updated;
  };

  const deleteCategory = async (id: string) => {
    await deleteAdminCategory(id);
    setStats((prev) => ({ ...prev, categories: Math.max(0, prev.categories - 1) }));
    const nextPage =
      categoriesResponse.data.length === 1 && categoriesResponse.page > 1
        ? categoriesResponse.page - 1
        : categoriesResponse.page;
    await loadCategories(nextPage);
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
    products: productsResponse.data,
    productsPagination: productsResponse,
    productsLoading,
    loadProducts,
    categories: categoriesResponse.data,
    categoriesPagination: categoriesResponse,
    categoriesLoading,
    loadCategories,
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
