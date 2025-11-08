"use client";

import { useState } from "react";

export default function CVEnhancementSection() {
  const [file, setFile] = useState<File | null>(null);
  const [enhancedText, setEnhancedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!file) {
      alert("Please upload your CV file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/v1/cv/enhance", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Enhancement failed");

      const data = await res.json();
      setEnhancedText(data.enhancedText);
    } catch (err) {
      console.error(err);
      alert("Failed to enhance CV");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">CV Enhancement</h2>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3 block"
      />

      <button
        onClick={handleEnhance}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Enhancing..." : "Enhance CV"}
      </button>

      {enhancedText && (
        <div className="mt-5 bg-gray-50 p-4 rounded border border-gray-200">
          <h3 className="font-semibold mb-2">Enhanced CV Output:</h3>
          <pre className="whitespace-pre-wrap">{enhancedText}</pre>
        </div>
      )}
    </div>
  );
}
