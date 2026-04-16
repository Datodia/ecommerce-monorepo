"use client";

import { useAuthStore } from "@/features/auth/store/auth-store-provider";
import {
	addCartItem,
	clearCartItems,
	createCart,
	getCartById,
	getMyCarts,
	removeCartItem,
	updateCartItem,
} from "@/features/cart/services/cart.service";
import {
	clearStoredGuestCartItems,
	getStoredGuestCartItems,
	setStoredGuestCartItems,
} from "@/features/cart/services/cart.storage";
import { useCartStore } from "@/features/cart/store/cart-store-provider";
import { CartApi, CartListItem } from "@/features/cart/types/cart.types";
import { Product } from "@/features/products/types/product";
import { useMemo } from "react";

type AddToCartPayload = {
	product: Product;
	quantity: number;
};

const mapApiCartItems = (cart: CartApi): CartListItem[] => {
	return cart.items.map((item) => ({
		itemId: item.id,
		productId: item.productId,
		name: item.product.name,
		thumbnail: item.product.thumbnail,
		price: String(item.product.price),
		quantity: item.quantity,
	}));
};

const toCurrency = (price: string | number) => Number(price || 0);

export const useCart = () => {
	const user = useAuthStore((state) => state.user);
	const items = useCartStore((state) => state.items);
	const cartId = useCartStore((state) => state.cartId);
	const loading = useCartStore((state) => state.loading);
	const hydrated = useCartStore((state) => state.hydrated);
	const setItems = useCartStore((state) => state.setItems);
	const setCartId = useCartStore((state) => state.setCartId);
	const setLoading = useCartStore((state) => state.setLoading);

	const totalQuantity = useMemo(
		() => items.reduce((sum, item) => sum + item.quantity, 0),
		[items],
	);

	const totalAmount = useMemo(
		() => items.reduce((sum, item) => sum + toCurrency(item.price) * item.quantity, 0),
		[items],
	);

	const ensureServerCartId = async (): Promise<string> => {
		if (cartId) {
			return cartId;
		}

		const carts = await getMyCarts();
		const cart = carts[0] ?? (await createCart(user ? { userId: user.id } : undefined));
		setCartId(cart.id);
		return cart.id;
	};

	const refreshServerCart = async (nextCartId?: string) => {
		const targetCartId = nextCartId ?? cartId;
		if (!targetCartId) {
			setItems([]);
			return;
		}

		const cart = await getCartById(targetCartId);
		setItems(mapApiCartItems(cart));
	};

	const addItem = async ({ product, quantity }: AddToCartPayload) => {
		if (quantity < 1) {
			return;
		}

		if (!user) {
			const existingItems = getStoredGuestCartItems();
			const existingItem = existingItems.find((item) => item.productId === product.id);
			let nextItems: CartListItem[];

			if (existingItem) {
				nextItems = existingItems.map((item) =>
					item.productId === product.id
						? { ...item, quantity: item.quantity + quantity }
						: item,
				);
			} else {
				nextItems = [
					...existingItems,
					{
						productId: product.id,
						name: product.name,
						thumbnail: product.thumbnail,
						price: String(product.price),
						quantity,
					},
				];
			}

			setStoredGuestCartItems(nextItems);
			setItems(nextItems);
			return;
		}

		setLoading(true);
		try {
			const targetCartId = await ensureServerCartId();
			await addCartItem(targetCartId, {
				cartId: targetCartId,
				productId: product.id,
				quantity,
			});
			await refreshServerCart(targetCartId);
		} finally {
			setLoading(false);
		}
	};

	const removeItemByProductId = async (productId: string) => {
		if (!user) {
			const nextItems = items.filter((item) => item.productId !== productId);
			setStoredGuestCartItems(nextItems);
			setItems(nextItems);
			return;
		}

		const targetItem = items.find((item) => item.productId === productId);
		if (!targetItem?.itemId) {
			return;
		}

		setLoading(true);
		try {
			const targetCartId = await ensureServerCartId();
			await removeCartItem(targetCartId, targetItem.itemId);
			await refreshServerCart(targetCartId);
		} finally {
			setLoading(false);
		}
	};

	const setQuantity = async (productId: string, quantity: number) => {
		if (quantity < 1) {
			await removeItemByProductId(productId);
			return;
		}

		if (!user) {
			const nextItems = items.map((item) =>
				item.productId === productId ? { ...item, quantity } : item,
			);
			setStoredGuestCartItems(nextItems);
			setItems(nextItems);
			return;
		}

		const targetItem = items.find((item) => item.productId === productId);
		if (!targetItem?.itemId) {
			return;
		}

		setLoading(true);
		try {
			const targetCartId = await ensureServerCartId();
			await updateCartItem(targetCartId, targetItem.itemId, { quantity });
			await refreshServerCart(targetCartId);
		} finally {
			setLoading(false);
		}
	};

	const clearItems = async () => {
		if (!user) {
			clearStoredGuestCartItems();
			setItems([]);
			return;
		}

		setLoading(true);
		try {
			const targetCartId = await ensureServerCartId();
			await clearCartItems(targetCartId);
			await refreshServerCart(targetCartId);
		} finally {
			setLoading(false);
		}
	};

	return {
		items,
		loading,
		hydrated,
		totalQuantity,
		totalAmount,
		addItem,
		setQuantity,
		removeItemByProductId,
		clearItems,
	};
};
