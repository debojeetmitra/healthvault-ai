import { Schema, model, Document, Types } from "mongoose";

// ─── TypeScript Interface ─────────────────────────────────────────────────────

export interface IMedicalReport extends Document {
  patient: Types.ObjectId;     // Who owns this report
  uploadedBy: Types.ObjectId;  // Who uploaded it (patient themselves, for now)
  title: string;
  reportType: "lab_result" | "prescription" | "imaging" | "discharge_summary" | "other";
  fileUrl: string;             // Cloudinary URL — stored after upload
  aiSummary: string;           // Empty initially; filled by Gemini AI job
  createdAt: Date;
  updatedAt: Date;
}

// ─── Mongoose Schema ──────────────────────────────────────────────────────────

const MedicalReportSchema = new Schema<IMedicalReport>(
  {
    // The patient who owns this report.
    // When a report is created, its _id is also pushed to Patient.reports[].
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient reference is required"],
    },

    // The user who performed the upload action.
    // For now this will always be the same as `patient`.
    // In the future, a doctor or admin could upload on behalf of a patient.
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Uploader reference is required"],
    },

    title: {
      type: String,
      required: [true, "Report title is required"],
      trim: true,
      // Example: "Blood Test - January 2025"
    },

    // Enum ensures only valid categories are stored.
    // Frontend can use these values for filtering and display icons.
    reportType: {
      type: String,
      enum: [
        "lab_result",
        "prescription",
        "imaging",
        "discharge_summary",
        "other",
      ],
      required: [true, "Report type is required"],
      default: "other",
    },

    // The full public URL of the file stored in Cloudinary.
    // Set to empty string until Cloudinary integration is wired up.
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
      trim: true,
    },

    // AI-generated plain-language summary of the medical report.
    // Populated by the Gemini AI integration (future feature).
    // Left as empty string on upload — triggers an async AI job.
    aiSummary: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// ─── Export Model ─────────────────────────────────────────────────────────────
// "MedicalReport" → MongoDB collection: "medicalreports"

const MedicalReport = model<IMedicalReport>("MedicalReport", MedicalReportSchema);
export default MedicalReport;
