declare namespace NodeJS {
  export interface ProcessEnv {
    // Server
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    HOST?: string;

    // Database
    MONGODB_URI: string;
    MONGODB_URI_TEST?: string;
    MONGODB_URI_DEV?: string;

    // JWT
    JWT_SECRET: string;
    JWT_EXPIRES_IN?: string;
    JWT_COOKIE_EXPIRES_IN?: string;

    // Email (future use)
    EMAIL_HOST?: string;
    EMAIL_PORT?: string;
    EMAIL_USERNAME?: string;
    EMAIL_PASSWORD?: string;
    EMAIL_FROM?: string;

    // Cloudinary (future use)
    CLOUDINARY_CLOUD_NAME?: string;
    CLOUDINARY_API_KEY?: string;
    CLOUDINARY_API_SECRET?: string;

    // Other environment variables can be added here
    [key: string]: string | undefined;
  }
}
