import { Mail, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

// Custom SVG Brand Icons (since Lucide removed them in latest versions)
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

export const metadata = {
  title: "Kontak | IlhamFrr",
  description: "Hubungi IlhamFrr untuk proyek freelance, kolaborasi, atau sekadar menyapa.",
};

export default function ContactPage() {
  const contacts = [
    { label: "Email", value: "hello@ilhamfrr12.com", icon: Mail, href: "mailto:hello@ilhamfrr12.com" },
    { label: "Twitter", value: "@ilhamfrr", icon: TwitterIcon, href: "https://twitter.com/ilhamfrr" },
    { label: "GitHub", value: "ilhamfrr", icon: GithubIcon, href: "https://github.com/ilhamfrr" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      {/* Header */}
      <section className="pt-32 pb-24 md:pt-52 md:pb-44 px-6 bg-[#222831] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFFAF0]/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFFAF0]/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FFFAF0]/5 rounded-full border border-[#FFFAF0]/10 animate-fade-up">
              <span className="text-[10px] font-bold text-[#FFFAF0]/80 uppercase tracking-[0.3em]">Let&apos;s Connect</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-[#FFFAF0] leading-[1.1] animate-fade-up animate-delay-100">
              Mari <br /><span className="italic opacity-80 font-serif">Terhubung.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#FFFAF0]/60 leading-relaxed animate-fade-up animate-delay-200">
              Punya proyek impian atau sekadar ingin berdiskusi? Saya selalu terbuka untuk
              peluang baru dan kolaborasi yang berdampak besar.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-up animate-delay-200">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-12 glass rounded-[48px] hover:border-[#222831] hover:translate-y-[-10px] transition-all duration-700 premium-shadow group bg-white/50 backdrop-blur-sm"
            >
              <div className="w-20 h-20 bg-[#222831] rounded-[28px] flex items-center justify-center text-[#FFFAF0] mb-8 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                <contact.icon size={32} />
              </div>
              <h3 className="text-xs font-black text-[#222831]/30 uppercase tracking-[0.4em] mb-3">{contact.label}</h3>
              <p className="text-xl font-black text-[#222831] tracking-tight">{contact.value}</p>
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-32 p-12 md:p-24 glass rounded-[60px] animate-fade-up animate-delay-300 relative overflow-hidden group bg-white/50 backdrop-blur-sm premium-shadow">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#222831]/5 rounded-full blur-[100px] -mr-40 -mt-40 transition-all duration-1000 group-hover:scale-150"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 text-xs font-black uppercase tracking-[0.2em]">
                Tersedia untuk Proyek Baru
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#222831] leading-[1.1] tracking-tighter">
                Ayo mulai membangun <br /> sesuatu yang <span className="italic font-serif opacity-70">luar biasa.</span>
              </h2>
              <p className="text-[#222831]/60 leading-relaxed text-lg md:text-xl">
                Cara tercepat untuk menghubungi saya adalah melalui email. Saya biasanya merespons
                dalam waktu 24-48 jam pada hari kerja. Mari kita wujudkan ide Anda.
              </p>
            </div>

            <div className="bg-[#222831] p-12 md:p-16 rounded-[48px] text-[#FFFAF0] space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <h3 className="text-2xl font-black tracking-tight">Ketersediaan.</h3>
              <p className="text-[#FFFAF0]/60 text-base md:text-lg leading-relaxed">
                Saya saat ini menerima proyek freelance dan kontrak untuk periode Q3 & Q4 2026.
                Fokus saya saat ini adalah Next.js, Mobile App, dan Sistem SaaS.
              </p>
              <div className="pt-4">
                <Link
                  href="mailto:hello@ilhamfrr.dev"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-[#FFFAF0] text-[#222831] font-black rounded-3xl hover:gap-6 transition-all duration-500 shadow-2xl"
                >
                  Kirim Email Sekarang <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
