import { Request, Response } from "express";
import { fileUploadService } from "./service";

const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const url = await fileUploadService.uploadFile(req.file);

    res.json({ url });
  } catch (error) {
    res.status(500).send("Error uploading file");
  }
};

export const fileUploadController = {
  uploadFile,
};
