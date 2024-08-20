import express from "express";
import { fileUploadController } from "../modules/fileUpload/controller";
import multer from "multer";

const upload = multer();

export const fileUploadRoute = express.Router();

fileUploadRoute.post("/", upload.single("file"), fileUploadController.uploadFile);
