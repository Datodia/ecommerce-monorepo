import { http } from "@/shared/lib/http";
import { Product, ProductsResponse } from "../types/product";

const createProductSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const getProducts = async (categorySlug?: string) => {
  const response = await http.get<
    Omit<ProductsResponse, "data"> & { data: Omit<Product, "slug">[] }
  >("/products");

  const data = response.data.map((product) => ({
    ...product,
    slug: createProductSlug(product.name),
  }));

  return {
    ...response,
    data: categorySlug
      ? data.filter((product) => product.category.slug === categorySlug)
      : data,
  } satisfies ProductsResponse;
};

export const getProductBySlug = async (slug: string) => {
  const products = await getProducts();
  return products.data.find((product) => product.slug === slug) ?? null;
};
