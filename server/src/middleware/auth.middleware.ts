import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "./errorHandler";

/**
 * Middleware to protect routes by requiring a valid JWT.
 * Expects header: "Authorization: Bearer <token>"
 */
export const protect = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Not authorized, no token provided") as AppError;
      error.statusCode = 401;
      return next(error);
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    try {
      const decoded = verifyToken(token);
      // 3. Attach user payload to request
      req.user = decoded;
      next();
    } catch (error) {
      // jwt.verify throws if token is expired, tampered, or invalid
      const appError = new Error("Not authorized, token failed") as AppError;
      appError.statusCode = 401;
      return next(appError);
    }
  } catch (error) {
    next(error);
  }
};
