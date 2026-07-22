"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FileText, Plus, Trash2, Edit3, CheckCircle, AlertTriangle } from "lucide-react";

interface ArticleSchema {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  category: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  status: "Published" | "Draft" | "published" | "draft";
  content: string;
}

// NOTE: confirm your actual folder is app/api/blog (singular) — adjust this
// constant if it's really app/api/blogs (plural).
const API_BASE = "/api/blog";

function BlogManagementContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const action = searchParams.get("action");

  const [articles, setArticles] = useState<ArticleSchema[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Partial<ArticleSchema> | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

  const getId = (a: ArticleSchema) => (a._id || a.id || a.slug) as string;

  // Load articles dynamically from the database
  useEffect(() => {
    async function fetchAdminBlogs() {
      try {
        const response = await fetch(API_BASE);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setArticles(data);
          }
        }
      } catch (err) {
        console.error("Failed loading administrative blog entries:", err);
      }
    }
    fetchAdminBlogs();
  }, []);

  useEffect(() => {
    if (action === "create") {
      setTimeout(() => {
        setActiveArticle({ title: "", slug: "", category: "Finance", tags: "", seoTitle: "", seoDescription: "", status: "Published", content: "" });
        setIsEditing(true);
      }, 0);
    }
  }, [action]);

  const handleOpenCreate = () => {
    router.push("/admin/blogs?action=create");
  };

  const handleOpenEdit = (article: ArticleSchema) => {
    setActiveArticle({ ...article });
    setIsEditing(true);
  };

  const handleCloseEditor = () => {
    setIsEditing(false);
    setActiveArticle(null);
    router.push("/admin/blogs");
  };

  const handleToggleStatus = async (id: string) => {
    const target = articles.find(item => getId(item) === id);
    if (!target) return;

    const nextStatus = (target.status === "Published" || target.status === "published") ? "Draft" : "Published";

    // optimistic update
    setArticles(prev => prev.map(item => (getId(item) === id ? { ...item, status: nextStatus } : item)));

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!response.ok) throw new Error("Status update failed");
    } catch (err) {
      console.error("Failed to persist status toggle:", err);
      // revert on failure
      setArticles(prev => prev.map(item => (getId(item) === id ? { ...item, status: target.status } : item)));
      alert("Failed to update status — please try again.");
    }
  };

  const handleDeleteTrigger = (id: string) => setDeleteConfirmationId(id);

  const handleConfirmDelete = async () => {
    if (!deleteConfirmationId) return;
    const id = deleteConfirmationId;

    try {
      const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setArticles(prev => prev.filter(item => getId(item) !== id));
      } else {
        alert("Failed to delete article.");
      }
    } catch (err) {
      console.error("Failed to delete article:", err);
      alert("A network error occurred while deleting.");
    } finally {
      setDeleteConfirmationId(null);
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticle?.title || !activeArticle?.slug || !activeArticle?.content) return;

    const isEditingExisting = Boolean(activeArticle.id || activeArticle._id);

    try {
      const targetStatus = (activeArticle.status === "Published" || activeArticle.status === "published") ? "Published" : "Draft";

      const validatedPayload = {
        ...activeArticle,
        status: targetStatus
      };

      const response = await fetch(
        isEditingExisting ? `${API_BASE}/${getId(activeArticle as ArticleSchema)}` : API_BASE,
        {
          method: isEditingExisting ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedPayload),
        }
      );

      const resData = await response.json();

      if (response.ok && resData.success) {
        if (isEditingExisting) {
          setArticles(prev => prev.map(item => (getId(item) === getId(activeArticle as ArticleSchema) ? resData.data : item)));
        } else {
          setArticles(prev => [resData.data, ...prev]);
        }
        handleCloseEditor();
      } else {
        alert(resData.message || "Failed to commit blog record to database.");
      }
    } catch (err) {
      console.error("Failed to commit database entry:", err);
      alert("A network execution error occurred.");
    }
  };

  return (
    <div className="space-y-6 text-left relative min-h-[500px] w-full">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-violet-600 dark:text-[#A6FF5D]" /> Article Management Engine
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Maintain indexing arrays and customize SEO parameters.</p>
        </div>
        {!isEditing && (
          <button onClick={handleOpenCreate} className="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs rounded-xl shadow-xs transition cursor-pointer select-none">
            <Plus size={14} /> Add New Article
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="border border-slate-200/80 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-black w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-xs text-slate-600 dark:text-neutral-400">
              <thead className="bg-slate-50 dark:bg-neutral-900 font-bold border-b border-slate-200/60 dark:border-neutral-800 text-slate-700 dark:text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Article Info</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-center">Status Toggle</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60">
                {articles.map((art, idx) => {
                  const itemUniqueKey = getId(art) || `blog-${art.slug}-${idx}`;
                  return (
                    <tr key={itemUniqueKey} className="hover:bg-slate-50/50 dark:hover:bg-neutral-900/10 transition">
                      <td className="px-4 py-4 max-w-xs sm:max-w-md">
                        <p className="font-bold text-slate-900 dark:text-white truncate">{art.title}</p>
                        <p className="font-mono text-[10px] text-slate-400 mt-0.5 truncate">slug: {art.slug}</p>
                      </td>
                      <td className="px-4 py-4 font-medium">{art.category}</td>
                      <td className="px-4 py-4 text-center">
                        <button type="button" onClick={() => handleToggleStatus(itemUniqueKey)} className="cursor-pointer inline-flex items-center gap-2 hover:opacity-80 transition select-none">
                          {(art.status === "Published" || art.status === "published") ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-50 text-green-600 font-bold dark:bg-green-950/20"><CheckCircle size={12} /> Live</span>
                          ) : (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-600 font-bold dark:bg-amber-950/20">Draft</span>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-right space-x-2 whitespace-nowrap">
                        <button type="button" onClick={() => handleOpenEdit(art)} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-violet-500 hover:text-violet-600 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-[#A6FF5D] cursor-pointer transition">
                          <Edit3 size={14} />
                        </button>
                        <button type="button" onClick={() => handleDeleteTrigger(itemUniqueKey)} className="p-1.5 rounded-lg border border-slate-200 text-red-500 hover:border-red-500 hover:bg-red-50/20 dark:border-neutral-800 cursor-pointer transition">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveForm} className="space-y-5 bg-white dark:bg-neutral-950 p-5 rounded-xl border border-slate-200/80 dark:border-neutral-800 animate-in fade-in duration-150 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Article Title</label>
              <input value={activeArticle?.title || ""} onChange={e => setActiveArticle(prev => ({ ...prev, title: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg focus:outline-violet-500 text-slate-900 dark:text-white" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Target SEO URL Slug</label>
              <input value={activeArticle?.slug || ""} onChange={e => setActiveArticle(prev => ({ ...prev, slug: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg focus:outline-violet-500 text-slate-900 dark:text-white" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Category Node</label>
              <select value={activeArticle?.category || "Finance"} onChange={e => setActiveArticle(prev => ({ ...prev, category: e.target.value }))} className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg text-slate-900 dark:text-white">
                <option value="Finance">Finance</option>
                <option value="Developer">Developer</option>
                <option value="Utility">Utility</option>
                <option value="Text">Text</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Tags (Comma Separated)</label>
              <input value={activeArticle?.tags || ""} onChange={e => setActiveArticle(prev => ({ ...prev, tags: e.target.value }))} type="text" placeholder="e.g. EMI, Budget, Data" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg focus:outline-violet-500 text-slate-900 dark:text-white" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Publish Flag Status</label>
              <select value={activeArticle?.status || "Published"} onChange={e => setActiveArticle(prev => ({ ...prev, status: e.target.value as "Published" | "Draft" }))} className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg text-slate-900 dark:text-white">
                <option value="Published">Publish Live</option>
                <option value="Draft">Draft Mode</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-dashed border-slate-100 dark:border-neutral-800 pt-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Meta SEO Meta-Title</label>
              <input value={activeArticle?.seoTitle || ""} onChange={e => setActiveArticle(prev => ({ ...prev, seoTitle: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg focus:outline-violet-500 text-slate-900 dark:text-white" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Meta SEO Description</label>
              <input value={activeArticle?.seoDescription || ""} onChange={e => setActiveArticle(prev => ({ ...prev, seoDescription: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg focus:outline-violet-500 text-slate-900 dark:text-white" />
            </div>
          </div>

          <div className="space-y-1 border-t border-dashed border-slate-100 dark:border-neutral-800 pt-4">
            <label className="text-xs font-bold text-slate-500">Markdown Prose Copy Editor Container</label>
            <textarea value={activeArticle?.content || ""} onChange={e => setActiveArticle(prev => ({ ...prev, content: e.target.value }))} rows={12} placeholder="Compose markdown text nodes using headers (#, ##, ###) and lists (-)..." className="w-full p-3 font-mono text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg focus:outline-violet-500 text-slate-900 dark:text-white leading-relaxed" required />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-neutral-800 pt-4">
            <button type="button" onClick={handleCloseEditor} className="px-4 py-2 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 text-xs font-semibold rounded-lg hover:bg-slate-50 cursor-pointer select-none">
              Discard Changes
            </button>
            <button type="submit" className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer select-none">
              Commit Records
            </button>
          </div>
        </form>
      )}

      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-in scale-in duration-100">
            <div className="flex items-center gap-3 text-red-500 mb-3">
              <AlertTriangle size={24} className="shrink-0" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Verify Destructive Asset Purge</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
              Are you absolutely sure you want to remove this article row entry from the platform indices? This operation shifts database logs permanently and cannot be undone.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button type="button" onClick={() => setDeleteConfirmationId(null)} className="px-3 py-1.5 border border-slate-200 dark:border-neutral-800 text-slate-500 text-xs font-semibold rounded-lg hover:bg-slate-50 cursor-pointer select-none">
                Cancel
              </button>
              <button type="button" onClick={handleConfirmDelete} className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg cursor-pointer select-none">
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminBlogManagement() {
  return (
    <Suspense fallback={<div className="text-xs text-slate-400">Loading Content Arrays...</div>}>
      <BlogManagementContent />
    </Suspense>
  );
}