import { validateEnv, type EnvSchema } from './env.validation';

type NodeEnv = 'development' | 'test' | 'production';

export type AppConfig = {
  app: {
    port: number;
    nodeEnv: NodeEnv;
  };

  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
  security: {
    jwt: {
      secret: string;
    };
    cors: {
      origins?: string[];
    };
  };

  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };

  payment: {
    stripe: {
      secretKey: string;
      webhookSecret: string;
      currency: string;
    };
  };

  email: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };

  frontend: {
    url: string;
  };
};

const configuration = (): AppConfig => {
  const env: EnvSchema = validateEnv(process.env);

  return {
    app: {
      port: env.PORT,
      nodeEnv: env.NODE_ENV,
    },

    database: {
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      username: env.DB_USER,
      password: env.DB_PASS,
      name: env.DB_NAME,
    },

    payment: {
      stripe: {
        secretKey: env.STRIPE_SECRET_KEY,
        webhookSecret: env.STRIPE_WEBHOOK_SECRET,
        currency: env.STRIPE_CURRENCY,
      },
    },

    email: {
      host: env.EMAIL_HOST,
      port: Number(env.EMAIL_PORT),
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },

    security: {
      jwt: {
        secret: env.JWT_SECRET,
      },
      cors: {
        origins: Array.isArray(env.CORS_ORIGINS)
          ? env.CORS_ORIGINS
          : env.CORS_ORIGINS
            ? [env.CORS_ORIGINS]
            : [],
      },
    },

    frontend: {
      url: env.FRONTEND_URL || '',
    },

    cloudinary: {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
      apiKey: env.CLOUDINARY_API_KEY,
      apiSecret: env.CLOUDINARY_API_SECRET,
    },
  };
};

export default configuration;
