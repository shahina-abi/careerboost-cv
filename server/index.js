import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api",router);

// Root test route
app.get("/", (req, res) => {
  res.json({ msg: "CareerBoost API is running..." });
});

// Handle 404
app.use((req,res,next) => {
    res.status(404).json({error:"Not found"});
});

//start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));