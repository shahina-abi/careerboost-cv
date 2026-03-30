


"use client";

import { useState } from "react";
import { FaUpload, FaBriefcase } from "react-icons/fa";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useEffect } from "react";
export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [enhancedCV, setEnhancedCV] = useState<any>(null); // ✅ New state
const [enhancedHtml, setEnhancedHtml] = useState("");
  // Upload & Analyze CV
  const handleUpload = async () => {
    if (!file) return setError("Please upload your CV (.docx or .pdf).");

    setError("");
    setUploading(true);
    setKeywords([]);
    setJobs([]);

    try {
      const formData = new FormData();
      formData.append("cv", file);

      // Upload CV
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/cv/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "CV upload failed");

      const cvKeywords = data.keywords || [];
      setKeywords(cvKeywords);

      // Get related jobs
      if (cvKeywords.length > 0) {
        const jobRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/jobs?query=${encodeURIComponent(cvKeywords[0])}`
        );
        const jobData = await jobRes.json();
        if (!jobRes.ok) throw new Error(jobData.error || "Failed to fetch jobs");

        setJobs(jobData.results || []);
      } else {
        setError("No relevant skills found in your CV.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setUploading(false);
    }
  };
  

const handleEnhanceCV = async () => {
  if (!file) return alert("Please upload your CV first!");

  try {
    const formData = new FormData();
    formData.append("cv", file);

    console.log("🚀 Enhancing CV using Lima API...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/cv/enhance`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Enhanced CV:", data);

    if (!res.ok) throw new Error(data.error || "Enhancement failed");

    if (data.enhancedText) {
      // Lima API returns plain text — no JSON parsing
      setEnhancedCV(data.enhancedText);
      alert("✅ CV Enhanced Successfully!");
    } else {
      alert("CV Enhanced but no content received.");
    }
  } catch (err: any) {
    console.error(err);
    alert("❌ CV Enhancement Failed!");
  }
};
useEffect(() => {
  if (!enhancedCV) return;

  const convertToHtml = async () => {
    const md = await marked(enhancedCV);
    const clean = DOMPurify.sanitize(md);
    setEnhancedHtml(clean);
  };

  convertToHtml();
}, [enhancedCV]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-20 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          AI Job Matcher
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Upload your CV — we’ll extract your skills and find matching jobs using AI.
        </p>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition">
          <FaUpload className="text-4xl text-blue-500 mb-3" />
          <input
            type="file"
            accept=".docx,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-3"
          />
          {file && (
            <p className="text-sm text-gray-700">
              Selected: <span className="font-semibold">{file.name}</span>
            </p>
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`px-6 py-3 rounded-full font-semibold text-white ${
                uploading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {uploading ? "Processing..." : "Upload & Analyze"}
            </button>

            <button
              onClick={handleEnhanceCV}
              disabled={!file}
              className="px-6 py-3 rounded-full font-semibold text-white bg-green-600 hover:bg-green-700"
            >
              Enhance CV
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
        )}

        {/* Extracted Skills */}
        {keywords.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3 text-center">
              Extracted Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {keywords.map((kw, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Job Recommendations */}
        {jobs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
              Job Recommendations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job, index) => {
                const isExpanded = expandedJob === index;
                const description =
                  job.description.length > 250 && !isExpanded
                    ? job.description.slice(0, 250) + "..."
                    : job.description;

                return (
                  <div
                    key={job.id || index}
                    className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <FaBriefcase className="text-blue-600 text-xl" />
                        <h3 className="text-lg font-semibold text-gray-800">
                          {job.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {description}
                      </p>
                      {job.description.length > 250 && (
                        <button
                          onClick={() =>
                            setExpandedJob(isExpanded ? null : index)
                          }
                          className="text-blue-500 text-sm font-medium hover:underline"
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-blue-500 font-semibold mt-4">
                      Match Score: {(job.score * 100).toFixed(1)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

       {enhancedCV && (
  <div className="mt-12 bg-white border border-gray-200 rounded-xl shadow p-10 max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
      Enhanced CV (Professional Layout)
    </h2>

    <div
      className="prose prose-lg max-w-none text-gray-800"
      dangerouslySetInnerHTML={{ __html: enhancedHtml }}
    ></div>

    <div className="flex gap-4 justify-center mt-8">
      <button
        onClick={() => {
          navigator.clipboard.writeText(enhancedCV);
          alert("Copied to clipboard!");
        }}
        className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-semibold"
      >
        Copy Enhanced CV
      </button>

      <button
        onClick={() => {
          const blob = new Blob([enhancedCV], { type: "text/plain" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "enhanced_cv.txt";
          link.click();
        }}
        className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 font-semibold"
      >
        Download as TXT
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}