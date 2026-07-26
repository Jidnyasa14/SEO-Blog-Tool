"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Plus, Trash2, Edit3, X } from "lucide-react";

interface BlogSchema {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[] | string;
  image: string;
  authorName: string;
  authorBio: string;
  seoTitle: string;
  seoDescription: string;
  status: "published" | "draft";
  readingTime: number;
}

export default function AdminBlogManagement() {
  const [blogs, setBlogs] = useState<BlogSchema[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentBlog, setCurrentBlog] = useState<Partial<BlogSchema>>({
    title: "",
    slug: "",
    summary: "",
    content: "",
    category: "Developer",
    tags: "",
    image: "",
    authorName: "Toolverse Team",
    authorBio: "Official insights and software engineering updates.",
    seoTitle: "",
    seoDescription: "",
    status: "published",
    readingTime: 5,
  });

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) setBlogs(data);
        }
      } catch (err) {
        console.error("Failed loading blogs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const getId = (b: BlogSchema) => b._id || b.id || b.slug;

  const handleOpenCreate = () => {
    setCurrentBlog({
      title: "",
      slug: "",
      summary: "",
      content: "",
      category: "Developer",
      tags: "",
      image: "",
      authorName: "Toolverse Team",
      authorBio: "Official insights and software engineering updates.",
      seoTitle: "",
      seoDescription: "",
      status: "published",
      readingTime: 5,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (blog: BlogSchema) => {
    setCurrentBlog({
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article permanently?")) return;
    try {
      const response = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (response.ok) {
        setBlogs((prev) => prev.filter((b) => getId(b) !== id));
      } else {
        alert("Failed to delete article.");
      }
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("A network error occurred while deleting.");
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBlog?.title || !currentBlog?.slug || !currentBlog?.content) {
      alert("Title, Slug, and Content Body are required.");
      return;
    }

    const isEditingExisting = Boolean(currentBlog.id || currentBlog._id);

    try {
      const response = await fetch(
        isEditingExisting ? `/api/blogs/${getId(currentBlog as BlogSchema)}` : "/api/blogs",
        {
          method: isEditingExisting ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentBlog),
        }
      );

      const resData = await response.json();

      if (response.ok && resData.success) {
        if (isEditingExisting) {
          setBlogs((prev) => prev.map((b) => (getId(b) === getId(currentBlog as BlogSchema) ? resData.data : b)));
        } else {
          setBlogs((prev) => [resData.data, ...prev]);
        }
        setIsFormOpen(false);
        setCurrentBlog({});
      } else {
        alert(resData.message || "Failed to save article.");
      }
    } catch (err) {
      console.error("Failed to save blog:", err);
      alert("A network error occurred while saving.");
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-600 dark:text-[#A6FF5D]" /> Article Management Engine
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Maintain blog posts, author bios, images, and customize SEO parameters.</p>
        </div>
        {!isFormOpen && (
          <button onClick={handleOpenCreate} className="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer select-none">
            <Plus size={14} /> Add New Article
          </button>
        )}
      </div>

      {!isFormOpen ? (
        <div className="border border-slate-200/80 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-black">
          <table className="w-full text-xs text-slate-600 dark:text-neutral-400">
            <thead className="bg-slate-50 dark:bg-neutral-900 font-bold border-b border-slate-200/60 dark:border-neutral-800 text-slate-700 dark:text-white">
              <tr>
                <th className="px-4 py-3 text-left">Article Info</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Status Toggle</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60">
              {isLoading && (
                <tr><td colSpan={4} className="px-4 py-4 text-center text-slate-400">Loading articles...</td></tr>
              )}
              {!isLoading && blogs.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-4 text-center text-slate-400">No articles created yet. Click Add New Article to write one!</td></tr>
              )}
              {blogs.map((b) => (
                <tr key={getId(b)} className="hover:bg-slate-50/50 dark:hover:bg-neutral-900/10 transition">
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-slate-900 dark:text-white">{b.title}</p>
                    <p className="font-mono text-[10px] text-slate-400">slug: /blogs/{b.slug}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 bg-violet-50 dark:bg-neutral-900 text-violet-600 dark:text-[#A6FF5D] rounded font-medium">
                      {b.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${b.status === "published" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" : "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"}`}>
                      {b.status || "published"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => handleOpenEdit(b)} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-violet-500 dark:border-neutral-800 cursor-pointer transition"><Edit3 size={14} /></button>
                    <button onClick={() => handleDelete(getId(b)!)} className="p-1.5 rounded-lg border border-slate-200 text-red-500 hover:border-red-500 dark:border-neutral-800 cursor-pointer transition"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleSaveForm} className="space-y-4 bg-white dark:bg-neutral-950 p-5 rounded-xl border border-slate-200/80 dark:border-neutral-800 animate-in fade-in duration-100">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-neutral-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Article Authoring & Publishing Form</h3>
            <button type="button" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Article Title</label>
              <input value={currentBlog?.title || ""} onChange={e => setCurrentBlog(prev => ({ ...prev, title: e.target.value }))} type="text" placeholder="e.g. Master Next.js App Router Strategies" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Route URL Slug</label>
              <input value={currentBlog?.slug || ""} onChange={e => setCurrentBlog(prev => ({ ...prev, slug: e.target.value }))} type="text" placeholder="e.g. master-nextjs-app-router" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Category</label>
              <select value={currentBlog?.category || "Developer"} onChange={e => setCurrentBlog(prev => ({ ...prev, category: e.target.value }))} className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg text-slate-900 dark:text-white">
                <option value="Developer">Developer</option>
                <option value="Finance">Finance</option>
                <option value="Utility">Utility</option>
                <option value="Tutorials">Tutorials</option>
                <option value="Tech Insights">Tech Insights</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Status</label>
              <select value={currentBlog?.status || "published"} onChange={e => setCurrentBlog(prev => ({ ...prev, status: e.target.value as "published" | "draft" }))} className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg text-slate-900 dark:text-white">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Estimated Reading Time (Minutes)</label>
              <input value={currentBlog?.readingTime ?? 5} onChange={e => setCurrentBlog(prev => ({ ...prev, readingTime: parseInt(e.target.value) || 5 }))} type="number" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Cover Image Banner URL</label>
              <input value={currentBlog?.image || ""} onChange={e => setCurrentBlog(prev => ({ ...prev, image: e.target.value }))} type="text" placeholder="https://images.unsplash.com/photo-..." className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Tags (Comma-separated)</label>
              <input value={typeof currentBlog?.tags === 'string' ? currentBlog.tags : Array.isArray(currentBlog?.tags) ? currentBlog.tags.join(', ') : ""} onChange={e => setCurrentBlog(prev => ({ ...prev, tags: e.target.value }))} type="text" placeholder="nextjs, react, webdev" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Brief Article Summary</label>
            <input value={currentBlog?.summary || ""} onChange={e => setCurrentBlog(prev => ({ ...prev, summary: e.target.value }))} type="text" placeholder="A concise excerpt displayed on the article grid card." className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Full Article Content Payload (Supports Paragraphs & HTML/Markdown)</label>
            <textarea
              value={currentBlog?.content || ""}
              onChange={e => setCurrentBlog(prev => ({ ...prev, content: e.target.value }))}
              rows={10}
              className="w-full p-3 font-mono text-xs border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 rounded-lg text-slate-900 dark:text-white leading-relaxed"
              placeholder="Write or paste your article body content here..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 dark:border-neutral-800 pt-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">SEO Target Meta Title</label>
              <input value={currentBlog?.seoTitle || ""} onChange={e => setCurrentBlog(prev => ({ ...prev, seoTitle: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">SEO Target Meta Description</label>
              <input value={currentBlog?.seoDescription || ""} onChange={e => setCurrentBlog(prev => ({ ...prev, seoDescription: e.target.value }))} type="text" className="w-full p-2 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-lg text-slate-900 dark:text-white" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-neutral-800 pt-4">
            <button type="button" onClick={() => { setIsFormOpen(false); setCurrentBlog({}); }} className="px-4 py-2 border border-slate-200 dark:border-neutral-800 text-slate-600 text-xs font-semibold rounded-lg cursor-pointer select-none">Discard</button>
            <button type="submit" className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer select-none">Save Article</button>
          </div>
        </form>
      )}
    </div>
  );
}