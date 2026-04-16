"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useCart } from "@/features/cart/hooks/use-cart";
import { Product } from "@/features/products/types/product";
import { Button } from "@/shared/components/ui/button";

type ProductDetailsProps = {
	product: Product;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const { addItem, loading } = useCart();

	const images = useMemo(() => {
		if (product.images.length > 0) {
			return product.images;
		}

		return [product.thumbnail];
	}, [product.images, product.thumbnail]);

	const goPrev = () => {
		if (images.length <= 1) {
			return;
		}

		setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const goNext = () => {
		if (images.length <= 1) {
			return;
		}

		setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const onAddToCart = async () => {
		await addItem({ product, quantity });
	};

	return (
		<main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<section>
					<div className="relative overflow-hidden rounded-xl border bg-gray-100">
						<div
							className="flex h-72 sm:h-80"
							style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
						>
							{images.map((image, index) => (
								<img
									key={`${image}-${index}`}
									src={image}
									alt={`${product.name} image ${index + 1}`}
									className="h-72 w-full shrink-0 object-contain p-4 sm:h-80"
								/>
							))}
						</div>
						<Button
							type="button"
							variant="outline"
							size="icon-sm"
							className="absolute top-1/2 left-3 -translate-y-1/2 border-border/80 bg-background/95 shadow-md backdrop-blur focus:outline-none focus-visible:ring-0 focus-visible:border-border/80"
							aria-haspopup="dialog"
							onClick={goPrev}
							disabled={images.length <= 1}
							aria-label="Previous image"
						>
							<ChevronLeft className="size-4" />
						</Button>
						<Button
							type="button"
							variant="outline"
							size="icon-sm"
							className="absolute top-1/2 right-3 -translate-y-1/2 border-border/80 bg-background/95 shadow-md backdrop-blur focus:outline-none focus-visible:ring-0 focus-visible:border-border/80"
							aria-haspopup="dialog"
							onClick={goNext}
							disabled={images.length <= 1}
							aria-label="Next image"
						>
							<ChevronRight className="size-4" />
						</Button>
					</div>

					<div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5">
						{images.map((image, index) => (
							<button
								key={`${image}-${index}`}
								type="button"
								onClick={() => setActiveImageIndex(index)}
								className={`overflow-hidden rounded-md border p-1 transition-colors ${
									activeImageIndex === index ? "border-primary" : "border-border"
								}`}
								aria-label={`Show image ${index + 1}`}
							>
								<img
									src={image}
									alt={`${product.name} thumbnail ${index + 1}`}
									className="h-16 w-full object-contain"
								/>
							</button>
						))}
					</div>
				</section>

				<section>
					<p className="text-sm uppercase tracking-wide text-muted-foreground">{product.category.name}</p>
					<h1 className="mt-2 font-heading text-3xl font-semibold">{product.name}</h1>
					<p className="mt-4 text-base text-muted-foreground">{product.description}</p>

					<div className="mt-6 rounded-lg border bg-card p-5">
						<p className="text-2xl font-semibold">${product.price}</p>
						<p className="mt-1 text-sm text-muted-foreground">Category: {product.category.slug}</p>

						<div className="mt-4 flex items-center justify-between gap-3">
							<div className="inline-flex items-center rounded-md border">
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
									aria-label={`Decrease quantity for ${product.name}`}
								>
									-
								</Button>
								<span className="min-w-8 text-center text-sm font-medium">{quantity}</span>
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									onClick={() => setQuantity((prev) => prev + 1)}
									aria-label={`Increase quantity for ${product.name}`}
								>
									+
								</Button>
							</div>
							<Button type="button" onClick={onAddToCart} disabled={loading}>
								Add to cart
							</Button>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};
