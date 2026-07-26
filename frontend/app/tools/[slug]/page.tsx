// import { notFound } from "next/navigation";
// import { Metadata } from "next";
// import { connectToDatabase } from "@/config/db";
// import { Tool } from "@/models/Tool";
// import DynamicEngine, { DynamicToolConfig } from "@/components/tools/DynamicEngine";
// import {
//   EmiCalculator, SipCalculator, GstCalculator, FdCalculator, LoanCalculator
// } from "@/components/tools/FinanceTools";
// import {
//   AgeCalculator, PercentageCalculator, DiscountCalculator, QrGenerator, PasswordGenerator
// } from "@/components/tools/UtilityTools";
// import {
//   JsonFormatter, Base64Tool, JwtDecoderTool, UuidGenerator, RegexTester
// } from "@/components/tools/DevTools";
// import {
//   WordCounter, CharacterCounter, CaseConverter, TextReverser, SlugGenerator
// } from "@/components/tools/TextTools";
// import Navbar from "@/components/Landingpage/Navbar";
// import Footer from "@/components/Landingpage/Footer";

// const componentRegistry: Record<string, { title: string; component: React.ComponentType; description: string }> = {
//   "emi-calculator": { title: "EMI Calculator", component: EmiCalculator, description: "Calculate Equated Monthly Installments for loans easily." },
//   "sip-calculator": { title: "SIP Calculator", component: SipCalculator, description: "Estimate your wealth growth via Systematic Investment Plans." },
//   "gst-calculator": { title: "GST Calculator", component: GstCalculator, description: "Compute Net and Gross prices adding or removing GST." },
//   "fd-calculator": { title: "FD (Fixed Deposit) Calculator", component: FdCalculator, description: "Check maturity amounts and interest returns on Fixed Deposits." },
//   "loan-calculator": { title: "Loan Calculator", component: LoanCalculator, description: "Amortize and check payments breakdown for your finances." },
//   "age-calculator": { title: "Age Calculator", component: AgeCalculator, description: "Find out exact age metrics in years, months, and days." },
//   "percentage-calculator": { title: "Percentage Calculator", component: PercentageCalculator, description: "Solve percent variations, relative adjustments instantly." },
//   "discount-calculator": { title: "Discount Calculator", component: DiscountCalculator, description: "Calculate precise markdown savings and net final cost amounts." },
//   "qr-generator": { title: "QR Code Generator", component: QrGenerator, description: "Convert links, URLs or text blocks straight into downloadable QR vectors." },
//   "password-generator": { title: "Password Generator", component: PasswordGenerator, description: "Generate robust alphanumeric strings matching custom constraints." },
//   "json-formatter": { title: "JSON Formatter", component: JsonFormatter, description: "Beautify, parse, validate or compress JSON inputs instantly." },
//   "base64-converter": { title: "Base64 Encode/Decode", component: Base64Tool, description: "Safely process conversion encoding/decoding sequences." },
//   "jwt-decoder": { title: "JWT Decoder", component: JwtDecoderTool, description: "Extract headers and token payload objects accurately." },
//   "uuid-generator": { title: "UUID Generator", component: UuidGenerator, description: "Bulk generate production ready v4 Universally Unique Identifiers." },
//   "regex-tester": { title: "Regex Tester", component: RegexTester, description: "Test matching sequences over input arrays dynamically." },
//   "word-counter": { title: "Word Counter", component: WordCounter, description: "Extract complete paragraph patterns and length statistics." },
//   "character-counter": { title: "Character Counter", component: CharacterCounter, description: "Review physical symbol spaces with strict boundary rules." },
//   "case-converter": { title: "Case Converter", component: CaseConverter, description: "Cycle strings through dynamic stylistic visual transforms." },
//   "text-reverser": { title: "Text Reverser", component: TextReverser, description: "Mirror words or entire arrays chronologically backwards." },
//   "slug-generator": { title: "Slug Generator", component: SlugGenerator, description: "Format raw web titles cleanly into semantic URL components." },
// };

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const targetSlug = slug.toLowerCase().trim();

//   await connectToDatabase();
//   const rawDbTool = await Tool.findOne({ slug: targetSlug }).lean();
//   const dbTool = rawDbTool ? JSON.parse(JSON.stringify(rawDbTool)) : null;

//   const componentKey = dbTool?.componentKey || targetSlug;
//   const matchedTool = componentRegistry[componentKey] || componentRegistry[targetSlug];

//   const pageTitle = dbTool?.seoTitle || dbTool?.name || matchedTool?.title || "Toolverse Utility";
//   const pageDescription = dbTool?.seoDescription || dbTool?.description || matchedTool?.description || "Run interactive web utility computations online.";

//   return {
//     title: pageTitle,
//     description: pageDescription,
//     openGraph: {
//       title: pageTitle,
//       description: pageDescription,
//     },
//   };
// }

// export default async function ToolPage({ params }: PageProps) {
//   const { slug } = await params;
//   const targetSlug = slug.toLowerCase().trim();

//   await connectToDatabase();
//   const rawDbTool = await Tool.findOne({ slug: targetSlug }).lean();
//   const dbTool = rawDbTool ? JSON.parse(JSON.stringify(rawDbTool)) : null;

//   if (!dbTool && !componentRegistry[targetSlug]) {
//     notFound();
//   }

//   const isDynamic = dbTool?.toolType === "dynamic" || Boolean(dbTool?.config?.formula);
//   const matchedTool = !isDynamic ? (componentRegistry[dbTool?.componentKey] || componentRegistry[targetSlug]) : null;

//   const title = dbTool?.name || matchedTool?.title || "Interactive Utility";
//   const description = dbTool?.description || matchedTool?.description || "Run interactive computations inside your browser workspace.";
//   const ToolComponent = matchedTool?.component;
//   const dynamicConfig: DynamicToolConfig | undefined = dbTool?.config;

//   return (
//     <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
//       <Navbar />
      
//       <main className="w-full flex-grow px-4 py-12 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto">
//           <header className="mb-8 text-left">
//             <h1 className="font-['Sora'] text-3xl font-extrabold tracking-tight text-violet-600 dark:text-[#A6FF5D] sm:text-4xl">
//               {title}
//             </h1>
//             <p className="mt-2 text-base text-slate-500 dark:text-neutral-400 max-w-xl leading-relaxed">
//               {description}
//             </p>
//           </header>

//           <div className="bg-white dark:bg-slate-900/55 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm mb-12">
//             {isDynamic && dynamicConfig ? (
//               <DynamicEngine config={dynamicConfig} />
//             ) : ToolComponent ? (
//               <ToolComponent />
//             ) : (
//               <div className="text-center py-12 text-slate-400 font-mono text-xs">
//                 Interactive component workspace rendering engine initializing...
//               </div>
//             )}
//           </div>

//           <hr className="border-slate-200 dark:border-white/10 my-8" />
          
//           <article className="prose dark:prose-invert max-w-none text-slate-600 dark:text-neutral-300 space-y-6 text-left">
//             <h2 className="font-['Sora'] text-xl font-bold text-slate-900 dark:text-white">
//               How to use the {title}
//             </h2>
//             <ol className="list-decimal pl-5 space-y-3 text-sm sm:text-base leading-relaxed">
//               <li>Input your raw parameters inside the active interactive workspace interface.</li>
//               <li>Observe instantaneous output modifications computing smoothly down runtime threads without browser reload events.</li>
//               <li>Utilize functional action modifiers like copy configurations to pull finalized output matrices securely.</li>
//             </ol>
//           </article>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { connectToDatabase } from "@/config/db";
import { Tool } from "@/models/Tool";
import DynamicEngine, { DynamicToolConfig } from "@/components/tools/DynamicEngine";
import {
  EmiCalculator, SipCalculator, GstCalculator, FdCalculator, LoanCalculator
} from "@/components/tools/FinanceTools";
import {
  AgeCalculator, PercentageCalculator, DiscountCalculator, QrGenerator, PasswordGenerator
} from "@/components/tools/UtilityTools";
import {
  JsonFormatter, Base64Tool, JwtDecoderTool, UuidGenerator, RegexTester
} from "@/components/tools/DevTools";
import {
  WordCounter, CharacterCounter, CaseConverter, TextReverser, SlugGenerator
} from "@/components/tools/TextTools";
import Navbar from "@/components/Landingpage/Navbar";
import Footer from "@/components/Landingpage/Footer";
import AdSlot from "@/components/Landingpage/AdSlot";
import { ListOrdered, CheckCircle2, HelpCircle, ChevronDown, Wrench, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface IMongoTool {
  name: string;
  slug: string;
  category?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  howToUse?: string[];
  benefits?: string[];
  faqs?: FAQItem[];
  tags?: string[] | string;
  isActive?: boolean;
  toolType?: string;
  componentKey?: string;
  config?: DynamicToolConfig;
}

const componentRegistry: Record<string, { title: string; component: React.ComponentType; description: string; category: string }> = {
  "emi-calculator": { title: "EMI Calculator", component: EmiCalculator, description: "Calculate Equated Monthly Installments for loans easily.", category: "Finance" },
  "sip-calculator": { title: "SIP Calculator", component: SipCalculator, description: "Estimate your wealth growth via Systematic Investment Plans.", category: "Finance" },
  "gst-calculator": { title: "GST Calculator", component: GstCalculator, description: "Compute Net and Gross prices adding or removing GST.", category: "Finance" },
  "fd-calculator": { title: "FD (Fixed Deposit) Calculator", component: FdCalculator, description: "Check maturity amounts and interest returns on Fixed Deposits.", category: "Finance" },
  "loan-calculator": { title: "Loan Calculator", component: LoanCalculator, description: "Amortize and check payments breakdown for your finances.", category: "Finance" },
  "age-calculator": { title: "Age Calculator", component: AgeCalculator, description: "Find out exact age metrics in years, months, and days.", category: "Utility" },
  "percentage-calculator": { title: "Percentage Calculator", component: PercentageCalculator, description: "Solve percent variations, relative adjustments instantly.", category: "Utility" },
  "discount-calculator": { title: "Discount Calculator", component: DiscountCalculator, description: "Calculate precise markdown savings and net final cost amounts.", category: "Utility" },
  "qr-generator": { title: "QR Code Generator", component: QrGenerator, description: "Convert links, URLs or text blocks straight into downloadable QR vectors.", category: "Utility" },
  "password-generator": { title: "Password Generator", component: PasswordGenerator, description: "Generate robust alphanumeric strings matching custom constraints.", category: "Utility" },
  "json-formatter": { title: "JSON Formatter", component: JsonFormatter, description: "Beautify, parse, validate or compress JSON inputs instantly.", category: "Developer" },
  "base64-converter": { title: "Base64 Encode/Decode", component: Base64Tool, description: "Safely process conversion encoding/decoding sequences.", category: "Developer" },
  "jwt-decoder": { title: "JWT Decoder", component: JwtDecoderTool, description: "Extract headers and token payload objects accurately.", category: "Developer" },
  "uuid-generator": { title: "UUID Generator", component: UuidGenerator, description: "Bulk generate production ready v4 Universally Unique Identifiers.", category: "Developer" },
  "regex-tester": { title: "Regex Tester", component: RegexTester, description: "Test matching sequences over input arrays dynamically.", category: "Developer" },
  "word-counter": { title: "Word Counter", component: WordCounter, description: "Extract complete paragraph patterns and length statistics.", category: "Text" },
  "character-counter": { title: "Character Counter", component: CharacterCounter, description: "Review physical symbol spaces with strict boundary rules.", category: "Text" },
  "case-converter": { title: "Case Converter", component: CaseConverter, description: "Cycle strings through dynamic stylistic visual transforms.", category: "Text" },
  "text-reverser": { title: "Text Reverser", component: TextReverser, description: "Mirror words or entire arrays chronologically backwards.", category: "Text" },
  "slug-generator": { title: "Slug Generator", component: SlugGenerator, description: "Format raw web titles cleanly into semantic URL components.", category: "Text" },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = slug.toLowerCase().trim();

  let rawDbTool: IMongoTool | null = null;
  try {
    await connectToDatabase();
    rawDbTool = await Tool.findOne({ slug: targetSlug }).lean<IMongoTool>();
  } catch (err) {
    console.error("DB connection error in metadata:", err);
  }

  const componentKey = rawDbTool?.componentKey || targetSlug;
  const matchedTool = componentRegistry[componentKey] || componentRegistry[targetSlug];

  const pageTitle = rawDbTool?.seoTitle || rawDbTool?.name || matchedTool?.title || "Toolverse Utility";
  const pageDescription = rawDbTool?.seoDescription || rawDbTool?.description || matchedTool?.description || "Run interactive web utility computations online.";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const targetSlug = slug.toLowerCase().trim();

  let rawDbTool: IMongoTool | null = null;
  try {
    await connectToDatabase();
    rawDbTool = await Tool.findOne({ slug: targetSlug }).lean<IMongoTool>();
  } catch (err) {
    console.error("DB connection error in ToolPage:", err);
  }

  const matchedTool = componentRegistry[rawDbTool?.componentKey || ""] || componentRegistry[targetSlug];

  if (!rawDbTool && !matchedTool) {
    notFound();
  }

  const isDynamic = rawDbTool?.toolType === "dynamic" || Boolean(rawDbTool?.config?.formula);
  const title = rawDbTool?.name || matchedTool?.title || "Interactive Utility";
  const description = rawDbTool?.description || matchedTool?.description || "Run interactive computations inside your browser workspace.";
  const category = rawDbTool?.category || matchedTool?.category || "Utility";
  const ToolComponent = !isDynamic && matchedTool ? matchedTool.component : null;
  const dynamicConfig: DynamicToolConfig | undefined = rawDbTool?.config;

  let rawRelated: IMongoTool[] = [];
  try {
    rawRelated = await Tool.find({
      category: new RegExp(`^${category}$`, "i"),
      slug: { $ne: targetSlug },
      isActive: true,
    })
      .limit(4)
      .lean<IMongoTool[]>();
  } catch (err) {
    console.error("Failed fetching related tools:", err);
  }

  const defaultSteps = [
    "Input your parameters inside the interactive workspace interface above.",
    "Observe real-time outputs calculating smoothly without page refresh.",
    "Copy or save your processed outputs securely.",
  ];

  const howToSteps = rawDbTool?.howToUse && rawDbTool.howToUse.length > 0 ? rawDbTool.howToUse : defaultSteps;

  const defaultBenefits = [
    "Client-Side Performance: Calculations process locally in browser memory.",
    "Strict Privacy Safeguards: Input variables are never collected or stored.",
    "Universal Cross-Platform Support: Seamless performance on mobile, tablet, and desktop.",
    "Zero Registration: Free instant access without account barriers.",
  ];

  const benefits = rawDbTool?.benefits && rawDbTool.benefits.length > 0 ? rawDbTool.benefits : defaultBenefits;

  const defaultFaqs: FAQItem[] = [
    {
      question: `Is using ${title} completely free?`,
      answer: `Yes, ${title} is 100% free with unlimited computations.`,
    },
    {
      question: `Are my calculations saved or logged on external servers?`,
      answer: `No. All operations execute strictly inside your local browser runtime.`,
    },
    {
      question: `Can I access ${title} on mobile browsers?`,
      answer: `Yes, the tool interface is fully responsive across mobile devices.`,
    },
  ];

  const faqs = rawDbTool?.faqs && rawDbTool.faqs.length > 0 ? rawDbTool.faqs : defaultFaqs;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://toolverse.in/#website",
        "url": "https://toolverse.in",
        "name": "Toolverse",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://toolverse.in",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tools",
            "item": "https://toolverse.in/tools",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title,
            "item": `https://toolverse.in/tools/${targetSlug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="w-full flex-grow px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <header className="text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              <Link href="/" className="hover:text-violet-600 dark:hover:text-[#A6FF5D]">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-violet-600 dark:hover:text-[#A6FF5D]">Tools</Link>
              <span>/</span>
              <span className="text-violet-600 dark:text-[#A6FF5D]">{category}</span>
            </div>

            <h1 className="font-['Sora'] text-3xl font-extrabold tracking-tight text-violet-600 dark:text-[#A6FF5D] sm:text-4xl">
              {title}
            </h1>
            <p className="text-base text-slate-500 dark:text-neutral-400 max-w-xl leading-relaxed">
              {description}
            </p>
          </header>

          <div className="w-full flex justify-center py-2">
            <AdSlot slot="leaderboard" />
          </div>

          <div className="bg-white dark:bg-slate-900/55 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
            {isDynamic && dynamicConfig ? (
              <DynamicEngine config={dynamicConfig} />
            ) : ToolComponent ? (
              <ToolComponent />
            ) : (
              <div className="text-center py-12 text-slate-400 font-mono text-xs">
                Interactive component workspace initializing...
              </div>
            )}
          </div>

          <div className="w-full flex justify-center py-2">
            <AdSlot slot="rectangle" />
          </div>

          <section className="bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-left space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-violet-600 dark:text-[#A6FF5D]" /> How to use {title}
            </h2>
            <ol className="space-y-3">
              {howToSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                  <span className="shrink-0 w-6 h-6 bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-[#A6FF5D] font-bold text-xs rounded-full flex items-center justify-center border border-violet-500/20">
                    {idx + 1}
                  </span>
                  <span className="mt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-left space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Key Features & Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-neutral-950/50 border border-slate-200/60 dark:border-neutral-800 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-left space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-violet-600 dark:text-[#A6FF5D]" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group border border-slate-200/80 dark:border-white/10 rounded-xl p-4 bg-slate-50/50 dark:bg-neutral-950/30 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                    <span>{faq.question}</span>
                    <ChevronDown size={16} className="shrink-0 transition duration-300 group-open:-rotate-180 text-slate-400" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed border-t border-slate-200/60 dark:border-neutral-800 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {rawRelated.length > 0 && (
            <section className="text-left space-y-4 pt-2">
              <div className="flex justify-between items-end border-b border-slate-200/80 dark:border-white/10 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-violet-600 dark:text-[#A6FF5D]" /> Related {category} Utilities
                  </h2>
                </div>
                <Link href="/tools" className="text-xs font-bold text-violet-600 dark:text-[#A6FF5D] hover:underline flex items-center gap-1">
                  View All <ArrowRight size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rawRelated.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/tools/${rel.slug}`}
                    className="p-4 bg-white dark:bg-slate-900/55 border border-slate-200/80 dark:border-white/10 rounded-xl hover:border-violet-500 dark:hover:border-[#A6FF5D] transition space-y-1 block"
                  >
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">{rel.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 line-clamp-2">{rel.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}