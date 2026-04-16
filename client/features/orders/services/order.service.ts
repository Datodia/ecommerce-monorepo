import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ACCESS_TOKEN_COOKIE } from "@/features/auth/services/token.service";
import { Order } from "@/features/orders/types/order.types";

const getBackendUrl = () => {
	return process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.SERVER_URL ?? "http://localhost:4000";
};

const getAccessToken = async () => {
	return (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value ?? null;
};

const request = async <T>(path: string): Promise<T> => {
	const token = await getAccessToken();
	if (!token) {
		redirect("/sign-in");
	}

	const response = await fetch(`${getBackendUrl()}${path}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});

	if (response.status === 401) {
		redirect("/sign-in");
	}

	if (!response.ok) {
		const errorData = (await response.json().catch(() => null)) as {
			message?: string | string[];
			error?: string;
		} | null;
		const message = Array.isArray(errorData?.message)
			? errorData?.message.join(", ")
			: errorData?.message ?? errorData?.error ?? "Failed to load orders";
		throw new Error(message);
	}

	return (await response.json()) as T;
};

export const getOrders = () => request<Order[]>("/orders");

export const getOrderById = (orderId: string) => request<Order>(`/orders/${orderId}`);