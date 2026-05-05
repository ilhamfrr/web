"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  X, 
  Loader2, 
  ChevronRight, 
  Package, 
  Settings,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Download
} from "lucide-react";

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    fileUrl: initialData?.fileUrl || "",
    imageUrl: initialData?.imageUrl || "",
    published: initialData?.published || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const url = initialData ? `/api/products/${initialData.id}` : "/api/products";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price.toString())
        }),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: `Produk berhasil ${initialData ? 'diperbarui' : 'ditambahkan'}` });
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1500);
      } else {
        const error = await res.json();
        setStatus({ type: 'error', message: error.error || "Gagal menyimpan produk" });
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
              <Package size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Core Product Data</span>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Product Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Premium UI Template"
                  className="w-full bg-zinc-900/30 border border-zinc-800 rounded-[32px] px-8 py-6 text-white text-xl font-black placeholder:text-zinc-800 focus:border-white/20 focus:bg-zinc-900/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Description</label>
                <textarea
                  rows={8}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the value of this asset..."
                  className="w-full bg-zinc-900/30 border border-zinc-800 rounded-[40px] px-8 py-8 text-white font-medium text-lg leading-relaxed placeholder:text-zinc-800 focus:border-white/20 focus:bg-zinc-900/50 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pl-2">
                    <ImageIcon size={14} className="text-zinc-600" />
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Image URL</label>
                  </div>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-zinc-900/30 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold text-sm outline-none focus:border-white/10 transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pl-2">
                    <Download size={14} className="text-zinc-600" />
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Download Link</label>
                  </div>
                  <input
                    type="text"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-zinc-900/30 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold text-sm outline-none focus:border-white/10 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="space-y-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-8 space-y-10">
            <div className="flex items-center gap-3 text-white">
              <Settings size={18} className="text-zinc-500" />
              <h3 className="font-black uppercase tracking-[0.2em] text-xs">Monetization</h3>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Price (IDR)</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 font-black text-sm group-focus-within:text-white transition-colors">Rp</span>
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                    className="w-full bg-zinc-800/30 border border-zinc-800 rounded-2xl pl-14 pr-6 py-5 text-white font-black text-xl outline-none focus:border-white/10 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl group cursor-pointer hover:bg-white/10 transition-all"
                   onClick={() => setFormData({ ...formData, published: !formData.published })}>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest block">Visibility</span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase">{formData.published ? 'Active in Store' : 'Hidden in Vault'}</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-all relative ${formData.published ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.published ? 'left-7' : 'left-1'}`}></div>
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
                <span className="uppercase tracking-widest text-[11px]">{initialData ? "Update Asset" : "Register Product"}</span>
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
