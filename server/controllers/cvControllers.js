
import fs from "fs";
import path from "path";
import axios from "axios";
import mammoth from "mammoth";
import multer from "multer";
import OpenAI from "openai";
// ✅ works fine with v1.1.0
import dotenv from "dotenv";
import { getEmbedding } from "../helpers/embeddings.js"; // ✅ your helper
import pdf from "pdf-parse/lib/pdf-parse.js";
const pdfParse = pdf.default || pdf;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

dotenv.config();

// ------------------ CV UPLOAD & PROCESSING ------------------
export const uploadCV = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "Please upload a DOCX or PDF file." });

    const filePath = path.resolve(req.file.path);
    let text = "";

    // 1️⃣ Extract text from DOCX or PDF
    if (req.file.mimetype === "application/pdf") {
      console.log("📄 Processing PDF...");
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
    } else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      console.log("📝 Processing DOCX...");
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file format." });
    }

    // 2️⃣ Get text embedding from Hugging Face / OpenAI
    const embedding = await getEmbedding(text);

    // 3️⃣ Extract key skills
    const skills =
      text.match(
        /\b(React|Node|MongoDB|JavaScript|Python|HTML|CSS|Express|SQL|Next\.js|TypeScript)\b/gi
      ) || ["developer"];

    // 4️⃣ Respond with extracted data
    res.json({
      message: "✅ CV uploaded and processed successfully",
      preview: text.substring(0, 400) + "...",
      keywords: skills.map((s) => s.toLowerCase()),
      embedding,
    });

    // 5️⃣ (Optional) Clean up uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.warn("⚠️ Failed to delete temp file:", err.message);
    });
  } catch (error) {
    console.error("❌ CV Processing Error:", error.message);
    res.status(500).json({ error: "Failed to process CV" });
  }
};
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
export const upload = multer({ storage });

// export const enhanceCV = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).json({ message: "No file uploaded" });

//     const dataBuffer = fs.readFileSync(file.path);
//     const pdfData = await pdfParse(dataBuffer);
//     const text = pdfData.text;

//     const response = await axios.post(
//       "https://openai80.p.rapidapi.com/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a professional resume enhancement assistant." },
//           { role: "user", content: `Please improve this CV text:\n\n${text}` },
//         ],
//       },
//       {
//         headers: {
//           "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//           "x-rapidapi-host": "openai80.p.rapidapi.com",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const enhancedText = response.data.choices[0].message.content;

//     fs.unlinkSync(file.path);
//     res.json({ enhancedText });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "CV enhancement failed", error: err.message });
//   }
// };
// export const enhanceCV = async (req, res) => {
//   try {
//     if (!req.file)
//       return res.status(400).json({ error: "No file uploaded" });

//     const filePath = path.resolve(req.file.path);
//     let text = "";

//     // 1️⃣ Extract text based on file type
//     if (req.file.mimetype === "application/pdf") {
//       console.log("📄 Enhancing PDF CV...");
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdfParse(dataBuffer);
//       text = pdfData.text;
//     } else if (
//       req.file.mimetype ===
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ) {
//       console.log("📝 Enhancing DOCX CV...");
//       const result = await mammoth.extractRawText({ path: filePath });
//       text = result.value;
//     } else {
//       return res.status(400).json({ error: "Unsupported file type" });
//     }

//     // 2️⃣ Send to OpenAI or RapidAPI
//     const response = await axios.post(
//       "https://openai80.p.rapidapi.com/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a professional resume writer." },
//           {
//             role: "user",
//             content: `Please enhance and rewrite this CV text to make it more professional, concise, and impactful:\n\n${text}`,
//           },
//         ],
//       },
//       {
//         headers: {
//           "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//           "x-rapidapi-host": "openai80.p.rapidapi.com",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const enhancedText =
//       response.data?.choices?.[0]?.message?.content ||
//       "Enhancement failed — no response text.";

//     // 3️⃣ Clean up
//     fs.unlink(filePath, (err) => {
//       if (err) console.warn("⚠️ Failed to delete uploaded file:", err.message);
//     });

//     // 4️⃣ Respond
//     res.json({ enhancedText });
//   } catch (error) {
//     console.error("❌ CV Enhancement Error:", error.message);
//     res.status(500).json({ error: "Failed to enhance CV" });
//   }
// };
export const enhanceCV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.resolve(req.file.path);
    let text = "";

    // 🧩 Extract text from PDF or DOCX
    if (req.file.mimetype === "application/pdf") {
      console.log("📄 Enhancing PDF CV...");
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
    } else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      console.log("📝 Enhancing DOCX CV...");
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file format." });
    }

    // ✨ Ask OpenAI to improve the CV
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional CV enhancement assistant.",
        },
        {
          role: "user",
          content: `Please improve and professionally rewrite this CV for better readability and impact:\n\n${text}`,
        },
      ],
      temperature: 0.7,
    });

    const enhancedText = completion.choices[0].message.content;

    // Clean up
    fs.unlink(filePath, (err) => {
      if (err) console.warn("⚠️ Failed to delete temp file:", err.message);
    });

    res.json({ enhancedText });
  } catch (error) {
    console.error("❌ CV Enhancement Error:", error.message);
    res.status(500).json({ error: "Failed to enhance CV" });
  }
};