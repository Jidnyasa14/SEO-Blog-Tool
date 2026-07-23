'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/login/Navbar';
import Footer from '@/components/Landingpage/Footer';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight, KeyRound, Sparkles, Terminal } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // ✅ Critical for app/admin/layout.tsx check
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('adminToken', data.token || 'admin_active');
      
      router.push('/admin');
    } else {
      setError(data.message || 'Invalid admin credentials.');
    }
  } catch (err) {
    console.error(err);
    setError('An error occurred during authentication.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0a0a0a] text-left transition-colors duration-300">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* ── Admin Portal Sidebar ── */}
          <div className="w-full md:w-80 bg-gradient-to-br from-slate-900 via-zinc-900 to-black p-6 md:p-8 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 shrink-0">
            <div className="space-y-6">
              {/* Portal Header */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-600/30 dark:bg-[#A6FF5D]/20 border border-violet-500/40 dark:border-[#A6FF5D]/30 flex items-center justify-center backdrop-blur-sm">
                  <ShieldCheck size={20} className="text-violet-400 dark:text-[#A6FF5D]" />
                </div>
                <div>
                  <span className="font-extrabold text-base tracking-tight block">Toolverse</span>
                  <span className="text-[10px] font-mono text-violet-400 dark:text-[#A6FF5D] uppercase tracking-wider block">Admin Control</span>
                </div>
              </div>

              {/* Security Banner */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-violet-300 dark:text-[#A6FF5D]">
                  <Terminal size={14} />
                  <span>Restricted Portal</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Authorized personnel only. Logs and session identifiers are audited.
                </p>
              </div>

              {/* Admin Privileges */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  System Operations
                </p>
                <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                  <KeyRound size={15} className="text-violet-400 dark:text-[#A6FF5D] shrink-0" />
                  <span>Manage Platform Tools & DB</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                  <Sparkles size={15} className="text-violet-400 dark:text-[#A6FF5D] shrink-0" />
                  <span>Publish Blog Articles</span>
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <p className="text-[11px] text-neutral-500">
                Not an administrator? <Link href="/login" className="underline hover:text-white dark:hover:text-[#A6FF5D]">User Login</Link>
              </p>
            </div>
          </div>

          {/* ── Main Admin Login Form ── */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-[#A6FF5D] text-xs font-bold mb-1 border border-slate-200 dark:border-neutral-700">
                  <ShieldCheck size={14} /> Admin Verification
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Administrator Sign In
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Authenticate with your permanent admin credentials
                </p>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl border bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#A6FF5D]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                    Master Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#A6FF5D]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-slate-900 hover:bg-black dark:bg-[#A6FF5D] dark:text-black dark:hover:bg-[#95ee4c] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 shadow-md"
                >
                  {loading ? 'Authenticating Admin...' : <>Access Admin Panel <ArrowRight size={14} /></>}
                </button>
              </form>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-400 dark:text-neutral-500">
                  Credentials are configured in your environment variable (`ADMIN_EMAIL`).
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}