"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signUp } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/features/auth/store/auth-store-provider";
import {
	SignUpFormValues,
	signUpSchema,
} from "@/features/auth/validations/sign-up.validation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

export const SignUpForm = () => {
	const router = useRouter();
	const loading = useAuthStore((state) => state.loading);
	const setLoading = useAuthStore((state) => state.setLoading);
	const setError = useAuthStore((state) => state.setError);
	const setUser = useAuthStore((state) => state.setUser);

	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: SignUpFormValues) => {
		setLoading(true);
		setError(null);

		try {
			const result = await signUp({
				email: values.email,
				password: values.password,
				fullName: values.fullName,
			});
			setUser(result.user);
			router.push("/");
		} catch (submitError) {
			const message = submitError instanceof Error ? submitError.message : "Sign up failed";
			setError(message);
			toast.error(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-lg">Create account</CardTitle>
				<CardDescription>Sign up to create and manage your profile.</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-1.5">
						<label htmlFor="fullName" className="text-sm font-medium">
							Full name
						</label>
						<input
							id="fullName"
							type="text"
							placeholder="John Doe"
							className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-ring"
							{...form.register("fullName")}
						/>
						{form.formState.errors.fullName ? (
							<p className="text-xs text-destructive">{form.formState.errors.fullName.message}</p>
						) : null}
					</div>

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
							placeholder="Create a password"
							className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-ring"
							{...form.register("password")}
						/>
						{form.formState.errors.password ? (
							<p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
						) : null}
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Creating account..." : "Sign up"}
					</Button>

					<p className="text-center text-xs text-muted-foreground">
						Already have an account?{" "}
						<Link href="/sign-in" className="text-foreground underline underline-offset-2">
							Sign in
						</Link>
					</p>
				</form>
			</CardContent>
		</Card>
	);
};
