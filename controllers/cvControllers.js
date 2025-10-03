import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import { Document, Packer, Paragraph, TextRun } from "docx";
import axios from "axios";

const HF_API_KEY = process.env.HF_API_KEY;

export const uploadCV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Upload a DOCX file" });

    // 1️⃣ Extract text from uploaded DOCX
    const result = await mammoth.extractRawText({ path: req.file.path });
    const text = result.value;

    // 2️⃣ Call Hugging Face API to get missing keywords / skills
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${HF_API_KEY}` },
      }
    );

    const keywords = response.data; // adjust parsing based on model output

    // 3️⃣ Prepare new DOCX document
    const doc = new Document({
      sections: [
        {
          children: [
            // Original CV text
            new Paragraph({
              children: [new TextRun({ text, break: 1 })],
            }),

            // Insert a Skills section with keywords
            new Paragraph({
              children: [
                new TextRun({
                  text: "Skills:",
                  bold: true,
                  size: 28,
                }),
              ],
            }),

            // Add each keyword as a bullet point
            ...keywords.map((kw) =>
              new Paragraph({
                text: kw,
                bullet: { level: 0 },
              })
            ),
          ],
        },
      ],
    });

    // 4️⃣ Save updated CV
    const outputFilePath = path.join(
      "uploads/cvs",
      "updated-" + req.file.originalname
    );
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputFilePath, buffer);

    // 5️⃣ Send response
    res.json({
      message: "CV processed and updated successfully",
      originalFile: req.file.filename,
      updatedCV: outputFilePath,
      keywords,
    });
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    res.status(500).json({ error: "Failed to process CV" });
  }
};
