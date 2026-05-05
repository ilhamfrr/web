"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Search, 
  Loader2,
  Link2,
  MousePointer2,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";

export default function AdminAffiliatePage() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/affiliate");
      const data = await res.json();
      setLinks(data);
    } catch (error) {
      console.error("Failed to fetch links", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus tautan ini?")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/affiliate/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLinks(links.filter(l => l.id !== id));
      } else {
        alert("Gagal menghapus tautan");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredLinks = links.filter(l => 
    l.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            <Link2 size={12} />
            Resource Network
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Affiliate <span className="italic font-serif text-zinc-500">Connections.</span>
            </h1>
            <p className="text-zinc-500 text-lg font-medium">Manage and monitor your strategic resource recommendations.</p>
          </div>
        </div>
        
        <Link href="/admin/affiliate/new" className="group flex items-center gap-3 px-8 py-5 bg-white text-zinc-950 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
          <Plus size={20} />
          <span className="uppercase tracking-widest text-[11px]">Tautan Baru</span>
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative group flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-600 group-focus-within:text-white transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by label or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-14 pr-6 text-white font-bold text-sm placeholder:text-zinc-700 outline-none focus:border-white/20 focus:bg-zinc-800/50 transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/50 bg-zinc-800/10">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Resource Label</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Category</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Performance</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 text-right">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/30">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <Loader2 className="w-10 h-10 text-white animate-spin opacity-10 mx-auto" />
                  </td>
                </tr>
              ) : filteredLinks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center space-y-4">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                      <ShieldAlert size={32} />
                    </div>
                    <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No strategic links detected</p>
                  </td>
                </tr>
              ) : (
                filteredLinks.map((link) => (
                  <tr key={link.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-8">
                      <div className="space-y-1">
                        <div className="font-black text-white tracking-tight text-lg group-hover:translate-x-1 transition-transform">{link.label}</div>
                        <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest truncate max-w-xs">{link.url}</div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className="text-[10px] font-black px-4 py-2 bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 rounded-full uppercase tracking-widest">
                        {link.category || "General"}
                      </span>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-white font-black text-sm">
                          <MousePointer2 size={14} className="text-emerald-500" />
                          {link.clicks}
                        </div>
                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Interactions</span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      {link.active ? (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          Verified
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-500 text-[9px] font-black uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                          Offline
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <a 
                          href={link.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                        >
                          <ExternalLink size={18} />
                        </a>
                        <Link 
                          href={`/admin/affiliate/edit/${link.id}`} 
                          className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(link.id)}
                          disabled={isDeleting === link.id}
                          className="w-10 h-10 flex items-center justify-center text-red-500/50 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all disabled:opacity-50"
                        >
                          {isDeleting === link.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
