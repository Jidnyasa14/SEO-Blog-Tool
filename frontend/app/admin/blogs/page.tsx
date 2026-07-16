import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

export default function AdminBlogManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Sora'] text-2xl font-extrabold tracking-tight text-white">Article Inventory</h1>
          <p className="text-xs text-slate-400 font-medium">Manage rich text content blocks and publication variables.</p>
        </div>
        <button className="bg-[#A6FF5D] hover:bg-[#b6ff75] text-slate-900 text-xs font-bold py-2.5 px-4 rounded-xl inline-flex items-center gap-2 transition tracking-tight shadow-xs cursor-pointer">
          <FaPlus /> Compose Entry
        </button>
      </div>

      <div className="bg-black border border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4">Title Mapping</th>
                <th className="p-4">Categorization</th>
                <th className="p-4">Visibility</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm text-slate-300">
              <tr className="hover:bg-slate-900/20 transition">
                <td className="p-4 font-semibold text-white">Deep Dive: Understanding EMI Amortization Systems</td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-md text-[10px] font-bold uppercase text-slate-400 tracking-wider">Finance</span></td>
                <td className="p-4"><span className="px-2 py-0.5 bg-emerald-950/30 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold rounded-full">Published</span></td>
                <td className="p-4 text-right space-x-3.5">
                  <button className="text-slate-500 hover:text-violet-400 transition cursor-pointer" aria-label="Edit Post"><FaEdit className="text-sm" /></button>
                  <button className="text-slate-500 hover:text-rose-400 transition cursor-pointer" aria-label="Delete Post"><FaTrashAlt className="text-xs" /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}