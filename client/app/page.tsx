import { getProducts } from "@/features/products/services/product.service";
import { ProductsGrid } from "@/features/products/components/products-grid";
import { Pagination } from "@/shared/components/layouts/pagination";

type HomePageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};
  const currentPage = Math.max(1, Number(params.page ?? "1") || 1);
  const products = await getProducts(undefined, currentPage);

  return (
    <>
      <ProductsGrid title="Featured Products" total={products.total} products={products.data} />
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <Pagination currentPage={products.page} totalPages={products.last_page} pathname="/" />
      </div>
    </>
  );
}
