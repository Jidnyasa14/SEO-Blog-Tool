"use client";

import React from "react";
import Link from "next/link";

type LinkItem = {
  label: string;
  path: string;
};

const TOOL_LINKS: Readonly<LinkItem[]> = [
  { label: "EMI Calculator", path: "/tools/emi-calculator" },
  { label: "JSON Formatter", path: "/tools/json-formatter" },
  { label: "QR Generator", path: "/tools/qr-generator" },
  { label: "Password Generator", path: "/tools/password-generator" },
  { label: "Age Calculator", path: "/tools/age-calculator" },
  { label: "Word Counter", path: "/tools/word-counter" },
];

const COMPANY_LINKS: Readonly<LinkItem[]> = [
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms", path: "/terms" },
];

const CATEGORY_LINKS: Readonly<LinkItem[]> = [
  { label: "Finance Tools", path: "/categories/finance" },
  { label: "Developer Tools", path: "/categories/developer" },
  { label: "Utility Tools", path: "/categories/utility" },
  { label: "Text Tools", path: "/categories/text" },
  { label: "Image Tools", path: "/categories/image" },
];

export default function Footer() {
  return (
    <footer
      aria-label="Footer"
      className="bg-white dark:bg-black text-slate-600 dark:text-zinc-400 border-t border-slate-200/60 dark:border-white/5 mt-auto font-sans transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo + About */}
        <div className="lg:col-span-1">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight select-none text-slate-900 dark:text-white mb-4 group"
          >
            <div className="relative flex size-6 items-center justify-center rounded-md bg-slate-900/5 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D] transition-colors group-hover:bg-slate-900/10 group-hover:dark:bg-white/20">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-10 9h3v8h14v-8h3L12 3z" />
              </svg>
            </div>
            <span>
              Tool
              <span className="text-violet-600 dark:text-[#A6FF5D] transition-colors duration-200">
                verse
              </span>
            </span>
          </Link>

          <p className="text-sm text-slate-500 dark:text-zinc-500 leading-relaxed max-w-xs mb-5">
            Free online tools and guides for everyone. No limits.
          </p>

          <p className="text-xs text-slate-400 dark:text-zinc-600">
            &copy; {new Date().getFullYear()} Toolverse. All rights reserved.
          </p>
        </div>

        {/* Popular Tools */}
        <div>
          <h4 className="text-xs font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-4">
            Popular Tools
          </h4>
          <ul className="flex flex-col gap-2.5">
            {TOOL_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className="text-sm text-slate-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-[#A6FF5D] transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-4">
            Categories
          </h4>
          <ul className="flex flex-col gap-2.5">
            {CATEGORY_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className="text-sm text-slate-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-[#A6FF5D] transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-4">
            Company
          </h4>
          <ul className="flex flex-col gap-2.5">
            {COMPANY_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className="text-sm text-slate-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-[#A6FF5D] transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200/60 dark:border-white/5 py-6 px-6 text-center bg-slate-50/50 dark:bg-zinc-950/40">
        <p className="text-xs text-slate-400 dark:text-zinc-600">
          Optimized for speed, accuracy, and absolute user privacy.
        </p>
      </div>
    </footer>
  );
}