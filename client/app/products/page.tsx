import { ProductsGrid } from "@/features/products/components/products-grid";
import { getProducts } from "@/features/products/services/product.service";
import { Pagination } from "@/shared/components/layouts/pagination";

type ProductsPageProps = {
  searchParams?: Promise<{
    category?: string;
    page?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = (await searchParams) ?? {};
  const currentPage = Math.max(1, Number(params.page ?? "1") || 1);
  const products = await getProducts(params.category, currentPage);
  const title = params.category ? `Products in ${params.category}` : "Products";

  return (
    <>
      <ProductsGrid title={title} total={products.total} products={products.data} />
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <Pagination
          currentPage={products.page}
          totalPages={products.last_page}
          pathname="/products"
          query={{ category: params.category }}
        />
      </div>
    </>
  );
}
