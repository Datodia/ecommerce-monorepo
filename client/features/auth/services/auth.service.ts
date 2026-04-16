import { http } from "@/shared/lib/http";

import {
	AuthResponse,
	AuthTokens,
	AuthUser,
	ProfileResponse,
} from "@/features/auth/types/auth.types";
import { clearAuthTokens, setAuthTokens } from "@/features/auth/services/token.service";

type SignInPayload = {
	email: string;
	password: string;
};

type SignUpPayload = {
	email: string;
	password: string;
	fullName: string;
};

const normalizeTokens = (response: AuthResponse): AuthTokens => {
	const accessToken = response.accessToken ?? response.token;

	if (!accessToken || !response.refreshToken) {
		throw new Error("Missing auth tokens in response");
	}

	return {
		accessToken,
		refreshToken: response.refreshToken,
	};
};

const normalizeUser = (user: ProfileResponse): AuthUser => ({
	id: String(user.id),
	email: user.email,
	fullName: user.fullName,
	isAdmin: user.isAdmin,
});

export const signIn = async (payload: SignInPayload) => {
	const response = await http.post<AuthResponse>("/auth/sign-in", payload);
	const tokens = normalizeTokens(response);
	setAuthTokens(tokens);
	const profile = await getProfile();

	return {
		user: profile,
		tokens,
	};
};

export const signUp = async (payload: SignUpPayload) => {
	const response = await http.post<AuthResponse>("/auth/sign-up", payload);
	const tokens = normalizeTokens(response);
	setAuthTokens(tokens);
	const profile = await getProfile();

	return {
		user: profile,
		tokens,
	};
};

export const getProfile = async () => {
	const response = await http.get<ProfileResponse>("/auth/profile");
	return normalizeUser(response);
};

export const logout = () => {
	clearAuthTokens();
};
