import AffiliateForm from "@/components/admin/AffiliateForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewAffiliatePage() {
  return (
    <div className="space-y-10">
      <div>
        <Link 
          href="/admin/affiliate" 
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Afiliasi
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Tautan Afiliasi Baru</h1>
        <p className="text-zinc-500">Tambah sumber daya atau rekomendasi alat baru.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10">
        <AffiliateForm />
      </div>
    </div>
  );
}
