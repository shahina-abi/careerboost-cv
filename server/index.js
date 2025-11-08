import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
dotenv.config();
const app = express();
console.log("Hugging Face key loaded:", !!process.env.HF_API_KEY);
console.log("Loaded HF_API_KEY:", process.env.HF_API_KEY?.slice(0, 10) + "...");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use("/uploads/cvs", express.static("uploads/cvs"));
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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));