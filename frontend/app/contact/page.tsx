'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Landingpage/Navbar';
import Footer from '@/components/Landingpage/Footer';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setStatus({ type: 'success', msg: resData.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: resData.message || 'Failed to send message.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: 'A network communication error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black text-left">
      <Navbar />

      <main className="w-full flex-grow px-4 py-12 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-4">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-[#A6FF5D] sm:text-4xl flex items-center gap-3">
            <Mail className="w-8 h-8 text-violet-600 dark:text-[#A6FF5D]" /> Contact Support
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400">
            Send us a message and our team will get back to you right away.
          </p>
        </div>

        {status && (
          <div className={`p-4 mb-6 rounded-xl border flex items-center gap-3 text-xs font-semibold ${
            status.type === 'success' 
              ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800' 
              : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800'
          }`}>
            {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-neutral-300">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-violet-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-neutral-300">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-violet-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 dark:text-neutral-300">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Inquiry or Feedback"
              className="w-full px-4 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-violet-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 dark:text-neutral-300">Message</label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your message details..."
              className="w-full p-4 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-violet-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-violet-600 hover:bg-violet-700 dark:bg-[#A6FF5D] dark:text-black text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Transmitting Message...' : <>Submit Message <Send size={14} /></>}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}