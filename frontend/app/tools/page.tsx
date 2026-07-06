'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Landingpage/Navbar'
import Footer from '@/components/Landingpage/Footer'

interface ToolItem {
  name: string
  slug: string
  category: 'Finance' | 'Utility' | 'Developer' | 'Text'
  desc: string
  icon: string
  tags: string[]
}

const ALL_TOOLS: ToolItem[] = [
  { name: 'EMI Calculator', slug: 'emi-calculator', category: 'Finance', desc: 'Calculate monthly loan EMIs based on loan amount, interest rate, and tenure.', icon: '', tags: ['loan', 'emi', 'interest'] },
  { name: 'SIP Calculator', slug: 'sip-calculator', category: 'Finance', desc: 'Estimate the future returns of your systematic investment plans (SIP) over selected years.', icon: '', tags: ['investment', 'sip', 'wealth'] },
  { name: 'GST Calculator', slug: 'gst-calculator', category: 'Finance', desc: 'Quickly add or remove GST from an original amount using standard percentages.', icon: '', tags: ['tax', 'gst', 'finance'] },
  { name: 'FD Calculator', slug: 'fd-calculator', category: 'Finance', desc: 'Compute fixed deposit maturity amounts using principal, rate, tenure, and compounding intervals.', icon: '', tags: ['savings', 'maturity', 'deposit'] },
  { name: 'Loan Calculator', slug: 'loan-calculator', category: 'Finance', desc: 'Analyze full loan breakdowns featuring principal, rates, and complete amortization tables.', icon: '', tags: ['amortization', 'mortgage', 'finance'] },

  { name: 'Age Calculator', slug: 'age-calculator', category: 'Utility', desc: 'Convert your date of birth to current age precise down to years, months, and days.', icon: '', tags: ['age', 'birthday', 'utility'] },
  { name: 'Percentage Calculator', slug: 'percentage-calculator', category: 'Utility', desc: 'Find percentages, discover X% of Y, or quickly evaluate percentage changes.', icon: '', tags: ['math', 'percentage', 'utility'] },
  { name: 'Discount Calculator', slug: 'discount-calculator', category: 'Utility', desc: 'Input original price and discount percentage to instantly reveal the final bargain price.', icon: '', tags: ['shopping', 'discount', 'sale'] },
  { name: 'QR Code Generator', slug: 'qr-generator', category: 'Utility', desc: 'Generate instantly scannable high-resolution QR codes from any custom text or URL layout.', icon: '', tags: ['qr', 'utility', 'marketing'] },
  { name: 'Password Generator', slug: 'password-generator', category: 'Utility', desc: 'Create secure cryptographic passwords with customizable lengths, symbols, numbers, and an interactive strength meter.', icon: '', tags: ['security', 'password', 'safe'] },

  { name: 'JSON Formatter', slug: 'json-formatter', category: 'Developer', desc: 'Cleanly format, validate structure blocks, parse syntax flags, and minify raw JSON data.', icon: '', tags: ['json', 'developer', 'minify'] },
  { name: 'Base64 Encoder/Decoder', slug: 'base64-converter', category: 'Developer', desc: 'Safely encode plain text strings into Base64 formats or decode them back to standard character layouts.', icon: '', tags: ['base64', 'encode', 'strings'] },
  { name: 'JWT Decoder', slug: 'jwt-decoder', category: 'Developer', desc: 'Decode local JSON Web Tokens client-side to instantly inspect header information and payload data.', icon: '', tags: ['jwt', 'auth', 'token'] },
  { name: 'UUID Generator', slug: 'uuid-generator', category: 'Developer', desc: 'Generate cryptographically secure version-4 UUID sequences individually or using bulk generation layouts.', icon: '', tags: ['uuid', 'guid', 'id'] },
  { name: 'Regex Tester', slug: 'regex-tester', category: 'Developer', desc: 'Input string patterns to validate configurations with matching syntax highlights in real time.', icon: '', tags: ['regex', 'pattern', 'test'] },

  { name: 'Word Counter', slug: 'word-counter', category: 'Text', desc: 'Count words, individual characters, total sentence breaks, and formatting paragraphs live.', icon: '', tags: ['text', 'count', 'editor'] },
  { name: 'Character Counter', slug: 'character-counter', category: 'Text', desc: 'Examine detailed character metrics calculated natively both with and without white spaces included.', icon: '', tags: ['character', 'letters', 'length'] },
  { name: 'Case Converter', slug: 'case-converter', category: 'Text', desc: 'Transform text blocks cleanly between UPPERCASE, lowercase, Title Case, and Sentence case patterns.', icon: '', tags: ['string', 'case', 'format'] },
  { name: 'Text Reverser', slug: 'text-reverser', category: 'Text', desc: 'Reverse complete input arrays or flip text strings backward by switching individual letters or entire words.', icon: '', tags: ['reverse', 'flip', 'manipulate'] },
  { name: 'Slug Generator', slug: 'slug-generator', category: 'Text', desc: 'Convert standard text strings into URL-friendly strings clean of unauthorized characters.', icon: '', tags: ['slug', 'seo', 'url'] }
]

const TAG_COLORS: Record<string, string> = {
  loan: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300",
  emi: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300",
  interest: "bg-lime-50 text-lime-600 dark:bg-lime-900/30 dark:text-lime-300",

  investment: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
  sip: "bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300",
  wealth: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",

  tax: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
  gst: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300",
  finance: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",

  savings: "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300",
  deposit: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300",
  maturity: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300",

  age: "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300",
  birthday: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300",
  utility: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",

  math: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300",
  percentage: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",

  shopping: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300",
  discount: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
  sale: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300",

  qr: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",
  marketing: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",

  security: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300",
  password: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300",
  safe: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300",

  json: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300",
  developer: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  minify: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",

  base64: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
  encode: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",
  strings: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",

  jwt: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
  auth: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
  token: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300",

  uuid: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300",
  guid: "bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300",
  id: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",

  regex: "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300",
  pattern: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  test: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300",

  text: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
  count: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300",
  editor: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",

  character: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300",
  letters: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
  length: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",

  string: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
  case: "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300",
  format: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",

  reverse: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300",
  flip: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300",
  manipulate: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",

  slug: "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300",
  seo: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300",
  url: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",

  default: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
}

const CATEGORIES = ['All', 'Finance', 'Utility', 'Developer', 'Text'] as const

export default function ToolsListingPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q')?.toLowerCase() ?? ''
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All')

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery) ||
        tool.desc.toLowerCase().includes(searchQuery) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery))

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
      <Navbar />

      <main className="w-full flex-grow bg-transparent px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          
          {/* Header Area — Left-Aligned, Clean Typography, No Emojis */}
          <div className="mb-10 text-left">
            <h1 className="font-['Sora'] text-3xl font-extrabold tracking-tight text-black-600 dark:text-[#A6FF5D] sm:text-4xl">
              All Online Tools
            </h1>
            <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
              Explore our ecosystem of 20 zero-friction utilities. Safe client-side execution with zero subscription costs.
            </p>
            {searchQuery && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-sm text-teal-700 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-400">
                <span>
                  Showing search results for: <strong>{searchQuery}</strong>
                </span>
                <Link href="/tools" className="ml-1 font-bold hover:text-teal-900 dark:hover:text-teal-200">
                  ×
                </Link>
              </div>
            )}
          </div>

          {/* Category Pill Filters */}
          <div className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-5 dark:border-slate-800">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${isActive
                    ? 'bg-violet-600 text-white shadow-sm dark:bg-[#A6FF5D] dark:text-slate-900'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-violet-500 hover:text-violet-700 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-[#A6FF5D] dark:hover:text-[#A6FF5D]'
                    }`}
                >
                  {cat === 'All' ? 'All Tools' : cat === 'Text' ? `${cat} Tools` : cat}
                </button>
              )
            })}
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTools.map((tool) => {
                const isGreenHighlight = tool.slug === 'password-generator' || tool.slug === 'gst-calculator'

                return (
                  <Link
                    href={`/tools/${tool.slug}`}
                    key={tool.slug}
                    className={`group flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500 hover:shadow-md dark:bg-slate-900/55 dark:bg-none dark:shadow-none ${isGreenHighlight
                      ? 'border-[#A6FF5D]/60 dark:border-[#A6FF5D]/35 dark:hover:border-[#A6FF5D]'
                      : 'border-slate-200/80 dark:border-white/10 dark:hover:border-[#A6FF5D]'
                      }`}
                  >
                    <div>
                      {/* Card Header Title Mapping */}
                      <h3
                        className={`mb-1.5 text-lg font-semibold text-gray-700 dark:text-gray-200 transition-colors ${isGreenHighlight
                            ? 'dark:text-[#A6FF5D]'
                            : 'group-hover:text-violet-600 dark:group-hover:text-[#A6FF5D]'
                          }`}
                      >
                        {tool.name}
                      </h3>

                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {tool.desc}
                      </p>
                    </div>

                    {/* Dynamic Tag Matrix Mapping Loop using TAG_COLORS dictionary keys safely */}
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
                )
              })}
            </div>
          ) : (
            /* Empty State Overlay Component Box */
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center dark:border-slate-800 dark:bg-slate-900/40">
              <svg className="mx-auto mb-3 h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">No tools match your criteria</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your category filters or clearing the search query.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

// 'use client'

// import { useState, useMemo } from 'react'
// import { useSearchParams } from 'next/navigation'
// import Link from 'next/link'
// import Navbar from '@/components/Landingpage/Navbar'
// import Footer from '@/components/Landingpage/Footer'

// interface ToolItem {
//   name: string
//   slug: string
//   category: 'Finance' | 'Utility' | 'Developer' | 'Text'
//   desc: string
//   icon: string
//   tags: string[]
// }

// const ALL_TOOLS: ToolItem[] = [
//   { name: 'EMI Calculator', slug: 'emi-calculator', category: 'Finance', desc: 'Calculate monthly loan EMIs based on loan amount, interest rate, and tenure.', icon: '📊', tags: ['loan', 'emi', 'interest'] },
//   { name: 'SIP Calculator', slug: 'sip-calculator', category: 'Finance', desc: 'Estimate the future returns of your systematic investment plans (SIP) over selected years.', icon: '📈', tags: ['investment', 'sip', 'wealth'] },
//   { name: 'GST Calculator', slug: 'gst-calculator', category: 'Finance', desc: 'Quickly add or remove GST from an original amount using standard percentages.', icon: '💰', tags: ['tax', 'gst', 'finance'] },
//   { name: 'FD Calculator', slug: 'fd-calculator', category: 'Finance', desc: 'Compute fixed deposit maturity amounts using principal, rate, tenure, and compounding intervals.', icon: '🏦', tags: ['savings', 'maturity', 'deposit'] },
//   { name: 'Loan Calculator', slug: 'loan-calculator', category: 'Finance', desc: 'Analyze full loan breakdowns featuring principal, rates, and complete amortization tables.', icon: '💵', tags: ['amortization', 'mortgage', 'finance'] },

//   { name: 'Age Calculator', slug: 'age-calculator', category: 'Utility', desc: 'Convert your date of birth to current age precise down to years, months, and days.', icon: '📅', tags: ['age', 'birthday', 'utility'] },
//   { name: 'Percentage Calculator', slug: 'percentage-calculator', category: 'Utility', desc: 'Find percentages, discover X% of Y, or quickly evaluate percentage changes.', icon: '🔢', tags: ['math', 'percentage', 'utility'] },
//   { name: 'Discount Calculator', slug: 'discount-calculator', category: 'Utility', desc: 'Input original price and discount percentage to instantly reveal the final bargain price.', icon: '🏷️', tags: ['shopping', 'discount', 'sale'] },
//   { name: 'QR Code Generator', slug: 'qr-generator', category: 'Utility', desc: 'Generate instantly scannable high-resolution QR codes from any custom text or URL layout.', icon: '📱', tags: ['qr', 'utility', 'marketing'] },
//   { name: 'Password Generator', slug: 'password-generator', category: 'Utility', desc: 'Create secure cryptographic passwords with customizable lengths, symbols, numbers, and an interactive strength meter.', icon: '🔑', tags: ['security', 'password', 'safe'] },

//   { name: 'JSON Formatter', slug: 'json-formatter', category: 'Developer', desc: 'Cleanly format, validate structure blocks, parse syntax flags, and minify raw JSON data.', icon: '💻', tags: ['json', 'developer', 'minify'] },
//   { name: 'Base64 Encoder/Decoder', slug: 'base64-converter', category: 'Developer', desc: 'Safely encode plain text strings into Base64 formats or decode them back to standard character layouts.', icon: '🔐', tags: ['base64', 'encode', 'strings'] },
//   { name: 'JWT Decoder', slug: 'jwt-decoder', category: 'Developer', desc: 'Decode local JSON Web Tokens client-side to instantly inspect header information and payload data.', icon: '🪙', tags: ['jwt', 'auth', 'token'] },
//   { name: 'UUID Generator', slug: 'uuid-generator', category: 'Developer', desc: 'Generate cryptographically secure version-4 UUID sequences individually or using bulk generation layouts.', icon: '🆔', tags: ['uuid', 'guid', 'id'] },
//   { name: 'Regex Tester', slug: 'regex-tester', category: 'Developer', desc: 'Input string patterns to validate configurations with matching syntax highlights in real time.', icon: '🔍', tags: ['regex', 'pattern', 'test'] },

//   { name: 'Word Counter', slug: 'word-counter', category: 'Text', desc: 'Count words, individual characters, total sentence breaks, and formatting paragraphs live.', icon: '✍️', tags: ['text', 'count', 'editor'] },
//   { name: 'Character Counter', slug: 'character-counter', category: 'Text', desc: 'Examine detailed character metrics calculated natively both with and without white spaces included.', icon: '🔠', tags: ['character', 'letters', 'length'] },
//   { name: 'Case Converter', slug: 'case-converter', category: 'Text', desc: 'Transform text blocks cleanly between UPPERCASE, lowercase, Title Case, and Sentence case patterns.', icon: '🔤', tags: ['string', 'case', 'format'] },
//   { name: 'Text Reverser', slug: 'text-reverser', category: 'Text', desc: 'Reverse complete input arrays or flip text strings backward by switching individual letters or entire words.', icon: '🔄', tags: ['reverse', 'flip', 'manipulate'] },
//   { name: 'Slug Generator', slug: 'slug-generator', category: 'Text', desc: 'Convert standard text strings into URL-friendly strings clean of unauthorized characters.', icon: '🔗', tags: ['slug', 'seo', 'url'] }
// ]




// const CATEGORIES = ['All', 'Finance', 'Utility', 'Developer', 'Text'] as const

// export default function ToolsListingPage() {
//   const searchParams = useSearchParams()
//   const searchQuery = searchParams.get('q')?.toLowerCase() ?? ''
//   const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All')

//   const filteredTools = useMemo(() => {
//     return ALL_TOOLS.filter((tool) => {
//       const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
//       const matchesSearch =
//         tool.name.toLowerCase().includes(searchQuery) ||
//         tool.desc.toLowerCase().includes(searchQuery) ||
//         tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery))

//       return matchesCategory && matchesSearch
//     })
//   }, [activeCategory, searchQuery])

//   return (
//     <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
//       <Navbar />

//       <main className="w-full flex-grow bg-transparent px-4 py-12 sm:px-6 lg:px-8">
//         <div className="mx-auto w-full max-w-7xl">
//           <div className="mb-10 text-center sm:text-left">
//             <h1 className="font-['Sora'] text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
//               All Online Tools
//             </h1>
//             <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
//               Explore our ecosystem of 20 zero-friction utilities. Safe client-side execution with zero subscription costs.
//             </p>
//             {searchQuery && (
//               <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-sm text-teal-700 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-400">
//                 <span>
//                   Showing search results for: <strong>{searchQuery}</strong>
//                 </span>
//                 <Link href="/tools" className="ml-1 font-bold hover:text-teal-900 dark:hover:text-teal-200">
//                   ×
//                 </Link>
//               </div>
//             )}
//           </div>

//           <div className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-5 dark:border-slate-800">
//             {CATEGORIES.map((cat) => {
//               const isActive = activeCategory === cat
//               return (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${isActive
//                     ? 'bg-violet-700 text-white shadow-sm dark:bg-[#A6FF5D] dark:text-slate-900'
//                     : 'border border-slate-200 bg-white text-slate-600 hover:border-violet-500 hover:text-violet-700 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-[#A6FF5D] dark:hover:text-[#A6FF5D]'
//                     }`}
//                 >
//                   {cat === 'All' ? 'All Tools' : cat === 'Text' ? `${cat} Tools` : cat}
//                 </button>
//               )
//             })}
//           </div>

//           {filteredTools.length > 0 ? (
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {filteredTools.map((tool) => {
//                 const isGreenHighlight = tool.slug === 'password-generator' || tool.slug === 'gst-calculator'

//                 return (
//                   <Link
//                     href={`/tools/${tool.slug}`}
//                     key={tool.slug}
//                     className={`group flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500 hover:shadow-md dark:bg-slate-900/55 dark:bg-none dark:shadow-none ${isGreenHighlight
//                       ? 'border-[#A6FF5D]/60 dark:border-[#A6FF5D]/35 dark:hover:border-[#A6FF5D]'
//                       : 'border-slate-200/80 dark:border-white/10 dark:hover:border-[#A6FF5D]'
//                       }`}
//                   >
//                     <div>
//                       {/* <div className="mb-4 inline-flex rounded-xl bg-slate-50 p-3 text-2xl transition-colors group-hover:bg-violet-50 dark:bg-slate-800/70 dark:group-hover:bg-slate-800">
//                         {tool.icon}
//                       </div> */}

//                       <h3
//                         className={`mb-1.5 text-lg font-semibold text-gray-700 dark:text-gray-200 transition-colors ${isGreenHighlight
//                             ? 'dark:text-[#A6FF5D]'
//                             : 'group-hover:text-violet-700 dark:group-hover:text-violet-300'
//                           }`}
//                       >
//                         {tool.name}
//                       </h3>

//                       <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
//                         {tool.desc}
//                       </p>
//                     </div>

//                     <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-3 dark:border-white/10">
//                       {tool.tags.slice(0, 2).map((tag) => (
//                         <span
//                           key={tag}
//                           className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </Link>
//                 )
//               })}
//             </div>
//           ) : (
//             <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center dark:border-slate-800 dark:bg-slate-900/40">
//               <svg className="mx-auto mb-3 h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <h3 className="text-base font-semibold text-slate-900 dark:text-white">No tools match your criteria</h3>
//               <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your category filters or clearing the search query.</p>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   )
// }
