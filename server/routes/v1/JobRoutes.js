import express from "express";
import { getRelatedJobs } from "../../controllers/JobControllers.js";

const router = express.Router();

// Route: /api/jobs?query=developer
router.get("/", getRelatedJobs);

export default router;
