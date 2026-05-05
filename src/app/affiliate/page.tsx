import { prisma } from "@/lib/prisma";
import { ExternalLink, MousePointer2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Sumber Daya & Alat | IlhamFrr",
  description: "Daftar alat, layanan, dan sumber daya yang saya gunakan dan rekomendasikan.",
};

async function getAffiliateLinks() {
  return prisma.affiliateLink.findMany({
    where: { active: true },
    orderBy: { category: "asc" },
  });
}

export default async function AffiliatePage() {
  const links = await getAffiliateLinks();

  // Group links by category
  const categories = links.reduce((acc: any, link) => {
    const category = link.category || "Umum";
    if (!acc[category]) acc[category] = [];
    acc[category].push(link);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      {/* Header */}
      <section className="pt-32 pb-24 md:pt-52 md:pb-44 px-6 bg-[#222831] relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFFAF0]/5 rounded-full blur-3xl -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFFAF0]/5 rounded-full blur-2xl -ml-32 -mb-32"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FFFAF0]/5 rounded-full border border-[#FFFAF0]/10 animate-fade-up">
              <span className="text-[10px] font-bold text-[#FFFAF0]/80 uppercase tracking-[0.3em]">Curated Resources</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-[#FFFAF0] leading-[1.1] animate-fade-up animate-delay-100">
              Stack <br /><span className="italic opacity-80 font-serif">Selection.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#FFFAF0]/60 leading-relaxed animate-fade-up animate-delay-200">
              Koleksi alat, hosting, dan layanan yang saya gunakan secara pribadi
              untuk membangun dan mengembangkan bisnis digital saya. Setiap alat di sini telah teruji kualitasnya.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-40">
        {Object.keys(categories).length === 0 ? (
          <div className="py-32 text-center glass rounded-[50px] border-dashed border-[#222831]/20 premium-shadow">
            <p className="text-[#222831]/40 text-xl font-bold uppercase tracking-widest">Belum ada sumber daya yang terdaftar.</p>
          </div>
        ) : (
          <div className="space-y-32">
            {Object.entries(categories).map(([category, items]: [string, any], catIndex) => (
              <div key={category} className="animate-fade-up" style={{ animationDelay: `${(catIndex + 1) * 150}ms` }}>
                <div className="flex items-center gap-8 mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-[#222831] whitespace-nowrap">
                    {category}.
                  </h2>
                  <div className="h-px w-full bg-[#222831]/10"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {items.map((item: any) => (
                    <a
                      key={item.id}
                      href={`/r/${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-10 glass rounded-[48px] hover:border-[#222831] hover:translate-y-[-12px] transition-all duration-700 premium-shadow flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-8 text-[#222831]/5 group-hover:text-[#222831]/10 transition-colors duration-500">
                        <ExternalLink size={60} strokeWidth={1} />
                      </div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                          <div className="w-16 h-16 bg-[#222831] rounded-3xl flex items-center justify-center text-[#FFFAF0] shadow-2xl group-hover:rotate-[15deg] transition-transform duration-500">
                            <ExternalLink size={24} />
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-[#222831]/50 bg-[#222831]/5 px-4 py-2 rounded-full uppercase tracking-widest">
                            <MousePointer2 size={12} />
                            {item.clicks} clicks
                          </div>
                        </div>

                        <h3 className="text-2xl font-black text-[#222831] mb-4 group-hover:translate-x-2 transition-transform duration-500">
                          {item.label}
                        </h3>

                        <p className="text-base text-[#222831]/60 leading-relaxed mb-10">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-8 border-t border-[#222831]/5 relative z-10">
                        <span className="text-sm font-black text-[#222831] flex items-center gap-3 group-hover:gap-5 transition-all duration-500">
                          GET STARTED <ArrowRight size={18} />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer Card */}
        <div className="mt-40 p-12 md:p-20 bg-[#222831] rounded-[60px] text-center relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(255,250,240,0.1)_0%,_transparent_70%)]"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FFFAF0]/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>

          <div className="relative z-10 space-y-6">
            <h4 className="text-[#FFFAF0] text-2xl font-black uppercase tracking-widest">Transparency.</h4>
            <p className="text-base md:text-lg text-[#FFFAF0]/60 italic max-w-3xl mx-auto leading-relaxed">
              &ldquo;Beberapa tautan di atas adalah tautan afiliasi. Saya hanya merekomendasikan alat yang benar-benar saya percayai dan gunakan untuk memberikan hasil terbaik bagi klien dan proyek saya.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
