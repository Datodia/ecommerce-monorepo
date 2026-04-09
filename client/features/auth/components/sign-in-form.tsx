"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signIn } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/features/auth/store/auth-store-provider";
import {
	SignInFormValues,
	signInSchema,
} from "@/features/auth/validations/sign-in.validation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

export const SignInForm = () => {
	const router = useRouter();
	const loading = useAuthStore((state) => state.loading);
	const setLoading = useAuthStore((state) => state.setLoading);
	const setError = useAuthStore((state) => state.setError);
	const setUser = useAuthStore((state) => state.setUser);

	const form = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: SignInFormValues) => {
		setLoading(true);
		setError(null);

		try {
			const result = await signIn(values);
			setUser(result.user);
			router.push("/");
		} catch (submitError) {
			const message = submitError instanceof Error ? submitError.message : "Sign in failed";
			setError(message);
			toast.error(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-lg">Sign in</CardTitle>
				<CardDescription>Use your email and password to continue.</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-1.5">
						<label htmlFor="email" className="text-sm font-medium">
							Email
						</label>
						<input
							id="email"
							type="email"
							placeholder="you@example.com"
							className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-ring"
							{...form.register("email")}
						/>
						{form.formState.errors.email ? (
							<p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
						) : null}
					</div>

					<div className="space-y-1.5">
						<label htmlFor="password" className="text-sm font-medium">
							Password
						</label>
						<input
							id="password"
							type="password"
							placeholder="Enter your password"
							className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-ring"
							{...form.register("password")}
						/>
						{form.formState.errors.password ? (
							<p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
						) : null}
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Signing in..." : "Sign in"}
					</Button>

					<p className="text-center text-xs text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link href="/sign-up" className="text-foreground underline underline-offset-2">
							Create one
						</Link>
					</p>
				</form>
			</CardContent>
		</Card>
	);
};
