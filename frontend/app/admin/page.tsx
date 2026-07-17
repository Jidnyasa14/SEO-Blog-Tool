import Link from 'next/link';
import { FaPlusCircle, FaBookOpen, FaHammer } from 'react-icons/fa';

export default function AdminDashboardHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-['Sora'] text-2xl font-extrabold tracking-tight text-white mb-1.5">
          Workspace Operations
        </h1>
        <p className="text-slate-400 text-xs font-medium">Monitor live metrics records and deployment indices.</p>
      </div>

      {/* Grid Status Cluster */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-6 bg-black border border-slate-800 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Live Active Calculators</span>
            <div className="text-3xl font-black text-white">20</div>
          </div>
          <div className="p-3.5 bg-slate-900 text-[#A6FF5D] border border-slate-800 rounded-xl">
            <FaHammer className="text-xl" />
          </div>
        </div>

        <div className="p-6 bg-black border border-slate-800 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Indexed Articles</span>
            <div className="text-3xl font-black text-white">10</div>
          </div>
          <div className="p-3.5 bg-slate-900 text-violet-400 border border-slate-800 rounded-xl">
            <FaBookOpen className="text-xl" />
          </div>
        </div>
      </div>

      
      <div className="p-6 bg-black border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight">System Creation Accelerators</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/tools" className="p-4 bg-slate-900/40 border border-slate-800/80 hover:border-[#A6FF5D] rounded-xl inline-flex items-center justify-between transition group">
            <span className="text-xs font-semibold text-slate-300 group-hover:text-white">Register Structural Tool</span>
            <FaPlusCircle className="text-slate-500 group-hover:text-[#A6FF5D] transition text-sm" />
          </Link>
          <Link href="/admin/blogs" className="p-4 bg-slate-900/40 border border-slate-800/80 hover:border-violet-500 rounded-xl inline-flex items-center justify-between transition group">
            <span className="text-xs font-semibold text-slate-300 group-hover:text-white">Publish Long-Form Post</span>
            <FaPlusCircle className="text-slate-500 group-hover:text-violet-400 transition text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
}