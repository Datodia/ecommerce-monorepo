import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  PORT: z.coerce.number().int().min(0).max(65535).default(4000),

  JWT_SECRET: z.string().min(1),

  CORS_ORIGINS: z
    .string()
    .optional()
    .transform((value) =>
      value
        ? value
            .split(',')
            .map((origin) => origin.trim())
            .filter(Boolean)
        : undefined,
    ),

  FRONTEND_URL: z
    .string()
    .url()
    .optional()
    .transform((value) => value?.replace(/\/+$/, '')),

  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().min(1).max(65535),
  DB_USER: z.string().min(1),
  DB_PASS: z.string().min(1),
  DB_NAME: z.string().min(1),

  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  STRIPE_CURRENCY: z.string().min(1).default('usd'),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const validateEnv = (config: Record<string, unknown>): EnvSchema => {
  const parsed = envSchema.safeParse(config) as {
    success: boolean;
    error: z.ZodError<EnvSchema>;
    data?: EnvSchema;
  };

  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid environment configuration: ${message}`);
  }

  return parsed.data!;
};
