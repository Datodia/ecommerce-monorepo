import { z } from "zod"

export const checkoutSchema = z.object({
  address: z.string().trim().min(5, "Address must be at least 5 characters"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[0-9+()\-\s]{7,20}$/, "Phone number is invalid"),
  buildingNumber: z.string().trim().min(1, "Building number is required"),
  additionalInfo: z
    .string()
    .trim()
    .max(500, "Additional info must be 500 characters or less")
    .optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>