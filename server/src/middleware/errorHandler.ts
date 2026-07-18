import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

// Shape of a structured API error
export interface AppError extends Error {
  statusCode?: number;
}

/**
 * Global error handler middleware.
 * Must be registered LAST in app.ts (after all routes).
 *
 * Catches any error passed via next(err) or thrown inside async routes.
 */
const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message || "Internal Server Error";

  logger.error(`[${statusCode}] ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    // Only expose stack trace in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
