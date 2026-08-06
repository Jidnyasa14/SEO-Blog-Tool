"use client";

import Link from "next/link";
import Image from "next/image";

type Tool = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string; // Accepts image URL string
};

type ToolCardProps = {
  tool: Tool;
};

export default function ToolCard({ tool }: ToolCardProps) {
  const { name, slug, description, category, icon } = tool;

  const colorMap: Record<string, { badge: string }> = {
    Finance: {
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    },
    Developer: {
      badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20",
    },
    Utility: {
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    },
    Text: {
      badge: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
    },
    Image: {
      badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
    },
  };

  const color = colorMap[category] || colorMap.Finance;

  return (
    <Link
      href={`/tools/${slug}`}
      aria-label={`Open ${name}`}
      className="group relative flex flex-col justify-between bg-white dark:bg-[#0d0e12] border border-slate-200/60 dark:border-white/5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-600/40 dark:hover:border-[#A6FF5D]/40 hover:shadow-md dark:hover:shadow-[0_0_30px_rgba(166,255,93,0.05)] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-600 to-violet-400 dark:from-[#A6FF5D] dark:to-[#A6FF5D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Tool Thumbnail Image */}
        <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-white/5">
          <Image
            src={icon}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100 mb-1.5 leading-snug group-hover:text-violet-600 dark:group-hover:text-[#A6FF5D] transition-colors duration-200 line-clamp-1">
          {name}
        </h3>

        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100 dark:border-white/5">
        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${color.badge}`}>
          {category}
        </span>

        <svg
          className="w-4 h-4 text-violet-600 dark:text-[#A6FF5D] opacity-0 translate-x-[-6px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}