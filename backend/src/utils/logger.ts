import winston, { format } from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize, align } = format;

// Define log format
const logFormat = printf((info: winston.Logform.TransformableInfo) => {
  const rawTimestamp = info["timestamp"]; // <- use bracket notation
  const ts =
    typeof rawTimestamp === "string"
      ? rawTimestamp.slice(0, 19).replace("T", " ")
      : new Date().toISOString().slice(0, 19).replace("T", " ");

  const level = info["level"];
  const message = info["message"];

  // Remove known fields to keep only meta
  const { timestamp, level: _l, message: _m, ...meta } = info;

  let log = `${ts} [${level}]: ${message}`;
  if (Object.keys(meta).length > 0) {
    log += "\n" + JSON.stringify(meta, null, 2);
  }

  return log;
});

// Create transports array based on environment
const transports = [];

// Console transport for all environments
// Always add console transport
transports.push(
  new winston.transports.Console({
    format: combine(
      colorize({ all: true }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      align(),
      logFormat
    ),
    level: "info",
  })
);

// File transport disabled (requires NODE_ENV)

// Create the logger instance
const logger = winston.createLogger({
  level: "info", // Default level
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  defaultMeta: { service: "rccg-backend" },
  transports,
  exitOnError: false, // Don't exit on handled exceptions
});

// Exception handling disabled (requires NODE_ENV)

// Create a stream for Morgan
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export { logger, stream };
