
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import logo from "@/assets/images/logo.png";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // clear error as user types
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // sends { name, email, password }
      });

      const data = await response.json();
console.log(error)
      if (!response.ok) throw new Error(data.error || "Signup failed");

      setSuccess(true);
      setFormData({ name: "", email: "", password: "" });

      // Redirect to login after 2s
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Social Sign In
  const handleGoogleSignIn = () => (window.location.href = "/api/auth/google");
  const handleFacebookSignIn = () => (window.location.href = "/api/auth/facebook");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left Section */}
        <div className="bg-blue-500 text-white flex flex-col items-center justify-center md:w-1/2 p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white rounded-full p-1">
              <Image src={logo} alt="CareerBoost Logo" width={50} height={50} className="rounded-full" priority />
            </div>
            <h1 className="text-2xl font-bold">CareerBoost</h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-white/90 mb-6 text-center">
            To keep connected with us please login with your personal info
          </p>
          <Link href="/auth/login" className="bg-white text-blue-600 px-8 py-2 rounded-full font-semibold hover:bg-blue-100 transition">
            Login
          </Link>
        </div>

        {/* Right Section */}
        <div className="bg-blue-50 md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Create Account</h2>

          {/* Error & Success Messages */}
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">✓ Account created successfully! Redirecting to login...</div>}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-200"
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-200"
            />
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              disabled={loading}
              className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Social Buttons */}
          <div className="mt-6 space-y-3">
            <button onClick={handleGoogleSignIn} type="button" disabled={loading} className="w-full flex items-center justify-center border border-gray-300 shadow-md rounded-full py-2 hover:bg-gray-100 transition disabled:opacity-50">
              <FcGoogle className="text-2xl mr-2" /> Continue with Google
            </button>
            <button onClick={handleFacebookSignIn} type="button" disabled={loading} className="w-full flex items-center justify-center border border-gray-300 shadow-md rounded-full py-2 hover:bg-gray-100 transition disabled:opacity-50">
              <FaFacebookF className="text-blue-600 text-xl mr-3" /> Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}