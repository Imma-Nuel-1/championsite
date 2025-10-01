import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class ErrorHandler extends Error {
  statusCode: number;
  errorCode?: string;

  constructor(statusCode: number, message: string, errorCode?: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errorCode = errorCode;
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  // Log the error
  logger.error(`[${new Date().toISOString()}] ${req.method} ${req.url}`, {
    error: err.message,
    stack: err.stack,
    body: req.body,
    params: req.params,
    query: req.query,
    user: (req as any).user?.id || "unauthenticated",
  });

  // Handle specific error types
  if (err instanceof ErrorHandler) {
    res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
      errorCode: err.errorCode,
    });
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error
    res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Validation Error',
      errors: (err as any).errors,
    });
  } else if (err.name === 'JsonWebTokenError') {
    // JWT error
    res.status(401).json({
      status: 'error',
      statusCode: 401,
      message: 'Invalid token',
    });
  } else if (err.name === 'TokenExpiredError') {
    // JWT expired
    res.status(401).json({
      status: 'error',
      statusCode: 401,
      message: 'Token expired',
    });
  } else {
    // Default to 500 server error
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
  
  next();
};

// Error handling wrapper for async/await
// Usage: wrapAsync(async (req, res, next) => { ... })
export const wrapAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// 404 Not Found handler
export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: 'Not Found',
    path: _req.originalUrl,
  });
};
