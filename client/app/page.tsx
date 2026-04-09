import { getProducts } from "@/features/products/services/product.service";
import { ProductsGrid } from "@/features/products/components/products-grid";

export default async function Home() {
  const products = await getProducts();

  return <ProductsGrid title="Featured Products" total={products.total} products={products.data} />;
}
