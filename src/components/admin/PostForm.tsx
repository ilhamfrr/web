"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  X, 
  Loader2, 
  ChevronRight, 
  Eye, 
  Settings,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Code,
  Type,
  Calendar,
  Upload
} from "lucide-react";

interface PostFormProps {
  initialData?: any;
}

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    category: initialData?.category || "",
    coverImage: initialData?.coverImage || "",
    published: initialData?.published || false,
    createdAt: initialData?.createdAt ? new Date(initialData.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.url) {
        setFormData({ ...formData, coverImage: result.url });
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);

    const newText = `${before}${prefix}${selectedText}${suffix}${after}`;
    setFormData({ ...formData, content: newText });

    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const url = initialData ? `/api/posts/${initialData.id}` : "/api/posts";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: `Intelligence successfully ${initialData ? 'synchronized' : 'committed'}` });
        setTimeout(() => {
          router.push("/admin/posts");
          router.refresh();
        }, 1500);
      } else {
        const error = await res.json();
        setStatus({ type: 'error', message: error.error || "Transmission failed" });
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Critical system error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 animate-in fade-in duration-500 pb-20">
      {status && (
        <div className={`p-6 rounded-[32px] border flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 fixed top-8 right-8 z-[100] shadow-2xl backdrop-blur-xl ${
          status.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
            : 'bg-red-500/10 border-red-500/20 text-red-500'
        }`}>
          {status.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <p className="font-black uppercase tracking-widest text-xs">{status.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <div className="flex items-center gap-3">
                <Type size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Master Editor</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse mr-1"></div>
                Real-time Sync Active
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Title Input */}
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Article Title..."
                className="w-full bg-transparent border-none p-0 text-5xl md:text-6xl font-black text-white tracking-tighter placeholder:text-zinc-900 focus:ring-0 outline-none transition-all"
              />

              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl sticky top-4 z-40 backdrop-blur-md">
                <button type="button" onClick={() => insertMarkdown("**", "**")} className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"><Bold size={18} /></button>
                <button type="button" onClick={() => insertMarkdown("*", "*")} className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"><Italic size={18} /></button>
                <button type="button" onClick={() => insertMarkdown("[", "](url)")} className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"><LinkIcon size={18} /></button>
                <div className="w-px h-6 bg-zinc-800 mx-1"></div>
                <button type="button" onClick={() => insertMarkdown("\n# ", "")} className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all font-black text-xs">H1</button>
                <button type="button" onClick={() => insertMarkdown("\n## ", "")} className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all font-black text-xs">H2</button>
                <div className="w-px h-6 bg-zinc-800 mx-1"></div>
                <button type="button" onClick={() => insertMarkdown("\n- ", "")} className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"><List size={18} /></button>
                <button type="button" onClick={() => insertMarkdown("\n1. ", "")} className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"><ListOrdered size={18} /></button>
                <div className="w-px h-6 bg-zinc-800 mx-1"></div>
                <button type="button" onClick={() => insertMarkdown("```\n", "\n```")} className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"><Code size={18} /></button>
                <button type="button" onClick={() => insertMarkdown("![alt](", ")")} className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"><ImageIcon size={18} /></button>
              </div>

              {/* Main Textarea */}
              <textarea
                ref={textareaRef}
                required
                rows={20}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Begin your narrative..."
                className="w-full bg-transparent border-none p-0 text-white font-medium text-xl md:text-2xl leading-relaxed placeholder:text-zinc-900 focus:ring-0 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="space-y-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-8 space-y-10">
            <div className="flex items-center gap-3 text-white">
              <Settings size={18} className="text-zinc-500" />
              <h3 className="font-black uppercase tracking-[0.2em] text-xs">Configuration</h3>
            </div>

            <div className="space-y-8">
              {/* Cover Image Upload */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Cover Image</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative aspect-video rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-950/50 overflow-hidden group cursor-pointer hover:border-white/20 transition-all"
                >
                  {formData.coverImage ? (
                    <>
                      <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <Upload size={24} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-zinc-700 group-hover:text-zinc-400 transition-colors">
                      {uploading ? <Loader2 className="animate-spin" size={24} /> : <ImageIcon size={32} />}
                      <span className="text-[10px] font-black uppercase tracking-widest">Upload Header</span>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              {/* Date Selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Post Date</label>
                <div className="relative group">
                  <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" />
                  <input
                    type="date"
                    value={formData.createdAt}
                    onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
                    className="w-full bg-zinc-800/30 border border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-white font-black text-xs outline-none focus:border-white/10 transition-all uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Intelligence Group"
                  className="w-full bg-zinc-800/30 border border-zinc-800 rounded-2xl px-5 py-4 text-white font-bold text-sm outline-none focus:border-white/10 transition-all"
                />
              </div>

              <div className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl group cursor-pointer hover:bg-white/10 transition-all"
                   onClick={() => setFormData({ ...formData, published: !formData.published })}>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest block">Visibility</span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase">{formData.published ? 'Public Broadcast' : 'Restricted Draft'}</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-all relative ${formData.published ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.published ? 'left-7' : 'left-1'}`}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full group flex items-center justify-between px-8 py-6 bg-white text-zinc-950 font-black rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <div className="flex items-center gap-4">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                <span className="uppercase tracking-widest text-[11px]">{initialData ? "Update Intelligence" : "Commit Post"}</span>
              </div>
              <ChevronRight size={18} className="opacity-30 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-3 px-8 py-6 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white font-black rounded-3xl transition-all"
            >
              <X size={18} />
              <span className="uppercase tracking-widest text-[11px]">Abort</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
