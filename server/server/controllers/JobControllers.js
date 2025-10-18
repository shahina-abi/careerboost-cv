import natural from "natural";

// Example job data (can later be replaced with DB or external API)
const jobs = [
  { id: 1, title: "Frontend Developer", description: "Build user interfaces using React and CSS." },
  { id: 2, title: "Backend Developer", description: "Develop REST APIs with Node.js and Express." },
  { id: 3, title: "Data Scientist", description: "Analyze data and build ML models in Python." },
  { id: 4, title: "Full Stack Engineer", description: "Work with frontend and backend technologies." },
  { id: 5, title: "DevOps Engineer", description: "Manage CI/CD pipelines and cloud infrastructure." },
];

// Function: Cosine similarity
function getSimilarityScore(str1, str2) {
  const tokenizer = new natural.WordTokenizer();
  const tokensA = tokenizer.tokenize(str1.toLowerCase());
  const tokensB = tokenizer.tokenize(str2.toLowerCase());

  const allTokens = Array.from(new Set([...tokensA, ...tokensB]));
  const vectorA = allTokens.map((t) => tokensA.includes(t) ? 1 : 0);
  const vectorB = allTokens.map((t) => tokensB.includes(t) ? 1 : 0);

  const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, val) => sum + val ** 2, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, val) => sum + val ** 2, 0));

  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}

// Controller: fetch related jobs
export const getRelatedJobs = (req, res) => {
  const query = req.query.query?.toLowerCase();
  if (!query) return res.status(400).json({ message: "Please provide a job title or keyword." });

  // Compute similarity
  const scoredJobs = jobs.map((job) => ({
    ...job,
    score: getSimilarityScore(query, job.title + " " + job.description),
  }));

  // Sort and return top matches
  const results = scoredJobs
    .filter((j) => j.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  res.json({ query, results });
};
