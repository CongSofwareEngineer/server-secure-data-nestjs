interface EnvironmentVariables {
  readonly USER_NAME_MONGO: string;
  readonly PORT: string;
  readonly PASSWORD_MONGO: string;
  readonly KEY_CRYPTO_IV_ENCODE: string;
  readonly KEY_CRYPTO_ENCODE: string;
  readonly ENABLE_LIMIT_DOMAIN: string;
  readonly REDIS_HOST: string;
  readonly REDIS_PORT: string;
  readonly REDIS_PASSWORD: string;
  readonly MONGODB_URI: string;
  readonly ENABLE_REDIS: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables { }
}
