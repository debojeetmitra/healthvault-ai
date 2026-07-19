import { Router } from "express";
import { getReports, createReport } from "../controllers/report.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// GET /api/reports (Protected)
router.get("/", protect, getReports);

// POST /api/reports (Protected)
router.post("/", protect, createReport);

export default router;
