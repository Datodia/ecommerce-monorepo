import "server-only";

import { Category } from "@/features/categories/types/category";
import {
  AdminUser,
  DASHBOARD_PAGE_SIZE,
  DashboardInitialData,
  DashboardStats,
  PaginatedResponse,
} from "@/features/dashboard/types/admin.types";
import { Order } from "@/features/orders/types/order.types";
import { Product, ProductsResponse } from "@/features/products/types/product";
import { http } from "@/shared/lib/http";

export const getDashboardPageData = async (token: string) => {
  const headers = { Authorization: `Bearer ${token}` };

  const [user, productsResponse, categoriesResponse, users, orders, stats] = await Promise.all([
    http.get<AdminUser>("/auth/profile", { headers }),
    http.get<ProductsResponse>("/products", {
      headers,
      params: { page: 1, limit: DASHBOARD_PAGE_SIZE },
    }),
    http.get<PaginatedResponse<Category>>("/categories", {
      headers,
      params: { page: 1, limit: DASHBOARD_PAGE_SIZE },
    }),
    http.get<AdminUser[]>("/users", { headers, params: { page: 1, limit: 30 } }),
    http.get<Order[]>("/orders/admin/all", { headers }),
    http.get<DashboardStats>("/statistics", { headers }),
  ]);

  const initialData: DashboardInitialData = {
    products: {
      ...productsResponse,
      data: (productsResponse.data ?? []) as Product[],
    },
    categories: {
      ...categoriesResponse,
      data: categoriesResponse.data ?? [],
    },
    users,
    orders,
    stats,
  };

  return {
    user,
    initialData,
  };
};
