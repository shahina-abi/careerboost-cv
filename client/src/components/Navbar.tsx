
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User } from "lucide-react"; // ✅ added User icon
import logo from "@/assets/images/logo.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 md:px-20 absolute top-0 left-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="CareerBoost Logo"
            width={50}
            height={50}
            className="rounded-full"
            priority
          />
          <h1 className="text-blue-600 text-2xl font-bold ml-2">CareerBoost</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-lg font-semibold">
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-800 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-800 transition">
            Contact Us
          </Link>
        </nav>

        {/* Auth + Profile Section */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth/login"
            className="px-5 py-2 bg-gray-600 text-white rounded-3xl hover:bg-gray-700 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-5 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>

          {/* ✅ Profile Icon */}
          <Link
            href="/profile"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Profile"
          >
            <User size={26} className="text-blue-600" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white shadow-md rounded-lg p-4 flex flex-col gap-4 text-center">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-blue-600 font-semibold hover:text-blue-800"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-800"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-800"
          >
            Contact
          </Link>

          <div className="flex flex-col gap-3 mt-3">
            <Link
              href="/auth/login"
              className="px-5 py-2 bg-gray-600 text-white rounded-3xl hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-5 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>

            {/* ✅ Mobile Profile Link */}
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 mt-2"
            >
              <User size={22} /> Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
