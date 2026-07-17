import Link from 'next/link';
import { FaArrowRight, FaChevronRight, FaWrench, FaBookOpen, FaClock } from 'react-icons/fa';
import Navbar from '@/components/Landingpage/Navbar';
import Footer from '@/components/Landingpage/Footer';

interface ToolItem {
  name: string;
  slug: string;
  desc: string;
  tags: string[];
}

interface BlogItem {
  title: string;
  slug: string;
  excerpt: string;
  readTime: string;
}

interface CategoryData {
  name: string;
  desc: string;
  tools: ToolItem[];
  blogs: BlogItem[];
}


const CATEGORY_REGISTRY: Record<string, CategoryData> = {
  finance: {
    name: 'Finance Tools',
    desc: 'Calculate EMI, SIP, GST, FD, and plan loans with interactive client-side computing engines.',
    tools: [
      { name: 'EMI Calculator', slug: 'emi-calculator', desc: 'Calculate monthly loan EMIs based on loan amount, interest rate, and tenure.', tags: ['loan', 'emi', 'interest'] },
      { name: 'SIP Calculator', slug: 'sip-calculator', desc: 'Estimate the future returns of your systematic investment plans (SIP) over selected years.', tags: ['investment', 'sip', 'wealth'] },
      { name: 'GST Calculator', slug: 'gst-calculator', desc: 'Quickly add or remove GST from an original amount using standard percentages.', tags: ['tax', 'gst', 'finance'] },
      { name: 'FD Calculator', slug: 'fd-calculator', desc: 'Compute fixed deposit maturity amounts using principal, rate, tenure, and compounding intervals.', tags: ['savings', 'maturity', 'deposit'] },
      { name: 'Loan Calculator', slug: 'loan-calculator', desc: 'Analyze full loan breakdowns featuring principal, rates, and complete amortization tables.', tags: ['amortization', 'mortgage', 'finance'] },
    ],
    blogs: [
      { title: 'Understanding EMI: How Loan Amortization Works', slug: 'understanding-emi-amortization', excerpt: 'Demystify your monthly loan payments. Learn how banks calculate your principal and interest distribution over time.', readTime: '5 min' },
      { title: 'The Power of Compounding: Why You Should Start a SIP Today', slug: 'power-of-compounding-sip', excerpt: 'Discover how small, systematic monthly investments grow into substantial wealth over long horizons.', readTime: '6 min' },
      { title: 'A Complete Beginner Guide to GST Structure and Slabs', slug: 'beginners-guide-to-gst', excerpt: 'Break down the complexities of goods and services taxes, input tax credits, and standard tariff brackets.', readTime: '4 min' }
    ]
  },
  developer: {
    name: 'Developer Utilities',
    desc: 'Accelerate formatting workflows with JSON formatting, Base64 encoding, JWT decoding, and secure UUID generation tools.',
    tools: [
      { name: 'JSON Formatter', slug: 'json-formatter', desc: 'Cleanly format, validate structure blocks, parse syntax flags, and minify raw JSON data.', tags: ['json', 'developer', 'minify'] },
      { name: 'Base64 Encoder/Decoder', slug: 'base64-converter', desc: 'Safely encode plain text strings into Base64 formats or decode them back to standard character layouts.', tags: ['base64', 'encode', 'strings'] },
      { name: 'JWT Decoder', slug: 'jwt-decoder', desc: 'Decode local JSON Web Tokens client-side to instantly inspect header information and payload data.', tags: ['jwt', 'auth', 'token'] },
      { name: 'UUID Generator', slug: 'uuid-generator', desc: 'Generate cryptographically secure version-4 UUID sequences individually or using bulk generation layouts.', tags: ['uuid', 'guid', 'id'] },
      { name: 'Regex Tester', slug: 'regex-tester', desc: 'Input string patterns to validate configurations with matching syntax highlights in real time.', tags: ['regex', 'pattern', 'test'] },
    ],
    blogs: [
      { title: 'Demystifying JSON Web Tokens (JWT) Architecture', slug: 'demystifying-jwt-architecture', excerpt: 'Learn how modern authentication systems utilize stateless signed tokens to transmit user data securely.', readTime: '7 min' },
      { title: 'The Ultimate Guide to Regular Expression Patterns', slug: 'ultimate-regex-pattern-guide', excerpt: 'Stop guessing string matching layouts. Master syntax tokens, anchors, lookaheads, and capture flags.', readTime: '8 min' },
      { title: 'Understanding UUID Version 4 and Cryptographic Randomness', slug: 'understanding-uuidv4-randomness', excerpt: 'Why are collision chances practically zero? Peek inside version 4 unique identifier creation rules.', readTime: '4 min' }
    ]
  },
  utility: {
    name: 'General Utility Engines',
    desc: 'Quick day-to-day utilities including age estimation, percentage variations, savings discounts, and QR generation.',
    tools: [
      { name: 'Age Calculator', slug: 'age-calculator', desc: 'Convert your date of birth to current age precise down to years, months, and days.', tags: ['age', 'birthday', 'utility'] },
      { name: 'Percentage Calculator', slug: 'percentage-calculator', desc: 'Find percentages, discover X% of Y, or quickly evaluate percentage changes.', tags: ['math', 'percentage', 'utility'] },
      { name: 'Discount Calculator', slug: 'discount-calculator', desc: 'Input original price and discount percentage to instantly reveal the final bargain price.', tags: ['shopping', 'discount', 'sale'] },
      { name: 'QR Code Generator', slug: 'qr-generator', desc: 'Generate instantly scannable high-resolution QR codes from any custom text or URL layout.', tags: ['qr', 'utility', 'marketing'] },
      { name: 'Password Generator', slug: 'password-generator', desc: 'Create secure cryptographic passwords with customizable lengths, symbols, numbers, and an interactive strength meter.', tags: ['security', 'password', 'safe'] },
    ],
    blogs: [
      { title: 'The Anatomy of a QR Code: How Do Matrix Codes Work?', slug: 'anatomy-of-a-qr-code', excerpt: 'From quiet zones to position indicators, explore the binary data matrix handling our mobile actions.', readTime: '5 min' },
      { title: 'Password Security 101: Creating Strong, Unbreakable Passphrases', slug: 'password-security-best-practices', excerpt: 'Protect your accounts from brute force dictionary matrix scans using modern entropy practices.', readTime: '6 min' }
    ]
  },
  text: {
    name: 'Text Analytics Tools',
    desc: 'Analyze text metrics instantly with word counters, character counts, case conversion layouts, and slug generators.',
    tools: [
      { name: 'Word Counter', slug: 'word-counter', desc: 'Count words, individual characters, total sentence breaks, and formatting paragraphs live.', tags: ['text', 'count', 'editor'] },
      { name: 'Character Counter', slug: 'character-counter', desc: 'Examine detailed character metrics calculated natively both with and without white spaces included.', tags: ['character', 'letters', 'length'] },
      { name: 'Case Converter', slug: 'case-converter', desc: 'Transform text blocks cleanly between UPPERCASE, lowercase, Title Case, and Sentence case patterns.', tags: ['string', 'case', 'format'] },
      { name: 'Text Reverser', slug: 'text-reverser', desc: 'Reverse complete input arrays or flip text strings backward by switching individual letters or entire words.', tags: ['reverse', 'flip', 'manipulate'] },
      { name: 'Slug Generator', slug: 'slug-generator', desc: 'Convert standard text strings into URL-friendly strings clean of unauthorized characters.', tags: ['slug', 'seo', 'url'] },
    ],
    blogs: [
      { title: 'SEO Copywriting: How to Optimize Content for Search Engines', slug: 'seo-copywriting-optimization-tips', excerpt: 'Learn how to combine target keyword placement with pristine semantic readability to rank higher on search engines.', readTime: '9 min' },
      { title: 'The Importance of Clean URL Slugs in Modern Web SEO', slug: 'importance-of-clean-url-slugs', excerpt: 'Understand why search engine indexes prefer descriptive, keyword-rich, hyphen-separated router addresses.', readTime: '4 min' }
    ]
  }
};

const TAG_COLORS: Record<string, string> = {
  loan: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
  emi: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300',
  interest: 'bg-lime-50 text-lime-600 dark:bg-lime-900/30 dark:text-lime-300',
  investment: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
  sip: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300',
  wealth: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300',
  json: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300',
  developer: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  utility: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  text: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
  default: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.toLowerCase() || '';

  const category = CATEGORY_REGISTRY[slug];

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
        <Navbar />
        <main className="flex flex-grow flex-col items-center justify-center p-4">
          <h2 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">Category Not Found</h2>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            The category segment you requested doesn&apos;t match our current launch registry index.
          </p>
          <Link href="/categories" className="rounded-full bg-violet-600 px-5 py-2 text-sm text-white dark:bg-[#A6FF5D] dark:text-slate-900 font-semibold tracking-tight">
            Browse Categories Hub
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
      <Navbar />

      <main className="w-full flex-grow text-slate-900 dark:text-white">
        {/* Title Navigation Strip */}
        <div className="border-b border-slate-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/20">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <nav className="mb-3 flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Link href="/categories" className="transition hover:text-violet-600 dark:hover:text-[#A6FF5D]">Categories</Link>
              <FaChevronRight className="text-[9px]" />
              <span className="text-violet-600 dark:text-[#A6FF5D] font-bold">{category.name}</span>
            </nav>
            <h1 className="font-['Sora'] text-3xl font-extrabold tracking-tight sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              {category.desc}
            </p>
          </div>
        </div>

        
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
          
          {/* SECTION 1: AVAILABLE INTERACTIVE TOOLS */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
              <FaWrench className="text-violet-600 dark:text-[#A6FF5D] text-sm" />
              <h2 className="text-xl font-bold tracking-tight">Available Interactive Tools</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.tools.map((tool) => (
                <Link
                  href={`/tools/${tool.slug}`}
                  key={tool.slug}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500 hover:shadow-md dark:border-white/10 dark:bg-slate-900/55 dark:shadow-none dark:hover:border-[#A6FF5D]"
                >
                  <div>
                    <h3 className="mb-1.5 text-lg font-semibold text-gray-700 transition-colors group-hover:text-violet-600 dark:text-gray-200 dark:group-hover:text-[#A6FF5D]">
                      {tool.name}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-3 dark:border-white/10">
                    {tool.tags.slice(0, 3).map((tag) => {
                      const styleClass = TAG_COLORS[tag] || TAG_COLORS.default;
                      return (
                        <span
                          key={tag}
                          className={`rounded-md px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider ${styleClass}`}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
              <FaBookOpen className="text-emerald-500 text-sm" />
              <h2 className="text-xl font-bold tracking-tight">Informational Guides</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.blogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500 hover:shadow-md dark:border-white/10 dark:bg-slate-900/55 dark:shadow-none dark:hover:border-[#A6FF5D]"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 transition-colors group-hover:text-violet-600 dark:group-hover:text-[#A6FF5D]">
                        {blog.title}
                      </h3>
                      <FaArrowRight className="shrink-0 text-xs text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-violet-600 dark:text-slate-600 dark:group-hover:text-[#A6FF5D] mt-1.5" />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium border-t border-slate-100 dark:border-white/10 pt-3">
                    <FaClock />
                    <span>{blog.readTime} read</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
