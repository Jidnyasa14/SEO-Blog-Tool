"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { label: "Categories", path: "/categories/all" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  // Compute if we are currently in dark mode
  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#E8E8FF]/80 dark:bg-black/80 backdrop-blur-md border-b border-violet-200/40 dark:border-white/10 w-full transition-colors duration-200">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <Link
          href="/signup"
          className="flex items-center gap-2 text-xl font-bold tracking-tight select-none text-slate-900 dark:text-white group"
        >
          <div className="relative flex size-6 items-center justify-center rounded-md bg-slate-900/5 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D] transition-colors group-hover:bg-slate-900/10 group-hover:dark:bg-white/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-10 9h3v8h14v-8h3L12 3z"/>
            </svg>
          </div>
          <span className="font-sans">
            Tool
            <span className="text-violet-600 dark:text-[#A6FF5D] transition-colors duration-200">
              verse
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, path }) => {
            const isActive = pathname === path;
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200
                  ${
                    isActive
                      ? "text-violet-600 dark:text-[#A6FF5D] bg-violet-50 dark:bg-white/10"
                      : "text-slate-600 dark:text-white/70 hover:text-slate-900 hover:dark:text-white hover:bg-slate-900/5 hover:dark:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:bg-slate-900/5 hover:dark:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Toggle theme"
            title={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            {mounted ? (
              isDark ? (
                <Sun size={16} className="text-[#A6FF5D]" />
              ) : (
                <Moon size={16} className="text-violet-600" />
              )
            ) : (
              <Moon size={16} />
            )}
          </button>

          {/* CTA Link */}
          <Link
            href="/tools"
            className="hidden md:inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-full active:scale-95 transition-all duration-200 shadow-xs text-white dark:text-gray-900 bg-violet-600 dark:bg-[#A6FF5D] hover:bg-violet-700 dark:hover:bg-[#A6FF5D]/90"
          >
            Get Started
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-md border bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-6 pt-2 border-t absolute left-0 right-0 w-full shadow-lg z-50 bg-white dark:bg-black border-slate-200 dark:border-white/10">
          <div className="flex flex-col gap-1 mt-2">
            {NAV_LINKS.map(({ label, path }) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-violet-50 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D]"
                      : "text-slate-600 dark:text-white/70 hover:bg-slate-900/5 hover:dark:bg-white/5 hover:text-slate-900 hover:dark:text-white"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/tools"
            onClick={() => setMenuOpen(false)}
            className="mt-5 block text-center text-sm font-medium py-3 rounded-full transition text-white dark:text-gray-900 bg-violet-600 dark:bg-[#A6FF5D] hover:bg-violet-700 dark:hover:bg-[#A6FF5D]/90"
          >
            Explore Tools
          </Link>
        </div>
      )}
    </header>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";

// type NavLink = {
//   label: string;
//   path: string;
// };

// const NAV_LINKS: NavLink[] = [
//   { label: "Home", path: "/" },
//   { label: "Tools", path: "/tools" },
//   { label: "Blog", path: "/blog" },
//   { label: "Categories", path: "/categories/all" },
//   { label: "About", path: "/about" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);
//   const [mounted, setMounted] = useState<boolean>(false);
//   const pathname = usePathname();
  
//   // Use resolvedTheme to correctly detect actual applied mode even if set to 'system'
//   const { theme, setTheme, resolvedTheme } = useTheme();

//   useEffect(() => {
//     const handle = requestAnimationFrame(() => {
//       setMounted(true);
//     });
//     return () => cancelAnimationFrame(handle);
//   }, []);

//   // Determine if dark mode is active accurately
//   const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

//   const toggleTheme = () => {
//     setTheme(isDark ? "light" : "dark");
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-slate-200 dark:border-white/10 w-full transition-colors duration-200">
//       <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
//         {/* Brand Logo */}
//         <Link
//           href="/"
//           className="flex items-center gap-2 text-xl font-bold tracking-tight select-none text-slate-900 dark:text-white group"
//         >
//           <div className="relative flex size-6 items-center justify-center rounded-md bg-slate-900/5 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D] transition-colors group-hover:bg-slate-900/10 group-hover:dark:bg-white/20">
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <path d="m12 3-10 9h3v8h14v-8h3L12 3z"/>
//             </svg>
//           </div>
//           <span className="font-sans">
//             Tool<span className="text-violet-600 dark:text-[#A6FF5D] transition-colors duration-200">verse</span>
//           </span>
//         </Link>

//         {/* Desktop Links */}
//         <ul className="hidden md:flex items-center gap-1">
//           {NAV_LINKS.map(({ label, path }) => {
//             const isActive = pathname === path;
//             return (
//               <li key={path}>
//                 <Link
//                   href={path}
//                   className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200
//                   ${
//                     isActive
//                       ? "text-violet-600 dark:text-[#A6FF5D] bg-violet-50 dark:bg-white/10"
//                       : "text-slate-600 dark:text-white/70 hover:text-slate-900 hover:dark:text-white hover:bg-slate-900/5 hover:dark:bg-white/5"
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Right Side Controls */}
//         <div className="flex items-center gap-3">
          
//           {/* Theme Toggle Switch */}
//           <button
//             onClick={toggleTheme}
//             className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:bg-slate-900/5 hover:dark:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
//             aria-label="Toggle layout theme mode"
//           >
//             {isDark ? (
//               <Sun size={16} className="text-[#A6FF5D]" />
//             ) : (
//               <Moon size={16} className="text-violet-600" />
//             )}
//           </button>

//           {/* CTA Link */}
//           <Link
//             href="/tools"
//             className="hidden md:inline-flex items-center text-sm font-medium text-white dark:text-gray-900 bg-violet-600 dark:bg-[#A6FF5D] px-5 py-2.5 rounded-full hover:bg-violet-700 dark:hover:bg-[#A6FF5D]/90 active:scale-95 transition-all duration-200 shadow-xs"
//           >
//             Get Started
//           </Link>

//           {/* Hamburger Menu */}
//           <button
//             onClick={() => setMenuOpen((o) => !o)}
//             className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-md bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
//             aria-label="Toggle menu"
//           >
//             <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
//             <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "opacity-0" : ""}`} />
//             <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Dropdown Wrapper */}
//       {menuOpen && (
//         <div className="md:hidden px-4 pb-6 pt-2 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-black absolute left-0 right-0 w-full shadow-lg z-50">
//           <div className="flex flex-col gap-1 mt-2">
//             {NAV_LINKS.map(({ label, path }) => {
//               const isActive = pathname === path;
//               return (
//                 <Link
//                   key={path}
//                   href={path}
//                   onClick={() => setMenuOpen(false)}
//                   className={`text-sm font-medium px-4 py-3 rounded-xl transition
//                   ${
//                     isActive
//                       ? "bg-violet-50 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D]"
//                       : "text-slate-600 dark:text-white/70 hover:bg-slate-900/5 hover:dark:bg-white/5 hover:text-slate-900 hover:dark:text-white"
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               );
//             })}
//           </div>

//           <Link
//             href="/tools"
//             onClick={() => setMenuOpen(false)}
//             className="mt-5 block text-center text-sm font-medium text-white dark:text-gray-900 bg-violet-600 dark:bg-[#A6FF5D] py-3 rounded-full hover:bg-violet-700 dark:hover:bg-[#A6FF5D]/90 transition"
//           >
//             Explore Tools
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }


