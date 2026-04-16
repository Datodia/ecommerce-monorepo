"use client";

import { CartListItem } from "@/features/cart/types/cart.types";
import { createStore } from "zustand/vanilla";

export type CartState = {
	cartId: string | null;
	items: CartListItem[];
	loading: boolean;
	hydrated: boolean;
	setCartId: (cartId: string | null) => void;
	setItems: (items: CartListItem[]) => void;
	setLoading: (loading: boolean) => void;
	setHydrated: (hydrated: boolean) => void;
	reset: () => void;
};

const defaultState = {
	cartId: null,
	items: [],
	loading: false,
	hydrated: false,
} satisfies Pick<CartState, "cartId" | "items" | "loading" | "hydrated">;

export const createCartStore = () =>
	createStore<CartState>()((set) => ({
		...defaultState,
		setCartId: (cartId) => set({ cartId }),
		setItems: (items) => set({ items }),
		setLoading: (loading) => set({ loading }),
		setHydrated: (hydrated) => set({ hydrated }),
		reset: () => set(defaultState),
	}));
