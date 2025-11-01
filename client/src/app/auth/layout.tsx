"use client";

import Link from "next/link";
import "../globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative">
        <Link
          href="/"
          className="absolute top-6 left-6 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>
        {children}
      </div>
 
  );
}
