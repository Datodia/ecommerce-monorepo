import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { AuthTokens } from "@/features/auth/types/auth.types";

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_COOKIE = "refreshToken";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const isClient = typeof window !== "undefined";

export const getAccessToken = () => {
	if (!isClient) return null;
	return getCookie(ACCESS_TOKEN_COOKIE)?.toString() ?? null;
};

export const getRefreshToken = () => {
	if (!isClient) return null;
	return getCookie(REFRESH_TOKEN_COOKIE)?.toString() ?? null;
};

export const getAuthTokens = (): AuthTokens | null => {
	const accessToken = getAccessToken();
	const refreshToken = getRefreshToken();

	if (!accessToken || !refreshToken) return null;

	return {
		accessToken,
		refreshToken,
	};
};

export const setAuthTokens = (tokens: AuthTokens) => {
	if (!isClient) return;

	setCookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
		maxAge: COOKIE_MAX_AGE_SECONDS,
		path: "/",
		sameSite: "lax",
	});

	setCookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
		maxAge: COOKIE_MAX_AGE_SECONDS,
		path: "/",
		sameSite: "lax",
	});
};

export const clearAuthTokens = () => {
	if (!isClient) return;

	deleteCookie(ACCESS_TOKEN_COOKIE, { path: "/" });
	deleteCookie(REFRESH_TOKEN_COOKIE, { path: "/" });
};
