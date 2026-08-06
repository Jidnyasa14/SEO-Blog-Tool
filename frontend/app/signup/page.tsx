'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/login/Navbar';
import Footer from '@/components/Landingpage/Footer';
import { 
  LogIn, 
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  AlertCircle, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Check, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ characters', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /[0-9]/.test(password) },
    { label: 'Special character', pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][score];
  const barColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-emerald-400'][score];

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? barColor : 'bg-slate-200 dark:bg-neutral-700'}`}
          />
        ))}
        <span className="text-[10px] text-slate-500 dark:text-neutral-400 ml-1 w-12 text-right">{strengthLabel}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5">
            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200 ${c.pass ? 'bg-violet-600 dark:bg-[#A6FF5D]' : 'border border-slate-300 dark:border-neutral-600'}`}>
              {c.pass && <Check size={9} className="text-white dark:text-black" strokeWidth={3} />}
            </div>
            <span className={`text-[11px] transition-colors duration-200 ${c.pass ? 'text-slate-700 dark:text-neutral-200' : 'text-slate-400 dark:text-neutral-500'}`}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const passwordsMatch = formData.confirm.length > 0 && formData.password === formData.confirm;
  const passwordsMismatch = formData.confirm.length > 0 && formData.password !== formData.confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || passwordsMismatch) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Account creation failed.');
      }

      setSuccess('Account created successfully! Redirecting to login…');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected network error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0a0a0a] text-left transition-colors duration-300">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* ── Navigatable Left Sidebar ── */}
          <div className="w-full md:w-80 bg-gradient-to-br from-violet-600 to-indigo-700 dark:from-neutral-950 dark:to-neutral-900 p-6 md:p-8 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-neutral-800 shrink-0">
            <div className="space-y-6">
              {/* Brand Header */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/20 dark:bg-[#A6FF5D]/20 flex items-center justify-center backdrop-blur-sm">
                  <Zap size={18} className="text-white dark:text-[#A6FF5D] fill-current" />
                </div>
                <span className="font-extrabold text-lg tracking-tight">Toolverse</span>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-violet-200 dark:text-neutral-500 mb-2">
                  Authentication
                </p>

                {/* Navigatable Sign In Link */}
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-violet-100 hover:text-white dark:text-neutral-400 dark:hover:text-white hover:bg-white/10 dark:hover:bg-neutral-800/60 font-semibold text-xs transition duration-200 cursor-pointer"
                >
                  <LogIn size={16} />
                  <span>Sign In</span>
                  <ArrowRight size={14} className="ml-auto opacity-60" />
                </Link>

                {/* Active Create Account Tab */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/20 dark:bg-[#A6FF5D]/15 text-white dark:text-[#A6FF5D] font-bold text-xs backdrop-blur-md border border-white/20 dark:border-[#A6FF5D]/30 shadow-xs">
                  <UserPlus size={16} />
                  <span>Create Account</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white dark:bg-[#A6FF5D]" />
                </div>
              </div>

              {/* Platform Highlights */}
              {/* <div className="space-y-2.5 pt-4 border-t border-white/10 dark:border-neutral-800/80">
                <div className="flex items-center gap-2.5 text-xs text-violet-100 dark:text-neutral-300">
                  <CheckCircle2 size={15} className="text-violet-200 dark:text-[#A6FF5D] shrink-0" />
                  <span>Instant access to 50+ web utilities</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-violet-100 dark:text-neutral-300">
                  <ShieldCheck size={15} className="text-violet-200 dark:text-[#A6FF5D] shrink-0" />
                  <span>Encrypted & private execution</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-violet-100 dark:text-neutral-300">
                  <Sparkles size={15} className="text-violet-200 dark:text-[#A6FF5D] shrink-0" />
                  <span>Fast, browser-based processing</span>
                </div>
              </div> */}
            </div>

            {/* Support Footer */}
            <div className="pt-6 mt-6 border-t border-white/10 dark:border-neutral-800">
              <p className="text-[11px] text-violet-200 dark:text-neutral-500">
                Need help signing up? <Link href="/contact" className="underline hover:text-white dark:hover:text-[#A6FF5D]">Contact Support</Link>
              </p>
            </div>
          </div>

          {/* ── Main Signup Form Area ── */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-[#A6FF5D] text-xs font-bold mb-1">
                  <UserPlus size={14} /> New Member
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Create Account
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Sign up to get started
                </p>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl border bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-3.5 rounded-xl border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <Check size={16} className="shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Priya Sharma"
                      className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#A6FF5D]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#A6FF5D]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Create a strong password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#A6FF5D]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <PasswordStrength password={formData.password} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      required
                      value={formData.confirm}
                      onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
                      placeholder="Repeat your password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#A6FF5D]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                    >
                      {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {passwordsMismatch && (
                    <p className="text-[11px] text-red-500 mt-1">Passwords don&apos;t match</p>
                  )}
                  {passwordsMatch && (
                    <p className="text-[11px] text-emerald-500 mt-1 flex items-center gap-1">
                      <Check size={11} strokeWidth={3} /> Passwords match
                    </p>
                  )}
                </div>

                <div
                  className="flex items-start gap-3 cursor-pointer group pt-1"
                  onClick={() => setAgreed(!agreed)}
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${
                      agreed
                        ? 'bg-violet-600 dark:bg-[#A6FF5D] border-violet-600 dark:border-[#A6FF5D]'
                        : 'border-slate-300 dark:border-neutral-600 group-hover:border-violet-400 dark:group-hover:border-[#A6FF5D]/60'
                    }`}
                  >
                    {agreed && <Check size={10} className="text-white dark:text-black" strokeWidth={3} />}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-neutral-400 leading-relaxed select-none">
                    I agree to the{' '}
                    <Link href="/terms" onClick={(e) => e.stopPropagation()} className="font-semibold text-violet-600 hover:underline dark:text-[#A6FF5D]">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" onClick={(e) => e.stopPropagation()} className="font-semibold text-violet-600 hover:underline dark:text-[#A6FF5D]">
                      Privacy Policy
                    </Link>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading || !agreed || passwordsMismatch}
                  className="w-full py-3 bg-violet-600 hover:bg-violet-700 dark:bg-[#A6FF5D] dark:text-black dark:hover:bg-[#95ee4c] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading ? 'Creating account...' : <>Create Account <ArrowRight size={14} /></>}
                </button>
              </form>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="font-bold text-violet-600 hover:underline dark:text-[#A6FF5D]"
                  >
                    Sign In
                  </Link>
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