"use client";

import { useEffect, useMemo } from "react";

import { getProfile, logout as logoutService } from "@/features/auth/services/auth.service";
import { getAuthTokens } from "@/features/auth/services/token.service";
import { useAuthStore } from "@/features/auth/store/auth-store-provider";

export const useAuth = () => {
	const user = useAuthStore((state) => state.user);
	const loading = useAuthStore((state) => state.loading);
	const error = useAuthStore((state) => state.error);
	const setUser = useAuthStore((state) => state.setUser);
	const setLoading = useAuthStore((state) => state.setLoading);
	const setError = useAuthStore((state) => state.setError);
	const reset = useAuthStore((state) => state.reset);

	useEffect(() => {
		const bootstrap = async () => {
			const tokens = getAuthTokens();

			if (!tokens) {
				setUser(null);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const profile = await getProfile();
				setUser(profile);
			} catch {
				logoutService();
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		void bootstrap();
	}, [setError, setLoading, setUser]);

	return useMemo(
		() => ({
			user,
			loading,
			error,
			setUser,
			setLoading,
			setError,
			reset,
		}),
		[error, loading, reset, setError, setLoading, setUser, user],
	);
};
