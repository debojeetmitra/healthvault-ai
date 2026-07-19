import jwt from "jsonwebtoken";

// Shape of data encoded inside every JWT
export interface JwtPayload {
  id: string;
  role: "patient" | "doctor";
}

const getSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined in environment variables.");
  return secret;
};

/**
 * Signs a new JWT containing the user's id and role.
 * Expiry is read from JWT_EXPIRES_IN env var (e.g. "7d").
 */
export const generateToken = (id: string, role: "patient" | "doctor"): string => {
  // Cast via SignOptions["expiresIn"] — this satisfies the ms.StringValue
  // branded type that @types/jsonwebtoken v9 requires, without using `any`.
  const expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];

  return jwt.sign({ id, role }, getSecret(), { expiresIn });
};

/**
 * Verifies a JWT and returns its decoded payload.
 * Throws a JsonWebTokenError if the token is invalid or expired.
 */
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, getSecret()) as JwtPayload;
};
