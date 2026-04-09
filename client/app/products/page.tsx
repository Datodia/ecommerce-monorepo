import { ProductsGrid } from "@/features/products/components/products-grid";
import { getProducts } from "@/features/products/services/product.service";

type ProductsPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = (await searchParams) ?? {};
  const products = await getProducts(params.category);
  const title = params.category ? `Products in ${params.category}` : "Products";

  return <ProductsGrid title={title} total={products.total} products={products.data} />;
}
