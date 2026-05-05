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
  Loader2,
  ShoppingBag,
  ArrowUpRight,
  ShieldAlert,
  Tag,
  Sparkles
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Gagal menghapus produk");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            <ShoppingBag size={12} />
            Digital Inventory
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Storefront <span className="italic font-serif text-zinc-500">Assets.</span>
            </h1>
            <p className="text-zinc-500 text-lg font-medium">Manage templates, kits, and digital resources.</p>
          </div>
        </div>
        
        <Link href="/admin/products/new" className="group flex items-center gap-3 px-8 py-5 bg-white text-zinc-950 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
          <Plus size={20} />
          <span className="uppercase tracking-widest text-[11px]">Tambah Produk</span>
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
            placeholder="Search assets by name..."
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
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Product Identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Valuation</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Inventory Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 text-right">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/30">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <Loader2 className="w-10 h-10 text-white animate-spin opacity-10 mx-auto" />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center space-y-4">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                      <ShieldAlert size={32} />
                    </div>
                    <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Zero digital assets indexed</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#222831] border border-zinc-800 flex items-center justify-center text-zinc-600 overflow-hidden group-hover:border-white/20 transition-all">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                          ) : <Sparkles size={24} />}
                        </div>
                        <div className="space-y-1">
                          <div className="font-black text-white tracking-tight text-lg group-hover:translate-x-1 transition-transform">{product.name}</div>
                          <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">/{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-zinc-950 rounded-full font-black text-xs tracking-tight">
                        <Tag size={12} className="opacity-40" />
                        {formatPrice(product.price)}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      {product.published ? (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          Live Store
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-500 text-[9px] font-black uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                          In Vault
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/admin/products/edit/${product.id}`} 
                          className="w-12 h-12 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-2xl transition-all"
                        >
                          <Edit2 size={20} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          disabled={isDeleting === product.id}
                          className="w-12 h-12 flex items-center justify-center text-red-500/50 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all disabled:opacity-50"
                        >
                          {isDeleting === product.id ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
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
