"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Wrench, FileText, PlusCircle, ArrowUpRight, BarChart3, ShieldCheck } from "lucide-react";

interface DashboardStats {
  totalTools: number;
  totalBlogs: number;
}

export default function AdminDashboardOverview() {
  const router = useRouter();
  
  const [stats] = useState<DashboardStats>({
    totalTools: 12,
    totalBlogs: 10,
  });

  const STAT_CARDS = [
    {
      label: "Total Tools Cataloged",
      count: stats.totalTools,
      icon: <Wrench className="w-5 h-5 text-violet-600 dark:text-[#A6FF5D]" />,
      description: "Interactive utility applications deployed live.",
    },
    {
      label: "Total Blog Articles",
      count: stats.totalBlogs,
      icon: <FileText className="w-5 h-5 text-violet-600 dark:text-[#A6FF5D]" />,
      description: "Rich text educational documentation publications.",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left w-full">
      
      {/* Main Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-5">
        <div className="space-y-1">
          {/* ✅ FIXED: Applied clean inline style variant ensuring Sora loads correctly */}
          <h1 
            style={{ fontFamily: "'Sora', sans-serif" }}
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5"
          >
            <BarChart3 className="w-6 h-6 text-violet-600 dark:text-[#A6FF5D]" />
            Control Center Overview
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400">
            Monitor infrastructure status nodes, configure structural content indices, and manage system assets.
          </p>
        </div>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200/30 dark:border-green-800/20 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" /> Root Administrator Session
        </div>
      </div>

      {/* Stats Analytics Dashboard Array Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {STAT_CARDS.map((card, i) => (
          <div 
            key={i}
            className="p-5 rounded-2xl border border-slate-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900/30 flex items-start justify-between shadow-2xs group hover:border-violet-500 dark:hover:border-[#A6FF5D] transition-all duration-200"
          >
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                {card.label}
              </p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {card.count}
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                {card.description}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-800 group-hover:scale-105 transition-transform duration-200">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Shortcut Actions Container Block */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500">
          Management Shortcut Triggers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => router.push("/admin/tools?action=create")}
            className="group p-4 flex items-center justify-between text-left border border-slate-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900/20 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-neutral-900/40 w-full"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-violet-50 text-violet-600 dark:bg-neutral-800 dark:text-white">
                <PlusCircle size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Register New Tool Node</h4>
                <p className="text-xs text-slate-400">Configure parameters, metadata tags, and target SEO slug rules.</p>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button 
            onClick={() => router.push("/admin/blogs?action=create")}
            className="group p-4 flex items-center justify-between text-left border border-slate-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900/20 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-neutral-900/40 w-full"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-violet-50 text-violet-600 dark:bg-neutral-800 dark:text-white">
                <PlusCircle size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Publish Article Context</h4>
                <p className="text-xs text-slate-400">Open rich text editor layout module to compose new insight copy.</p>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
      
    </div>
  );
}