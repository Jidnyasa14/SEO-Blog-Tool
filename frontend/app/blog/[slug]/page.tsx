// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Clock,
//   Calendar,
//   ShieldCheck,
// } from "lucide-react";
// import Navbar from "@/components/Landingpage/Navbar";
// import Footer from "@/components/Landingpage/Footer";

// interface BlogArticle {
//   title: string;
//   category: string;
//   summary: string;
//   readingTime: number;
//   date: string;
//   tags: string[];
//   imageUrl: string;
//   content: string[];
//   author: {
//     name: string;
//     bio: string;
//   };
// }

// export default function IndividualBlogPage() {
//   const params = useParams();
//   const router = useRouter();

//   const slug = typeof params?.slug === "string" ? params.slug : "";
//   const [article, setArticle] = useState<BlogArticle | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function fetchBlogArticle() {
//       if (!slug) return;
//       try {
//         let res = await fetch(`/api/blogs/${slug}`);
//         if (!res.ok) {
//           res = await fetch(`/api/blog/${slug}`);
//         }

//         if (res.ok) {
//           const data = await res.json();
          
//           let contentLines: string[] = [];
//           if (Array.isArray(data.content)) {
//             contentLines = data.content;
//           } else if (typeof data.content === "string") {
//             contentLines = data.content.split("\n").filter((line: string) => line.trim().length > 0);
//           }

//           setArticle({
//             title: data.title,
//             category: data.category || "General",
//             summary: data.summary || data.description || "",
//             readingTime: data.readingTime || 5,
//             date: new Date(data.createdAt || Date.now()).toLocaleDateString("en-US", {
//               month: "long",
//               day: "numeric",
//               year: "numeric",
//             }),
//             tags: data.tags || [],
//             imageUrl: data.image || data.imageUrl || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
//             content: contentLines,
//             author: {
//               name: data.authorName || "Toolverse",
//               bio: data.authorBio || "IT Services and Consulting company",
//             },
//           });
//         }
//       } catch (err) {
//         console.error("Failed fetching database article:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchBlogArticle();
//   }, [slug]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-black flex flex-col justify-between">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center text-slate-400 font-mono text-xs">
//           Fetching content payload...
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!article) {
//     return (
//       <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
//         <Navbar />
//         <div className="flex flex-1 items-center justify-start px-8 md:px-16 lg:px-24 flex-col pt-20">
//           <h1 className="text-xl font-bold self-start">Article Not Found</h1>
//           <Link href="/blog" className="mt-4 text-violet-600 self-start hover:underline">
//             Back to Blog
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const renderLine = (line: string, i: number) => {
//     if (line.startsWith("# ")) {
//       return (
//         <h1 key={i} className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-left border-b pb-2 border-gray-100 dark:border-neutral-800 w-full">
//           {line.replace("# ", "")}
//         </h1>
//       );
//     }

//     if (line.startsWith("## ")) {
//       return (
//         <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-left text-gray-900 dark:text-neutral-100 w-full">
//           {line.replace("## ", "")}
//         </h2>
//       );
//     }

//     if (line.startsWith("### ")) {
//       return (
//         <h3 key={i} className="text-xl font-semibold mt-8 mb-3 text-left text-gray-800 dark:text-neutral-200 w-full">
//           {line.replace("### ", "")}
//         </h3>
//       );
//     }

//     if (line.startsWith("- ")) {
//       return (
//         <li key={i} className="ml-5 list-disc mb-2 text-slate-700 dark:text-neutral-300 leading-relaxed text-left max-w-4xl w-full">
//           {line.replace("- ", "")}
//         </li>
//       );
//     }

//     return (
//       <p
//         key={i}
//         className="text-slate-700 dark:text-neutral-300 leading-relaxed mb-5 text-left max-w-4xl text-base md:text-lg w-full"
//       >
//         {line}
//       </p>
//     );
//   };

//   return (
//     <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
//       <Navbar />

//       <section className="relative h-[450px] w-full">
//         <img
//           src={article.imageUrl}
//           alt={article.title}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-12">
//           <span className="text-xs md:text-sm text-[#A6FF5D] uppercase font-bold tracking-wider mb-2">
//             {article.category}
//           </span>

//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white max-w-5xl text-left leading-tight tracking-tight">
//             {article.title}
//           </h1>

//           <div className="flex gap-6 text-xs md:text-sm text-gray-300 mt-4 font-medium">
//             <span className="flex items-center gap-1.5">
//               <Calendar size={16} className="text-violet-400" /> {article.date}
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Clock size={16} className="text-violet-400" /> {article.readingTime} min read
//             </span>
//           </div>
//         </div>
//       </section>

//       <main className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-12 flex-1 flex flex-col items-start">
//         <button
//           onClick={() => router.push("/blog")}
//           className="flex items-center gap-2 text-sm mb-8 text-gray-500 hover:text-violet-600 transition-colors font-medium self-start cursor-pointer"
//         >
//           <ArrowLeft size={16} />
//           Back to Blog
//         </button>

//         {article.summary && (
//           <div className="w-full text-left mb-10 max-w-4xl">
//             <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-normal border-l-4 border-violet-500 pl-5">
//               {article.summary}
//             </p>
//           </div>
//         )}

//         <div className="w-full flex flex-col justify-start items-start">
//           {article.content.map((line, i) => renderLine(line, i))}
//         </div>

//         <div className="mt-16 border-t pt-8 flex items-center gap-4 border-gray-200 dark:border-neutral-800 w-full max-w-4xl justify-start">
//           <div className="w-12 h-12 rounded-full bg-violet-500/10 text-violet-500 dark:text-[#A6FF5D] flex items-center justify-center border border-violet-500/20">
//             <ShieldCheck size={24} />
//           </div>
//           <div className="text-left">
//             <p className="font-bold text-base">{article.author.name}</p>
//             <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{article.author.bio}</p>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Landingpage/Navbar";
import Footer from "@/components/Landingpage/Footer";
import AdSlot from "@/components/Landingpage/AdSlot";
import { connectToDatabase } from "@/config/db";
import { Blog } from "@/models/Blog";
import { Calendar, Clock, ArrowLeft, ShieldCheck } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface BlogArticle {
  title: string;
  slug: string;
  category: string;
  summary: string;
  readingTime: number;
  date: string;
  tags: string[];
  imageUrl: string;
  content: string[];
  author: {
    name: string;
    bio: string;
  };
}

interface IMongoBlog {
  title: string;
  slug: string;
  category?: string;
  seoDescription?: string;
  summary?: string;
  content?: string | string[];
  readingTime?: number;
  tags?: string[] | string;
  image?: string;
  imageUrl?: string;
  createdAt?: string;
}

const MOCK_ARTICLES: Record<string, BlogArticle> = {
  "understanding-emi-debt-management": {
    title: "Understanding Equated Monthly Installments and Debt Management",
    slug: "understanding-emi-debt-management",
    category: "Finance",
    summary: "A comprehensive deep dive into how financial institutions structure amortization loops, principal calculations, and interest schedules.",
    readingTime: 6,
    date: "June 15, 2026",
    tags: ["EMI", "Finance", "Loans", "Amortization"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    content: [
      "# Understanding Equated Monthly Installments and Debt Management",
      "An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a financial institution or lender at a specified calendar date each month. EMIs are applied to personal loans, home mortgages, vehicle financing, and consumer durable credit arrangements.",
      "While borrowers view EMIs as a single recurring line item in their monthly budgets, the internal allocation between principal repayment and interest charges shifts dynamically across the lifespan of the loan.",
      "## The Mathematical Structure of Amortization",
      "Financial institutions compute EMIs using reducing balance compound formulas. The mathematical equation used to determine monthly payments is structured as:",
      "$$E = P \\times r \\times \\frac{(1 + r)^n}{(1 + r)^n - 1}$$",
      "Where $E$ represents the monthly EMI amount, $P$ is the principal loan balance borrowed, $r$ is the monthly interest rate (annual interest rate divided by 12 months divided by 100), and $n$ represents the total tenure duration expressed in months.",
      "## The Shift Between Principal and Interest",
      "During the initial payment quarters of any amortized loan, the vast majority of your EMI payment goes directly toward covering interest obligations accrued on the large remaining principal balance.",
      "- **Early Stage Payment:** Approximately 70% to 80% of your EMI pays accrued interest, while only 20% to 30% reduces actual loan principal.",
      "- **Mid-Stage Crossover:** As the outstanding principal shrinks, monthly interest charges decline proportionally, balancing principal and interest contributions equally.",
      "- **Final Stage Payment:** Near loan maturity, almost 90% of each EMI directly pays down remaining principal balance.",
      "## Practical Strategies for Accelerated Debt Reduction",
      "Borrowers can significantly reduce total interest overhead and shorten overall repayment timelines by applying structural payment optimizations.",
      "### 1. Prepaying Loan Principal Early",
      "Because early EMIs are interest-heavy, making lump-sum principal prepayments during the first two years of a long-term loan yields disproportionately massive interest savings.",
      "### 2. The Annual Incremental EMI Method",
      "Increasing your monthly EMI amount by just 5% to 10% every year in line with wage growth can reduce a 20-year home mortgage down to 12 to 14 years.",
      "### 3. Maintaining Optimal Debt-to-Income Ratios",
      "Financial advisors recommend keeping total monthly debt obligations under 40% of net take-home salary. Maintaining this metric safeguards personal liquidity while protecting credit scoring metrics."
    ],
    author: { name: "Toolverse Editorial", bio: "Financial engineering and interactive tools team at Toolverse" }
  },

  "how-sip-accumulates-wealth": {
    title: "How Systematic Investment Plans Accumulate Long Term Wealth",
    slug: "how-sip-accumulates-wealth",
    category: "Finance",
    summary: "Discover the exponential power of periodic compounding yields, systematic discipline, and rupee cost averaging across volatile financial markets.",
    readingTime: 7,
    date: "June 18, 2026",
    tags: ["SIP", "Compounding", "Investment", "Mutual Funds"],
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80",
    content: [
      "# The Mechanics of Systematic Investment Plans (SIP)",
      "A Systematic Investment Plan (SIP) is an investment vehicle offered by fund management houses that enables retail investors to allocate a fixed monetary amount periodically into equity or debt mutual fund assets.",
      "Unlike lump-sum capital deployments that require market timing precision, SIPs enforce automated financial discipline by acquiring fund units systematically regardless of prevailing market valuations.",
      "## The Strategic Advantage of Rupee Cost Averaging",
      "Market volatility is an inherent characteristic of liquid financial exchanges. SIP leverage market swings through Rupee Cost Averaging (RCA).",
      "- **High Valuation Phases:** When asset prices surge, your fixed periodic investment buys fewer total mutual fund units at higher Net Asset Values (NAV).",
      "- **Market Correction Phases:** When market indexes experience pullbacks, your fixed payment buys significantly more fund units at discounted NAV prices.",
      "Over multi-year horizons, Rupee Cost Averaging lowers the average acquisition cost per unit compared to single lump-sum deployments.",
      "## Compounding Schedules and Exponential Growth",
      "The compound interest formula highlights why time horizon outperforms timing the market:",
      "$$A = P \\times \\left( \\frac{(1 + i)^n - 1}{i} \\right) \\times (1 + i)$$",
      "Where $A$ is the accumulated future portfolio value, $P$ is the monthly SIP installment, $i$ is the periodic periodic return rate, and $n$ represents the total number of investment cycles.",
      "## Realizing Long-Term Compounding Yields",
      "The true exponential growth of a SIP occurs during the final 30% of your total tenure horizon, as accumulated interest earnings begin generating their own standalone interest returns.",
      "### Step-Up SIP Strategy",
      "Enabling an automated 10% annual increase in your monthly SIP contributions allows portfolio trajectories to scale alongside salary growth, dramatically accelerating wealth creation."
    ],
    author: { name: "Toolverse Editorial", bio: "Financial engineering and interactive tools team at Toolverse" }
  },

  "mathematics-compound-interest-yields": {
    title: "The Mathematics of Compound Interest vs Simple Interest Yields",
    slug: "mathematics-compound-interest-yields",
    category: "Finance",
    summary: "An algebraic breakdown of compound frequency schedules, rate acceleration curves, and fixed-deposit maturity engines.",
    readingTime: 6,
    date: "June 20, 2026",
    tags: ["Interest", "Savings", "Calculators", "Finance"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    content: [
      "# Algebraic Comparison of Simple and Compound Yields",
      "Interest calculation paradigms serve as the foundational bedrock of global banking, lending, and investment products. Understanding the structural mathematical differences between Simple Interest and Compound Interest empowers better capital allocation decisions.",
      "## Simple Interest Mechanics",
      "Simple interest computes returns exclusively on the original principal capital ($P$) across all periods. The linear equation governing simple interest yield is:",
      "$$SI = \\frac{P \\times R \\times T}{100}$$",
      "Because yield earned in year one is not reinvested into the active capital base, growth remains linear over time.",
      "## Compound Interest Mechanics",
      "Compound interest calculates returns on both the initial principal capital and all cumulative interest yields earned from previous payment cycles. The standard compounding equation is:",
      "$$A = P \\left(1 + \\frac{r}{n}\\right)^{nt}$$",
      "Where $A$ is final balance, $P$ is principal, $r$ is nominal interest rate, $n$ is compounding frequency per year, and $t$ represents duration in years.",
      "## The Impact of Compounding Frequencies",
      "Increasing the frequency ($n$) at which interest is recalculated—from annually to quarterly, monthly, or daily—dramatically raises effective annualized yield output.",
      "- **Annual Compounding ($n=1$):** Interest is calculated once per year.",
      "- **Quarterly Compounding ($n=4$):** Common standard for banking Fixed Deposits (FD).",
      "- **Daily Compounding ($n=365$):** Used in money market instruments to maximize continuous asset expansion.",
      "Over extended periods, continuous compounding produces exponential yield divergence compared to simple linear growth curves."
    ],
    author: { name: "Toolverse Editorial", bio: "Financial engineering and interactive tools team at Toolverse" }
  },

  "developer-guide-jwt-architecture": {
    title: "The Developer Guide to JSON Web Tokens Architecture and Claims",
    slug: "developer-guide-jwt-architecture",
    category: "Developer",
    summary: "An atomic look into header cryptographic algorithms, payload state authorization claims, and secure storage signatures.",
    readingTime: 8,
    date: "June 22, 2026",
    tags: ["JWT", "Auth", "Security", "Developer"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    content: [
      "# Deconstructing JSON Web Token (JWT) Architecture",
      "JSON Web Tokens (JWT) are an open RFC 7519 industry standard for securely transmitting stateless authorization claims between client applications and API backends as a compact JSON object.",
      "Unlike traditional session-based authentication where backends query database stores or Redis caches on every incoming request, JWTs carry verified user state directly inside encrypted or cryptographically signed strings.",
      "## The Anatomy of a JWT String",
      "A raw JWT string appears as three distinct Base64URL-encoded strings separated by dot (`.`) delimiters:",
      "`header.payload.signature`",
      "### 1. The Header",
      "The header section specifies the metadata, including token type (`JWT`) and cryptographic signing algorithm (such as `HS256` or `RS256`).",
      "### 2. The Payload (Claims)",
      "The payload contains statements about an entity (typically the authenticated user) and additional metadata called claims:",
      "- **Registered Claims:** Standardized claims like `iss` (issuer), `exp` (expiration timestamp), and `sub` (subject user ID).",
      "- **Public/Private Claims:** Custom application payload data like user roles (`role: admin`) or authorization scopes.",
      "### 3. The Cryptographic Signature",
      "The signature ensures data integrity, guaranteeing that token payloads cannot be tampered with by clients while in transit.",
      "$$Signature = HMACSHA256\\left(Base64(Header) + \".\" + Base64(Payload), secret\\right)$$",
      "## Secure Token Storage Best Practices",
      "Storing JWTs inside client-side `localStorage` or `sessionStorage` exposes authorization tokens to Cross-Site Scripting (XSS) extraction.",
      "- **HttpOnly SameSite Cookies:** Always transport access and refresh tokens inside HTTP-only, secure, SameSite cookies to protect against client-side script inspection.",
      "- **Short Lifespans:** Set access token expiration boundaries to 15 minutes while relying on secure backend refresh token rotation patterns."
    ],
    author: { name: "Toolverse Editorial", bio: "Software architecture and web development team at Toolverse" }
  },

  "demystifying-event-loops-regex-parsers": {
    title: "Demystifying Asynchronous Event Loops and Regular Expression Parsers",
    slug: "demystifying-event-loops-regex-parsers",
    category: "Developer",
    summary: "Master the mechanics of single-threaded JavaScript execution, asynchronous queues, and regular expression pattern parsing optimizations.",
    readingTime: 7,
    date: "June 24, 2026",
    tags: ["Regex", "JavaScript", "Optimization", "Developer"],
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    content: [
      "# JavaScript Event Loops and Non-Blocking CPU Runtimes",
      "Node.js and modern web browser engines run single-threaded JavaScript execution contexts. Concurrency and non-blocking I/O operations are achieved through the Event Loop mechanism.",
      "Understanding how call stacks, task queues, and microtasks interact prevents interface freezes and API timeout bottlenecks.",
      "## The Call Stack, Microtask, and Macrotask Queues",
      "When asynchronous functions execute, execution threads offload I/O operations to system worker pools, delegating callback handling to queues:",
      "- **Call Stack:** Executes synchronous functions immediately in Last-In, First-Out (LIFO) order.",
      "- **Microtask Queue:** Handles high-priority promises, `process.nextTick`, and MutationObserver callbacks executed immediately after active call stacks empty.",
      "- **Macrotask Queue:** Holds lower-priority callbacks like `setTimeout`, `setInterval`, and I/O tasks.",
      "## Regular Expression Engine Performance Risks",
      "While event loops handle I/O seamlessly, CPU-bound operations—such as compiling complex regular expressions over massive text inputs—block the main thread.",
      "### Catastrophic Backtracking (ReDoS)",
      "Poorly constructed regular expressions containing nested quantifiers like `(a+)+$` trigger non-deterministic finite automaton (NFA) backtracking loops, consuming 100% CPU utilization and causing Denial of Service vulnerabilities.",
      "### Mitigation Guidelines",
      "- Avoid nested wildcards or overlapping matching groups in user input validation regex.",
      "- Enforce timeout thresholds on long regex execution workers when parsing large document sets."
    ],
    author: { name: "Toolverse Editorial", bio: "Software architecture and web development team at Toolverse" }
  },

  "mastering-cron-expressions-automation": {
    title: "Mastering Cron Expressions: Scheduling Automated Tasks in Backend Runtimes",
    slug: "mastering-cron-expressions-automation",
    category: "Developer",
    summary: "A structural breakdown of string intervals, five-field cron syntax, and automated system task scheduling.",
    readingTime: 6,
    date: "June 26, 2026",
    tags: ["Cron", "Backend", "DevOps", "Developer"],
    imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1200&auto=format&fit=crop&q=80",
    content: [
      "# Mastering Five-Field Cron Expressions",
      "Cron is a time-based job scheduler software utility used in Unix-like computer operating systems. Server administrators and software engineers rely on cron configurations to run background scripts, database backups, email updates, and system cleaning routines.",
      "## Decoding the Cron Syntax Grid",
      "A standard cron string expression comprises five distinct positional fields separated by white spaces:",
      "`*  *  *  *  *`",
      "1. **Field 1 (Minute):** Values allowed from `0` to `59`.",
      "2. **Field 2 (Hour):** Values allowed from `0` to `23` (24-hour notation).",
      "3. **Field 3 (Day of Month):** Values allowed from `1` to `31`.",
      "4. **Field 4 (Month):** Values allowed from `1` to `12` or named month strings.",
      "5. **Field 5 (Day of Week):** Values allowed from `0` to `7` (`0` and `7` represent Sunday).",
      "## Operator Symbols Explained",
      "- **Asterisk (`*`):** Wildcard matching every time unit boundary.",
      "- **Comma (`,`):** Evaluates list values (e.g., `1,15,30` inside minute fields).",
      "- **Hyphen (`-`):** Specifies range constraints (e.g., `1-5` inside day-of-week fields).",
      "- **Slash (`/`):** Defines incremental step intervals (e.g., `*/15` executes every 15 minutes).",
      "## Production Optimization Best Practices",
      "Avoid scheduling resource-heavy database maintenance jobs during peak daytime traffic windows. Stagger cron execution timelines to prevent CPU spikes across distributed microservice instances."
    ],
    author: { name: "Toolverse Editorial", bio: "Software architecture and web development team at Toolverse" }
  },

  "secure-password-strings-importance": {
    title: "Why Cryptographically Secure Password Strings Matter in Digital Platforms",
    slug: "secure-password-strings-importance",
    category: "Utility",
    summary: "Analyze entropy metrics requirements, brute-force timelines, and token matrix safety parameters to generate high-strength system passphrases.",
    readingTime: 5,
    date: "June 25, 2026",
    tags: ["Security", "Passwords", "Utility", "Privacy"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
    content: [
      "# Information Entropy and Cryptographic Password Security",
      "Weak passwords remain the primary entry vector for credential stuffing attacks, dictionary scans, and automated brute-force compromise across web applications.",
      "Evaluating password strength relies on information entropy—a mathematical measure of randomness and unpredictability calculated in bits.",
      "## Calculating Information Entropy",
      "Entropy ($E$) is determined using the pool size of unique available characters ($R$) and total character length ($L$):",
      "$$E = L \\times \\log_2(R)$$",
      "For example, an 8-character lowercase password yields roughly 38 bits of entropy, which modern GPU cluster rigs can crack in less than 3 seconds.",
      "Conversely, a 16-character string combining uppercase letters, numbers, and special symbols yields over 100 bits of entropy, requiring billions of computational computing years to brute-force.",
      "## Password Best Practices",
      "- **Length Over Complexity:** Adding additional random character length increases entropy faster than adding complex symbols to short passwords.",
      "- **Avoid Dictionary Words:** Automated attack tools rely on dictionary word lists and common substitution patterns (e.g., `@` for `a`).",
      "- **Use Client-Side CSPRNG Generators:** Generate passphrases using browser API cryptographic random source vectors like `crypto.getRandomValues()`."
    ],
    author: { name: "Toolverse Editorial", bio: "Cybersecurity and productivity utilities team at Toolverse" }
  },

  "data-serialization-workflows-conversion": {
    title: "Data Serialization Workflows: Converting CSV Tables into JSON & Markdown",
    slug: "data-serialization-workflows-conversion",
    category: "Utility",
    summary: "Simplify data parsing operations. Discover how data arrays transform seamlessly between flat spreadsheet columns and dynamic relational structures.",
    readingTime: 6,
    date: "June 29, 2026",
    tags: ["CSV", "JSON", "Data Parsing", "Utility"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    content: [
      "# Data Serialization and Format Conversion Systems",
      "Data serialization is the process of translating data structures or object states into formats that can be easily stored, transmitted over networks, or converted across client application states.",
      "## CSV vs JSON Serialization",
      "- **CSV (Comma-Separated Values):** A flat, tabular text representation optimized for spreadsheets and row-based relational data dumps. It lacks nested hierarchy capabilities.",
      "- **JSON (JavaScript Object Notation):** A hierarchical format supporting nested objects, arrays, booleans, and key-value pair bindings natively parsed by modern web environments.",
      "## Converting Tabular Data to JSON Objects",
      "To transform flat CSV text into structured JSON, parser tools inspect the first header row to dynamically define property keys, iterating line-by-line to output clean array payloads.",
      "Converting data client-side inside local browser web applications prevents sensitive corporate data from hitting external logging servers, preserving strict data privacy boundaries."
    ],
    author: { name: "Toolverse Editorial", bio: "Cybersecurity and productivity utilities team at Toolverse" }
  },

  "markdown-guide-technical-documentation": {
    title: "The Ultimate Markdown Guide for Clean Technical Documentation",
    slug: "markdown-guide-technical-documentation",
    category: "Text",
    summary: "Learn semantic block syntax guidelines to easily format live web components, text weights, code tables, and layout previews.",
    readingTime: 5,
    date: "July 01, 2026",
    tags: ["Markdown", "Formatting", "Text", "Documentation"],
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80",
    content: [
      "# Semantic Markdown for Technical Documentation",
      "Markdown is a lightweight markup language with plain-text formatting syntax created by John Gruber in 2004. It compiles cleanly into valid HTML elements across software repositories, static site generators, and CMS portals.",
      "## Essential Syntax Reference",
      "### Headings",
      "Use `#` symbols corresponding to HTML heading levels `<h1>` through `<h6>`.",
      "### Text Formatting",
      "- **Bold:** Enclose target words in double asterisks `**bold**`.",
      "- *Italics:* Enclose words in single asterisks `*italics*`.",
      "- `Code Snippets:` Enclose inline tokens in backticks `` `code` ``.",
      "### Lists and Blockquotes",
      "Create ordered or unordered lists using numbers or hyphens `-`. Highlight key quotes or technical warnings using the `>` blockquote symbol.",
      "Maintaining consistent Markdown formatting ensures clear documentation rendering across developer teams and GitHub repositories."
    ],
    author: { name: "Toolverse Editorial", bio: "Text analytics and documentation team at Toolverse" }
  },

  "linguistic-mechanics-case-conversion-metrics": {
    title: "Linguistic Mechanics: Analysis of Case Conversion and Typographic String Densities",
    slug: "linguistic-mechanics-case-conversion-metrics",
    category: "Text",
    summary: "How text distributions impact reading flow. Explore string conversion systems, casing rules, word limits, and whitespace extraction logic.",
    readingTime: 6,
    date: "July 03, 2026",
    tags: ["Typography", "Text Tools", "Strings", "SEO"],
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&auto=format&fit=crop&q=80",
    content: [
      "# Typographic Casing and String Transformations",
      "String case conversion is an essential component of computer programming, database administration, and content editing. Programmers and copywriters frequently manipulate text formatting styles to comply with variable naming conventions or clean URL slug rules.",
      "## Standard String Casing Formats",
      "- **camelCase:** Capitalizes the first letter of each word except the first. Popular in JavaScript variable declarations (`userProfileData`).",
      "- **PascalCase:** Capitalizes the first letter of every word. Standard in React component names and TypeScript interfaces (`UserProfileData`).",
      "- **snake_case:** Joins lowercase words using underscore separators. Standard in Python syntax and database column naming (`user_profile_data`).",
      "- **kebab-case:** Joins lowercase words with hyphens. Used in web URL routing structures and CSS style rules (`user-profile-data`).",
      "## Text Metrics and Search Optimization",
      "Analyzing word counts, character counts (with and without whitespace), and sentence density ensures digital web content meets search engine readability standards without keyword stuffing."
    ],
    author: { name: "Toolverse Editorial", bio: "Text analytics and documentation team at Toolverse" }
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = slug.toLowerCase().trim();

  let articleTitle = MOCK_ARTICLES[targetSlug]?.title || "Toolverse Article";
  let articleSummary = MOCK_ARTICLES[targetSlug]?.summary || "Read technical insights and guides on Toolverse.";

  try {
    await connectToDatabase();
    const rawBlog = await Blog.findOne({ slug: targetSlug }).lean<IMongoBlog>();
    if (rawBlog) {
      articleTitle = rawBlog.title;
      articleSummary = rawBlog.seoDescription || rawBlog.summary || articleSummary;
    }
  } catch (err) {
    console.error("DB connection error in metadata:", err);
  }

  return {
    title: `${articleTitle} | Toolverse Insights`,
    description: articleSummary,
    openGraph: {
      title: articleTitle,
      description: articleSummary,
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const targetSlug = slug.toLowerCase().trim();

  let article: BlogArticle | null = MOCK_ARTICLES[targetSlug] || null;

  try {
    await connectToDatabase();
    const dbBlog = await Blog.findOne({ slug: targetSlug }).lean<IMongoBlog>();

    if (dbBlog) {
      let contentLines: string[] = [];
      if (Array.isArray(dbBlog.content)) {
        contentLines = dbBlog.content;
      } else if (typeof dbBlog.content === "string") {
        contentLines = dbBlog.content.split("\n").filter((line) => line.trim().length > 0);
      }

      const parsedTags = typeof dbBlog.tags === "string" 
        ? dbBlog.tags.split(",").map((t) => t.trim()) 
        : Array.isArray(dbBlog.tags) 
        ? dbBlog.tags 
        : [];

      article = {
        title: dbBlog.title,
        slug: dbBlog.slug,
        category: dbBlog.category || "General",
        summary: dbBlog.seoDescription || dbBlog.summary || "",
        readingTime: dbBlog.readingTime || Math.max(5, Math.ceil(contentLines.join(" ").split(" ").length / 180)),
        date: dbBlog.createdAt
          ? new Date(dbBlog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "Recently Published",
        tags: parsedTags,
        imageUrl: dbBlog.image || dbBlog.imageUrl || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
        content: contentLines,
        author: {
          name: "Toolverse Editorial",
          bio: "IT Services and Technical Content Team",
        },
      };
    }
  } catch (err) {
    console.error("Database connection error in BlogDetailPage:", err);
  }

  if (!article) {
    notFound();
  }

  const midIndex = Math.floor(article.content.length / 2);
  const firstHalfContent = article.content.slice(0, midIndex);
  const secondHalfContent = article.content.slice(midIndex);

  const renderLine = (line: string, i: number) => {
    if (line.startsWith("# ")) {
      return (
        <h1 key={i} className="text-2xl md:text-3xl font-bold mt-8 mb-4 border-b pb-2 border-slate-200 dark:border-neutral-800 w-full text-slate-900 dark:text-white">
          {line.replace("# ", "")}
        </h1>
      );
    }

    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl md:text-2xl font-bold mt-6 mb-3 text-slate-900 dark:text-neutral-100 w-full">
          {line.replace("## ", "")}
        </h2>
      );
    }

    if (line.startsWith("### ")) {
      return (
        <h3 key={i} className="text-lg font-semibold mt-5 mb-2 text-slate-800 dark:text-neutral-200 w-full">
          {line.replace("### ", "")}
        </h3>
      );
    }

    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-5 list-disc mb-2 text-slate-700 dark:text-neutral-300 leading-relaxed max-w-4xl w-full text-sm sm:text-base">
          {line.replace("- ", "")}
        </li>
      );
    }

    return (
      <p
        key={i}
        className="text-slate-700 dark:text-neutral-300 leading-relaxed mb-4 max-w-4xl text-sm sm:text-base w-full"
      >
        {line}
      </p>
    );
  };

  return (
    <div className="bg-white dark:bg-black text-slate-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="relative h-[380px] sm:h-[450px] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-10 text-left">
          <span className="text-xs md:text-sm text-violet-400 dark:text-[#A6FF5D] uppercase font-bold tracking-wider mb-2">
            {article.category}
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white max-w-5xl leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex gap-6 text-xs md:text-sm text-gray-300 mt-4 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-violet-400" /> {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-violet-400" /> {article.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      <main className="w-full max-w-5xl mx-auto px-6 md:px-12 py-10 flex-1 flex flex-col items-start text-left">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-xs font-bold mb-6 text-slate-400 hover:text-violet-600 dark:hover:text-[#A6FF5D] transition"
        >
          <ArrowLeft size={14} /> Back to Insights
        </Link>

        {article.summary && (
          <div className="w-full text-left mb-6 max-w-4xl">
            <p className="text-lg md:text-xl text-slate-600 dark:text-neutral-300 leading-relaxed font-normal border-l-4 border-violet-500 pl-4">
              {article.summary}
            </p>
          </div>
        )}

        <AdSlot slot="responsive" label="Post Intro" />

        <div className="w-full flex flex-col justify-start items-start">
          {firstHalfContent.map((line, i) => renderLine(line, i))}
        </div>

        {article.content.length > 2 && (
          <AdSlot slot="rectangle" label="Mid-Article" />
        )}

        <div className="w-full flex flex-col justify-start items-start">
          {secondHalfContent.map((line, i) => renderLine(line, i + midIndex))}
        </div>

        <AdSlot slot="leaderboard" label="Post End" />

        <div className="mt-12 border-t pt-8 flex items-center gap-4 border-slate-200 dark:border-neutral-800 w-full max-w-4xl">
          <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-neutral-800 text-violet-600 dark:text-[#A6FF5D] flex items-center justify-center font-bold">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-900 dark:text-white">{article.author.name}</p>
            <p className="text-xs text-slate-500 dark:text-neutral-400">{article.author.bio}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}