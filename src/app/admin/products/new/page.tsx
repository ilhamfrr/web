import ProductForm from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="space-y-10">
      <div>
        <Link 
          href="/admin/products" 
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Produk
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Tambah Produk Baru</h1>
        <p className="text-zinc-500">Daftarkan aset digital baru di etalase Anda.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10">
        <ProductForm />
      </div>
    </div>
  );
}
