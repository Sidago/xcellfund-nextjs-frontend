// app.config.ts

interface AppConfig {
  appUrl: string;
  apiUrl: string;
  apiKey: string;
  cacheTimeout: number; // in seconds
}

const appConfig: AppConfig = {
  appUrl: process.env.NEXT_APP_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337",
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
  cacheTimeout: process.env.NEXT_CACHE_TIMEOUT
    ? parseInt(process.env.NEXT_CACHE_TIMEOUT, 10)
    : 3600, // default 1 hour
};

export default appConfig;
