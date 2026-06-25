"use client";



import { useState } from "react";

import Link from "next/link";

import { Eye, EyeOff, ArrowRight, Zap } from "lucide-react";



const orbStyles = `

  .auth-orb {

    position: absolute;

    border-radius: 9999px;

    filter: blur(80px);

    animation: authFloat 8s ease-in-out infinite;

  }

  .auth-orb-1 { width: 400px; height: 400px; top: -100px; right: -80px; animation-delay: 0s; }

  .auth-orb-2 { width: 300px; height: 300px; bottom: -80px; left: -60px; animation-delay: -3s; }

  .auth-orb-3 { width: 200px; height: 200px; top: 40%; left: 30%; animation-delay: -5s; }

  @keyframes authFloat {

    0%, 100% { transform: translateY(0px) scale(1); }

    33%       { transform: translateY(-20px) scale(1.03); }

    66%       { transform: translateY(10px) scale(0.97); }

  }

`;



export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [focusedField, setFocusedField] = useState<string | null>(null);



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setIsLoading(true);

    // Connect your auth logic here

    await new Promise((r) => setTimeout(r, 1500));

    setIsLoading(false);

  };



  const inputWrap = (field: string) =>

    `relative rounded-xl border transition-all duration-200 bg-white dark:bg-gray-900 ${

      focusedField === field

        ? "border-violet-500 dark:border-[#A6FF5B] shadow-[0_0_0_3px_rgba(139,92,246,0.15)] dark:shadow-[0_0_0_3px_rgba(166,255,91,0.12)]"

        : "border-gray-200 dark:border-gray-700"

    }`;



  return (

    <>

      <style dangerouslySetInnerHTML={{ __html: orbStyles }} />



      <div className="min-h-screen flex bg-white dark:bg-[#0a0a0a] transition-colors duration-500">

        {/* ── Left Brand Panel ── */}

        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-violet-600 dark:bg-[#0d0d0d] flex-col items-center justify-center p-12">

          <div className="absolute inset-0 overflow-hidden pointer-events-none">

            <div className="auth-orb auth-orb-1 bg-violet-400/40 dark:bg-[#A6FF5B]/20" />

            <div className="auth-orb auth-orb-2 bg-violet-800/30 dark:bg-[#A6FF5B]/10" />

            <div className="auth-orb auth-orb-3 bg-white/10 dark:bg-[#A6FF5B]/15" />

            <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">

              <defs>

                <pattern id="login-grid" width="48" height="48" patternUnits="userSpaceOnUse">

                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />

                </pattern>

              </defs>

              <rect width="100%" height="100%" fill="url(#login-grid)" />

            </svg>

          </div>



          <div className="relative z-10 text-white dark:text-[#A6FF5B] max-w-sm text-center space-y-8">

            <div className="flex items-center justify-center gap-2">

              <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-[#A6FF5B]/20 flex items-center justify-center backdrop-blur-sm">

                <Zap size={20} className="text-white dark:text-[#A6FF5B] fill-current" />

              </div>

              <span className="text-xl font-bold tracking-tight">YourBrand</span>

            </div>



            <div className="space-y-3">

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight">

                Welcome<br />back.

              </h1>

              <p className="text-white/70 dark:text-[#A6FF5B]/60 text-base leading-relaxed">

                Sign in to pick up exactly where you left off. Everything is waiting for you.

              </p>

            </div>



            <div className="bg-white/10 dark:bg-[#A6FF5B]/10 backdrop-blur-sm rounded-2xl p-5 text-left border border-white/20 dark:border-[#A6FF5B]/20">

              <p className="text-sm text-white/90 dark:text-[#A6FF5B]/80 leading-relaxed italic">

                &ldquo;This platform completely changed how our team works. The speed is unreal.&rdquo;

              </p>

              <div className="flex items-center gap-3 mt-4">

                <div className="w-8 h-8 rounded-full bg-violet-400 dark:bg-[#A6FF5B]/30 flex items-center justify-center text-xs font-bold text-white dark:text-[#A6FF5B]">

                  AK

                </div>

                <div>

                  <p className="text-xs font-semibold text-white dark:text-[#A6FF5B]">Arjun K.</p>

                  <p className="text-xs text-white/50 dark:text-[#A6FF5B]/40">Product Lead, Acme Inc</p>

                </div>

              </div>

            </div>

          </div>

        </div>



        {/* ── Right Form Panel ── */}

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">

          <div className="w-full max-w-md space-y-8">

            {/* Mobile logo */}

            <div className="flex items-center gap-2 lg:hidden">

              <div className="w-9 h-9 rounded-xl bg-violet-600 dark:bg-[#A6FF5B] flex items-center justify-center">

                <Zap size={18} className="text-white dark:text-black fill-current" />

              </div>

              <span className="text-lg font-bold text-gray-900 dark:text-white">YourBrand</span>

            </div>



            <div className="space-y-1">

              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Sign in</h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm">

                Don&apos;t have an account?{" "}

                <Link href="/signup" className="text-violet-600 dark:text-[#A6FF5B] font-semibold hover:underline underline-offset-2">

                  Create one free

                </Link>

              </p>

            </div>



            {/* Social buttons */}

            <div className="grid grid-cols-2 gap-3">

              {["Google", "GitHub"].map((provider) => (

                <button

                  key={provider}

                  type="button"

                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-violet-400 dark:hover:border-[#A6FF5B]/60 hover:bg-violet-50 dark:hover:bg-[#A6FF5B]/5 transition-all duration-200"

                >

                  {provider === "Google" ? (

                    <svg className="w-4 h-4" viewBox="0 0 24 24">

                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />

                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />

                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />

                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />

                    </svg>

                  ) : (

                    <svg className="w-4 h-4 fill-current text-gray-800 dark:text-white" viewBox="0 0 24 24">

                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />

                    </svg>

                  )}

                  {provider}

                </button>

              ))}

            </div>



            <div className="flex items-center gap-3">

              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />

              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">or continue with email</span>

              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />

            </div>



            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}

              <div className="space-y-1.5">

                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>

                <div className={inputWrap("email")}>

                  <input

                    type="email"

                    value={email}

                    onChange={(e) => setEmail(e.target.value)}

                    onFocus={() => setFocusedField("email")}

                    onBlur={() => setFocusedField(null)}

                    placeholder="you@example.com"

                    required

                    className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"

                  />

                </div>

              </div>



              {/* Password */}

              <div className="space-y-1.5">

                <div className="flex items-center justify-between">

                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>

                  <Link href="/forgot-password" className="text-xs text-violet-600 dark:text-[#A6FF5B] hover:underline underline-offset-2">

                    Forgot password?

                  </Link>

                </div>

                <div className={inputWrap("password")}>

                  <input

                    type={showPassword ? "text" : "password"}

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                    onFocus={() => setFocusedField("password")}

                    onBlur={() => setFocusedField(null)}

                    placeholder="••••••••"

                    required

                    className="w-full px-4 py-3 pr-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"

                  />

                  <button

                    type="button"

                    onClick={() => setShowPassword(!showPassword)}

                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"

                  >

                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}

                  </button>

                </div>

              </div>



              {/* Submit */}

              <button

                type="submit"

                disabled={isLoading}

                className="relative w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 bg-violet-600 hover:bg-violet-700 dark:bg-[#A6FF5B] dark:hover:bg-[#8fe63e] text-white dark:text-black shadow-lg shadow-violet-200 dark:shadow-[#A6FF5B]/20 disabled:opacity-60 disabled:cursor-not-allowed group overflow-hidden"

              >

                <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}>

                  Sign in

                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />

                </span>

                {isLoading && (

                  <span className="absolute inset-0 flex items-center justify-center">

                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">

                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />

                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />

                    </svg>

                  </span>

                )}

              </button>

            </form>



            <p className="text-center text-xs text-gray-400 dark:text-gray-600">

              By signing in you agree to our{" "}

              <Link href="/terms" className="underline underline-offset-2 hover:text-violet-600 dark:hover:text-[#A6FF5B]">Terms</Link>

              {" "}&amp;{" "}

              <Link href="/privacy" className="underline underline-offset-2 hover:text-violet-600 dark:hover:text-[#A6FF5B]">Privacy</Link>

            </p>

          </div>

        </div>

      </div>

    </>

  );

}

