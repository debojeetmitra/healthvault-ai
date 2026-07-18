import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import reportRoutes from "./routes/report.routes";
import permissionRoutes from "./routes/permission.routes";

const createApp = (): Application => {
  const app = express();

  // ─── Security & Parsing Middleware ───────────────────────────────────────
  app.use(helmet()); // Sets secure HTTP headers
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(express.json({ limit: "10mb" })); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

  // ─── Health Check ─────────────────────────────────────────────────────────
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "HealthVault AI server is running",
      timestamp: new Date().toISOString(),
    });
  });

  // ─── API Routes ───────────────────────────────────────────────────────────
  app.use("/api/auth", authRoutes);
  app.use("/api/reports", reportRoutes);
  app.use("/api/permissions", permissionRoutes);

  // ─── Global Error Handler (must be last) ─────────────────────────────────
  app.use(errorHandler);

  return app;
};

export default createApp;
