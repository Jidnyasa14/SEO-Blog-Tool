// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Navbar from "@/components/Landingpage/Navbar";
// import Footer from "@/components/Landingpage/Footer";
// import ToolCard from "@/components/Landingpage/ToolCard";
// //import { TOOL_DETAILS } from "@/data/toolDetailData";

// export default function ToolsPage() {
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");

//   // Dynamically extract categories from the raw dataset array list
//   const categories = [
//     "All",
//     ...Array.from(new Set(TOOL_DETAILS.map((tool) => tool.category)))
//   ];

//   // Robust combination filtering framework matching both search parameters and active pills
//   const filteredTools = TOOL_DETAILS.filter((tool) => {
//     const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
//                           tool.seoDescription?.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black text-slate-900 dark:text-zinc-100 antialiased font-sans transition-colors duration-200">
//       <Navbar />

//       <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 md:py-16">
        
//         {/* Page Typography Heading block */}
//         <div className="mb-10">
//           <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
//             Explore Tools
//           </h1>
//           <p className="text-sm md:text-base text-slate-600 dark:text-zinc-400 mt-2 max-w-xl">
//             Access our free library of professional utilities built for speed, accuracy, and absolute user data privacy.
//           </p>
//         </div>

//         {/* Improved Search Bar Layout Component Container */}
//         <div className="mb-8 relative max-w-2xl">
//           <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
//             <svg width="18" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <circle cx="11" cy="11" r="8" />
//               <path d="m21 21-4.3-4.3" />
//             </svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Search tools... (e.g. JSON Formatter, Base64)"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#0d0e12] text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-white/5 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-violet-600/50 dark:focus:border-[#A6FF5D]/50 focus:ring-1 focus:ring-violet-600/30 dark:focus:ring-[#A6FF5D]/30 transition-all duration-200 text-sm shadow-xs"
//           />
//         </div>

//         {/* Dynamic Category Interactive Pill Filters Layout Row */}
//         <div className="flex flex-wrap gap-2.5 mb-10 border-b border-slate-200 dark:border-white/5 pb-6">
//           {categories.map((cat) => {
//             const isSelected = activeCategory === cat;
//             return (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
//                   isSelected
//                     ? "bg-violet-600 text-white border-violet-600 dark:bg-[#A6FF5D] dark:text-gray-900 dark:border-[#A6FF5D] shadow-xs dark:shadow-[0_0_15px_rgba(166,255,93,0.15)]"
//                     : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-[#0d0e12] dark:text-zinc-400 dark:border-white/5 dark:hover:border-white/10 dark:hover:text-white"
//                 }`}
//               >
//                 {cat}
//               </button>
//             );
//           })}
//         </div>

//         {/* Main Tools Result Grid Panel */}
//         {filteredTools.length === 0 ? (
//           <div className="text-center py-20 bg-white dark:bg-[#0d0e12] rounded-2xl border border-slate-200 dark:border-white/5 border-dashed shadow-xs">
//             <svg className="mx-auto text-slate-400 dark:text-zinc-600 mb-4" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//               <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>
//             </svg>
//             <h3 className="text-lg font-semibold text-slate-800 dark:text-zinc-200">No matching tools found</h3>
//             <p className="text-sm text-slate-500 dark:text-zinc-500 mt-1 max-w-xs mx-auto">
//               Try checking your spelling or selecting an alternative tool category filter option.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in duration-300">
//             {filteredTools.map((tool) => (
//               <ToolCard 
//                 key={tool.slug} 
//                 tool={{
//                   name: tool.name,
//                   slug: tool.slug,
//                   description: tool.seoDescription || "",
//                   category: tool.category,
//                   icon: <span className="leading-none text-xl">{tool.icon || "🛠️"}</span>
//                 }} 
//               />
//             ))}
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }