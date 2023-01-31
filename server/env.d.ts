declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLOUD_NAME: string;
      API_KEY: string;
      API_SECRET: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
      PORT: string;
      REDIS_URL: string;
      DATABASE_URL: string;
    }
  }
}

export {}
