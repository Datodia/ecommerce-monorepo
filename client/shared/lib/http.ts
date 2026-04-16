import {
	clearAuthTokens,
	getAccessToken,
	getAuthTokens,
	setAuthTokens,
} from "@/features/auth/services/token.service";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
	headers?: Record<string, string>;
	params?: Record<string, string | number | boolean | undefined>;
	retry?: boolean;
};

type HttpError = {
	message: string;
	status: number;
};

class HttpClient {
	private baseUrl: string;

	constructor(baseUrl = "") {
		this.baseUrl = baseUrl;
	}

	private serializeParams(
		params?: Record<string, string | number | boolean | undefined>,
	): string {
		if (!params) return "";
		const filtered = Object.entries(params).filter(([, v]) => v !== undefined);
		if (filtered.length === 0) return "";
		const qs = new URLSearchParams(
			filtered.map(([k, v]) => [k, String(v)]),
		).toString();
		return `?${qs}`;
	}

	private async request<T>(
		method: HttpMethod,
		path: string,
		body?: unknown,
		options?: RequestOptions,
	): Promise<T> {
		const qs = this.serializeParams(options?.params);
		const url = `${this.baseUrl}${path}${qs}`;

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...options?.headers,
		};

		const accessToken = getAccessToken();
		if (accessToken && !headers.Authorization) {
			headers.Authorization = `Bearer ${accessToken}`;
		}

		const init: RequestInit = {
			method,
			headers,
			credentials: "include",
		};

		if (body !== undefined) {
			init.body = JSON.stringify(body);
		}

		const response = await fetch(url, init);

		if (response.status === 401 && !options?.retry && !this.isRefreshPath(path)) {
			const refreshed = await this.refreshTokens();

			if (refreshed) {
				return this.request<T>(method, path, body, {
					...options,
					retry: true,
				});
			}
		}

		if (!response.ok) {
			let message = response.statusText;
			try {
				const errorData = (await response.json()) as {
					message?: string | string[];
					error?: string;
				};

				if (Array.isArray(errorData.message) && errorData.message.length > 0) {
					message = errorData.message.join(", ");
				} else if (typeof errorData.message === "string" && errorData.message.trim()) {
					message = errorData.message;
				} else if (typeof errorData.error === "string" && errorData.error.trim()) {
					message = errorData.error;
				}
			} catch {
				// ignore parse errors
			}
			const err: HttpError = { message, status: response.status };
			throw Object.assign(new Error(message), err);
		}

		const text = await response.text();
		if (!text) return undefined as T;
		return JSON.parse(text) as T;
	}

	private isRefreshPath(path: string) {
		return path.includes("/auth/refresh-token");
	}

	private async refreshTokens(): Promise<boolean> {
		const tokens = getAuthTokens();

		if (!tokens?.accessToken) {
			clearAuthTokens();
			return false;
		}

		try {
			const response = await fetch(`${this.baseUrl}/auth/refresh-token`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
				credentials: "include",
			});

			if (!response.ok) {
				clearAuthTokens();
				return false;
			}

			const payload = (await response.json()) as {
				token?: string;
				accessToken?: string;
				refreshToken?: string;
			};

			const accessToken = payload.accessToken ?? payload.token;
			if (!accessToken || !payload.refreshToken) {
				clearAuthTokens();
				return false;
			}

			setAuthTokens({
				accessToken,
				refreshToken: payload.refreshToken,
			});

			return true;
		} catch {
			clearAuthTokens();
			return false;
		}
	}

	get<T>(path: string, options?: RequestOptions): Promise<T> {
		return this.request<T>("GET", path, undefined, options);
	}

	post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
		return this.request<T>("POST", path, body, options);
	}

	put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
		return this.request<T>("PUT", path, body, options);
	}

	patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
		return this.request<T>("PATCH", path, body, options);
	}

	delete<T>(path: string, options?: RequestOptions): Promise<T> {
		return this.request<T>("DELETE", path, undefined, options);
	}
}

export const http = new HttpClient(
	process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.SERVER_URL ?? "/api",
);

export { HttpClient };
