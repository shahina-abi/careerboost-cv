

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import logo from "@/assets/images/logo.png";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save token
      if (data.token) localStorage.setItem("token", data.token);

      router.push("/dashboard"); // ✅ Redirect to dashboard
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left: Login Form */}
        <div className="bg-blue-50 md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Login to Your Account</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none" />

            {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

            <button type="submit" disabled={loading} className={`bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <Link href="#" className="hover:underline">Forgot Password?</Link>
          </div>

          {/* Social Buttons */}
          <div className="mt-6 space-y-3">
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-2 hover:bg-gray-100 transition">
              <FcGoogle className="text-2xl mr-2" /> Sign in with Google
            </button>
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-2 hover:bg-gray-100 transition">
              <FaFacebookF className="text-blue-600 text-xl mr-3" /> Sign in with Facebook
            </button>
          </div>
        </div>

        {/* Right: Welcome */}
        <div className="bg-blue-500 text-white flex flex-col items-center justify-center md:w-1/2 p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white rounded-full p-1">
              <Image src={logo} alt="CareerBoost Logo" width={50} height={50} className="rounded-full" priority />
            </div>
            <h1 className="text-2xl font-bold">CareerBoost</h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
          <p className="text-white/90 mb-6 text-center">Enter your personal details and start your journey with us</p>
          <Link href="/auth/signup" className="bg-white text-blue-600 px-8 py-2 rounded-full font-semibold hover:bg-blue-100 transition">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
