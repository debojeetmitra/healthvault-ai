import { Schema, model, Document, Types } from "mongoose";

// ─── TypeScript Interface ─────────────────────────────────────────────────────

export interface IDoctor extends Document {
  fullName: string;
  email: string;
  password: string; // Hashed — will be handled by auth feature
  specialization: string;
  hospital: string;
  licenseNumber: string;
  yearsOfExperience: number;
  patients: Types.ObjectId[]; // References to Patient documents
  createdAt: Date;
  updatedAt: Date;
}

// ─── Mongoose Schema ──────────────────────────────────────────────────────────

const DoctorSchema = new Schema<IDoctor>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Same approach as Patient — bcrypt hashing comes in the auth feature
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true,
      // Examples: "Cardiology", "Neurology", "General Practice"
    },

    hospital: {
      type: String,
      required: [true, "Hospital name is required"],
      trim: true,
    },

    // Medical license — important for verification (future feature)
    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      unique: true,
      trim: true,
    },

    yearsOfExperience: {
      type: Number,
      required: [true, "Years of experience is required"],
      min: [0, "Experience cannot be negative"],
    },

    // Doctors accumulate patients when permissions are granted to them.
    // This is a soft reference list — NOT the access control mechanism.
    // The Permission model is the source of truth for access.
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ─── Export Model ─────────────────────────────────────────────────────────────
// "Doctor" → MongoDB collection: "doctors"

const Doctor = model<IDoctor>("Doctor", DoctorSchema);
export default Doctor;
