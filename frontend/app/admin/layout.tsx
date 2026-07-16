import Link from 'next/link';
import { FaThLarge, FaBlog, FaWrench, FaSignOutAlt, FaHome } from 'react-icons/fa';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar Panel */}
      <aside className="w-64 bg-black border-r border-slate-800/60 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-lg font-extrabold bg-gradient-to-r from-violet-400 to-[#A6FF5D] bg-clip-text text-transparent tracking-tight">
              Control Center v1.0
            </span>
          </div>
          <nav className="space-y-1.5">
            <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 bg-slate-900 text-[#A6FF5D] rounded-xl text-sm font-medium transition">
              <FaThLarge className="text-xs" /> <span>Metrics Home</span>
            </Link>
            <Link href="/admin/blogs" className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-900/60 text-slate-400 hover:text-slate-100 rounded-xl text-sm font-medium transition">
              <FaBlog className="text-xs" /> <span>Manage Blogs</span>
            </Link>
            <Link href="/admin/tools" className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-900/60 text-slate-400 hover:text-slate-100 rounded-xl text-sm font-medium transition">
              <FaWrench className="text-xs" /> <span>Manage Tools</span>
            </Link>
            <Link href="/" className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-900/60 text-slate-400 hover:text-slate-100 rounded-xl text-sm font-medium transition border-t border-slate-900 pt-4 mt-2">
              <FaHome className="text-xs" /> <span>View Main Site</span>
            </Link>
          </nav>
        </div>
        
        <button className="flex items-center space-x-3 px-4 py-3 bg-rose-950/20 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 rounded-xl text-sm font-medium transition mt-auto border border-rose-900/30 cursor-pointer">
          <FaSignOutAlt className="text-xs" /> <span>Terminate Session</span>
        </button>
      </aside>

      {/* Primary Display Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-black border-b border-slate-800/60 flex items-center justify-between px-8">
          <div className="md:hidden">
            <span className="text-sm font-bold text-white">Toolverse Admin</span>
          </div>
          <div className="flex items-center space-x-3 ml-auto">
            <div className="w-2 h-2 rounded-full bg-[#A6FF5D] animate-pulse" />
            <span className="text-xs font-mono text-slate-400">Master Session Secure</span>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-slate-950 to-black">
          <div className="mx-auto max-w-5xl w-full">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}