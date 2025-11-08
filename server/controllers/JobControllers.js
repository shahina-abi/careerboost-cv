
import axios from "axios";
import { getEmbedding } from "../helpers/embeddings.js";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// Cosine similarity
function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] ** 2;
    magB += b[i] ** 2;
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// Controller: Fetch real jobs + match by embedding
export const getRelatedJobs = async (req, res) => {
  try {
    const query = req.query.query?.trim();
    if (!query)
      return res.status(400).json({ error: "Please provide a keyword." });

    console.log("🔍 Fetching jobs for:", query);

    // Step 1: Fetch live jobs from RapidAPI
    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      params: {
        query: `${query} developer`,
        page: "1",
        num_pages: "1",
      },
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };

    const { data } = await axios.request(options);
    const jobs = data.data?.slice(0, 10) || [];

    if (!jobs.length) {
      return res.status(404).json({ error: "No jobs found for this query." });
    }

    // Step 2: Create embedding for the user query
    const queryEmbedding = await getEmbedding(query);

    // Step 3: Compute similarity with each job
    const scoredJobs = await Promise.all(
      jobs.map(async (job) => {
        const jobText = `${job.job_title} ${job.job_description}`.slice(0, 500);
        const jobEmbedding = await getEmbedding(jobText);
        const score = cosineSimilarity(queryEmbedding, jobEmbedding);
        return {
          id: job.job_id,
          title: job.job_title,
          company: job.employer_name,
          location: job.job_city || job.job_country || "Remote",
          description: job.job_description,
          url: job.job_apply_link,
          score,
        };
      })
    );

    // Step 4: Sort & return best matches
    const sorted = scoredJobs.sort((a, b) => b.score - a.score).slice(0, 5);

    res.json({ query, results: sorted });
  } catch (err) {
    console.error("❌ Job matching error:", err.message);
    res.status(500).json({ error: "Failed to fetch or process jobs." });
  }
};
