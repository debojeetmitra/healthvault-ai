import React, { useState } from "react";
import { Upload, X, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { uploadReport } from "../../services/report.service";
import { MedicalReport } from "../../types/report";
import { uploadToCloudinary } from "../../lib/cloudinary";

interface UploadReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called with the newly created report (including aiSummary) on successful upload */
  onSuccess?: (report: MedicalReport) => void;
}

export default function UploadReportModal({ isOpen, onClose, onSuccess }: UploadReportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("lab_result");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(selectedFile.type)) {
        setError("Only PDF, JPG, and PNG files are accepted.");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !category) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Upload file to Cloudinary first
      const cloudinaryUrl = await uploadToCloudinary(file);

      const result = await uploadReport({
        title,
        reportType: category,
        fileUrl: cloudinaryUrl,
      });

      // Notify parent with the full report object (includes aiSummary from Groq)
      if (result.success && result.report) {
        onSuccess?.(result.report);
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFile(null);
        setTitle("");
        setCategory("lab_result");
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to upload report.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl border border-border p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          disabled={isUploading}
        >
          <X className="size-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
          <Upload className="size-5 text-emerald-500" />
          Upload Medical Report
        </h2>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="size-16 text-emerald-500 mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Upload Successful!</h3>
            <p className="text-sm text-muted-foreground">Your report has been vaulted and AI summary generated.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Report Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Blood Test Results"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={isUploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={isUploading}
              >
                <option value="lab_result">Lab Result</option>
                <option value="prescription">Prescription</option>
                <option value="imaging">Imaging</option>
                <option value="discharge_summary">Discharge Summary</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">File (PDF, JPG, PNG)</label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center bg-muted/20">
                <input
                  type="file"
                  accept=".pdf, image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center cursor-pointer w-full"
                >
                  <FileText className="size-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium text-emerald-600 hover:text-emerald-500 truncate max-w-[250px]">
                    {file ? file.name : "Click to select a file"}
                  </span>
                  {!file && <span className="text-xs text-muted-foreground mt-1">Max size: 5MB</span>}
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-4"
            >
              {isUploading ? (
                <>
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="size-4" />
                  Upload Report
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
