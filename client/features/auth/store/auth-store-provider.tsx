"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { StoreApi } from "zustand";

import { AuthState } from "@/features/auth/types/auth.types";
import { createAuthStore } from "@/features/auth/store/auth.store";

type AuthStoreApi = StoreApi<AuthState>;

const AuthStoreContext = createContext<AuthStoreApi | null>(null);

export const AuthStoreProvider = ({ children }: { children: React.ReactNode }) => {
	const [store] = useState<AuthStoreApi>(() => createAuthStore());

	return (
		<AuthStoreContext.Provider value={store}>
			{children}
		</AuthStoreContext.Provider>
	);
};

export const useAuthStore = <T,>(selector: (state: AuthState) => T): T => {
	const store = useContext(AuthStoreContext);

	if (!store) {
		throw new Error("useAuthStore must be used inside AuthStoreProvider");
	}

	return useStore(store, selector);
};
