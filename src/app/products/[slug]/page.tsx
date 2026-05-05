import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, Download, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
  });
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | IlhamFrr Store`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const features = [
    "Instant digital download",
    "Commercial license included",
    "Lifetime updates & support",
    "Clean, documented code/assets"
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      {/* Hero Header */}
      <section className="pt-32 pb-24 md:pt-52 md:pb-44 px-6 bg-[#222831] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFFAF0]/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFFAF0]/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>

        <div className="max-w-6xl mx-auto relative z-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FFFAF0]/5 rounded-full border border-[#FFFAF0]/10">
                <span className="text-[10px] font-bold text-[#FFFAF0]/80 uppercase tracking-[0.3em]">Premium Digital Tool</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-[#FFFAF0] leading-[0.9] tracking-tighter">
                {product.name}
              </h1>
            </div>
            <div className="pb-4">
              <p className="text-[#FFFAF0]/40 text-sm font-bold uppercase tracking-[0.4em] mb-2">Price starting at</p>
              <p className="text-5xl md:text-7xl font-black text-[#FFFAF0] tracking-tighter">{formatPrice(product.price)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Gallery & Features */}
          <div className="lg:col-span-7 space-y-20">
            <div className="aspect-[4/3] w-full rounded-[60px] bg-[#222831] overflow-hidden premium-shadow group relative">
              {product.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag size={80} className="text-[#FFFAF0]/10" />
                </div>
              )}
            </div>

            <div className="space-y-10">
              <h3 className="text-3xl font-black text-[#222831] tracking-tight">Apa yang Anda dapatkan.</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <div key={feature} className="p-8 glass rounded-[32px] border border-[#222831]/5 flex items-start gap-4 bg-white/40">
                    <div className="w-10 h-10 rounded-2xl bg-[#222831] flex items-center justify-center text-[#FFFAF0] shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-lg font-bold text-[#222831]/70 leading-tight pt-2">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-12">
              <div className="space-y-6">
                <h3 className="text-xs font-black text-[#222831]/30 uppercase tracking-[0.4em]">Deskripsi Produk</h3>
                <div className="prose prose-zinc max-w-none prose-p:text-[#222831]/70 prose-p:text-xl prose-p:leading-relaxed">
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="p-10 md:p-12 bg-[#222831] rounded-[48px] text-[#FFFAF0] space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="space-y-2">
                  <p className="text-[#FFFAF0]/40 text-xs font-bold uppercase tracking-[0.3em]">Total Bayar</p>
                  <p className="text-5xl font-black tracking-tighter">{formatPrice(product.price)}</p>
                </div>

                <div className="space-y-4">
                  <button className="w-full py-6 bg-[#FFFAF0] text-[#222831] font-black rounded-3xl flex items-center justify-center gap-3 transition-all duration-500 hover:gap-6 shadow-2xl group active:scale-95">
                    <Download size={22} className="group-hover:translate-y-1 transition-transform" />
                    BELI SEKARANG
                  </button>
                  <div className="flex items-center justify-center gap-3 text-[10px] text-[#FFFAF0]/30 font-black uppercase tracking-widest">
                    <ShieldCheck size={14} />
                    Pembayaran Aman via Stripe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
