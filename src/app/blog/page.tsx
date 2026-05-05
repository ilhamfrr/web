import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Blog & Insight | IlhamFrr",
  description: "Artikel, tutorial, dan wawasan tentang pengembangan web, desain, dan bisnis digital.",
};

async function getPosts() {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      {/* Header */}
      <section className="pt-32 pb-24 md:pt-52 md:pb-44 px-6 bg-[#222831] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFFAF0]/5 rounded-full blur-[140px] -mr-72 -mt-72"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFFAF0]/5 rounded-full blur-[100px] -ml-40 -mb-40"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FFFAF0]/5 rounded-full border border-[#FFFAF0]/10 animate-fade-up">
              <span className="text-[10px] font-bold text-[#FFFAF0]/80 uppercase tracking-[0.3em]">Thoughts & Insights</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-[#FFFAF0] leading-[1.1] animate-fade-up animate-delay-100">
              Catatan <br /><span className="italic opacity-80 font-serif">Digital.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#FFFAF0]/60 leading-relaxed animate-fade-up animate-delay-200">
              Berbagi pemikiran tentang pengembangan web, strategi produk digital,
              dan perjalanan saya sebagai pengembang full-stack. Di sini saya menulis apa yang saya pelajari setiap harinya.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-40">
        {posts.length === 0 ? (
          <div className="py-32 text-center glass rounded-[60px] border-dashed border-[#222831]/20 premium-shadow">
            <p className="text-[#222831]/40 text-xl font-bold uppercase tracking-widest">Belum ada artikel yang diterbitkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
