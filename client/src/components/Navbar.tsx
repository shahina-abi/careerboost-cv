"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { usePathname } from "next/navigation";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // ✅ Check token on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  };

  const pathname = usePathname();
  const linkClasses = (path: string) =>
    pathname === path
      ? "text-blue-500 hover:text-blue-800 transition"
      : "hover:text-blue-800 transition";

  return (
    <header className="w-full py-4 px-6 md:px-20 absolute top-0 left-0 z-50  backdrop-blur-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
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



        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-10 text-lg font-semibold">
          <Link href="/" className={linkClasses("/")}>Home</Link>
          <Link href="/about" className={linkClasses("/about")}>About</Link>
          <Link href="/contact" className={linkClasses("/contact")}>Contact Us</Link>
        </nav>

        {/* Auth + Profile */}
        <div className="hidden lg:flex items-center gap-4">
          {!isLoggedIn && (
            <>
              <Link href="/auth/login" className="px-5 py-2 bg-gray-600 text-white rounded-3xl hover:bg-gray-700 transition">Login</Link>
              <Link href="/auth/signup" className="px-5 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition">Sign Up</Link>
            </>
          )}

          <button
            onClick={handleProfileClick}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Profile"
          >
            <User size={26} className="text-blue-600" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden mt-4 bg-white shadow-md rounded-lg p-4 flex flex-col gap-4 text-center">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-blue-600 font-semibold hover:text-blue-800">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-800">About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-800">Contact</Link>

          <div className="flex flex-col gap-3 mt-3">
            {!isLoggedIn && (
              <>
                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="px-5 py-2 bg-gray-600 text-white rounded-3xl hover:bg-gray-700">Login</Link>
                <Link href="/auth/signup" onClick={() => setIsOpen(false)} className="px-5 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700">Sign Up</Link>
              </>
            )}

            <button onClick={() => { setIsOpen(false); handleProfileClick(); }} className="flex justify-center items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 mt-2">
              <User size={22} /> Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
