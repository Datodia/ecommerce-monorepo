import { ProductCard } from "./product-card";
import { Product } from "../types/product";

type ProductsGridProps = {
  title: string;
  total: number;
  products: Product[];
};

export function ProductsGrid({ title, total, products }: ProductsGridProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="font-heading text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{total} products</p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}

export default ProductsGrid;