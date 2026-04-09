export type AuthUser = {
	id: string;
	email: string;
	fullName: string;
	isAdmin?: boolean;
};

export type AuthTokens = {
	accessToken: string;
	refreshToken: string;
};

export type AuthResponse = {
	accessToken?: string;
	refreshToken: string;
	token?: string;
	user?: AuthUser;
};

export type ProfileResponse = AuthUser;

export type AuthState = {
	user: AuthUser | null;
	loading: boolean;
	error: string | null;
	setUser: (user: AuthUser | null) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	reset: () => void;
};
