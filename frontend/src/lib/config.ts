// Environment configuration utility
export interface Config {
  API_BASE_URL: string;
  API_USERNAME: string;
  API_PASSWORD: string;
}

const validateConfig = (): Config => {
  const config: Config = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    API_USERNAME: import.meta.env.VITE_API_USERNAME,
    API_PASSWORD: import.meta.env.VITE_API_PASSWORD,
  };

  // Log configuration in development (without sensitive data)
  if (import.meta.env.DEV) {
    console.log("API Configuration:", {
      BASE_URL: config.API_BASE_URL,
      USERNAME: config.API_USERNAME,
      PASSWORD: "[HIDDEN]",
    });
  }

  return config;
};

export const config = validateConfig();

// Export environment mode helpers
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
export const mode = import.meta.env.MODE;
