import express from "express";
import multer from "multer";
import fs from "fs";
import { uploadCV } from "../../controllers/cvControllers.js";

const router = express.Router();

const uploadDir = "uploads/cvs";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only DOCX files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("cv"), uploadCV);

export default router;
