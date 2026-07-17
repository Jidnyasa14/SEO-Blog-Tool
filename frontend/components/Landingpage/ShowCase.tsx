'use client';

import React from 'react';
import { useTheme } from 'next-themes';

export default function ShowcaseSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-[#F8F6FF] dark:from-black dark:to-[#060709] border-b border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        
        <div className="flex-1 max-w-xl text-left">
          <span className="text-xs font-bold tracking-widest uppercase text-violet-600 dark:text-[#A6FF5D] bg-violet-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-violet-200/40 dark:border-white/10">
            Powerful Browser Apps
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-6 text-slate-900 dark:text-white tracking-tight leading-tight">
            Fast, secure, and right in your browser.
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            No installations, no account registrations required, and 100% private. All computing operations execute completely locally inside your browser interface so your data never leaves your device.
          </p>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-[#0d0e12] border border-slate-200/60 dark:border-white/5">
              <h4 className="font-semibold text-sm text-slate-800 dark:text-zinc-200">🔒 Privacy First</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Zero server-side logs or data storage tracking.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#0d0e12] border border-slate-200/60 dark:border-white/5">
              <h4 className="font-semibold text-sm text-slate-800 dark:text-zinc-200">⚡ Blazing Fast</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Instant updates powered by client-side builds.</p>
            </div>
          </div>
        </div>

        
        <div className="flex-1 w-full max-w-2xl">
          <div className={`rounded-2xl border p-3 backdrop-blur-md shadow-2xl transition-all duration-300 ${
            isDark ? 'bg-zinc-900/40 border-zinc-800/80 shadow-black/50' : 'bg-white/70 border-violet-200/60 shadow-violet-900/10'
          }`}>
            <div className={`rounded-xl border overflow-hidden flex flex-col h-[340px] md:h-[400px] ${
              isDark ? 'bg-black border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}>
              
              <div className={`flex items-center gap-2 px-4 py-3 border-b ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-100 border-slate-200'}`}>
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400 block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 block" />
                  <span className="w-3 h-3 rounded-full bg-green-400 block" />
                </div>
                <div className={`mx-auto text-xs font-mono px-6 py-0.5 rounded-md max-w-xs truncate ${isDark ? 'bg-zinc-900 text-zinc-500' : 'bg-white text-slate-400'}`}>
                  toolverse.com/dashboard
                </div>
              </div>

              
              <div className="flex flex-1 overflow-hidden">
                
                <div className={`w-36 md:w-44 border-r p-3 hidden sm:flex flex-col gap-1.5 ${isDark ? 'border-zinc-800 bg-zinc-900/20' : 'border-slate-200 bg-slate-100/50'}`}>
                  <div className={`h-6 rounded-md w-full ${isDark ? 'bg-zinc-800' : 'bg-slate-200/70'}`} />
                  <div className={`h-6 rounded-md w-4/5 ${isDark ? 'bg-zinc-800' : 'bg-slate-200/70'}`} />
                  <div className={`h-6 rounded-md w-5/6 bg-violet-500/10 dark:bg-[#A6FF5D]/10 border ${isDark ? 'border-[#A6FF5D]/20' : 'border-violet-500/20'}`} />
                  <div className={`h-6 rounded-md w-3/4 ${isDark ? 'bg-zinc-800' : 'bg-slate-200/70'}`} />
                </div>

                
                <div className="flex-1 p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className={`h-4 rounded-md w-1/3 ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                    <div className={`w-12 h-5 rounded-full ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                  </div>
                  <div className={`flex-1 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center p-4 gap-2 ${
                    isDark ? 'border-zinc-800 text-zinc-600' : 'border-slate-300 text-slate-400'
                  }`}>
                    <span className="text-3xl animate-pulse">🖼️</span>
                    <div className={`h-2 rounded-md w-24 ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                    <div className={`h-2 rounded-md w-36 ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className={`h-8 rounded-lg w-16 ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                    <div className="h-8 rounded-lg w-24 bg-violet-600 dark:bg-[#A6FF5D]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}