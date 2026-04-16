import { http } from "@/shared/lib/http";
import { CartApi } from "@/features/cart/types/cart.types";

export type CreateCartPayload = {
	userId?: string;
};

export type CreateCartItemPayload = {
	cartId: string;
	productId: string;
	quantity: number;
};

export type UpdateCartItemPayload = {
	quantity?: number;
};

export const getMyCarts = () => {
	return http.get<CartApi[]>("/cart");
};

export const getCartById = (cartId: string) => {
	return http.get<CartApi>(`/cart/${cartId}`);
};

export const createCart = (payload?: CreateCartPayload) => {
	return http.post<CartApi>("/cart", payload ?? {});
};

export const addCartItem = (cartId: string, payload: CreateCartItemPayload) => {
	return http.post(`/cart/${cartId}/items`, payload);
};

export const updateCartItem = (
	cartId: string,
	itemId: string,
	payload: UpdateCartItemPayload,
) => {
	return http.patch(`/cart/${cartId}/items/${itemId}`, payload);
};

export const removeCartItem = (cartId: string, itemId: string) => {
	return http.delete(`/cart/${cartId}/items/${itemId}`);
};

export const clearCartItems = (cartId: string) => {
	return http.delete(`/cart/${cartId}/items`);
};
