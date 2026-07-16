import Link from 'next/link';
import { FaArrowRight, FaCoins, FaCode, FaSlidersH, FaFileAlt, FaFileImage } from 'react-icons/fa';
import Navbar from '@/components/Landingpage/Navbar';
import Footer from '@/components/Landingpage/Footer';

interface CategoryCard {
  title: string;
  slug: string;
  desc: string;
  count: number;
  icon: React.ReactNode;
  accentColor: string;
}

export const ALL_CATEGORIES: CategoryCard[] = [
  {
    title: 'Finance Tools',
    slug: 'finance',
    desc: 'Calculate loan EMIs, systematic investment plan compounding, taxes, and compound interests.',
    count: 5,
    icon: <FaCoins />,
    accentColor: 'text-purple-600 dark:text-[#A6FF5D]',
  },
  {
    title: 'Developer Utilities',
    slug: 'developer',
    desc: 'Format syntax representations, decode localized JWTs, convert structures into Base64 formats, or batch generate valid IDs.',
    count: 5,
    icon: <FaCode />,
    accentColor: 'text-blue-600 dark:text-sky-400',
  },
  {
    title: 'General Utility Engines',
    slug: 'utility',
    desc: 'Access scannable QR generation workflows, birthday computation counters, and markdown markdown discount tools.',
    count: 5,
    icon: <FaSlidersH />,
    accentColor: 'text-pink-600 dark:text-rose-400',
  },
  {
    title: 'Text Analytics Workspace',
    slug: 'text',
    desc: 'Track exact string formatting spaces, uppercase switches, or parse dynamic URL-friendly slug configurations.',
    count: 5,
    icon: <FaFileAlt />,
    accentColor: 'text-emerald-600 dark:text-teal-400',
  },
  {
    title: 'Image Optimization Suite',
    slug: 'image',
    desc: 'Compress file scales, manage layout dimension aspects, or alter configurations inside modern container formats.',
    count: 2,
    icon: <FaFileImage />,
    accentColor: 'text-amber-600 dark:text-yellow-400',
  },
];

export default function CategoriesHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
      <Navbar />

      <main className="w-full flex-grow px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">

          {/* Header Area Section */}
          <div className="mb-12 text-left">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-[#A6FF5D]">
              Ecosystem Map
            </p>
            <h1 className="font-['Sora'] text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#A6FF5D] sm:text-4xl">
              Browse Tools By Category
            </h1>
            <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
              Select an isolated technical domain segment to view its specialized interactive applications and associated core guides.
            </p>
          </div>

          {/* Cards Layout Engine Grid Mapping Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500 hover:shadow-md dark:border-white/10 dark:bg-slate-900/55 dark:shadow-none dark:hover:border-[#A6FF5D]"
              >
                <div>
                  <div className={`mb-4 inline-flex p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xl border border-slate-100 dark:border-white/5 ${category.accentColor}`}>
                    {category.icon}
                  </div>

                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 transition-colors group-hover:text-violet-600 dark:group-hover:text-[#A6FF5D]">
                    {category.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-6">
                    {category.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium">
                    {category.count} Modules Live
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-[#A6FF5D]">
                    Explore Sector
                    <FaArrowRight className="text-[10px] transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
