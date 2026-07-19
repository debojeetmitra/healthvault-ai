// ─── Role ─────────────────────────────────────────────────────────────────────

export type UserRole = "patient" | "doctor";

// ─── User Profiles ────────────────────────────────────────────────────────────
// Lightweight, UI-focused. No password, no MongoDB internals, no unused fields.

export interface PatientProfile {
  _id: string;
  role: "patient";
  fullName: string;
  email: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "unknown";
  allergies: string[];
  chronicDiseases: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface DoctorProfile {
  _id: string;
  role: "doctor";
  fullName: string;
  email: string;
  specialization: string;
  hospital: string;
  licenseNumber: string;
  yearsOfExperience: number;
}

// Union — use role as discriminator to narrow type in components
export type AuthUser = PatientProfile | DoctorProfile;

// ─── API Request Payloads ─────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterPatientPayload {
  role: "patient";
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodGroup?: PatientProfile["bloodGroup"];
}

export interface RegisterDoctorPayload {
  role: "doctor";
  fullName: string;
  email: string;
  password: string;
  specialization: string;
  hospital: string;
  licenseNumber: string;
  yearsOfExperience: number;
}

// ─── API Response Shapes ──────────────────────────────────────────────────────

export interface AuthResponse {
  success: boolean;
  token: string;
  user: AuthUser;
}

export interface MeResponse {
  success: boolean;
  user: AuthUser;
}
