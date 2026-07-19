import { Router } from "express";
import { grantPermission, revokePermission } from "../controllers/permission.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// POST /api/permissions/grant (Protected)
router.post("/grant", protect, grantPermission);

// POST /api/permissions/revoke (Protected)
router.post("/revoke", protect, revokePermission);

export default router;
