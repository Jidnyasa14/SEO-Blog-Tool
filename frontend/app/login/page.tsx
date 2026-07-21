"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // ✅ PERMANENT SYNC: Write validation flags to localStorage right away
        localStorage.setItem("admin_logged_in", "true");
        localStorage.setItem("active_user", JSON.stringify({
          email: email.toLowerCase(),
          isLoggedIn: true
        }));

        // Push directly past the middleware into the admin panel space
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Authentication failed.");
      }
    } catch (err) {
      setError("An unexpected network exception occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-black p-4 text-left">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-md space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Authentication</h2>
          <p className="text-xs text-slate-400 mt-0.5">Enter credentials to open control console access nodes.</p>
        </div>

        {error && <p className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/30 p-2.5 rounded-lg border border-red-200/20">{error}</p>}

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500">Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2.5 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-xl text-slate-900 dark:text-white focus:outline-violet-600" required />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-xl text-slate-900 dark:text-white focus:outline-violet-600" required />
        </div>

        <button type="submit" disabled={loading} className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl cursor-pointer transition select-none">
          {loading ? "Verifying Keys..." : "Access Control Node"}
        </button>
      </form>
    </div>
  );
}