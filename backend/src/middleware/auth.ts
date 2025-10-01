import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import { logger } from "../utils/logger";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

/**
 * Middleware to check if user is authenticated
 */
export const requireAuth: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("[requireAuth]: Checking for Authorization header...");
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      console.log(
        '[requireAuth]: FAILED - No "Bearer " token found in header.'
      );
      return res.status(401).json({
        status: "error",
        message: "You are not logged in! Please log in to get access.",
      });
    }
    console.log("[requireAuth]: Authorization header found.");

    const token = header.split(" ")[1];
    if (!token) {
      console.log(
        "[requireAuth]: FAILED - Token is empty after splitting header."
      );
      return res.status(401).json({
        status: "error",
        message: "Invalid authentication token format.",
      });
    }
    console.log(`[requireAuth]: Token extracted: ${token.substring(0, 30)}...`);

    const decoded = await verifyToken(token);
    console.log("[requireAuth]: Token decoded successfully. Payload:", decoded);
    req.user = decoded;
    return next();
  } catch (error) {
    logger.error("Authentication error:", error);
    return res.status(401).json({
      status: "error",
      message: "Invalid token or session expired. Please log in again.",
    });
  }
};

/**
 * Middleware to restrict routes to specific roles
 */
export const restrictTo = (...roles: UserRole[]): RequestHandler => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("[restrictTo]: Checking access for user:", req.user);
    console.log("[restrictTo]: Required roles are:", roles);

    if (!req.user) {
      console.log("[restrictTo]: FAILED - req.user object is missing.");
      return res.status(401).json({
        status: "error",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    console.log(`[restrictTo]: User role is '${req.user.role}'.`);
    const hasPermission = roles.includes(req.user.role);
    console.log(`[restrictTo]: Role check result: ${hasPermission}`);

    if (!hasPermission) {
      console.log(
        "[restrictTo]: FAILED - User does not have the required role."
      );
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to perform this action.",
      });
    }

    console.log("[restrictTo]: SUCCESS - User has permission.");
    return next();
  };
};
