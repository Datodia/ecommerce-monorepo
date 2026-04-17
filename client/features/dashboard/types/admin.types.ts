import { Category } from "@/features/categories/types/category";
import { Order } from "@/features/orders/types/order.types";
import { Product } from "@/features/products/types/product";

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  createdAt?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  last_page: number;
};

export type DashboardStats = {
  products: number;
  categories: number;
  users: number;
  orders: number;
  revenue: number;
};

export type DashboardInitialData = {
  products: Product[];
  categories: Category[];
  users: AdminUser[];
  orders: Order[];
  stats: DashboardStats;
};

export type DashboardSection =
  | "overview"
  | "products"
  | "categories"
  | "users"
  | "orders";
