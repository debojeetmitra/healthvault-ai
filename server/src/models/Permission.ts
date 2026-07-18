import { Schema, model, Document, Types } from "mongoose";

// ─── TypeScript Interface ─────────────────────────────────────────────────────

export interface IPermission extends Document {
  patient: Types.ObjectId;   // The patient granting access
  doctor: Types.ObjectId;    // The doctor receiving access
  report: Types.ObjectId;    // The specific report being shared
  status: "pending" | "granted" | "revoked";
  grantedAt?: Date;          // Set when status → "granted"
  revokedAt?: Date;          // Set when status → "revoked"
  midnightTxHash?: string;   // Midnight blockchain transaction hash (optional)
  createdAt: Date;
  updatedAt: Date;
}

// ─── Mongoose Schema ──────────────────────────────────────────────────────────

const PermissionSchema = new Schema<IPermission>(
  {
    // The patient who OWNS the report and is granting access.
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient reference is required"],
    },

    // The doctor who is being GIVEN access to the report.
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor reference is required"],
    },

    // The specific report this permission applies to.
    // A patient can grant access to individual reports, not their entire history.
    report: {
      type: Schema.Types.ObjectId,
      ref: "MedicalReport",
      required: [true, "Report reference is required"],
    },

    // Status lifecycle:
    //   pending  → doctor has been invited but patient hasn't confirmed
    //   granted  → patient approved access
    //   revoked  → patient later withdrew access
    status: {
      type: String,
      enum: ["pending", "granted", "revoked"],
      default: "pending",
      required: true,
    },

    // Timestamps for audit purposes.
    // These complement the Midnight blockchain record.
    grantedAt: {
      type: Date,
      default: null,
    },

    revokedAt: {
      type: Date,
      default: null,
    },

    // The transaction hash returned by Midnight blockchain after recording
    // the permission grant/revoke on-chain.
    // This is optional because:
    //   1. It's filled in asynchronously after the blockchain tx confirms.
    //   2. For demo/testing without Midnight, the rest of the system still works.
    midnightTxHash: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Compound Index ───────────────────────────────────────────────────────────
// Ensures only ONE permission record exists per (patient, doctor, report) combo.
// Prevents duplicate grants and simplifies lookup logic in the controller.
PermissionSchema.index({ patient: 1, doctor: 1, report: 1 }, { unique: true });

// ─── Export Model ─────────────────────────────────────────────────────────────
// "Permission" → MongoDB collection: "permissions"

const Permission = model<IPermission>("Permission", PermissionSchema);
export default Permission;
