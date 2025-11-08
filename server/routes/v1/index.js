import express from "express";
import userRouter from "../../routes/v1/userRoutes.js";
import cvRoutes from './CvRoutes.js'
import JobRoutes from './JobRoutes.js'

const v1router = express.Router();
v1router.use("/users", userRouter);
v1router.use("/cv", cvRoutes)
v1router.use("/jobs",JobRoutes)
export default v1router;
