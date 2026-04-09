import { z } from "zod";

export const signUpSchema = z.object({
	fullName: z
		.string()
		.min(2, "Full name should be at least 2 characters")
		.max(100, "Full name should be at most 100 characters"),
	email: z.email("Please enter a valid email"),
	password: z
		.string()
		.min(6, "Password should be at least 6 characters")
		.max(100, "Password should be at most 100 characters"),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
