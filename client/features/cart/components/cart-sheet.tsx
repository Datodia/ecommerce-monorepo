"use client";

import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";

import { useCart } from "@/features/cart/hooks/use-cart";
import { Button } from "@/shared/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shared/components/ui/sheet";

export const CartSheet = () => {
	const {
		items,
		loading,
		totalAmount,
		totalQuantity,
		removeItemByProductId,
		setQuantity,
		hydrated,
	} = useCart();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="relative" aria-label="Open cart">
					<ShoppingCart className="size-4" />
					{hydrated && totalQuantity > 0 ? (
						<span className="absolute -top-2 -right-2 inline-flex min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[10px] font-semibold text-background">
							{totalQuantity}
						</span>
					) : null}
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full sm:max-w-md">
				<SheetHeader className="border-b">
					<SheetTitle>Your cart</SheetTitle>
					<SheetDescription>
						{totalQuantity} item{totalQuantity === 1 ? "" : "s"} in cart
					</SheetDescription>
				</SheetHeader>

				<div className="flex-1 space-y-3 overflow-y-auto p-4">
					{items.length === 0 ? (
						<div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
							Your cart is empty.
						</div>
					) : (
						items.map((item) => (
							<div key={item.productId} className="flex items-center gap-3 rounded-lg border p-3">
								<img
									src={item.thumbnail}
									alt={item.name}
									className="size-14 rounded-md border bg-muted object-contain p-1"
								/>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium">{item.name}</p>
									<p className="text-xs text-muted-foreground">
										${item.price} x {item.quantity}
									</p>
									<div className="mt-2 inline-flex items-center rounded-md border">
										<Button
											type="button"
											variant="ghost"
											size="icon-sm"
											disabled={loading}
											onClick={() => setQuantity(item.productId, item.quantity - 1)}
											aria-label={`Decrease quantity for ${item.name}`}
										>
											-
										</Button>
										<span className="min-w-8 text-center text-sm font-medium">{item.quantity}</span>
										<Button
											type="button"
											variant="ghost"
											size="icon-sm"
											disabled={loading}
											onClick={() => setQuantity(item.productId, item.quantity + 1)}
											aria-label={`Increase quantity for ${item.name}`}
										>
											+
										</Button>
									</div>
								</div>
								<Button
									variant="ghost"
									size="icon-sm"
									disabled={loading}
									onClick={() => removeItemByProductId(item.productId)}
									aria-label={`Remove ${item.name}`}
								>
									<Trash2 className="size-4 text-destructive" />
								</Button>
							</div>
						))
					)}
				</div>

				<SheetFooter className="border-t">
					<div className="flex w-full items-center justify-between text-sm font-medium">
						<span>Total</span>
						<span>${totalAmount.toFixed(2)}</span>
					</div>
					<Button asChild className="w-full" disabled={items.length === 0}>
						<Link href="/checkout">Go to checkout</Link>
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
