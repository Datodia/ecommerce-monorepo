import Link from "next/link";

import { getOrderById } from "@/features/orders/services/order.service";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

type OrderDetailPageProps = {
	params?: Promise<{
		id: string;
	}>;
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
	const { id } = (await params) ?? {};
	if (!id) {
		notFound();
	}

	const order = await getOrderById(id);

	return (
		<main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
			<div className="mb-6 flex items-center justify-between gap-3">
				<div>
					<p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
					<h1 className="font-heading text-3xl font-semibold">Order details</h1>
				</div>
				<Link href="/orders" className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted">
					Back to orders
				</Link>
			</div>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Shipping</CardTitle>
					<CardDescription>Delivery information for this order.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-3 text-sm sm:grid-cols-2">
					<div>
						<p className="text-muted-foreground">Address</p>
						<p className="font-medium">{order.address}</p>
					</div>
					<div>
						<p className="text-muted-foreground">Building number</p>
						<p className="font-medium">{order.buildingNumber}</p>
					</div>
					<div>
						<p className="text-muted-foreground">Phone number</p>
						<p className="font-medium">{order.phoneNumber}</p>
					</div>
					<div>
						<p className="text-muted-foreground">Status</p>
						<p className="font-medium">{order.status}</p>
					</div>
					{order.additionalInfo ? (
						<div className="sm:col-span-2">
							<p className="text-muted-foreground">Additional info</p>
							<p className="font-medium">{order.additionalInfo}</p>
						</div>
					) : null}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Items</CardTitle>
					<CardDescription>{order.items.length} purchased item{order.items.length === 1 ? "" : "s"}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{order.items.map((item) => (
						<div key={item.id} className="flex items-center gap-3 rounded-lg border p-3">
							{item.thumbnail ? (
								<img
									src={item.thumbnail}
									alt={item.productName}
									className="size-14 rounded-md border bg-muted object-contain p-1"
								/>
							) : (
								<div className="flex size-14 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground">
									No image
								</div>
							)}
							<div className="min-w-0 flex-1">
								<p className="truncate font-medium">{item.productName}</p>
								<p className="text-sm text-muted-foreground">
									{item.quantity} x ${Number(item.unitPrice).toFixed(2)}
								</p>
							</div>
							<p className="font-medium">${Number(item.subtotal).toFixed(2)}</p>
						</div>
					))}
				</CardContent>
			</Card>
		</main>
	);
}