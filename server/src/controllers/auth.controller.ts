import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { Patient, Doctor } from "../models";
import { generateToken } from "../utils/jwt";
import { AppError } from "../middleware/errorHandler";

/**
 * POST /api/auth/register
 * Registers a new patient or doctor.
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { role, password, email, ...otherData } = req.body;

    if (!role || !["patient", "doctor"].includes(role)) {
      const error = new Error("Valid role ('patient' or 'doctor') is required") as AppError;
      error.statusCode = 400;
      return next(error);
    }

    if (!email || !password) {
      const error = new Error("Email and password are required") as AppError;
      error.statusCode = 400;
      return next(error);
    }

    const emailLower = email.toLowerCase();
    let existingUser = null;

    if (role === "patient") {
      existingUser = await Patient.findOne({ email: emailLower });
    } else {
      existingUser = await Doctor.findOne({ email: emailLower });
    }

    if (existingUser) {
      const error = new Error("Email is already registered") as AppError;
      error.statusCode = 400;
      return next(error);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let token: string;
    let userObj: any;

    if (role === "patient") {
      const user = await Patient.create({
        ...otherData,
        email: emailLower,
        password: hashedPassword,
      });
      token = generateToken(user._id.toString(), "patient");
      userObj = user.toObject();
    } else {
      const user = await Doctor.create({
        ...otherData,
        email: emailLower,
        password: hashedPassword,
      });
      token = generateToken(user._id.toString(), "doctor");
      userObj = user.toObject();
    }

    // Remove password from response
    delete userObj.password;

    res.status(201).json({
      success: true,
      token,
      user: userObj,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Authenticates an existing user and returns a JWT.
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      const error = new Error("Email, password, and role are required") as AppError;
      error.statusCode = 400;
      return next(error);
    }

    if (!["patient", "doctor"].includes(role)) {
      const error = new Error("Valid role ('patient' or 'doctor') is required") as AppError;
      error.statusCode = 400;
      return next(error);
    }

    const emailLower = email.toLowerCase();
    let user = null;

    if (role === "patient") {
      user = await Patient.findOne({ email: emailLower });
    } else {
      user = await Doctor.findOne({ email: emailLower });
    }

    if (!user) {
      const error = new Error("Invalid credentials") as AppError;
      error.statusCode = 401;
      return next(error);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid credentials") as AppError;
      error.statusCode = 401;
      return next(error);
    }

    // Generate JWT
    const token = generateToken(user._id.toString(), role as "patient" | "doctor");

    // Remove password from response
    const userObj = user.toObject();
    delete (userObj as any).password;

    res.status(200).json({
      success: true,
      token,
      user: userObj,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Returns the currently authenticated user's profile.
 */
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // req.user is guaranteed to exist because of the auth middleware
    const { id, role } = req.user!;

    let user = null;

    if (role === "patient") {
      user = await Patient.findById(id).select("-password");
    } else {
      user = await Doctor.findById(id).select("-password");
    }

    if (!user) {
      const error = new Error("User not found") as AppError;
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
