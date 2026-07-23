"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface ActiveUser {
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  name: string;
  email: string;
  avatarUrl: string;
}

export default function Navbar() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    name: "Guest",
    email: "",
    avatarUrl: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);

      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("active_user");
        if (storedUser) {
          try {
            const parsed: ActiveUser = JSON.parse(storedUser);
            if (parsed?.email) {
              setAuthState({
                isLoggedIn: true,
                name: parsed.email.split("@")[0] || "User",
                email: parsed.email,
                avatarUrl: "",
              });
            }
          } catch (err) {
            console.error("LocalStorage sync error:", err);
          }
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("active_user");
    }
    setAuthState({
      isLoggedIn: false,
      name: "Guest",
      email: "",
      avatarUrl: "",
    });
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#E8E8FF]/80 dark:bg-black/80 backdrop-blur-md border-b border-violet-200/40 dark:border-white/10 w-full transition-colors duration-200">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"
        >
          <span>
            Tool
            <span className="text-violet-600 dark:text-[#A6FF5D]">
              verse
            </span>
          </span>
        </Link>

        {/* Actions (Theme Toggle & Auth Controls) */}
        <div className="flex items-center gap-3">

          <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition"
            aria-label="Toggle Platform Theme Selector"
          >
            {mounted ? (
              isDark ? <Sun size={16} /> : <Moon size={16} />
            ) : (
              <div className="w-4 h-4" />
            )}
          </button>

          {mounted && authState.isLoggedIn ? (
            <div className="relative group">
              <div className="h-9 w-9 rounded-full bg-violet-100 dark:bg-zinc-800 text-violet-600 dark:text-[#A6FF5D] flex items-center justify-center font-bold uppercase select-none shadow-sm cursor-pointer">
                {authState.name.charAt(0)}
              </div>

              <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 origin-top-right z-50">
                <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 rounded-xl p-3 shadow-xl text-sm">
                  
                  {/* User Info Header */}
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white truncate capitalize">{authState.name}</p>
                    <p className="text-xs text-gray-400 truncate">{authState.email}</p>
                  </div>

                  {/* Directly Sign Out (No links in between!) */}
                  <button
                    onClick={handleSignOut}
                    type="button"
                    className="text-red-500 font-semibold mt-2 block w-full text-left cursor-pointer pt-2 border-t border-slate-100 dark:border-zinc-800/60"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex px-4 py-2 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 active:scale-[0.97] transition"
            >
              Get Started
            </Link>
          )}

        </div>
      </nav>
    </header>
  );
}