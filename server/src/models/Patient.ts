import { Schema, model, Document, Types } from "mongoose";

// ─── TypeScript Interface ─────────────────────────────────────────────────────
// Describes the shape of a Patient document returned from MongoDB.
// `Document` from Mongoose adds _id, save(), etc. automatically.

export interface IPatient extends Document {
  fullName: string;
  email: string;
  password: string; // Hashed — will be handled by auth feature
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
  bloodGroup:
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-"
    | "unknown";
  allergies: string[];
  chronicDiseases: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  reports: Types.ObjectId[]; // References to MedicalReport documents
  createdAt: Date;
  updatedAt: Date;
}

// ─── Mongoose Schema ──────────────────────────────────────────────────────────

const PatientSchema = new Schema<IPatient>(
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

    // Password will be hashed via bcrypt in the auth feature.
    // Stored here as a plain string placeholder for now.
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"],
      default: "unknown",
    },

    // Simple string arrays — no subdocuments needed for hackathon scope
    allergies: {
      type: [String],
      default: [],
    },

    chronicDiseases: {
      type: [String],
      default: [],
    },

    emergencyContact: {
      name: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      relationship: {
        type: String,
        default: "",
      },
    },

    // Array of ObjectId refs to MedicalReport.
    // When a patient uploads a report, its _id is pushed here.
    reports: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalReport",
      },
    ],
  },
  {
    // Mongoose auto-manages createdAt and updatedAt
    timestamps: true,
  }
);

// ─── Export Model ─────────────────────────────────────────────────────────────
// "Patient" becomes the MongoDB collection name (pluralized → "patients")

const Patient = model<IPatient>("Patient", PatientSchema);
export default Patient;
