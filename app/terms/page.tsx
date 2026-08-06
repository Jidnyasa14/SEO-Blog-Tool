import React from "react";
import Navbar from "@/components/Landingpage/Navbar";
import Footer from "@/components/Landingpage/Footer";

export const metadata = {
  title: "Terms and Conditions | Toolverse",
  description: "Terms and Conditions governing the use of Toolverse web utilities.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
      <Navbar />

      <main className="w-full flex-grow px-4 py-16 sm:px-6 lg:px-8 leading-relaxed">
        <div className="mx-auto max-w-3xl bg-white dark:bg-slate-900/55 border border-slate-200/80 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-xs text-left">
          <h1 className="font-['Sora'] text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#A6FF5D] mb-2 sm:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mb-10 text-xs font-mono text-slate-400 dark:text-zinc-500">
            Last Updated: July 2026
          </p>

          <div className="space-y-8 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing and utilizing Toolverse, you agree to be bound by these Terms and Conditions. If you do not accept these terms in full, please refrain from using our web utilities.
              </p>
            </section>

            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                2. License & Intellectual Property Rights
              </h2>
              <p>
                Unless explicitly stated, Toolverse and its creators own the intellectual property rights for all material, dynamic engines, and functional modules available on this platform. All intellectual property rights are reserved.
              </p>
            </section>

            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                3. Disclaimer of Calculation Accuracy
              </h2>
              <p>
                The online tools, financial calculators, and informational material on Toolverse are provided for general informational and utility purposes only. While we perform rigorous checks, Toolverse assumes no liability for discrepancies, omissions, or choices made based on calculated outputs.
              </p>
            </section>

            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                4. Governing Law
              </h2>
              <p>
                These terms and conditions are governed by and construed in accordance with applicable web regulations and consumer privacy standards.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}