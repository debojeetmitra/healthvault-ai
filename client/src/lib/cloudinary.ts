import axios from "axios";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your_cloud_name";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "your_upload_preset";

/**
 * Uploads a file (PDF or image) to Cloudinary via the unsigned upload API.
 * 
 * @param file - The File object selected by the user
 * @returns The secure delivery URL (secure_url) from Cloudinary
 */
export const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!CLOUD_NAME || CLOUD_NAME === "your_cloud_name") {
    throw new Error("Cloudinary cloud name is not configured in environment variables.");
  }
  if (!UPLOAD_PRESET || UPLOAD_PRESET === "your_upload_preset") {
    throw new Error("Cloudinary upload preset is not configured in environment variables.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data && response.data.secure_url) {
      return response.data.secure_url;
    } else {
      throw new Error("Cloudinary response did not contain a secure_url.");
    }
  } catch (error: any) {
    console.error("Cloudinary upload error details:", error);
    const apiErrorMessage = error.response?.data?.error?.message;
    const errorMessage = apiErrorMessage || error.message || "Failed to upload file to Cloudinary.";
    throw new Error(errorMessage);
  }
};
