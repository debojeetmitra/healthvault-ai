import { Request, Response, NextFunction } from "express";
import { Permission, MedicalReport, Doctor } from "../models";
import { AppError } from "../middleware/errorHandler";
import * as blockchainService from "../services/blockchain.service";

/**
 * POST /api/permissions/grant
 * Grants a doctor access to a specific medical report.
 */
export const grantPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id: patientId, role } = req.user!;

    if (role !== "patient") {
      const error = new Error("Only patients can modify permissions") as AppError;
      error.statusCode = 403;
      return next(error);
    }

    const { doctorId, reportId } = req.body;

    if (!doctorId || !reportId) {
      const error = new Error("doctorId and reportId are required") as AppError;
      error.statusCode = 400;
      return next(error);
    }

    // 1. Validate report ownership
    const report = await MedicalReport.findOne({ _id: reportId, patient: patientId });
    if (!report) {
      const error = new Error("Report not found or does not belong to the patient") as AppError;
      error.statusCode = 404;
      return next(error);
    }

    // 2. Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      const error = new Error("Doctor not found") as AppError;
      error.statusCode = 404;
      return next(error);
    }
// 3. Record permission grant on Midnight blockchain
const midnightTxHash = await blockchainService.grantPermission(
  
   patientId,
  doctorId,
  reportId
);
    // 3. Upsert permission record
    const permission = await Permission.findOneAndUpdate(
      { patient: patientId, doctor: doctorId, report: reportId },
      {
  status: "granted",
  grantedAt: new Date(),
  midnightTxHash
},
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      permission
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/permissions/revoke
 * Revokes a previously granted doctor's access to a medical report.
 */
export const revokePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id: patientId, role } = req.user!;

    if (role !== "patient") {
      const error = new Error("Only patients can modify permissions") as AppError;
      error.statusCode = 403;
      return next(error);
    }

    const { doctorId, reportId } = req.body;

    if (!doctorId || !reportId) {
      const error = new Error("doctorId and reportId are required") as AppError;
      error.statusCode = 400;
      return next(error);
    }

    // 1. Validate report ownership
    const report = await MedicalReport.findOne({ _id: reportId, patient: patientId });
    if (!report) {
      const error = new Error("Report not found or does not belong to the patient") as AppError;
      error.statusCode = 404;
      return next(error);
    }
// Record permission revocation on Midnight blockchain
const midnightTxHash = await blockchainService.revokePermission(
  patientId,
  doctorId,
  reportId
);
    // 2. Update permission record
    const permission = await Permission.findOneAndUpdate(
      { patient: patientId, doctor: doctorId, report: reportId },
      {
  status: "revoked",
  revokedAt: new Date(),
  midnightTxHash
},
      { new: true }
    );

    if (!permission) {
      const error = new Error("Permission record not found") as AppError;
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      permission
    });
  } catch (error) {
    next(error);
  }
};
