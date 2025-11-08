
import express from "express";
import { getRelatedJobs } from "../../controllers/JobControllers.js";

const router = express.Router();
router.get("/", getRelatedJobs);

export default router;
