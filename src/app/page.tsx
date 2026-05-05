import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import TextType from "@/components/TextType";
import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-inter",
})

async function getFeaturedData() {
  const [posts, products] = await Promise.all([
    prisma.post.findMany({ where: { published: true }, take: 3, orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({ where: { published: true }, take: 3, orderBy: { createdAt: "desc" } }),
  ]);
  return { posts, products };
}

export default async function Home() {
  const { posts, products } = await getFeaturedData();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-[#222831] md:pt-52 md:pb-48 px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFFAF0]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-[#FFFAF0]/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm text-[8px] md:text-xs font-black text-[#FFFAF0] tracking-[0.4em] uppercase animate-fade-up">
            Full-stack Developer & UI Designer
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.85] text-[#FFFAF0] animate-fade-up animate-delay-100">
            Build the <br />
            <TextType
              text={["Unforgettable."]}
              as="span"
              typingSpeed={100}
              initialDelay={1000}
              pauseDuration={2000}
              deletingSpeed={30}
              loop={true}
              showCursor={true}
              className="text-[#FFFAF0] italic text-[42px] lg:text-[10rem] font-serif opacity-90"
            />
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium animate-fade-up animate-delay-200">
            Membantu startup dan kreator visioner meluncurkan produk digital
            yang skalabel, indah, dan berfokus pada hasil nyata.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 animate-fade-up animate-delay-300">
            <Link href="/products" className="bg-[#FFFAF0] text-[#222831] font-black flex items-center justify-center !px-14 !py-6 !text-xl !rounded-[2.5rem] group hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/5">
              Explore Products <ArrowRight size={22} className="ml-3 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
            <Link href="/contact" className="text-[#FFFAF0] hover:text-white font-black border-b-2 border-white/10 hover:border-[#FFFAF0] !px-4 !py-4 !text-xl transition-all group">
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <div className="w-full bg-[#FFFAF0] shadow-lg shadow-black/20">
        <section className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Kualitas Premium", desc: "Setiap baris kode ditulis dengan standar industri tertinggi untuk performa maksimal." },
              { title: "Desain Modern", desc: "Antarmuka yang bersih, fungsional, dan menyenangkan mata bagi pengguna Anda." },
              { title: "Skalabilitas", desc: "Arsitektur Next.js yang siap tumbuh bersama bisnis Anda tanpa kendala teknis." },
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#222831] flex items-center justify-center text-[#FFFAF0]">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl tracking-widest font-extrabold text-[#222831]">{item.title}</h3>
                </div>
                <p className="text-zinc-500 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            <h1 className={`${inter.className} absolute top-168 right-[-8rem] scale-y-300 scale-x-138 text-[14rem]  font-extrabold text-[#222831]/10`}>COLLACTION</h1>
          </div>
        </section>
      </div>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-6 py-32 space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-[10px] md:text-xs font-bold text-[#222831] tracking-[0.4em] uppercase">Koleksi Pilihan</h2>
          <h3 className="text-3xl md:text-6xl font-extrabold text-[#222831] tracking-tight">Template & Tools Digital</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group flex flex-col glass rounded-[48px] overflow-hidden hover:border-[#222831] hover:translate-y-[-12px] transition-all duration-700 premium-shadow animate-fade-up bg-white/50 backdrop-blur-sm"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="aspect-[4/3] bg-[#222831] relative overflow-hidden">
                {product.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                )}
                <div className="absolute top-8 right-8 px-5 py-2.5 bg-[#FFFAF0] rounded-2xl text-sm font-black text-[#222831] shadow-2xl transition-transform group-hover:scale-110">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div className="p-10 flex-1 flex bg-[#222831] flex-col justify-between group-hover:bg-black transition-colors duration-700">
                <div className="space-y-4">
                  <h4 className="text-2xl font-black text-[#FFFAF0] group-hover:translate-x-2 transition-transform duration-500">
                    {product.name}
                  </h4>
                  <p className="text-[#FFFAF0]/60 text-sm leading-relaxed line-clamp-2">{product.description}</p>
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
      </section>

      {/* Recent Blog Posts */}
      <section className="max-w-6xl mx-auto px-6 py-32 space-y-20">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-[10px] md:text-xs font-bold text-[#222831] tracking-[0.4em] uppercase">Pikiran & Catatan</h2>
            <h3 className="text-3xl md:text-6xl font-extrabold text-[#222831] tracking-tight">Artikel Terbaru</h3>
          </div>
          <Link href="/blog" className="btn-outline !rounded-full !px-8 !py-3 flex items-center gap-2 group">
            Lihat Semua Blog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* Final CTA */}

      <section className="max-w-6xl mx-auto px-6 pb-40">
        <div className="relative p-12 md:p-24 bg-[#222831] rounded-[50px] overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FFFAF0]/20 via-transparent to-transparent"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#FFFAF0] leading-tight">
              Siap Membangun Sesuatu yang Berbeda?
            </h2>
            <p className="text-[#FFFAF0] text-lg md:text-xl  max-w-xl mx-auto leading-relaxed">
              Dapatkan template dan alat digital terbaik untuk mempercepat
              proses pengembangan Anda sekarang juga.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/products"
                className="px-10 py-5 bg-[#FFFAF0] text-[#222831] font-extrabold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                Mulai Sekarang
              </Link>
              <Link
                href="/contact"
                className="text-white font-bold hover:underline underline-offset-8"
              >
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
