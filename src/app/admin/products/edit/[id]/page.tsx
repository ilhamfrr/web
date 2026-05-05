import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

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
        <h1 className="text-3xl font-bold text-white mb-2">Edit Produk</h1>
        <p className="text-zinc-500">Perbarui harga produk, deskripsi, dan aset.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10">
        <ProductForm initialData={product} />
      </div>
    </div>
  );
}
