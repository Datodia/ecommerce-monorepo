import { validateEnv, type EnvSchema } from './env.validation'

type NodeEnv = 'development' | 'test' | 'production'


export type AppConfig = {
  app: {
    port: number
    nodeEnv: NodeEnv
  }
  security: {
    jwt: {
      secret: string
    }
    cors: {
      origins?: string[]
    }
  }

  database: {
    host: string
    port: number
    username: string
    password: string
    name: string
  }

 
  frontend: {
    url: string
  }
}

const configuration = (): AppConfig => {
  const env: EnvSchema = validateEnv(process.env)

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
      url: env.FRONTEND_URL || ''
    },
  }
}

export default configuration
