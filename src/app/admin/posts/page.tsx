"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Search, 
  Filter, 
  MoreHorizontal,
  Loader2,
  FileText,
  Clock,
  ArrowUpRight,
  ShieldAlert
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        alert("Gagal menghapus artikel");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            <FileText size={12} />
            Content Management
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Blog <span className="italic font-serif text-zinc-500">Articles.</span>
            </h1>
            <p className="text-zinc-500 text-lg font-medium">Create, edit, and manage your written insights.</p>
          </div>
        </div>
        
        <Link href="/admin/posts/new" className="group flex items-center gap-3 px-8 py-5 bg-white text-zinc-950 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
          <Plus size={20} />
          <span className="uppercase tracking-widest text-[11px]">Artikel Baru</span>
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
            placeholder="Search by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-14 pr-6 text-white font-bold text-sm placeholder:text-zinc-700 outline-none focus:border-white/20 focus:bg-zinc-800/50 transition-all"
          />
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-white transition-all flex items-center gap-3">
            <Filter size={18} />
            <span className="text-[11px] font-black uppercase tracking-widest">Filter</span>
          </button>
        </div>
      </div>

      {/* Table / List */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/50 bg-zinc-800/10">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Details</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Classification</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Availability</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Timestamp</th>
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
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center space-y-4">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                      <ShieldAlert size={32} />
                    </div>
                    <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No records detected in database</p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-8">
                      <div className="space-y-1">
                        <div className="font-black text-white tracking-tight text-lg group-hover:translate-x-1 transition-transform">{post.title}</div>
                        <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800"></span>
                          /{post.slug}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className="text-[10px] font-black px-4 py-2 bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 rounded-full uppercase tracking-widest">
                        {post.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-8 py-8">
                      {post.published ? (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          Public
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-500 text-[9px] font-black uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                          Vaulted
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-2 text-zinc-500 font-bold text-xs">
                        <Clock size={12} className="opacity-40" />
                        {formatDate(post.createdAt)}
                      </div>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <a 
                          href={`/blog/${post.slug}`} 
                          target="_blank"
                          className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                        >
                          <ExternalLink size={18} />
                        </a>
                        <Link 
                          href={`/admin/posts/edit/${post.id}`} 
                          className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          disabled={isDeleting === post.id}
                          className="w-10 h-10 flex items-center justify-center text-red-500/50 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all disabled:opacity-50"
                        >
                          {isDeleting === post.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
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
