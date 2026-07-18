import { Router } from "express";
import { grantPermission, revokePermission } from "../controllers/permission.controller";

const router = Router();

// POST /api/permissions/grant
router.post("/grant", grantPermission);

// POST /api/permissions/revoke
router.post("/revoke", revokePermission);

export default router;
