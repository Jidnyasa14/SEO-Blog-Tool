

"use client";

import Link from "next/link";
import Image from "next/image";

type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image?: string;
  readingTime: number;
  date: string;
};

type BlogCardProps = {
  article: Article;
};

export default function BlogCard({ article }: BlogCardProps) {
  const { title, slug, excerpt, category, image, readingTime, date } = article;

  const categoryColors: Record<string, string> = {
    Finance: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    Developer: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20",
    Utility: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    Text: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
  };

  const color = categoryColors[category] || "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col bg-white dark:bg-[#0d0e12] border border-slate-200/60 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-violet-600/40 dark:hover:border-[#A6FF5D]/40 hover:shadow-md dark:hover:shadow-[0_0_30px_rgba(166,255,93,0.05)]"
    >
      <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-zinc-900">
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0d0e12] via-transparent to-transparent opacity-60" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-zinc-600">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}

        <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-md ${color}`}>
          {category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100 leading-snug mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-[#A6FF5D] transition-colors duration-200">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-4">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-white/5">
          <div className="text-xs text-slate-400 dark:text-zinc-500 flex items-center gap-2 font-medium">
            <span>{readingTime} min read</span>
            <span>•</span>
            <span>{date}</span>
          </div>

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
      </div>
    </Link>
  );
}