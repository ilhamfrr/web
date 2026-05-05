"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  X, 
  Loader2, 
  ChevronRight, 
  Link2, 
  Settings,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from "lucide-react";

interface AffiliateFormProps {
  initialData?: any;
}

export default function AffiliateForm({ initialData }: AffiliateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const [formData, setFormData] = useState({
    label: initialData?.label || "",
    url: initialData?.url || "",
    category: initialData?.category || "",
    active: initialData?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const url = initialData ? `/api/affiliate/${initialData.id}` : "/api/affiliate";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: `Tautan berhasil ${initialData ? 'diperbarui' : 'ditambahkan'}` });
        setTimeout(() => {
          router.push("/admin/affiliate");
          router.refresh();
        }, 1500);
      } else {
        const error = await res.json();
        setStatus({ type: 'error', message: error.error || "Gagal menyimpan tautan" });
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Terjadi kesalahan sistem" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 animate-in fade-in duration-500">
      {status && (
        <div className={`p-6 rounded-[32px] border flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 ${
          status.type === 'success' 
            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
            : 'bg-red-500/5 border-red-500/20 text-red-500'
        }`}>
          {status.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <p className="font-black uppercase tracking-widest text-xs">{status.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-zinc-500 mb-2">
              <Link2 size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Resource Identity</span>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Display Label</label>
                <input
                  required
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. Best Developer Gear"
                  className="w-full bg-zinc-900/30 border border-zinc-800 rounded-[32px] px-8 py-6 text-white text-xl font-black placeholder:text-zinc-800 focus:border-white/20 focus:bg-zinc-900/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 pl-2">
                  <ExternalLink size={14} className="text-zinc-600" />
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Target URL</label>
                </div>
                <input
                  required
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-zinc-900/30 border border-zinc-800 rounded-[32px] px-8 py-6 text-white font-black text-lg outline-none focus:border-white/20 focus:bg-zinc-900/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="space-y-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-8 space-y-10">
            <div className="flex items-center gap-3 text-white">
              <Settings size={18} className="text-zinc-500" />
              <h3 className="font-black uppercase tracking-[0.2em] text-xs">Categorization</h3>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Category Type</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Hardware"
                  className="w-full bg-zinc-800/30 border border-zinc-800 rounded-2xl px-5 py-4 text-white font-bold text-sm outline-none focus:border-white/10 transition-all"
                />
              </div>

              <div className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl group cursor-pointer hover:bg-white/10 transition-all"
                   onClick={() => setFormData({ ...formData, active: !formData.active })}>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest block">Connection</span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase">{formData.active ? 'Verified Active' : 'Suspended'}</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-all relative ${formData.active ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.active ? 'left-7' : 'left-1'}`}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full group flex items-center justify-between px-8 py-6 bg-white text-zinc-950 font-black rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl shadow-white/5"
            >
              <div className="flex items-center gap-4">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                <span className="uppercase tracking-widest text-[11px]">{initialData ? "Sync Resource" : "Create Link"}</span>
              </div>
              <ChevronRight size={18} className="opacity-30 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-3 px-8 py-6 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white font-black rounded-3xl transition-all"
            >
              <X size={18} />
              <span className="uppercase tracking-widest text-[11px]">Abort</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
