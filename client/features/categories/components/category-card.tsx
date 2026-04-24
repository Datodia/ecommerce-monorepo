import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Category } from "../types/category";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const imageSrc = category.images || "https://placehold.co/600x400";

  return (
    <Link href={`/products?category=${category.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border border-border/60 transition-colors group-hover:border-primary/30">
        <div className="relative h-48 w-full bg-gray-100">
          <Image
            src={imageSrc}
            alt={category.name}
            fill
            unoptimized
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1 text-base">{category.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">{category.slug}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CategoryCard;
