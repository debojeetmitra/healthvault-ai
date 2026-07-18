import { Request, Response } from "express";

/**
 * GET /api/reports
 * Returns all medical reports belonging to the authenticated patient.
 * TODO: Extract patient ID from JWT, query MedicalReport by patient ID, return list.
 */
export const getReports = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: "Endpoint ready. Implementation coming next.",
    endpoint: "GET /api/reports",
  });
};

/**
 * POST /api/reports
 * Uploads a new medical report for the authenticated patient.
 * TODO: Accept file upload via Cloudinary, save MedicalReport to DB,
 *       push report ID to Patient.reports[], trigger AI summary job.
 */
export const createReport = (_req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    message: "Endpoint ready. Implementation coming next.",
    endpoint: "POST /api/reports",
  });
};
