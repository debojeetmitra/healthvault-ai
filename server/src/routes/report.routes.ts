import { Router } from "express";
import { getReports, createReport } from "../controllers/report.controller";

const router = Router();

// GET /api/reports
router.get("/", getReports);

// POST /api/reports
router.post("/", createReport);

export default router;
