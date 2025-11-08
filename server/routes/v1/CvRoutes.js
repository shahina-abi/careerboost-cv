
// export default router;
import express from "express";
import multer from "multer";
import { uploadCV } from "../../controllers/cvControllers.js";
import { enhanceCV } from "../../controllers/cvControllers.js";
const router = express.Router();

const upload = multer({
  dest: "uploads/cvs",
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only PDF and DOCX files are allowed"), false);
  },
});

router.post("/upload", upload.single("cv"), uploadCV);
router.post("/enhance", upload.single("cv"), enhanceCV);
export default router;
