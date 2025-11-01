"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/images/logo.png";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // ✅ Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    // ✅ Fetch user info from backend
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/v1/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUser({
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
        });
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-blue-600 font-semibold text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="CareerBoost Logo"
            width={50}
            height={50}
            className="rounded-full"
            priority
          />
          <h1 className="text-2xl font-bold text-blue-600">CareerBoost</h1>
        </div>
      </header>

      {/* Dashboard Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-blue-600 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Welcome, {user?.name}!
          </h2>
          <div className="bg-white rounded-full p-2">
            <Image
              src={logo}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="font-semibold text-black">Name:</span>
            <span className="text-blue-600">{user?.name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="font-semibold text-black">Email:</span>
            <span className="text-blue-600">{user?.email}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="font-semibold text-black">User ID:</span>
            <span className="text-blue-600">{user?.id}</span>
          </div>
        </div>

        {/* Optional Actions */}
        <div className="p-6 flex justify-end gap-4 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/auth/login");
            }}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
