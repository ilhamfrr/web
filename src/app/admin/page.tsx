"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  ShoppingBag, 
  Link2, 
  MousePointer2, 
  Plus, 
  ArrowUpRight, 
  TrendingUp, 
  Clock,
  LayoutGrid,
  Loader2,
  RefreshCcw,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchStats = async (silent = false) => {
    if (!silent) setLoading(true);
    else setIsRefreshing(true);
    
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Real-time polling every 10 seconds
    const interval = setInterval(() => fetchStats(true), 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-white animate-spin opacity-20" />
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Synchronizing Data...</p>
      </div>
    );
  }

  const statCards = [
    { label: "Total Artikel", value: stats?.postCount || 0, icon: FileText, trend: "+12%", desc: "Bulan ini" },
    { label: "Produk Digital", value: stats?.productCount || 0, icon: ShoppingBag, trend: "+5%", desc: "Stok tersedia" },
    { label: "Sumber Daya", value: stats?.affiliateCount || 0, icon: Link2, trend: "Stable", desc: "Link aktif" },
    { label: "Total Klik", value: stats?.totalClicks || 0, icon: MousePointer2, trend: "+24%", desc: "Interaksi user" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-10 relative">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFAF0]/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#FFFAF0]/40">
              <LayoutGrid size={12} />
              Command Center
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-[0.1em] text-emerald-500 animate-pulse">
              <Zap size={10} fill="currentColor" />
              Live Data
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Master <span className="italic font-serif text-zinc-500">Overview.</span>
            </h1>
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
              Monitoring your digital empire performance 
              <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                {isRefreshing ? <RefreshCcw size={10} className="animate-spin" /> : <Clock size={10} />}
                Updated at {lastUpdated}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Link href="/admin/posts/new" className="group flex items-center gap-3 px-6 py-4 bg-white text-zinc-950 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
            <Plus size={20} />
            <span className="uppercase tracking-widest text-[11px]">Post Baru</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div 
            key={stat.label} 
            className="group relative bg-zinc-900/50 border border-zinc-800 p-8 rounded-[32px] hover:border-white/20 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px] -mr-16 -mt-16 group-hover:bg-white/10 transition-all"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-zinc-800 rounded-2xl text-white group-hover:bg-white group-hover:text-zinc-950 transition-all duration-500">
                  <stat.icon size={24} />
                </div>
                <div className="flex items-center gap-1 text-[#FFFAF0]/40 text-[10px] font-bold uppercase tracking-widest">
                  <TrendingUp size={12} className="text-emerald-500" />
                  {stat.trend}
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-4xl font-black text-white tracking-tighter tabular-nums">
                  {stat.value}
                </p>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.1em]">{stat.label}</p>
              </div>
              
              <div className="pt-4 border-t border-zinc-800 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                {stat.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Layout: Recent Activities & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-[40px] p-10 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <Clock size={20} className="text-zinc-500" />
              Recent Activity
            </h2>
            <button className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">
              View All Logs
            </button>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group flex items-center justify-between p-6 bg-zinc-800/20 border border-zinc-800/50 rounded-3xl hover:bg-zinc-800/40 transition-all cursor-default">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold tracking-tight">Project Update: Portfolio v3</h3>
                    <p className="text-zinc-500 text-sm">Updated article content • 2 hours ago</p>
                  </div>
                </div>
                <div className="p-2 text-zinc-500 opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#222831] border border-zinc-800 rounded-[40px] p-10 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute bottom-0 right-0 w-full h-full bg-white opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="space-y-8 relative z-10">
            <h2 className="text-2xl font-black text-white tracking-tight">System Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Database</span>
                <span className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">API Server</span>
                <span className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Healthy
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 relative z-10">
            <Link href="/" className="group flex items-center justify-between p-6 bg-white rounded-3xl text-zinc-950 font-black transition-all hover:scale-[1.02] active:scale-[0.98]">
              <span className="uppercase tracking-[0.2em] text-xs">Site Preview</span>
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
