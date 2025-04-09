import { env } from "@/data/env/server";
import { UploadImageType } from "@/modules/dashboard/students/types";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadToCloude = async ({
  base64,
  folder,
}: {
  base64: string | null;
  folder: "student" | "teacher";
}): Promise<UploadImageType> => {
  if (base64) {
    const data = await cloudinary.uploader.upload(base64, { folder });
    return { secure_url: data.secure_url, public_id: data.public_id };
  } else {
    return {
      secure_url: "",
      public_id: "",
    };
  }
};

export const deleteFromCloude = async (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error || result.result !== "ok") {
        reject(new Error("Failed to delete image."));
      } else {
        resolve(result);
      }
    });
  });
};
