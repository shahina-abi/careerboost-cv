"use client";

import { motion } from "framer-motion";
import { Brain, FileText, Sparkles, Rocket } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-10 h-10 text-blue-600" />,
    title: "Smart Resume Analysis",
    description:
      "Get instant feedback on your resume with AI-driven insights to improve structure, keywords, and tone.",
  },
  {
    icon: <FileText className="w-10 h-10 text-blue-600" />,
    title: "Cover Letter Generator",
    description:
      "Craft personalized cover letters in seconds that perfectly match your dream job description.",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-blue-600" />,
    title: "Job Match Scoring",
    description:
      "See how well your resume aligns with job listings and get AI tips to boost your chances.",
  },
  {
    icon: <Rocket className="w-10 h-10 text-blue-600" />,
    title: "Boost Career Growth",
    description:
      "Use data-driven recommendations to level up your professional profile and reach top recruiters.",
  },
];

export default function AIPoweredFeatures() {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          🚀 AI-Powered <span className="text-blue-600">Features</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Experience the future of career building with smart AI tools that enhance every step of your journey.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mb-6 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
