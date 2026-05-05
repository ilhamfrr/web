import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "@/components/admin/PostForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <div>
        <Link 
          href="/admin/posts" 
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Artikel
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Edit Artikel</h1>
        <p className="text-zinc-500">Perbarui konten artikel dan metadata Anda.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10">
        <PostForm initialData={post} />
      </div>
    </div>
  );
}
