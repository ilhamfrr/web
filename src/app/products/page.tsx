import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Produk Digital | IlhamFrr",
  description: "Template, ebook, dan alat digital pilihan untuk mempercepat alur kerja Anda.",
};

async function getProducts() {
  return prisma.product.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      {/* Header */}
      <section className="pt-32 pb-24 md:pt-52 md:pb-44 px-6 bg-[#222831] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FFFAF0]/5 rounded-full blur-[120px] -ml-64 -mt-64"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FFFAF0]/5 rounded-full blur-[100px] -mr-40 -mb-40"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FFFAF0]/5 rounded-full border border-[#FFFAF0]/10 animate-fade-up">
              <span className="text-[10px] font-bold text-[#FFFAF0]/80 uppercase tracking-[0.3em]">Premium Collection</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-[#FFFAF0] leading-[1.1] animate-fade-up animate-delay-100">
              Produk <br /><span className="italic opacity-80 font-serif">Pilihan.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#FFFAF0]/60 leading-relaxed animate-fade-up animate-delay-200">
              Koleksi template, alat, dan aset digital yang dirancang untuk membantu Anda
              membangun dan meluncurkan produk lebih cepat dengan standar kualitas tinggi.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group flex flex-col glass rounded-[48px] overflow-hidden hover:border-[#222831] hover:translate-y-[-12px] transition-all duration-700 premium-shadow animate-fade-up bg-white/50 backdrop-blur-sm"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="aspect-[4/3] bg-[#222831] relative overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#FFFAF0]/10 font-black text-6xl select-none group-hover:scale-125 transition-transform duration-1000">
                    TOOLS
                  </div>
                )}
                <div className="absolute top-8 right-8 px-5 py-2.5 bg-[#FFFAF0] rounded-2xl text-sm font-black text-[#222831] shadow-2xl transition-transform group-hover:scale-110">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div className="p-10 flex-1 flex bg-[#222831] flex-col justify-between group-hover:bg-black transition-colors duration-700">
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-[#FFFAF0] group-hover:translate-x-2 transition-transform duration-500">
                    {product.name}
                  </h2>
                  <p className="text-[#FFFAF0]/60 text-sm leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-[#FFFAF0]/10 mt-10">
                  <div className="flex items-center gap-3 text-sm font-black text-[#FFFAF0] group-hover:gap-5 transition-all duration-500">
                    VIEW DETAILS <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="py-32 text-center glass rounded-[60px] border-dashed border-[#222831]/20 premium-shadow">
            <p className="text-[#222831]/40 text-xl font-bold uppercase tracking-widest">Belum ada produk yang tersedia.</p>
          </div>
        )}
      </section>
    </div>

  );
}
