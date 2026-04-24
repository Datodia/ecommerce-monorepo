import { getAccessToken } from "@/features/auth/services/token.service";
import { Category } from "@/features/categories/types/category";
import { Order } from "@/features/orders/types/order.types";
import { Product, ProductsResponse } from "@/features/products/types/product";
import { http } from "@/shared/lib/http";
import {
  AdminUser,
  DASHBOARD_PAGE_SIZE,
  DashboardStats,
  PaginatedResponse,
} from "@/features/dashboard/types/admin.types";

type ProductMutationPayload = {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  thumbnail?: string;
  images?: string[];
};

type CategoryMutationPayload = {
  name: string;
  slug: string;
  images?: string;
};

export const getAdminProducts = async (page = 1, limit = DASHBOARD_PAGE_SIZE) => {
  return http.get<ProductsResponse>("/products", { params: { page, limit } });
};

export const createAdminProduct = async (payload: ProductMutationPayload) => {
  return http.post<Product>("/products", {
    thumbnail: "https://picsum.photos/seed/dashboard/400/400",
    images: ["https://picsum.photos/seed/dashboard-1/640/480"],
    ...payload,
  });
};

export const updateAdminProduct = async (
  id: string,
  payload: Partial<ProductMutationPayload>,
) => {
  return http.patch<Product>(`/products/${id}`, payload);
};

export const deleteAdminProduct = async (id: string) => {
  return http.delete<Product>(`/products/${id}`);
};

export const getAdminCategories = async (page = 1, limit = DASHBOARD_PAGE_SIZE) => {
  return http.get<PaginatedResponse<Category>>("/categories", {
    params: { page, limit },
  });
};

export const createAdminCategory = async (payload: CategoryMutationPayload) => {
  return http.post<Category>("/categories", payload);
};

export const updateAdminCategory = async (
  id: string,
  payload: Partial<CategoryMutationPayload>,
) => {
  return http.patch<Category>(`/categories/${id}`, payload);
};

export const deleteAdminCategory = async (id: string) => {
  return http.delete<{ message: string }>(`/categories/${id}`);
};

export const getAdminUsers = async () => {
  return http.get<AdminUser[]>("/users", { params: { page: 1, limit: 30 } });
};

export const updateAdminUser = async (
  id: string,
  payload: Partial<Pick<AdminUser, "fullName" | "email" | "isAdmin">>,
) => {
  return http.patch<{ affected: number }>(`/users/${id}`, payload);
};

export const deleteAdminUser = async (id: string) => {
  return http.delete<{ affected: number }>(`/users/${id}`);
};

export const getAdminOrders = async () => {
  return http.get<Order[]>("/orders/admin/all");
};

export const updateAdminOrder = async (
  id: string,
  payload: Partial<Pick<Order, "status" | "address" | "phoneNumber" | "buildingNumber" | "additionalInfo">>,
) => {
  return http.patch<Order>(`/orders/admin/${id}`, payload);
};

export const deleteAdminOrder = async (id: string) => {
  return http.delete<Order>(`/orders/admin/${id}`);
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  return http.get<DashboardStats>("/statistics");
};

export const uploadFile = async (file: File): Promise<{ url: string; publicId: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const token = getAccessToken();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "/api";

  const res = await fetch(`${baseUrl}/storage`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? "Upload failed");
  }

  return res.json() as Promise<{ url: string; publicId: string }>;
};
