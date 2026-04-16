import { CategoryCard } from "@/features/categories/components/category-card";
import { getCategories } from "@/features/categories/services/category.service";
import { Pagination } from "@/shared/components/layouts/pagination";

type CategoriesPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const params = (await searchParams) ?? {};
  const currentPage = Math.max(1, Number(params.page ?? "1") || 1);
  const categories = await getCategories(currentPage);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="font-heading text-2xl font-semibold">Categories</h1>
        <p className="text-sm text-muted-foreground">{categories.total} categories</p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.data.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </section>

      <Pagination
        currentPage={categories.page}
        totalPages={categories.last_page}
        pathname="/categories"
      />
    </main>
  );
}
