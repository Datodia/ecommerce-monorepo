"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
	checkoutSchema,
	type CheckoutFormValues,
} from "@/features/checkout/validations/checkout.validation"
import { useCart } from "@/features/cart/hooks/use-cart"
import { createCheckout } from "@/features/payments/services/payment.service"
import { Button } from "@/shared/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"

export default function CheckoutPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const handledStatusRef = useRef<string | null>(null)
	const { items, loading: cartLoading } = useCart()
	const totalAmount = items.reduce(
		(sum, item) => sum + Number(item.price || 0) * item.quantity,
		0,
	)
	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			address: "",
			phoneNumber: "",
			buildingNumber: "",
			additionalInfo: "",
		},
	})

	useEffect(() => {
		const status = searchParams.get("status")

		if (!status || handledStatusRef.current === status) {
			return
		}

		handledStatusRef.current = status

		if (status === "cancelled") {
			toast.error("Payment cancelled. Your order was not completed.")
			router.replace("/checkout")
		}
	}, [router, searchParams])

	const onSubmit = async (values: CheckoutFormValues) => {
		const payload = {
			...values,
			items: items.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
				thumbnail: item.thumbnail,
			})),
		}

		console.log("Checkout payload:", payload)

		try {
			const result = await createCheckout(payload)
			if (result.url) {
				window.location.assign(result.url)
				return
			}

			toast.success("Checkout session created")
		} catch (error) {
			const message = error instanceof Error ? error.message : "Checkout failed"
			toast.error(message)
		}
	}

	return (
		<main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
			<Card className="mb-6">
				<CardHeader>
					<CardTitle className="font-heading text-3xl font-semibold">Order summary</CardTitle>
					<CardDescription>Review the items that will be sent to Stripe.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{items.length === 0 ? (
						<p className="text-sm text-muted-foreground">No items in cart yet.</p>
					) : (
						<div className="space-y-3">
							{items.map((item) => (
								<div
									key={item.productId}
									className="flex items-center gap-3 rounded-lg border bg-background p-3"
								>
									<img
										src={item.thumbnail}
										alt={item.name}
										className="size-14 rounded-md border bg-muted object-contain p-1"
									/>
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-medium">{item.name}</p>
										<p className="text-xs text-muted-foreground">
											{item.quantity} x ${item.price}
										</p>
									</div>
									<p className="text-sm font-medium">
										${(Number(item.price || 0) * item.quantity).toFixed(2)}
									</p>
								</div>
							))}
						</div>
					)
					}
				</CardContent>
				<CardFooter className="border-t">
					<div className="flex w-full items-center justify-between text-sm font-medium">
						<span>Total</span>
						<span>${totalAmount.toFixed(2)}</span>
					</div>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="font-heading text-3xl font-semibold">Checkout</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address</FormLabel>
										<FormControl>
											<Input placeholder="Street, city, country" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone number</FormLabel>
										<FormControl>
											<Input placeholder="+1 (555) 123-4567" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="buildingNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Building number</FormLabel>
										<FormControl>
											<Input placeholder="12B" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="additionalInfo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Additional info</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Apartment, floor, delivery notes"
												className="resize-y"
												{...field}
											/>
										</FormControl>
										<FormDescription>Optional details for delivery.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" disabled={cartLoading || items.length === 0}>
								{cartLoading ? "Preparing..." : "Checkout"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</main>
	)
}
