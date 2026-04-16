"use client";

import { useAuthStore } from "@/features/auth/store/auth-store-provider";
import {
	addCartItem,
	createCart,
	getCartById,
	getMyCarts,
} from "@/features/cart/services/cart.service";
import {
	clearStoredGuestCartItems,
	getStoredGuestCartItems,
} from "@/features/cart/services/cart.storage";
import { CartState, createCartStore } from "@/features/cart/store/cart.store";
import { CartApi, CartListItem } from "@/features/cart/types/cart.types";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { StoreApi, useStore } from "zustand";

type CartStoreApi = StoreApi<CartState>;

const CartStoreContext = createContext<CartStoreApi | null>(null);

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

const CartSync = ({ store }: { store: CartStoreApi }) => {
	const user = useAuthStore((state) => state.user);
	const userId = user?.id;
	const prevUserIdRef = useRef<string | null>(null);

	useEffect(() => {
		const sync = async () => {
			store.getState().setLoading(true);

			try {
				if (!userId) {
					const guestItems = getStoredGuestCartItems();
					store.getState().setCartId(null);
					store.getState().setItems(guestItems);
					return;
				}

				let carts = await getMyCarts();
				let cart = carts[0];
				if (!cart) {
					cart = await createCart({ userId });
				}

				const isFreshLogin = prevUserIdRef.current !== userId;
				if (isFreshLogin) {
					const guestItems = getStoredGuestCartItems();
					if (guestItems.length > 0) {
						await Promise.all(
							guestItems.map((item) =>
								addCartItem(cart.id, {
									cartId: cart.id,
									productId: item.productId,
									quantity: item.quantity,
								}),
							),
						);
						clearStoredGuestCartItems();
					}
				}

				const refreshedCart = await getCartById(cart.id);
				store.getState().setCartId(refreshedCart.id);
				store.getState().setItems(mapApiCartItems(refreshedCart));
			} catch {
				if (!userId) {
					store.getState().setItems(getStoredGuestCartItems());
				}
			} finally {
				store.getState().setLoading(false);
				store.getState().setHydrated(true);
				prevUserIdRef.current = userId ?? null;
			}
		};

		void sync();
	}, [store, userId]);

	return null;
};

export const CartStoreProvider = ({ children }: { children: React.ReactNode }) => {
	const [store] = useState<CartStoreApi>(() => createCartStore());

	return (
		<CartStoreContext.Provider value={store}>
			<CartSync store={store} />
			{children}
		</CartStoreContext.Provider>
	);
};

export const useCartStore = <T,>(selector: (state: CartState) => T): T => {
	const store = useContext(CartStoreContext);

	if (!store) {
		throw new Error("useCartStore must be used inside CartStoreProvider");
	}

	return useStore(store, selector);
};
