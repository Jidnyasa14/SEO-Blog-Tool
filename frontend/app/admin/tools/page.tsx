"use client";

import React, { useState, useEffect } from "react";
import { Wrench, Plus, Trash2, Edit3, X } from "lucide-react";

interface ToolInputConfig {
  name: string;
  label: string;
  type: string;
  defaultValue?: string | number;
}

interface DynamicToolConfig {
  inputs: ToolInputConfig[];
  formula: string;
  resultLabel: string;
  resultUnit?: string;
}

interface ToolSchema {
  id?: string;
  _id?: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  componentKey: string;
  toolType: "custom" | "dynamic";
  config?: DynamicToolConfig;
  seoTitle: string;
  seoDescription: string;
}

export default function AdminToolManagement() {
  const [tools, setTools] = useState<ToolSchema[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentTool, setCurrentTool] = useState<Partial<ToolSchema>>({
    name: "",
    slug: "",
    category: "Utility",
    description: "",
    componentKey: "emi-calculator",
    toolType: "dynamic",
    seoTitle: "",
    seoDescription: "",
  });

  const [configJson, setConfigJson] = useState<string>("");

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
    const defaultConfig: DynamicToolConfig = {
      inputs: [
        { name: "weight", label: "Weight (kg)", type: "number", defaultValue: 70 },
        { name: "height", label: "Height (cm)", type: "number", defaultValue: 175 },
      ],
      formula: "weight / ((height / 100) * (height / 100))",
      resultLabel: "Body Mass Index (BMI)",
      resultUnit: "kg/m²",
    };

    setCurrentTool({
      name: "",
      slug: "",
      category: "Utility",
      description: "",
      componentKey: "emi-calculator",
      toolType: "dynamic",
      seoTitle: "",
      seoDescription: "",
    });
    setConfigJson(JSON.stringify(defaultConfig, null, 2));
    setIsFormOpen(true);
  };

  const handleOpenEdit = (tool: ToolSchema) => {
    setCurrentTool({ ...tool });
    setConfigJson(JSON.stringify(tool.config || {}, null, 2));
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tool?")) return;
    try {
      const response = await fetch(`/api/tools/${id}`, { method: "DELETE" });
      if (response.ok) {
        setTools((prev) => prev.filter((t) => getId(t) !== id));
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

    let parsedConfig: DynamicToolConfig | undefined = undefined;

    if (currentTool.toolType === "dynamic" && configJson) {
      try {
        parsedConfig = JSON.parse(configJson);
      } catch (err) {
        console.error(err);
        alert("Invalid JSON structure inside Dynamic Execution Config.");
        return;
      }
    }

    const payload = {
      ...currentTool,
      config: currentTool.toolType === "dynamic" ? parsedConfig : undefined,
    };

    const isEditingExisting = Boolean(currentTool.id || currentTool._id);

    try {
      const response = await fetch(
        isEditingExisting ? `/api/tools/${getId(currentTool as ToolSchema)}` : "/api/tools",
        {
          method: isEditingExisting ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const resData = await response.json();

      if (response.ok && resData.success) {
        if (isEditingExisting) {
          setTools((prev) => prev.map((t) => (getId(t) === getId(currentTool as ToolSchema) ? resData.data : t)));
        } else {
          setTools((prev) => [resData.data, ...prev]);
        }
        setIsFormOpen(false);
        setCurrentTool({});
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
                <th className="px-4 py-3 text-left">Engine Mode</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60">
              {isLoading && (
                <tr><td colSpan={4} className="px-4 py-4 text-center text-slate-400">Loading tools...</td></tr>
              )}
              {!isLoading && tools.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-4 text-center text-slate-400">No tools registered yet.</td></tr>
              )}
              {tools.map((t) => (
                <tr key={getId(t)} className="hover:bg-slate-50/50 dark:hover:bg-neutral-900/10 transition">
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="font-mono text-[10px] text-slate-400">slug: {t.slug}</p>
                  </td>
                  <td className="px-4 py-3.5"><span className="px-2 py-0.5 bg-violet-50 dark:bg-neutral-900 text-violet-600 dark:text-[#A6FF5D] rounded font-medium">{t.category}</span></td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-neutral-800 rounded">
                      {t.toolType === "dynamic" ? "⚡ Dynamic Engine" : t.componentKey || t.slug}
                    </span>
                  </td>
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
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-neutral-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tool Configuration Registration</h3>
            <button type="button" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
              <X size={18} />
            </button>
          </div>

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
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Target Category Group</label>
              <select value={currentTool?.category || "Utility"} onChange={e => setCurrentTool(prev => ({ ...prev, category: e.target.value }))} className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg text-slate-900 dark:text-white">
                <option value="Finance">Finance</option>
                <option value="Developer">Developer</option>
                <option value="Utility">Utility</option>
                <option value="Text">Text</option>
                <option value="Image">Image</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Tool Execution Type</label>
              <select value={currentTool?.toolType || "dynamic"} onChange={e => setCurrentTool(prev => ({ ...prev, toolType: e.target.value as "custom" | "dynamic" }))} className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg text-slate-900 dark:text-white">
                <option value="dynamic">⚡ Dynamic Calculation Engine</option>
                <option value="custom">Pre-built Custom Component</option>
              </select>
            </div>

            {currentTool.toolType === "custom" && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Interactive Component Module</label>
                <select value={currentTool?.componentKey || "emi-calculator"} onChange={e => setCurrentTool(prev => ({ ...prev, componentKey: e.target.value }))} className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg text-slate-900 dark:text-white">
                  <option value="emi-calculator">EMI Calculator</option>
                  <option value="sip-calculator">SIP Calculator</option>
                  <option value="gst-calculator">GST Calculator</option>
                  <option value="fd-calculator">FD Calculator</option>
                  <option value="loan-calculator">Loan Calculator</option>
                  <option value="age-calculator">Age Calculator</option>
                  <option value="percentage-calculator">Percentage Calculator</option>
                  <option value="discount-calculator">Discount Calculator</option>
                  <option value="qr-generator">QR Code Generator</option>
                  <option value="password-generator">Password Generator</option>
                  <option value="json-formatter">JSON Formatter</option>
                  <option value="base64-converter">Base64 Converter</option>
                  <option value="jwt-decoder">JWT Decoder</option>
                  <option value="uuid-generator">UUID Generator</option>
                  <option value="regex-tester">Regex Tester</option>
                  <option value="word-counter">Word Counter</option>
                  <option value="character-counter">Character Counter</option>
                  <option value="case-converter">Case Converter</option>
                  <option value="text-reverser">Text Reverser</option>
                  <option value="slug-generator">Slug Generator</option>
                </select>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Brief Catalog Description</label>
            <input value={currentTool?.description || ""} onChange={e => setCurrentTool(prev => ({ ...prev, description: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" required />
          </div>

          {currentTool.toolType === "dynamic" && (
            <div className="space-y-1 border-t border-slate-100 dark:border-neutral-800 pt-3">
              <label className="text-xs font-bold text-slate-500">Dynamic Execution Config (Inputs & Math Formula)</label>
              <textarea
                value={configJson}
                onChange={(e) => setConfigJson(e.target.value)}
                rows={8}
                className="w-full p-3 font-mono text-xs border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 rounded-lg text-slate-900 dark:text-white leading-relaxed"
                required
              />
            </div>
          )}

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
            <button type="button" onClick={() => { setIsFormOpen(false); setCurrentTool({}); }} className="px-4 py-2 border border-slate-200 dark:border-neutral-800 text-slate-600 text-xs font-semibold rounded-lg cursor-pointer select-none">Discard</button>
            <button type="submit" className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer select-none">Save Registration</button>
          </div>
        </form>
      )}
    </div>
  );
}