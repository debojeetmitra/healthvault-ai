import { Request, Response, NextFunction } from "express";
import { MedicalReport, Patient } from "../models";
import { AppError } from "../middleware/errorHandler";

/**
 * GET /api/reports
 * Returns all medical reports belonging to the authenticated patient.
 */
export const getReports = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, role } = req.user!;

    // For now, only patients can view their own reports list directly.
    // Doctors access reports via the permissions feature (implemented later).
    if (role !== "patient") {
      const error = new Error("Only patients can access this endpoint") as AppError;
      error.statusCode = 403;
      return next(error);
    }

    // Find all reports for this patient, newest first
    const reports = await MedicalReport.find({ patient: id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/reports
 * Creates a new medical report record for the authenticated patient.
 */
export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, role } = req.user!;

    if (role !== "patient") {
      const error = new Error("Only patients can upload reports") as AppError;
      error.statusCode = 403;
      return next(error);
    }

    const { title, reportType, fileUrl } = req.body;

    // Validate required fields
    if (!title || !reportType || !fileUrl) {
      const error = new Error("Title, reportType, and fileUrl are required") as AppError;
      error.statusCode = 400;
      return next(error);
    }

    // Validate reportType against enum
    const validTypes = ["lab_result", "prescription", "imaging", "discharge_summary", "other"];
    if (!validTypes.includes(reportType)) {
      const error = new Error(`Invalid reportType. Must be one of: ${validTypes.join(", ")}`) as AppError;
      error.statusCode = 400;
      return next(error);
    }

    // Create the report
    const report = await MedicalReport.create({
      patient: id,
      uploadedBy: id,
      title,
      reportType,
      fileUrl,
      // aiSummary relies on the model default ("")
    });

    // Add report reference to the Patient document
    await Patient.findByIdAndUpdate(id, {
      $push: { reports: report._id }
    });

    res.status(201).json({
      success: true,
      report,
    });
  } catch (error) {
    next(error);
  }
};
