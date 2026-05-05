import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    createdAt: Date | string;
    coverImage?: string | null;
  };
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block animate-fade-up h-full"
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      <article className="glass rounded-[48px] overflow-hidden hover:border-[#222831] hover:translate-y-[-10px] transition-all duration-700 premium-shadow h-full flex flex-col bg-white/50 backdrop-blur-sm">
        <div className="aspect-[16/10] bg-[#222831] relative overflow-hidden">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#FFFAF0]/10 font-black text-6xl select-none group-hover:scale-125 transition-transform duration-1000">
              ARTICLE
            </div>
          )}
          <div className="absolute top-8 left-8">
            <span className="px-4 py-2 glass rounded-full text-[10px] font-black text-[#fffaf0] uppercase tracking-[0.2em] border border-white/10 shadow-xl">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-10 flex-1 flex flex-col">
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4 text-[10px] font-bold text-[#222831]/50 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                {formatDate(post.createdAt)}
              </div>
              <div className="w-1 h-1 bg-[#222831]/20 rounded-full"></div>
              <div className="flex items-center gap-1.5">
                <User size={12} />
                IlhamFrr
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-[#222831] group-hover:translate-x-2 transition-transform duration-500 leading-tight">
              {post.title}
            </h3>
            
            <p className="text-[#222831]/60 text-base leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-[#222831]/5 mt-10">
            <div className="flex items-center gap-3 text-sm font-black text-[#222831] group-hover:gap-5 transition-all duration-500">
              READ ARTICLE <ArrowRight size={18} className="text-[#222831]" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
