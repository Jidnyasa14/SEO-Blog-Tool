import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '@/components/Landingpage/Navbar';
import Footer from '@/components/Landingpage/Footer';

export const metadata = {
  title: 'About Us | Multi-Utility Toolverse Platform',
  description: 'Your premium technical home built to resolve processing calculations cleanly and instantaneously.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
      <Navbar />

      <main className="w-full flex-grow px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-['Sora'] text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#A6FF5D] mb-6">
            About Our Platform
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
            Welcome to our decentralized toolbox destination hub. We are committed to designing rapid,
            highly transparent responsive scripts focused entirely on browser-side compute utilities.
            By unifying interactive client architectures with educational breakdowns, we remove the guesswork
            from everyday calculations.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
            Core Structural Ideals
          </h2>
          <ul className="space-y-3 mb-8">
            {[
              'Ultra-fast Client side operational calculation engines.',
              'Lightweight layouts engineered for dynamic layout efficiency.',
              'Zero monetization gatekeeps for general consumers.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <FaCheckCircle className="mt-1 flex-shrink-0 text-violet-600 dark:text-[#A6FF5D]" />
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-slate-500 dark:text-slate-500 border-t border-slate-200 dark:border-white/10 pt-6">
            Platform Architecture Managed entirely by our designated Solo Product Engineering Unit.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}