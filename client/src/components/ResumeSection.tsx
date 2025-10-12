
"use client";

import Image from "next/image";
import resumeImg from "../assets/images/undraw_data-at-work_3tbf.svg"; // 🧠 replace with your image path
import { motion } from "framer-motion";

export default function MakeYourResumeShine() {
  return (
    <section className="bg-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left content */}
        {/* Right image */}
      <motion.div
        className="md:w-1/2 flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={resumeImg}
          alt="AI Resume Enhancement"
          className="w-full max-w-md rounded-2xl shadow-lg"
        />
      </motion.div>
      <motion.div
        className="md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-bold text-gray-600 mb-6 lg:max-w-[400px]">
          Make Your <span className="text-blue-600">Resume</span> Shine
        </h2>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-[500px]">
          Let AI polish your resume to perfection! Improve your formatting, add impactful keywords, 
          and ensure your CV gets noticed by top recruiters. 
          CareerBoost helps you stand out with confidence.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition">
          ✨ Enhance Now
        </button>
      </motion.div>

    
    </section>
  );
}
