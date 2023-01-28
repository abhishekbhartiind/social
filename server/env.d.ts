declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLOUD_NAME: string;
      API_KEY: string;
      API_SECRET: string;
    }
  }
}

export {}
