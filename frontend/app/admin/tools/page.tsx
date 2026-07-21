"use client";

import React, { useState } from "react";
import { Wrench, Plus, Trash2, Edit3, ShieldAlert } from "lucide-react";

interface ToolSchema {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

const INITIAL_TOOLS: ToolSchema[] = [
  { id: "1", name: "EMI Amortization Calculator", slug: "emi-calculator", category: "Finance", description: "Compute dynamic interest loan allocations.", seoTitle: "Free Premium Interactive EMI Calculator Utility", seoDescription: "Run monthly debt ratios flawlessly." },
  { id: "2", name: "Secure String Password Generator", slug: "password-generator", category: "Utility", description: "Generate high entropy hash passes.", seoTitle: "Cryptographically Secure Entropy Key String Generator", seoDescription: "Calculate algorithmic string security limits." }
];

export default function AdminToolManagement() {
  const [tools, setTools] = useState<ToolSchema[]>(INITIAL_TOOLS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState<Partial<ToolSchema> | null>(null);

  const handleOpenCreate = () => {
    setCurrentTool({ name: "", slug: "", category: "Finance", description: "", seoTitle: "", seoDescription: "" });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (tool: ToolSchema) => {
    setCurrentTool({ ...tool });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Purge this active tool node?")) {
      setTools(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTool?.name) return;

    if (currentTool.id) {
      setTools(prev => prev.map(t => t.id === currentTool.id ? (currentTool as ToolSchema) : t));
    } else {
      const freshRecord: ToolSchema = {
        ...(currentTool as Omit<ToolSchema, "id">),
        id: Math.random().toString(36).substr(2, 9)
      };
      setTools(prev => [freshRecord, ...prev]);
    }
    setIsFormOpen(false);
    setCurrentTool(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-violet-600 dark:text-[#A6FF5D]" /> Tool Catalog Registry
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Register new interactive functional modules and calibrate SEO descriptions.</p>
        </div>
        {!isFormOpen && (
          <button onClick={handleOpenCreate} className="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer select-none">
            <Plus size={14} /> Register New Tool
          </button>
        )}
      </div>

      {!isFormOpen ? (
        <div className="border border-slate-200/80 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-black">
          <table className="w-full text-xs text-slate-600 dark:text-neutral-400">
            <thead className="bg-slate-50 dark:bg-neutral-900 font-bold border-b border-slate-200/60 dark:border-neutral-800 text-slate-700 dark:text-white">
              <tr>
                <th className="px-4 py-3 text-left">Tool Meta Info</th>
                <th className="px-4 py-3 text-left">Category System</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60">
              {tools.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-neutral-900/10 transition">
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="font-mono text-[10px] text-slate-400">slug: {t.slug}</p>
                  </td>
                  <td className="px-4 py-3.5"><span className="px-2 py-0.5 bg-violet-50 dark:bg-neutral-900 text-violet-600 dark:text-[#A6FF5D] rounded font-medium">{t.category}</span></td>
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => handleOpenEdit(t)} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-violet-500 dark:border-neutral-800 cursor-pointer transition"><Edit3 size={14} /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg border border-slate-200 text-red-500 hover:border-red-500 dark:border-neutral-800 cursor-pointer transition"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleSaveForm} className="space-y-4 bg-white dark:bg-neutral-950 p-5 rounded-xl border border-slate-200/80 dark:border-neutral-800 animate-in fade-in duration-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Tool Common Name</label>
              <input value={currentTool?.name || ""} onChange={e => setCurrentTool(prev => ({ ...prev, name: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Route URL Slug Key</label>
              <input value={currentTool?.slug || ""} onChange={e => setCurrentTool(prev => ({ ...prev, slug: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1 md:col-span-1">
              <label className="text-xs font-bold text-slate-500">Target Category Group</label>
              <select value={currentTool?.category || "Finance"} onChange={e => setCurrentTool(prev => ({ ...prev, category: e.target.value }))} className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg text-slate-900 dark:text-white">
                <option value="Finance">Finance Insights</option>
                <option value="Developer">Developer Core</option>
                <option value="Utility">Utility Tools</option>
                <option value="Text">Text Modifiers</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-500">Brief Catalog Feature Description</label>
              <input value={currentTool?.description || ""} onChange={e => setCurrentTool(prev => ({ ...prev, description: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 dark:border-neutral-800 pt-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">SEO Target Meta Title</label>
              <input value={currentTool?.seoTitle || ""} onChange={e => setCurrentTool(prev => ({ ...prev, seoTitle: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">SEO Target Meta Description</label>
              <input value={currentTool?.seoDescription || ""} onChange={e => setCurrentTool(prev => ({ ...prev, seoDescription: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-neutral-800 pt-4">
            <button type="button" onClick={() => { setIsFormOpen(false); setCurrentTool(null); }} className="px-4 py-2 border border-slate-200 dark:border-neutral-800 text-slate-600 text-xs font-semibold rounded-lg cursor-pointer select-none">Discard</button>
            <button type="submit" className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer select-none">Save Registration</button>
          </div>
        </form>
      )}
    </div>
  );
}