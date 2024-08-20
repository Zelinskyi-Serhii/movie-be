import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadFile = async (file: Express.Multer.File): Promise<string> => {
  try {
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }

          resolve(result);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading file");
  }
};

export const fileUploadService = {
  uploadFile,
};
