

// export default Navbar;
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/logo.png";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  // ✅ Detect click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Optional: fetch user info
      fetch("http://localhost:3001/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch(() => {});
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/auth/login";
  };

  const linkClasses = (path: string) =>
    pathname === path
      ? "text-blue-500 hover:text-blue-800 transition"
      : "hover:text-blue-800 transition";

  return (
    <header className="w-full py-4 px-6 md:px-20 absolute top-0 left-0 z-50 backdrop-blur-md">
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
          <Link href="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link href="/about" className={linkClasses("/about")}>
            About
          </Link>
          <Link href="/contact" className={linkClasses("/contact")}>
            Contact Us
          </Link>
        </nav>

        {/* Buttons or Profile */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          {isAuthenticated ? (
            <div className="relative">
              {/* Avatar button */}
             <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
>
  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
    <User className="w-5 h-5 text-gray-700" />
  </div>
  <span className="font-semibold text-gray-700">
    {user?.name?.split(" ")[0] || "User"}
  </span>
</button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl border border-gray-100"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <ul className="p-2">
                      <li>
                        <Link
                          href="/dashboard"
                          className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                          onClick={() => setMenuOpen(false)}
                        >
                          My Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile"
                          className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                          onClick={() => setMenuOpen(false)}
                        >
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-5 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
