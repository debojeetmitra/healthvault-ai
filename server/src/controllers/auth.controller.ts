import { Request, Response } from "express";

/**
 * POST /api/auth/register
 * Registers a new patient or doctor.
 * TODO: Validate input, hash password, save to DB, return JWT.
 */
export const register = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: "Endpoint ready. Implementation coming next.",
    endpoint: "POST /api/auth/register",
  });
};

/**
 * POST /api/auth/login
 * Authenticates an existing user and returns a JWT.
 * TODO: Validate credentials, compare hashed password, sign and return JWT.
 */
export const login = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: "Endpoint ready. Implementation coming next.",
    endpoint: "POST /api/auth/login",
  });
};
