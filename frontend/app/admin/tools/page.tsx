"use client";

import React, { useState, useEffect } from "react";
import { Wrench, Plus, Trash2, Edit3 } from "lucide-react";

interface ToolSchema {
  id?: string;
  _id?: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export default function AdminToolManagement() {
  const [tools, setTools] = useState<ToolSchema[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState<Partial<ToolSchema> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load tools from the database on mount
  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await fetch("/api/tools");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) setTools(data);
        }
      } catch (err) {
        console.error("Failed loading tools:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTools();
  }, []);

  const getId = (t: ToolSchema) => t._id || t.id || t.slug;

  const handleOpenCreate = () => {
    setCurrentTool({ name: "", slug: "", category: "Finance", description: "", seoTitle: "", seoDescription: "" });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (tool: ToolSchema) => {
    setCurrentTool({ ...tool });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tool?")) return;
    try {
      const response = await fetch(`/api/tools/${id}`, { method: "DELETE" });
      if (response.ok) {
        setTools(prev => prev.filter(t => getId(t) !== id));
      } else {
        alert("Failed to delete tool.");
      }
    } catch (err) {
      console.error("Failed to delete tool:", err);
      alert("A network error occurred while deleting.");
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTool?.name || !currentTool?.slug) return;

    const isEditingExisting = Boolean(currentTool.id || currentTool._id);

    try {
      const response = await fetch(
        isEditingExisting ? `/api/tools/${getId(currentTool as ToolSchema)}` : "/api/tools",
        {
          method: isEditingExisting ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentTool),
        }
      );

      const resData = await response.json();

      if (response.ok && resData.success) {
        if (isEditingExisting) {
          setTools(prev => prev.map(t => (getId(t) === getId(currentTool as ToolSchema) ? resData.data : t)));
        } else {
          setTools(prev => [resData.data, ...prev]);
        }
        setIsFormOpen(false);
        setCurrentTool(null);
      } else {
        alert(resData.message || "Failed to save tool.");
      }
    } catch (err) {
      console.error("Failed to save tool:", err);
      alert("A network error occurred while saving.");
    }
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
              {isLoading && (
                <tr><td colSpan={3} className="px-4 py-4 text-center text-slate-400">Loading tools...</td></tr>
              )}
              {!isLoading && tools.length === 0 && (
                <tr><td colSpan={3} className="px-4 py-4 text-center text-slate-400">No tools yet.</td></tr>
              )}
              {tools.map((t) => (
                <tr key={getId(t)} className="hover:bg-slate-50/50 dark:hover:bg-neutral-900/10 transition">
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="font-mono text-[10px] text-slate-400">slug: {t.slug}</p>
                  </td>
                  <td className="px-4 py-3.5"><span className="px-2 py-0.5 bg-violet-50 dark:bg-neutral-900 text-violet-600 dark:text-[#A6FF5D] rounded font-medium">{t.category}</span></td>
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => handleOpenEdit(t)} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-violet-500 dark:border-neutral-800 cursor-pointer transition"><Edit3 size={14} /></button>
                    <button onClick={() => handleDelete(getId(t)!)} className="p-1.5 rounded-lg border border-slate-200 text-red-500 hover:border-red-500 dark:border-neutral-800 cursor-pointer transition"><Trash2 size={14} /></button>
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