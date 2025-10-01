// src/config/env.ts
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Only expose the supported environment variables
export interface EnvVars {
  PORT: string;
  MONGO_URI: string;
  JWT_SECRET: string;
}

const env: EnvVars = {
  PORT: process.env["PORT"] || "5000",
  MONGO_URI: process.env["MONGO_URI"] || "",
  JWT_SECRET: process.env["JWT_SECRET"] || "",
};

export default env;
