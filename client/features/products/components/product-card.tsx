import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import Link from "next/link";
import { Product } from "../types/product";

type ProductCardProps = {
	product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
	return (
		<Link href={`/products/${product.slug}`} className="group block h-full">
			<Card className="h-full justify-between border border-border/60 transition-colors group-hover:border-primary/30">
				<img
					src={product.thumbnail}
					alt={product.name}
					className="h-56 w-full bg-gray-100 object-contain p-4"
				/>

				<CardHeader className="space-y-2">
					<p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
						{product.category.name}
					</p>
					<CardTitle className="line-clamp-2 text-base">{product.name}</CardTitle>
				</CardHeader>

				<CardContent className="space-y-3">
					<p className="line-clamp-4 text-sm text-muted-foreground">
						{product.description}
					</p>
				</CardContent>

				<CardFooter className="border-t">
					<div className="w-full">
						<p className="text-lg font-semibold">${product.price}</p>
						<p className="text-xs text-muted-foreground">Category slug: {product.category.slug}</p>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}

export default ProductCard;
