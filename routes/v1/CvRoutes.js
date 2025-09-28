import express from "express";
import multer from "multer";
import { authUser } from "../../middleware/authUser.js";
import { uploadCV } from "../../controllers/cvControllers.js";
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/cvs"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST /api/cv/upload
router.post("/upload", authUser, upload.single("cv"), uploadCV);

export default router;
