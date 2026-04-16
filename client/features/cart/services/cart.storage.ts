import { CartListItem } from "@/features/cart/types/cart.types";

const CART_STORAGE_KEY = "guest_cart_items";

const isBrowser = () => typeof window !== "undefined";

export const getStoredGuestCartItems = (): CartListItem[] => {
	if (!isBrowser()) {
		return [];
	}

	try {
		const raw = window.localStorage.getItem(CART_STORAGE_KEY);
		if (!raw) {
			return [];
		}

		const parsed = JSON.parse(raw) as CartListItem[];
		if (!Array.isArray(parsed)) {
			return [];
		}

		return parsed.filter((item) => item.productId && item.quantity > 0);
	} catch {
		return [];
	}
};

export const setStoredGuestCartItems = (items: CartListItem[]) => {
	if (!isBrowser()) {
		return;
	}

	window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const clearStoredGuestCartItems = () => {
	if (!isBrowser()) {
		return;
	}

	window.localStorage.removeItem(CART_STORAGE_KEY);
};
