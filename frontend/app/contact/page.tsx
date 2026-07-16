'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import Navbar from '@/components/Landingpage/Navbar';
import Footer from '@/components/Landingpage/Footer';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please supply a correct email format.' }),
  message: z.string().min(10, { message: 'Message content must clear 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log('Contact form packet received:', data);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#000000]">
      <Navbar />

      <main className="w-full flex-grow px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900/55 md:p-10">
          <div className="mb-4 flex items-center space-x-3">
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-[#A6FF5D]/10 dark:text-[#A6FF5D]">
              <FaEnvelope className="text-xl" />
            </div>
            <h1 className="font-['Sora'] text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Get in Touch
            </h1>
          </div>
          <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
            Have structural inquiries regarding utility calculations? Contact us directly below.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Your Name
              </label>
              <input
                {...register('name')}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:border-violet-500 dark:border-white/10 dark:bg-slate-800/60 dark:text-white dark:focus:border-[#A6FF5D]"
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:border-violet-500 dark:border-white/10 dark:bg-slate-800/60 dark:text-white dark:focus:border-[#A6FF5D]"
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Message Payload
              </label>
              <textarea
                rows={5}
                {...register('message')}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:border-violet-500 dark:border-white/10 dark:bg-slate-800/60 dark:text-white dark:focus:border-[#A6FF5D] resize-none"
                placeholder="Detail your feature requests..."
              />
              {errors.message && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50 dark:bg-[#A6FF5D] dark:text-slate-900 dark:hover:bg-[#95e650] cursor-pointer"
            >
              <FaPaperPlane className="text-xs" />
              {isSubmitting ? 'Transmitting Data...' : 'Dispatch Message'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}