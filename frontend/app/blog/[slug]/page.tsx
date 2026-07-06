"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Landingpage/Navbar";
import Footer from "@/components/Landingpage/Footer";

interface BlogArticle {
  title: string;
  category: string;
  summary: string;
  readingTime: number;
  date: string;
  tags: string[];
  imageUrl: string;
  content: string[]; // Organized by structural paragraphs
  author: {
    name: string;
    bio: string;
  };
}

// Complete mock payload repository for your target testing routes
const BLOG_DATABASE: Record<string, BlogArticle> = {
  "understanding-emi-debt-management": {
    title: "Understanding Equated Monthly Installments and Debt Management",
    category: "Finance",
    summary: "A comprehensive deep dive into how financial institutions structure amortization loops and principal calculations.",
    readingTime: 6,
    date: "June 15, 2026",
    tags: ["EMI", "Finance", "Loans"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" },
    content: [
      "An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month, so that over a specified number of years, the loan is paid off in full.",
      "The mathematical formula for calculating EMI is structured around the reducing balance method, where the interest component decreases as the loan balance drops over time. Tracking these compounding loops allows users to proactively structure their personal debt ratios.",
      "By understanding how your interest allocation curve behaves during the initial quarters of a loan cycle, you can plan strategic pre-payments. Reducing your total outstanding principal early can shrink your amortization lifespan significantly."
    ]
  },
  "how-sip-accumulates-wealth": {
    title: "How Systematic Investment Plans Accumulate Long Term Wealth",
    category: "Finance",
    summary: "Discover the exponential power of periodic compounding yields and rupee cost averaging across volatile financial markets using simple systemic plans.",
    readingTime: 8,
    date: "June 18, 2026",
    tags: ["SIP", "Compounding", "Investment"],
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" },
    content: [
      "A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds, allowing investors to invest small amounts periodically instead of a heavy lump-sum payment. The frequency of investment is usually weekly, monthly, or quarterly.",
      "The primary advantage of SIP investing lies in rupee cost averaging. When market valuations drop, your fixed periodic capital automatically secures more asset units. Conversely, when valuations climb, it checks your pacing to secure fewer units, balancing your acquisition costs over extended horizons.",
      "Compounding serves as the backend engine of wealth generation. By consistently reinvesting accrued market yields over consecutive fiscal windows, small, stable configurations scale exponentially into robust long-term reserves."
    ]
  }
};

export default function IndividualBlogPage() {
  const params = useParams();
  const router = useRouter();
  
  // Extract the unique slug from the current browser URL route string
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const article = BLOG_DATABASE[slug];

  // Fallback state context overlay mapping if user navigates to an unregistered route parameter
  if (!article) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black text-left">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Article Link Not Found</h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mb-6">The requested resource segment does not exist within our registry.</p>
          <Link href="/blog" className="px-4 py-2 bg-violet-600 text-white rounded-full text-xs font-semibold hover:bg-violet-700 transition">
            Return to Knowledge Base
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black text-left transition-colors duration-200">
      <Navbar />

      <main className="w-full flex-grow px-4 py-10 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-4">
        
        {/* Navigation Action Row */}
        <button 
          onClick={() => router.push("/blog")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-neutral-400 hover:text-violet-600 dark:hover:text-[#A6FF5D] transition mb-8 cursor-pointer group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back to Articles
        </button>

        {/* Article Metadata Headers */}
        <article className="space-y-6">
          <header className="space-y-4">
            <span className="inline-block px-3 py-1 bg-violet-100 dark:bg-neutral-900 text-violet-600 dark:text-[#A6FF5D] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
              {article.category}
            </span>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono font-bold text-slate-400 dark:text-neutral-500 pt-2 border-b border-slate-200 dark:border-neutral-800 pb-6">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {article.readingTime} Min Read</span>
            </div>
          </header>

          {/* Optimized Featured Cover Image Box */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-neutral-900 border border-slate-200/60 dark:border-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Primary Editorial Prose Content Body */}
          <div className="py-6 space-y-6 text-sm sm:text-base text-slate-700 dark:text-neutral-300 leading-relaxed font-sans">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Sub-Footer Meta: Keyword Tags Row */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-neutral-800/60">
            {article.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-md text-[10px] font-mono font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          {/* Author Institutional Bio Attributions Box */}
          <div className="mt-10 p-5 rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 flex items-start gap-4 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 dark:bg-[#A6FF5D] text-sm font-bold text-white dark:text-black shadow-xs">
              <ShieldCheck size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono text-slate-400 dark:text-neutral-500 uppercase tracking-widest font-bold">Published By</p>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{article.author.name}</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">{article.author.bio}</p>
            </div>
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
}