


import fs from "fs";
import Groq from "groq-sdk"
import axios from "axios";
import path from "path";
import mammoth from "mammoth";
import multer from "multer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
import dotenv from "dotenv";

import { getEmbedding } from "../helpers/embeddings.js";

dotenv.config(); // ✅ must come before OpenAI is used


const pdfParse = pdf.default || pdf;

// ------------------ CV UPLOAD & PROCESSING ------------------
export const uploadCV = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "Please upload a DOCX or PDF file." });

    const filePath = path.resolve(req.file.path);
    let text = "";

    // Extract text
    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
    } else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file format." });
    }

    // Generate embedding
    const embedding = await getEmbedding(text);

    // Extract some skills
    const skills =
      text.match(
        /\b(React|Node|MongoDB|JavaScript|Python|HTML|CSS|Express|SQL|Next\.js|TypeScript)\b/gi
      ) || ["developer"];

    res.json({
      message: "✅ CV uploaded and processed successfully",
      preview: text.substring(0, 400) + "...",
      keywords: skills.map((s) => s.toLowerCase()),
      embedding,
    });

    fs.unlink(filePath, (err) => {
      if (err) console.warn("⚠️ Failed to delete temp file:", err.message);
    });
  } catch (error) {
    console.error("❌ CV Processing Error:", error.message);
    res.status(500).json({ error: "Failed to process CV" });
  }
};

// ------------------ MULTER CONFIG ------------------
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
export const upload = multer({ storage });


// ------------------ ENHANCE CV (GROQ VERSION) ------------------
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const enhanceCV = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No CV uploaded" });

    const filePath = path.resolve(req.file.path);
    let text = "";

    // Extract text (PDF / DOCX)
    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
    } else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    }

    console.log("🚀 Sending request to GROQ...");

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: `Rewrite this CV professionally and make it ATS-optimized:\n\n${text}`,
        },
      ],
      max_tokens: 1200
    });

    const enhanced = response.choices[0].message.content;

    res.json({ enhancedText: enhanced });

    // delete uploaded file
    fs.unlink(filePath, () => { });
  } catch (err) {
    console.error("❌ CV ENHANCEMENT ERROR:", err);
    res.status(500).json({
      message: "CV enhancement failed",
      error: err.message,
    });
  }
};
