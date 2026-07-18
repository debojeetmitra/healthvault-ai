import { Request, Response } from "express";

/**
 * POST /api/permissions/grant
 * Grants a doctor access to a specific medical report.
 * TODO: Validate patient owns the report, create/update Permission record (status: granted),
 *       record midnightTxHash from Midnight blockchain, set grantedAt timestamp.
 */
export const grantPermission = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: "Endpoint ready. Implementation coming next.",
    endpoint: "POST /api/permissions/grant",
  });
};

/**
 * POST /api/permissions/revoke
 * Revokes a previously granted doctor's access to a medical report.
 * TODO: Validate patient owns the permission, update status to "revoked",
 *       record midnightTxHash from Midnight blockchain, set revokedAt timestamp.
 */
export const revokePermission = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: "Endpoint ready. Implementation coming next.",
    endpoint: "POST /api/permissions/revoke",
  });
};
