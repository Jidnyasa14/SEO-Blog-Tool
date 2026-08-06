"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

type NavLink = {
  label: string;
  path: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "Tools", path: "/tools" },
  { label: "Blog", path: "/blog" },
  { label: "Categories", path: "/categories" }, 
  { label: "About", path: "/about" },
];

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
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    name: "Guest",
    email: "",
    avatarUrl: "",
  });

  // Global Mounting Synchronization Guard
  useEffect(() => {
    // Defers all state updates outside the initial synchronous rendering timeline
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
    setMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#E8E8FF]/80 dark:bg-black/80 backdrop-blur-md border-b border-violet-200/40 dark:border-white/10 w-full transition-colors duration-200">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        
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

        
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, path }) => {
            const isActive = pathname === path || (path !== "/" && pathname?.startsWith(path));
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    isActive
                      ? "text-violet-600 bg-violet-50 dark:bg-white/10"
                      : "text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        
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
                  <div className="mb-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
                    <p className="font-bold text-slate-900 dark:text-white truncate capitalize">{authState.name}</p>
                    <p className="text-xs text-gray-400 truncate">{authState.email}</p>
                  </div>

                  <Link href="/profile" className="block py-1.5 text-slate-700 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-[#A6FF5D] transition">
                    Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    type="button"
                    className="text-red-500 font-semibold mt-2 block w-full text-left cursor-pointer pt-1.5 border-t border-slate-100 dark:border-zinc-800/60"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex px-4 py-2 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 active:scale-[0.97] transition"
            >
              Get Started
            </Link>
          )}

        
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="md:hidden p-2 text-slate-700 dark:text-white focus:outline-none font-bold text-xl"
            aria-label="Toggle Overlay Menu Navigation Options"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      
      {menuOpen && (
        <div className="md:hidden p-4 bg-white dark:bg-black border-t border-slate-200 dark:border-white/10 flex flex-col gap-1 transition-all">
          {NAV_LINKS.map(({ label, path }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                onClick={() => setMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-lg text-sm transition font-medium ${
                  isActive
                    ? "text-violet-600 bg-violet-50 dark:bg-white/10"
                    : "text-slate-600 dark:text-white/70 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
          {!authState.isLoggedIn && (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-4 w-full text-center py-2.5 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </header>
  );
}








