import api from "../lib/axios";
import { UploadReportPayload, MedicalReport } from "../types/report";

export const uploadReport = async (payload: UploadReportPayload): Promise<{ success: boolean; report: MedicalReport }> => {
  const response = await api.post("/reports", payload);
  return response.data;
};

export const getReports = async (): Promise<{ success: boolean; count: number; reports: MedicalReport[] }> => {
  const response = await api.get("/reports");
  return response.data;
};
