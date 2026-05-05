import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock, Sparkles, Share2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  });
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | IlhamFrr Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Simple reading time calculation
  const wordsPerMinute = 200;
  const noOfWords = post.content.split(/\s/g).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);

  return (
    <div className="min-h-screen bg-[#FFFAF0] selection:bg-[#222831] selection:text-[#FFFAF0]">
      {/* Dynamic Header / Hero */}
      <section className="pt-32 pb-24 md:pt-52 md:pb-40 px-6 bg-[#222831] relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-white rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="space-y-10">
            <div className="flex flex-wrap items-center gap-6">
              {post.category && (
                <span className="px-5 py-2 bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">
                  {post.category}
                </span>
              )}
              <div className="flex items-center gap-3 text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
                <Clock size={16} />
                {minutes} min read
              </div>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-10 pt-10 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-lg font-black text-[#222831] shadow-2xl shadow-white/10">
                  IF
                </div>
                <div>
                  <p className="text-white font-black text-lg tracking-tight">IlhamFrr</p>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Creator & Thinker</p>
                </div>
              </div>
              
              <div className="flex items-center gap-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Published</span>
                  <div className="flex items-center gap-3 text-white/80">
                    <Calendar size={14} className="text-white/40" />
                    <span className="text-sm font-black uppercase tracking-widest">{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#222831] transition-all duration-500">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Area */}
      <article className="max-w-4xl mx-auto px-6 -mt-20 relative z-20 pb-32">
        {/* Cover Image with High-End Presentation */}
        {post.coverImage && (
          <div className="aspect-[21/9] w-full rounded-[40px] md:rounded-[60px] overflow-hidden mb-24 shadow-2xl shadow-[#222831]/20 bg-[#222831] border-8 border-[#FFFAF0]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Markdown Content with Premium Typography */}
        <div className="prose prose-2xl prose-zinc max-w-none 
          prose-headings:font-black prose-headings:text-[#222831] prose-headings:tracking-tighter
          prose-h1:text-6xl prose-h2:text-4xl prose-h2:mt-20
          prose-p:text-[#222831]/80 prose-p:leading-[1.8] prose-p:text-xl
          prose-strong:text-[#222831] prose-strong:font-black
          prose-blockquote:border-l-[6px] prose-blockquote:border-[#222831] prose-blockquote:bg-[#222831]/5 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-[32px] prose-blockquote:not-italic
          prose-code:bg-[#222831]/5 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:text-[#222831] prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#222831] prose-pre:rounded-[32px] prose-pre:p-8 prose-pre:shadow-2xl
          prose-img:rounded-[40px] prose-img:shadow-2xl
          prose-a:text-[#222831] prose-a:underline prose-a:underline-offset-4 prose-a:font-black hover:prose-a:opacity-50 transition-all
          prose-ul:list-disc prose-ol:list-decimal prose-li:text-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Dynamic Footer CTA */}
        <footer className="mt-40">
          <div className="p-12 md:p-24 bg-[#222831] rounded-[80px] text-center relative overflow-hidden group shadow-2xl">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,250,240,0.03)_0%,_transparent_70%)]"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 rounded-full border border-white/10">
                <Sparkles size={16} className="text-white/60" />
                <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">Enjoyed the read?</span>
              </div>
              <h3 className="text-4xl md:text-7xl font-black text-[#FFFAF0] tracking-tighter leading-none">Let's build <br/><span className="italic font-serif text-white/40">the future.</span></h3>
              <p className="text-[#FFFAF0]/60 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-5 px-14 py-6 bg-[#FFFAF0] text-[#222831] font-black rounded-[32px] hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl group"
                >
                  Get in Touch 
                  <ArrowLeft size={22} className="rotate-180 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-[#222831]/5 pt-12">
            <Link href="/blog" className="flex items-center gap-3 text-[#222831]/40 hover:text-[#222831] font-black uppercase tracking-widest text-[10px] transition-colors">
              <ArrowLeft size={16} />
              Back to Intelligence Hub
            </Link>
            <p className="text-[#222831]/20 text-[9px] font-black uppercase tracking-[0.5em]">
              &copy; 2026 ILHAMFRR.PUBLISHING.CORP
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
}
