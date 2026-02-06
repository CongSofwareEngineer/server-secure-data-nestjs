interface EnvironmentVariables {
  readonly: string;
  readonly PORT: string;
  readonly KEY_CRYPTO_IV_ENCODE: string;
  readonly DEFAULT_CRYPTO_PASSWORD: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables { }
}
