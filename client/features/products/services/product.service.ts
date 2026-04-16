import { http } from "@/shared/lib/http";
import { Product, ProductsResponse } from "../types/product";

export const getProducts = async (categorySlug?: string, page?: number) => {
  return http.get<ProductsResponse>("/products", {
    params: {
      category: categorySlug,
      page,
    },
  });
};

export const getProductBySlug = async (id: string) => {
  return await http.get<Product>(`/products/${id}`);
};
