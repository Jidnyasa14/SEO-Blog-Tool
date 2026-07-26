import React from "react";
import Navbar from "@/components/Landingpage/Navbar";
import Footer from "@/components/Landingpage/Footer";
import { Wrench, ShieldCheck, Zap, Globe } from "lucide-react";

export const metadata = {
  title: "About Us | Toolverse",
  description: "Learn about Toolverse, our mission, and our high-performance interactive utilities.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black text-slate-900 dark:text-white">
      <Navbar />

      <main className="w-full flex-grow px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12 text-left">
          <header className="space-y-4">
            <span className="px-3 py-1 bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-[#A6FF5D] text-xs font-bold rounded-full">
              About Toolverse
            </span>
            <h1 className="font-['Sora'] text-3xl sm:text-5xl font-extrabold tracking-tight">
              Empowering Users with Instant, Secure & Smart Web Tools
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed">
              Toolverse is a dedicated platform designed to provide fast, reliable, and accessible online calculators, text processors, and developer utilities—completely free of charge.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl space-y-3">
              <Zap className="w-8 h-8 text-violet-600 dark:text-[#A6FF5D]" />
              <h3 className="text-lg font-bold">Client-Side Speed</h3>
              <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                Our calculation engines execute locally in your browser workspace, providing immediate outputs without unnecessary server latency.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl space-y-3">
              <ShieldCheck className="w-8 h-8 text-violet-600 dark:text-[#A6FF5D]" />
              <h3 className="text-lg font-bold">Privacy First</h3>
              <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                We believe your data belongs to you. Inputs processed inside our tools stay strictly in your browser session.
              </p>
            </div>
          </div>

          <article className="prose dark:prose-invert max-w-none text-slate-600 dark:text-neutral-300 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Story & Mission</h2>
            <p>
              Founded with the goal of simplifying everyday tasks, Toolverse combines essential financial calculators, developer converters, and utility tools under a unified, intuitive interface.
            </p>
            <p>
              Whether you are evaluating complex interest rates, reformatting JSON payloads, or generating secure passwords, our tools are engineered to be accurate, responsive, and easy to use.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}