import { getProductBySlug } from "@/features/products/services/product.service";
import { ProductDetails } from "@/features/products/components/product-details";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug: productId } = await params;
  const product = await getProductBySlug(productId);

  if (!product) {   
    notFound();
  }

  return <ProductDetails product={product} />;
}
