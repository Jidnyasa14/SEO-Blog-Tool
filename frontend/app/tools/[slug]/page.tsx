import { notFound } from "next/navigation";
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

const toolsMap: Record<string, { title: string; component: React.ComponentType; description: string }> = {
  "emi-calculator": { title: "EMI Calculator", component: EmiCalculator, description: "Calculate Equated Monthly Installments for loans easily." },
  "sip-calculator": { title: "SIP Calculator", component: SipCalculator, description: "Estimate your wealth growth via Systematic Investment Plans." },
  "gst-calculator": { title: "GST Calculator", component: GstCalculator, description: "Compute Net and Gross prices adding or removing GST." },
  "fd-calculator": { title: "FD (Fixed Deposit) Calculator", component: FdCalculator, description: "Check maturity amounts and interest returns on Fixed Deposits." },
  "loan-calculator": { title: "Loan Calculator", component: LoanCalculator, description: "Amortize and check payments breakdown for your finances." },
  "age-calculator": { title: "Age Calculator", component: AgeCalculator, description: "Find out exact age metrics in years, months, and days." },
  "percentage-calculator": { title: "Percentage Calculator", component: PercentageCalculator, description: "Solve percent variations, relative adjustments instantly." },
  "discount-calculator": { title: "Discount Calculator", component: DiscountCalculator, description: "Calculate precise markdown savings and net final cost amounts." },
  // ✅ FIXED: Matched slug to "qr-generator" from LandingPage / NAV_LINKS index
  "qr-generator": { title: "QR Code Generator", component: QrGenerator, description: "Convert links, URLs or text blocks straight into downloadable QR vectors." },
  "password-generator": { title: "Password Generator", component: PasswordGenerator, description: "Generate robust alphanumeric strings matching custom constraints." },
  "json-formatter": { title: "JSON Formatter", component: JsonFormatter, description: "Beautify, parse, validate or compress JSON inputs instantly." },
  // ✅ FIXED: Matched slug to "base64-converter" from LandingPage / NAV_LINKS index
  "base64-converter": { title: "Base64 Encode/Decode", component: Base64Tool, description: "Safely process conversion encoding/decoding sequences." },
  "jwt-decoder": { title: "JWT Decoder", component: JwtDecoderTool, description: "Extract headers and token payload objects accurately." },
  "uuid-generator": { title: "UUID Generator", component: UuidGenerator, description: "Bulk generate production ready v4 Universally Unique Identifiers." },
  "regex-tester": { title: "Regex Tester", component: RegexTester, description: "Test matching sequences over input arrays dynamically." },
  "word-counter": { title: "Word Counter", component: WordCounter, description: "Extract complete paragraph patterns and length statistics." },
  "character-counter": { title: "Character Counter", component: CharacterCounter, description: "Review physical symbol spaces with strict boundary rules." },
  "case-converter": { title: "Case Converter", component: CaseConverter, description: "Cycle strings through dynamic stylistic visual transforms." },
  "text-reverser": { title: "Text Reverser", component: TextReverser, description: "Mirror words or entire arrays chronologically backwards." },
  "slug-generator": { title: "Slug Generator", component: SlugGenerator, description: "Format raw web titles cleanly into semantic URL components." },
};

export async function generateStaticParams() {
  return Object.keys(toolsMap).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ToolPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tool = toolsMap[resolvedParams.slug];

  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
      <Navbar />
      
      <main className="w-full flex-grow px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 text-left">
            <h1 className="font-['Sora'] text-3xl font-extrabold tracking-tight text-violet-600 dark:text-[#A6FF5D] sm:text-4xl">
              {tool.title}
            </h1>
            <p className="mt-2 text-base text-slate-500 dark:text-neutral-400 max-w-xl leading-relaxed">
              {tool.description}
            </p>
          </header>

          {/* Interactive Tool Area Card Wrapper */}
          <div className="bg-white dark:bg-slate-900/55 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm mb-12">
            <ToolComponent />
          </div>

          <hr className="border-slate-200 dark:border-white/10 my-8" />
          
          {/* SEO Text Core */}
          <article className="prose dark:prose-invert max-w-none text-slate-600 dark:text-neutral-300 space-y-6">
            <h2 className="font-['Sora'] text-xl font-bold text-slate-900 dark:text-white">
              How to use the {tool.title}
            </h2>
            <ol className="list-decimal pl-5 space-y-3 text-sm sm:text-base leading-relaxed">
              <li>Input your raw parameters inside the active interactive workspace interface.</li>
              <li>Observe instantaneous output modifications computing smoothly down runtime threads without browser reload events.</li>
              <li>Utilize functional action modifiers like copy configurations to pull finalized output matrices securely.</li>
            </ol>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// import { notFound } from "next/navigation";
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
// const toolsMap: Record<string, { title: string; component: React.ComponentType; description: string }> = {
//   "emi-calculator": { title: "EMI Calculator", component: EmiCalculator, description: "Calculate Equated Monthly Installments for loans easily." },
//   "sip-calculator": { title: "SIP Calculator", component: SipCalculator, description: "Estimate your wealth growth via Systematic Investment Plans." },
//   "gst-calculator": { title: "GST Calculator", component: GstCalculator, description: "Compute Net and Gross prices adding or removing GST." },
//   "fd-calculator": { title: "FD (Fixed Deposit) Calculator", component: FdCalculator, description: "Check maturity amounts and interest returns on Fixed Deposits." },
//   "loan-calculator": { title: "Loan Calculator", component: LoanCalculator, description: "Amortize and check payments breakdown for your finances." },
//   "age-calculator": { title: "Age Calculator", component: AgeCalculator, description: "Find out exact age metrics in years, months, and days." },
//   "percentage-calculator": { title: "Percentage Calculator", component: PercentageCalculator, description: "Solve percent variations, relative adjustments instantly." },
//   "discount-calculator": { title: "Discount Calculator", component: DiscountCalculator, description: "Calculate precise markdown savings and net final cost amounts." },
//   "qr-code-generator": { title: "QR Code Generator", component: QrGenerator, description: "Convert links, URLs or text blocks straight into downloadable QR vectors." },
//   "password-generator": { title: "Password Generator", component: PasswordGenerator, description: "Generate robust alphanumeric strings matching custom constraints." },
//   "json-formatter": { title: "JSON Formatter", component: JsonFormatter, description: "Beautify, parse, validate or compress JSON inputs instantly." },
//   "base64-encode-decode": { title: "Base64 Encode/Decode", component: Base64Tool, description: "Safely process conversion encoding/decoding sequences." },
//   "jwt-decoder": { title: "JWT Decoder", component: JwtDecoderTool, description: "Extract headers and token payload objects accurately." },
//   "uuid-generator": { title: "UUID Generator", component: UuidGenerator, description: "Bulk generate production ready v4 Universally Unique Identifiers." },
//   "regex-tester": { title: "Regex Tester", component: RegexTester, description: "Test matching sequences over input arrays dynamically." },
//   "word-counter": { title: "Word Counter", component: WordCounter, description: "Extract complete paragraph patterns and length statistics." },
//   "character-counter": { title: "Character Counter", component: CharacterCounter, description: "Review physical symbol spaces with strict boundary rules." },
//   "case-converter": { title: "Case Converter", component: CaseConverter, description: "Cycle strings through dynamic stylistic visual transforms." },
//   "text-reverser": { title: "Text Reverser", component: TextReverser, description: "Mirror words or entire arrays chronologically backwards." },
//   "slug-generator": { title: "Slug Generator", component: SlugGenerator, description: "Format raw web titles cleanly into semantic URL components." },
// };

// export async function generateStaticParams() {
//   return Object.keys(toolsMap).map((slug) => ({ slug }));
// }

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// export default async function ToolPage({ params }: PageProps) {
//   const resolvedParams = await params;
//   const tool = toolsMap[resolvedParams.slug];

//   if (!tool) {
//     notFound();
//   }

//   const ToolComponent = tool.component;

//   return (
//     <>
//       <Navbar/>
//       <header className="max-w-4xl mx-auto px-6 pt-8 text-left">
//         <h1 className="text-3xl font-extrabold text-violet-600 dark:text-[#A6FF5D]">
//           {tool.title}
//         </h1>
//         <p className="mt-1.5 text-sm text-gray-500 dark:text-neutral-400 max-w-xl">
//           {tool.description}
//         </p>
//       </header>

//       <main className="max-w-4xl mx-auto p-6 pb-12">
//         {/* Interactive Tool Card Area */}
//         <div className="bg-neutral-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-md mb-12">
//           <ToolComponent />
//         </div>

//         {/* PRD Compliant SEO Base Text Layout Block */}
//         <hr className="border-gray-200 dark:border-neutral-800 my-8" />
//         <article className="prose dark:prose-invert max-w-none text-gray-700 dark:text-neutral-300 space-y-6">
//           <h2 className="text-xl font-semibold text-violet-600 dark:text-[#A6FF5D]">How to use the {tool.title}</h2>
//           <ol className="list-decimal pl-5 space-y-2">
//             <li>Input your raw parameters inside the active interactive workspace interface.</li>
//             <li>Observe instantaneous output modifications computing smoothly down runtime threads without browser reload events.</li>
//             <li>Utilize functional action modifiers like copy configurations to pull finalized output matrices securely.</li>
//           </ol>
//         </article>
//       </main>
//     </>
//   );
// }

