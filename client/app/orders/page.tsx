import Link from "next/link";

import { OrdersStatusHandler } from "@/features/orders/components/orders-status-handler";
import { getOrders } from "@/features/orders/services/order.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

type OrdersPageProps = {
	searchParams?: Promise<{
		status?: string;
	}>;
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
	const params = (await searchParams) ?? {};
	const orders = await getOrders();

	return (
		<main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
			<OrdersStatusHandler status={params.status} />
			<Card className="mb-6">
				<CardHeader>
					<CardTitle className="font-heading text-3xl font-semibold">Orders</CardTitle>
					<CardDescription>All paid orders linked to your account.</CardDescription>
				</CardHeader>
			</Card>

			<div className="space-y-4">
				{orders.length === 0 ? (
					<Card>
						<CardContent className="py-6 text-sm text-muted-foreground">
							No orders yet.
						</CardContent>
					</Card>
				) : (
					orders.map((order) => (
						<Card key={order.id}>
							<CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
									<p className="mt-1 font-medium">{order.items.length} item{order.items.length === 1 ? "" : "s"}</p>
									<p className="text-sm text-muted-foreground">
										{order.address} · {order.buildingNumber}
									</p>
								</div>
								<div className="flex items-center gap-3">
									<div className="text-right">
										<p className="text-sm font-medium">${Number(order.totalAmount).toFixed(2)}</p>
										<p className="text-xs text-muted-foreground">
											{new Date(order.createdAt).toLocaleDateString()}
										</p>
									</div>
									<Link
										href={`/orders/${order.id}`}
										className="rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
									>
										View details
									</Link>
								</div>
							</CardContent>
						</Card>
					))
				)}
			</div>
		</main>
	);
}