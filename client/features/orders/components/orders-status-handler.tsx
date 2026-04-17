"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCart } from "@/features/cart/hooks/use-cart";
import { useAuth } from "@/features/auth/hooks/use-auth";

type OrdersStatusHandlerProps = {
	status?: string;
};

export const OrdersStatusHandler = ({ status }: OrdersStatusHandlerProps) => {
	const router = useRouter();
	const handledRef = useRef(false);
	const { clearItems } = useCart();
	const { user, loading: authLoading } = useAuth();

	useEffect(() => {
		if (handledRef.current || status !== "success" || authLoading) {
			return;
		}

		if (!user) {
			return;
		}

		handledRef.current = true;

		const complete = async () => {
			try {
				await clearItems();
				toast.success("Payment successful. Your order is ready.");
			} finally {
				router.replace("/orders");
			}
		};

		void complete();
	}, [authLoading, clearItems, router, status, user]);

	return null;
};