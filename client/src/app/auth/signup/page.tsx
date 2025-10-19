"use client";

import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import logo from "@/assets/images/logo.png";
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        
        {/* Left Section */}
        <div className="bg-blue-500 text-white flex flex-col items-center justify-center md:w-1/2 p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white rounded-full p-1">
            <Image
                       src={logo}
                       alt="CareerBoost Logo"
                       width={50}
                       height={50}
                       className="rounded-full"
                       priority
                     />
            </div>
            <h1 className="text-2xl font-bold">CareerBoost</h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-white/90 mb-6 text-center">
            To keep connected with us please login with your personal info
          </p>
          <Link
            href="/auth/login"
            className="bg-white text-blue-600 px-8 py-2 rounded-full font-semibold hover:bg-blue-100 transition"
          >
            Login
          </Link>
        </div>

        {/* Right Section */}
        <div className="bg-blue-50 md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Create Account
          </h2>

          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Social Buttons */}
          <div className="mt-6 space-y-3">
            <button className="w-full flex items-center justify-center border shadow-5xl gray-300 shadow-black rounded-full py-2 hover:bg-gray-100 transition">
              <FcGoogle className="text-2xl mr-2" /> Continue with Google
            </button>
            <button className="w-full flex items-center justify-center shadow-5xl border gray-300  shadow-black rounded-full py-2 hover:bg-gray-100 transition">
              <FaFacebookF className="text-blue-600 text-xl mr-3" /> Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


