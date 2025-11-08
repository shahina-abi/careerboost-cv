
// helpers/embeddings.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const HF_API_KEY = process.env.HF_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function getEmbedding(text) {
  // --- Try OpenAI first ---
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      { model: "text-embedding-3-small", input: text },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data[0].embedding;
  } catch (err) {
    console.error("❌ OpenAI Embedding Error:", err.response?.data?.error?.message || err.message);
  }

  // --- Fallback to Hugging Face ---
  try {
    console.log("⚙️ Using Hugging Face fallback");
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && Array.isArray(response.data)) {
      return response.data[0];
    } else if (response.data.embedding) {
      return response.data.embedding;
    }

    throw new Error("Invalid Hugging Face embedding response");
  } catch (hfError) {
    console.error("❌ Hugging Face Embedding Error:", hfError.message);
    // fallback: random vector (avoid crashing)
    return Array(384)
      .fill(0)
      .map(() => Math.random());
  }
}
