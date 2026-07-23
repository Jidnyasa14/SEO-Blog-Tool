"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Wrench, 
  ArrowLeft, 
  ShieldAlert 
} from "lucide-react";

import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const isAdminLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // If we're on /admin/login, don't check localStorage
    if (isAdminLoginPage) return;

    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";
    
    // Defer the state update to avoid synchronous render cascades
    const timer = setTimeout(() => {
      setIsAuthorized(isLoggedIn);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname, isAdminLoginPage]);

  // 1. DIRECT BYPASS: Render /admin/login immediately without checking auth
  if (isAdminLoginPage) {
    return <>{children}</>;
  }

  // 2. LOADING STATE
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex items-center justify-center text-slate-400">
        <div className="w-6 h-6 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // 3. UNAUTHORIZED STATE
  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 mb-4 shadow-sm">
          <ShieldAlert size={32} />
        </div>

        <h1 className={`${sora.className} text-xl font-light text-slate-900 dark:text-white mb-2`}>
          Unauthorized Control Space
        </h1>

        <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm mb-6">
          This segment requires active administrator privileges. If you believe this is an execution error, verify your credentials.
        </p>

        <button
          onClick={() => router.push("/admin/login")}
          className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs rounded-full transition shadow-sm cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft size={14} /> Go to Admin Login Portal
        </button>
      </div>
    );
  }

  const ADMIN_MENU = [
    { label: "Overview", path: "/admin", icon: <LayoutDashboard size={16} /> },
    { label: "Manage Blogs", path: "/admin/blogs", icon: <FileText size={16} /> },
    { label: "Manage Tools", path: "/admin/tools", icon: <Wrench size={16} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#09090B] text-left text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      <Navbar />
      
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        
        <aside className="w-full md:w-56 shrink-0 flex flex-col gap-1.5 p-3.5 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800/80 rounded-2xl h-fit shadow-xs">
          <p className="px-3 text-[10px] font-mono font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
            Control Console
          </p>

          <div className="space-y-1">
            {ADMIN_MENU.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition select-none ${
                    isActive
                      ? "bg-violet-600 text-white shadow-sm dark:bg-[#A6FF5D] dark:text-black"
                      : "text-slate-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-800/40"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </aside>

        <main className="flex-grow min-w-0 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800/80 rounded-2xl p-6 shadow-xs">
          {children}
        </main>
      </div>

      <footer className="w-full bg-white dark:bg-neutral-900 border-t border-slate-200/80 dark:border-neutral-800/80 py-4 mt-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-medium text-slate-400 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} Toolverse Operations Network.</p>
          <div className="flex gap-4 font-mono">
            <span>v1.0.0</span>
            <span className="text-green-500">Live</span>
          </div>
        </div>
      </footer>

    </div>
  );
}