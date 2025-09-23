import express from "express";
import userRouter from "../../routes/v1/userRoutes.js";

const v1router = express.Router();
v1router.use("/users", userRouter);

export default v1router;
