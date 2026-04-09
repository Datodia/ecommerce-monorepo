import { z } from "zod";

export const signInSchema = z.object({
	email: z.email("Please enter a valid email"),
	password: z
		.string()
		.min(6, "Password should be at least 6 characters")
		.max(100, "Password should be at most 100 characters"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
