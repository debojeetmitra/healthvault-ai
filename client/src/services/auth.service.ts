import api from "../lib/axios";
import type {
  AuthResponse,
  LoginPayload,
  MeResponse,
  RegisterDoctorPayload,
  RegisterPatientPayload,
} from "../types/auth";

/**
 * POST /api/auth/login
 * Authenticates the user and returns a token + profile.
 */
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
};

/**
 * POST /api/auth/register
 * Registers a new patient or doctor.
 */
export const register = async (
  payload: RegisterPatientPayload | RegisterDoctorPayload
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
};

/**
 * GET /api/auth/me
 * Returns the authenticated user's profile.
 * Requires Authorization header to be set on the axios instance before calling.
 */
export const getMe = async (): Promise<MeResponse> => {
  const { data } = await api.get<MeResponse>("/auth/me");
  return data;
};
