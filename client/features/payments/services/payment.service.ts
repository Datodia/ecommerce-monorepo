import { http } from "@/shared/lib/http";

export type CreateCheckoutItemPayload = {
	productId: string;
	quantity: number;
	thumbnail?: string;
};

export type CreateCheckoutPayload = {
	items: CreateCheckoutItemPayload[];
	address: string;
	phoneNumber: string;
	buildingNumber: string;
	additionalInfo?: string;
};

export type CreateCheckoutResponse = {
	id: string;
	url: string | null;
};

export const createCheckout = (payload: CreateCheckoutPayload) => {
	return http.post<CreateCheckoutResponse>("/payments/create-checkout", payload);
};