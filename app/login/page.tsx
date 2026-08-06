'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';

import { LogIn, UserPlus, Mail, Lock, AlertCircle, ArrowRight, Zap, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function UserLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/user-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('active_user', JSON.stringify({ email: formData.email }));
        localStorage.setItem('userToken', data.token || 'user_active');
        router.push('/');
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during authentication. Please try again.');
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

                {/* Active Login Tab */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/20 dark:bg-[#A6FF5D]/15 text-white dark:text-[#A6FF5D] font-bold text-xs backdrop-blur-md border border-white/20 dark:border-[#A6FF5D]/30 shadow-xs">
                  <LogIn size={16} />
                  <span>Sign In</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white dark:bg-[#A6FF5D]" />
                </div>

                {/* Navigatable Signup Link */}
                <Link
                  href="/signup"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-violet-100 hover:text-white dark:text-neutral-400 dark:hover:text-white hover:bg-white/10 dark:hover:bg-neutral-800/60 font-semibold text-xs transition duration-200 cursor-pointer"
                >
                  <UserPlus size={16} />
                  <span>Create Account</span>
                  <ArrowRight size={14} className="ml-auto opacity-60" />
                </Link>
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
                Need help logging in? <Link href="/contact" className="underline hover:text-white dark:hover:text-[#A6FF5D]">Contact Support</Link>
              </p>
            </div>
          </div>

          {/* ── Main Login Form Area ── */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-[#A6FF5D] text-xs font-bold mb-1">
                  <LogIn size={14} /> Member Sign In
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Sign in to your account
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Enter your credentials to continue
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
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] font-semibold text-violet-600 hover:underline dark:text-[#A6FF5D]"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#A6FF5D]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-violet-600 hover:bg-violet-700 dark:bg-[#A6FF5D] dark:text-black dark:hover:bg-[#95ee4c] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading ? 'Signing in...' : <>Sign In <ArrowRight size={14} /></>}
                </button>
              </form>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Dont have an account?{' '}
                  <Link
                    href="/signup"
                    className="font-bold text-violet-600 hover:underline dark:text-[#A6FF5D]"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      
    </div>
  );
}

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import Navbar from './Navbar';

// import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

// export default function UserLoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/auth/user-login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // Save user session token / flag
//         localStorage.setItem('userToken', data.token || 'user_active');
//         localStorage.setItem('userData', JSON.stringify(data.user));
        
//         // Redirect standard user to homepage or user profile
//         router.push('/');
//       } else {
//         setError(data.message || 'Invalid email or password.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('An error occurred during authentication. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black text-left">
//       <Navbar />

//       <main className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 mt-6">
//         <div className="w-full max-w-md space-y-8 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-8 rounded-3xl shadow-sm">
//           <div className="text-center space-y-2">
//             <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-[#A6FF5D] mb-2">
//               <LogIn className="w-6 h-6" />
//             </div>
//             <h1 className="text-2xl font-black text-slate-900 dark:text-white">
//               Welcome Back
//             </h1>
//             <p className="text-xs text-slate-500 dark:text-neutral-400">
//               Sign in to your account to continue
//             </p>
//           </div>

//           {error && (
//             <div className="p-3.5 rounded-xl border bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800 text-xs font-semibold flex items-center gap-2">
//               <AlertCircle size={16} className="shrink-0" />
//               <span>{error}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-1">
//               <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   placeholder="name@example.com"
//                   className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#A6FF5D]"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <div className="flex items-center justify-between">
//                 <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
//                   Password
//                 </label>
//                 <Link
//                   href="/forgot-password"
//                   className="text-[11px] font-semibold text-violet-600 hover:underline dark:text-[#A6FF5D]"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
//                 <input
//                   type="password"
//                   required
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   placeholder="••••••••"
//                   className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 dark:border-neutral-800 rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#A6FF5D]"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-violet-600 hover:bg-violet-700 dark:bg-[#A6FF5D] dark:text-black dark:hover:bg-[#95ee4c] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
//             >
//               {loading ? 'Signing in...' : <>Sign In <ArrowRight size={14} /></>}
//             </button>
//           </form>

//           <div className="text-center pt-2">
//             <p className="text-xs text-slate-500 dark:text-neutral-400">
//               Dont have an account?{' '}
//               <Link
//                 href="/signup"
//                 className="font-bold text-violet-600 hover:underline dark:text-[#A6FF5D]"
//               >
//                 Create Account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </main>

      
//     </div>
//   );
// }