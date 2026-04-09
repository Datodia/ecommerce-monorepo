"use client";

import { createStore } from "zustand/vanilla";

import { AuthState } from "@/features/auth/types/auth.types";

const defaultState = {
	user: null,
	loading: false,
	error: null,
} satisfies Pick<AuthState, "user" | "loading" | "error">;

export const createAuthStore = () =>
	createStore<AuthState>()((set) => ({
		...defaultState,
		setUser: (user) => set({ user }),
		setLoading: (loading) => set({ loading }),
		setError: (error) => set({ error }),
		reset: () => set(defaultState),
	}));
