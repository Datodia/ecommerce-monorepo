"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCart } from "@/features/cart/hooks/use-cart";

type OrdersStatusHandlerProps = {
	status?: string;
};

export const OrdersStatusHandler = ({ status }: OrdersStatusHandlerProps) => {
	const router = useRouter();
	const handledRef = useRef(false);
	const { clearItems } = useCart();

	useEffect(() => {
		if (handledRef.current || status !== "success") {
			return;
		}

		handledRef.current = true;
		toast.success("Payment successful. Your order is ready.");

		const complete = async () => {
			try {
				await clearItems();
			} finally {
				router.replace("/orders");
			}
		};

		void complete();
	}, [clearItems, router, status]);

	return null;
};