import { getProductBySlug } from "@/features/products/services/product.service";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {   
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="mb-6 h-72 w-full rounded-xl border bg-gray-100 object-contain p-6"
      />

      <p className="text-sm uppercase tracking-wide text-muted-foreground">{product.category.name}</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold">{product.name}</h1>
      <p className="mt-4 text-base text-muted-foreground">{product.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {product.images.map((image) => (
          <img
            key={image}
            src={image}
            alt={`${product.name} image`}
            className="h-32 w-full rounded-md border bg-gray-100 object-contain p-3"
          />
        ))}
      </div>

      <div className="mt-8 rounded-lg border bg-card p-5">
        <p className="text-xl font-semibold">${product.price}</p>
        <p className="mt-1 text-sm text-muted-foreground">Category: {product.category.slug}</p>
      </div>
    </main>
  );
}
