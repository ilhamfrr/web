"use client";

import { useState, useEffect, useRef } from "react";
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Save, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Smartphone,
  History,
  Key
} from "lucide-react";
import { nanoid } from "nanoid";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      setProfile({
        name: data.name || "",
        email: data.email || "",
        avatar: data.avatar || "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        setProfile({ ...profile, avatar: result.url });
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: "Profile intelligence successfully synchronized" });
        setProfile({ ...profile, password: "" });
      } else {
        setStatus({ type: 'error', message: "Synchronization protocol failed" });
      }
    } catch (error) {
      setStatus({ type: 'error', message: "System failure during transmission" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-zinc-800 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            <ShieldCheck size={12} />
            Command Center / Security
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Account <span className="italic font-serif text-zinc-500">Settings.</span>
            </h1>
            <p className="text-zinc-500 text-lg font-medium">Manage your administrative identity and security protocols.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Profile Visual */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[48px] p-10 flex flex-col items-center text-center space-y-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-[60px] bg-zinc-800 border-4 border-zinc-900 overflow-hidden shadow-2xl group-hover:border-white/20 transition-all duration-500">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 font-black text-4xl">
                    {profile.name?.charAt(0) || "A"}
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-zinc-950/80 flex items-center justify-center">
                    <Loader2 size={32} className="text-white animate-spin" />
                  </div>
                )}
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-14 h-14 bg-white text-zinc-950 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
              >
                <Camera size={24} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight">{profile.name || "Administrator"}</h2>
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{profile.email || "access-restricted"}</p>
            </div>

            <div className="w-full pt-6 border-t border-zinc-800/50 flex flex-col gap-4">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <span>Access Level</span>
                <span className="text-emerald-500">Root / Admin</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <span>Account Status</span>
                <span className="text-white">Active</span>
              </div>
            </div>
          </div>

          <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[32px] space-y-4">
            <div className="flex items-center gap-3 text-emerald-500">
              <ShieldCheck size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Security Tip</span>
            </div>
            <p className="text-emerald-500/60 text-xs font-medium leading-relaxed">
              Use a complex password combining symbols, numbers, and capital letters to maintain maximum security over your portfolio hub.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-[48px] p-10 md:p-14 space-y-12">
            
            {status && (
              <div className={`p-6 rounded-[32px] border flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 ${
                status.type === 'success' 
                  ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                  : 'bg-red-500/5 border-red-500/20 text-red-500'
              }`}>
                {status.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                <p className="font-black uppercase tracking-widest text-xs">{status.message}</p>
              </div>
            )}

            {/* Basic Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-zinc-500">
                <User size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Personal Intelligence</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Full Name</label>
                  <div className="relative group">
                    <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-white transition-colors" />
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-zinc-800/30 border border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-white font-black text-sm outline-none focus:border-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Email Address</label>
                  <div className="relative group">
                    <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-white transition-colors" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-zinc-800/30 border border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-white font-black text-sm outline-none focus:border-white/10 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-zinc-500">
                <Lock size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Security Protocol</span>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">New Password (Leave empty to keep current)</label>
                <div className="relative group">
                  <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-white transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={profile.password}
                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                    className="w-full bg-zinc-800/30 border border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-white font-black text-sm outline-none focus:border-white/10 transition-all placeholder:text-zinc-800"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4 text-zinc-600">
                <Smartphone size={18} />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest">Active Device</span>
                  <span className="text-[10px] font-bold">Standard Web Interface</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="group flex items-center gap-4 px-10 py-5 bg-white text-zinc-950 font-black rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl shadow-white/5"
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                <span className="uppercase tracking-widest text-[11px]">Save Intelligence</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
