import { ArrowRight, Code2, Globe, Laptop, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Tentang | IlhamFrr",
  description: "Pelajari lebih lanjut tentang Ilham Firdaus, latar belakangnya, dan alat yang digunakannya untuk membangun produk digital.",
};

export default function AboutPage() {
  const skills = [
    { name: "Full-stack Development", icon: Code2, desc: "Membangun aplikasi end-to-end dengan Next.js dan Node.js." },
    { name: "Strategi Digital", icon: Globe, desc: "Membantu bisnis berkembang melalui solusi digital modern." },
    { name: "Desain Produk", icon: Laptop, desc: "Merancang pengalaman pengguna intuitif yang menghasilkan konversi." },
    { name: "Indie Hacking", icon: Rocket, desc: "Membangun dan meluncurkan produk digital secara mandiri." },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-52 md:pb-44 px-6 bg-[#222831] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFFAF0]/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFFAF0]/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FFFAF0]/5 rounded-full border border-[#FFFAF0]/10 animate-fade-up">
              <span className="text-[10px] font-bold text-[#FFFAF0]/80 uppercase tracking-[0.3em]">The Story Behind</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-[#FFFAF0] leading-[1.1] animate-fade-up animate-delay-100">
              Membangun <br /><span className="italic opacity-80 font-serif">Masa Depan</span> Digital.
            </h1>
            <p className="text-lg md:text-xl text-[#FFFAF0]/60 leading-relaxed animate-fade-up animate-delay-200">
              Halo, saya Ilham. Saya seorang pengembang dan kreator yang fokus membangun
              produk untuk menyelesaikan masalah nyata. Perjalanan saya dimulai dari rasa ingin tahu terhadap kode
              dan telah berkembang menjadi semangat untuk membangun bisnis digital yang utuh.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-16 animate-fade-up animate-delay-300">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-[#222831] tracking-tighter">Filosofi Kerja.</h2>
              <p className="text-[#222831]/70 leading-relaxed text-xl">
                Saya percaya bahwa teknologi terbaik adalah yang tidak terlihat. Fokus saya adalah
                menciptakan alat yang memudahkan hidup orang lain, dengan kode yang bersih dan
                desain yang fungsional.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {skills.map((skill) => (
                <div key={skill.name} className="p-10 glass rounded-[48px] hover:border-[#222831] hover:translate-y-[-10px] transition-all duration-700 premium-shadow group bg-white/50 backdrop-blur-sm">
                  <div className="w-14 h-14 bg-[#222831] rounded-[24px] flex items-center justify-center text-[#FFFAF0] mb-8 group-hover:rotate-12 transition-transform duration-500">
                    <skill.icon size={24} />
                  </div>
                  <h3 className="font-black text-[#222831] text-xl mb-3 tracking-tight">{skill.name}</h3>
                  <p className="text-base text-[#222831]/60 leading-relaxed">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up animate-delay-400 lg:sticky lg:top-32">
            <div className="aspect-[4/5] bg-[#222831] rounded-[60px] overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#222831] to-transparent opacity-60"></div>
              <Image src="/uploads/ilham.jpg" alt="" layout="fill" objectFit="cover" className="absolute inset-0" />
              <div className="absolute inset-0 flex items-center justify-center text-[#FFFAF0]/40 font-black text-9xl rotate-90 select-none group-hover:scale-110 transition-transform duration-1000">
                CREATOR
              </div>
              <div className="absolute bottom-12 left-12 right-12">
                <p className="text-[#FFFAF0] text-sm font-bold uppercase tracking-[0.4em] mb-2">Based in</p>
                <p className="text-[#FFFAF0] text-3xl font-black">Indonesia.</p>
              </div>
            </div>

            {/* Stats Badge */}
            <div className="absolute -bottom-10 -left-10 p-12 bg-[#FFFAF0] rounded-[48px] shadow-2xl border border-[#222831]/5 hidden xl:block animate-bounce-slow">
              <div className="space-y-3">
                <p className="text-5xl font-black text-[#222831] tracking-tighter">50+</p>
                <p className="text-xs font-black text-[#222831]/40 uppercase tracking-[0.3em]">Proyek Selesai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-40">
        <div className="max-w-6xl mx-auto p-12 md:p-32 bg-[#222831] rounded-[60px] text-center space-y-12 overflow-hidden relative shadow-2xl shadow-black/20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,250,240,0.05)_0%,_transparent_70%)]"></div>
          <h2 className="text-4xl md:text-7xl font-black text-[#FFFAF0] relative z-10 leading-[1.1] tracking-tighter">
            Siap untuk <br />berkolaborasi?
          </h2>
          <p className="text-[#FFFAF0]/60 max-w-xl mx-auto relative z-10 text-xl leading-relaxed">
            Mari diskusikan bagaimana kita bisa membangun sesuatu yang berdampak
            bersama-sama. Saya selalu terbuka untuk ide-ide baru.
          </p>
          <div className="relative z-10 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-14 py-6 bg-[#FFFAF0] text-[#222831] font-black rounded-[2.5rem] hover:gap-8 transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95"
            >
              Mulai Diskusi <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </div>

  );
}
