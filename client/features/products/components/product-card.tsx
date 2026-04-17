"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import Link from "next/link";
import { Product } from "../types/product";
import { Button } from "@/shared/components/ui/button";
import { useCart } from "@/features/cart/hooks/use-cart";

type ProductCardProps = {
	product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
	const [quantity, setQuantity] = useState(1);
	const [isAdding, setIsAdding] = useState(false);
	const { addItem } = useCart();

	const onDecrease = () => {
		setQuantity((prev) => Math.max(1, prev - 1));
	};

	const onIncrease = () => {
		setQuantity((prev) => prev + 1);
	};

	const onAddToCart = async () => {
		setIsAdding(true);
		try {
			await addItem({ product, quantity });
		} finally {
			setIsAdding(false);
		}
	};

	return (
		<Card className="h-full justify-between border border-border/60 transition-colors hover:border-primary/30">
			<Link href={`/products/${product.id}`} className="group block">
				<img
					src={product.thumbnail}
					alt={product.name}
					className="h-64 w-full bg-gray-100 object-contain p-4"
				/>

				<CardHeader className="space-y-2">
					<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
						{product.category.name}
					</p>
					<CardTitle className="line-clamp-2 text-base">{product.name}</CardTitle>
				</CardHeader>

				<CardContent className="space-y-3">
					<p className="line-clamp-4 text-sm text-muted-foreground">
						{product.description}
					</p>
				</CardContent>
			</Link>

			<CardFooter className="border-t">
				<div className="w-full space-y-3">
					<div>
						<p className="text-lg font-semibold">${product.price}</p>
						</div>

					<div className="flex items-center justify-between gap-2">
						<div className="inline-flex items-center rounded-md border">
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={onDecrease}
								aria-label={`Decrease quantity for ${product.name}`}
							>
								-
							</Button>
							<span className="min-w-8 text-center text-sm font-medium">{quantity}</span>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={onIncrease}
								aria-label={`Increase quantity for ${product.name}`}
							>
								+
							</Button>
						</div>
						<Button type="button" onClick={onAddToCart} disabled={isAdding}>
							{isAdding ? "Adding..." : "Add to cart"}
						</Button>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}

export default ProductCard;
