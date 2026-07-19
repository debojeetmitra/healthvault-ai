export interface MedicalReport {
  _id: string;
  title: string;
  reportType: "lab_result" | "prescription" | "imaging" | "discharge_summary" | "other";
  fileUrl: string;
  patient: string;
  uploadedBy: string;
  createdAt: string;
}

export interface UploadReportPayload {
  title: string;
  reportType: string;
  fileUrl: string;
}
