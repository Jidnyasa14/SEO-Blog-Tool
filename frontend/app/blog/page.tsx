'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Landingpage/Navbar';
import Footer from '@/components/Landingpage/Footer';

interface BlogArticle {
  title: string;
  slug: string;
  category: 'Finance' | 'Developer' | 'Utility' | 'Text';
  summary: string;
  readingTime: number;
  date: string;
  tags: string[];
  imageUrl: string;
  author: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  };
}


const MOCK_ARTICLES: BlogArticle[] = [
  
  {
    title: "Understanding Equated Monthly Installments and Debt Management",
    slug: "understanding-emi-debt-management",
    category: "Finance",
    summary: "A comprehensive deep dive into how financial institutions structure amortization loops and principal calculations. Learn to optimize your repayment timelines.",
    readingTime: 6,
    date: "June 15, 2026",
    tags: ["EMI", "Finance", "Loans"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" }
  },
  {
    title: "How Systematic Investment Plans Accumulate Long Term Wealth",
    slug: "how-sip-accumulates-wealth",
    category: "Finance",
    summary: "Discover the exponential power of periodic compounding yields and rupee cost averaging across volatile financial markets using simple systemic plans.",
    readingTime: 8,
    date: "June 18, 2026",
    tags: ["SIP", "Compounding", "Investment"],
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" }
  },
  {
    title: "The Mathematics of Compound Interest vs Simple Interest Yields",
    slug: "mathematics-compound-interest-yields",
    category: "Finance",
    summary: "An algebraic breakdown of compound frequency schedules. See exactly how compounding intervals accelerate investment balances over fixed horizons.",
    readingTime: 7,
    date: "June 20, 2026",
    tags: ["Interest", "Savings", "Calculators"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" }
  },

  // ─── DEVELOPER ARTICLES (3) ───
  {
    title: "The Developer Guide to JSON Web Tokens Architecture and Claims",
    slug: "developer-guide-jwt-architecture",
    category: "Developer",
    summary: "An atomic look into header cryptographic algorithms, payload state authorization claims, and secure cookies storage signatures.",
    readingTime: 10,
    date: "June 22, 2026",
    tags: ["JWT", "Auth", "Security"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" }
  },
  {
    title: "Demystifying Asynchronous Event Loops and Regular Expression Parsers",
    slug: "demystifying-event-loops-regex-parsers",
    category: "Developer",
    summary: "Master the mechanics of string matching engine complexities, CPU blocking patterns, and how to format raw database expressions safely.",
    readingTime: 9,
    date: "June 24, 2026",
    tags: ["Regex", "JavaScript", "Optimization"],
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" }
  },
  {
    title: "Mastering Cron Expressions: Scheduling Automated Tasks in Backend Runtimes",
    slug: "mastering-cron-expressions-automation",
    category: "Developer",
    summary: "A structural breakdown of string intervals for automated system workflows. Learn how to debug five-field scheduling formats effortlessly.",
    readingTime: 6,
    date: "June 26, 2026",
    tags: ["Cron", "Backend", "DevOps"],
    imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" }
  },

  
  {
    title: "Why Cryptographically Secure Password Strings Matter in Digital Platforms",
    slug: "secure-password-strings-importance",
    category: "Utility",
    summary: "Analyze entropy metrics requirements, brute-force timelines, and token matrix safety parameters to generate high-strength system passes.",
    readingTime: 5,
    date: "June 25, 2026",
    tags: ["Security", "Passwords", "Utility"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" }
  },
  {
    title: "Data Serialization Workflows: Converting CSV Tables into JSON & Markdown",
    slug: "data-serialization-workflows-conversion",
    category: "Utility",
    summary: "Simplify data parsing operations. Discover how data arrays transform seamlessly between flat spreadsheet columns and dynamic relational structures.",
    readingTime: 8,
    date: "June 29, 2026",
    tags: ["CSV", "JSON", "DataParsing"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" }
  },

  {
    title: "The Ultimate Markdown Guide for Clean Technical Documentation",
    slug: "markdown-guide-technical-documentation",
    category: "Text",
    summary: "Learn semantic block syntax guidelines to easily format live web components, text weights, code tables, and layout previews.",
    readingTime: 5,
    date: "July 01, 2026",
    tags: ["Markdown", "Formatting", "Text"],
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" }
  },
  {
    title: "Linguistic Mechanics: Analysis of Case Conversion and Typographic String Densities",
    slug: "linguistic-mechanics-case-conversion-metrics",
    category: "Text",
    summary: "How text distributions impact reading flow. Explore string conversion systems, casing rules, word limits, and whitespace extraction logic.",
    readingTime: 7,
    date: "July 03, 2026",
    tags: ["Typography", "TextTools", "Strings"],
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop&q=80",
    author: { name: "Toolverse", bio: "IT Services and Consulting company" }
  }
];

const CATEGORIES = ['All', 'Finance', 'Utility', 'Developer', 'Text'] as const;

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter((article) => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black text-left transition-colors duration-200">
      <Navbar />

      <main className="w-full flex-grow px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-4">
        
        
        <div className="mb-10 space-y-2">
          <h1 className="font-['Sora'] text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#A6FF5D] sm:text-4xl">
            Knowledge Base and Insights
          </h1>
          <p className="max-w-2xl text-base text-slate-500 dark:text-neutral-400">
            Educational engineering articles, finance documentation breakdowns, and structural guides for tech platforms.
          </p>
        </div>

        {/* Dynamic Search & Category Filter Section */}
        <div className="space-y-6 mb-10 border-b border-slate-200 dark:border-neutral-800 pb-6">
          <div className="max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, tags, or insights..."
              className="w-full px-4 py-2.5 text-xs border border-gray-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-950 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-7 py-3 text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-sm dark:bg-[#A6FF5D] dark:text-black'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-violet-500 hover:text-violet-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300 dark:hover:border-[#A6FF5D] dark:hover:text-[#A6FF5D]'
                  }`}
                >
                  {cat === 'All' ? 'All Articles' : `${cat} Insights`}
                </button>
              );
            })}
          </div>
        </div>

        
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <Link
                href={`/blog/${article.slug}`}
                key={article.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:border-violet-500 dark:border-neutral-800 dark:bg-neutral-900/30 dark:hover:border-[#A6FF5D]"
              >
                {/* Featured Image Block Element */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-neutral-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />
                </div>

                {/* Content Core Container Section */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-gray-400 dark:text-neutral-500">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span className="text-violet-600 dark:text-[#A6FF5D] uppercase tracking-wider">{article.category}</span>
                      <span>·</span>
                      <span>{article.readingTime} Min Read</span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-neutral-100 group-hover:text-violet-600 dark:group-hover:text-[#A6FF5D] transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-sm leading-relaxed text-slate-500 dark:text-neutral-400 line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-neutral-800/60 space-y-4">
                    {/* Author Attribution Meta Block */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 dark:bg-neutral-800 text-xs font-bold text-violet-600 dark:text-[#A6FF5D] uppercase">
                        {article.author.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-800 dark:text-neutral-200">{article.author.name}</p>
                        {article.author.bio && (
                          <p className="text-[10px] text-slate-400 dark:text-neutral-500 line-clamp-1">{article.author.bio}</p>
                        )}
                      </div>
                    </div>

                    
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 text-[10px] font-mono font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center dark:border-neutral-800 dark:bg-neutral-900/20">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">No database articles match your criteria</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">Try modifying your filter categories or checking input strings.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}