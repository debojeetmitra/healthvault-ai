// Central export point for all Mongoose models.
// Import from here instead of individual files:
//   import { Patient, Doctor, MedicalReport, Permission } from "../models";

export { default as Patient } from "./Patient";
export { default as Doctor } from "./Doctor";
export { default as MedicalReport } from "./MedicalReport";
export { default as Permission } from "./Permission";

// Re-export interfaces for use in controllers and services
export type { IPatient } from "./Patient";
export type { IDoctor } from "./Doctor";
export type { IMedicalReport } from "./MedicalReport";
export type { IPermission } from "./Permission";
