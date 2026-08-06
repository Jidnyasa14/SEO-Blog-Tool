import Navbar from '@/components/Landingpage/Navbar';
import Footer from '@/components/Landingpage/Footer';

export const metadata = {
  title: 'Privacy Policy | Regulatory Standard Declarations',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
      <Navbar />

      <main className="w-full flex-grow px-4 py-16 sm:px-6 lg:px-8 leading-relaxed">
        <div className="mx-auto max-w-3xl bg-white dark:bg-slate-900/55 border border-slate-200/80 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-xs">
          <h1 className="font-['Sora'] text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#A6FF5D] mb-2 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mb-10 text-xs font-mono text-slate-400 dark:text-zinc-500">Last Updated: June 2026</p>

          <div className="space-y-8 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            
            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                1. Data Tracking and Core Collection
              </h2>
              <p>
                Our runtime computational engines deliver automated code execution purely across local sandboxed environments.
                No tracking schemas harvest variables input inside our calculations metrics frameworks. Any details processed 
                remain entirely volatile within your browser memory pool stack instance.
              </p>
            </section>

            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                2. Google AdSense Cookie Mechanisms
              </h2>
              <p>
                We employ Google AdSense integrations to generate monetization support streams. Google leverages network
                cookies (such as the DART cookie) to publish custom advertising content based upon global web routing interactions. 
                Users preserve the absolute right to decline behavioral advertising profiling patterns by visiting the Google ad and 
                content network Privacy Policy page at your discretion.
              </p>
            </section>

            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                3. Log Files Architecture
              </h2>
              <p>
                Toolverse follows a standard procedure of using log files. These files log visitors when they visit websites. 
                The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service 
                Provider (ISP), date and time stamp, referring/exit pages, and optionally the number of clicks. These are not 
                linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, 
                administering the site, tracking users&apos; movement on the website, and gathering demographic information.
              </p>
            </section>

            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                4. CCPA Privacy Rights (Do Not Sell My Personal Information)
              </h2>
              <p className="mb-2">
                Under the CCPA, among other rights, California consumers have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Request that a business disclose the categories and specific pieces of personal data collected.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells a consumer&apos;s personal data, not sell that personal data.</li>
              </ul>
            </section>

            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                5. GDPR Data Protection Rights
              </h2>
              <p className="mb-2">
                We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-slate-800 dark:text-white">The right to access</strong> – You have the right to request copies of your personal data.</li>
                <li><strong className="text-slate-800 dark:text-white">The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong className="text-slate-800 dark:text-white">The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              </ul>
            </section>

            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                6. Children&apos;s Information Safeguards
              </h2>
              <p>
                Another part of our priority is adding protection for children while using the internet. We encourage parents and 
                guardians to observe, participate in, and/or monitor and guide their online activity. Toolverse does not knowingly 
                collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided 
                this kind of information on our website, we strongly encourage you to contact us immediately.
              </p>
            </section>

            <section className="border-l-2 border-violet-500/30 dark:border-[#A6FF5D]/30 pl-4">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                7. External Link Routing Architecture
              </h2>
              <p>
                Our educational spaces might highlight transactional context partner connections or affiliate networks. We maintain zero 
                liability or control over behavioral tracking practices utilized on destination spaces once you choose to exit this platform footprint.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}