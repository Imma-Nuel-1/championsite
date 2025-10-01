// src/config/env.ts
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Define the shape of our environment variables
export interface EnvVars {
  NODE_ENV: "development" | "production" | "test";
  PORT: string;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  PRAYER_REQUEST_EMAIL: string;
  [key: string]: string | number | undefined;
}

// List of required environment variables
const requiredVars: (keyof EnvVars)[] = [
  "MONGO_URI",
  "JWT_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "PRAYER_REQUEST_EMAIL",
];

// Check for missing required env variables
const missingVars = requiredVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  throw new Error(
    `❌ Missing required environment variables: ${missingVars.join(", ")}`
  );
}

// Build the environment configuration using bracket notation
const env: EnvVars = {
  NODE_ENV:
    (process.env["NODE_ENV"] as "development" | "production" | "test") ||
    "development",
  PORT: process.env["PORT"] || "5000",
  MONGO_URI: process.env["MONGO_URI"]!,
  JWT_SECRET: process.env["JWT_SECRET"]!,
  JWT_EXPIRES_IN: process.env["JWT_EXPIRES_IN"] || "7d",
  SMTP_HOST: process.env["SMTP_HOST"]!,
  SMTP_PORT: parseInt(process.env["SMTP_PORT"]!, 10),
  SMTP_USER: process.env["SMTP_USER"]!,
  SMTP_PASS: process.env["SMTP_PASS"]!,
  PRAYER_REQUEST_EMAIL: process.env["PRAYER_REQUEST_EMAIL"]!,
};

export default env;
