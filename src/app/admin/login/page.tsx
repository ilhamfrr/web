"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2, Sparkles, ShieldCheck, ChevronLeft } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email === "admin@ilhamfrr.com" && password === "admin123") {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "/admin";
      } else {
        setError("Kredensial yang Anda masukkan salah. Silakan coba lagi.");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#FFFAF0] overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden md:flex md:w-[45%] bg-[#222831] relative p-20 flex-col justify-between overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-[#222831] transition-all duration-500">
              <ChevronLeft size={20} />
            </div>
            <span className="text-3xl font-black text-[#FFFAF0] tracking-tighter">IlhamFrr</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 rounded-full border border-white/10">
            <span className="text-[10px] font-black text-[#FFFAF0]/80 uppercase tracking-[0.3em]">Admin Console v2.0</span>
          </div>
          <h2 className="text-7xl font-black text-[#FFFAF0] leading-[1] tracking-tighter">
            Control your <br /><span className="italic font-serif text-[#FFFAF0]/50">Digital Realm.</span>
          </h2>
          <p className="text-[#FFFAF0]/60 text-xl max-w-sm leading-relaxed font-medium">
            A high-performance command center designed for modern creators and developers.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-[#FFFAF0]/20 text-[10px] font-black uppercase tracking-[0.4em]">
          <ShieldCheck size={18} />
          <span>Military-Grade Encryption Active</span>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-24 relative bg-[#FFFAF0]">

        <div className="w-full max-w-md space-y-16 relative z-10">
          <div className="space-y-6">
            <div className="w-16 h-[2px] bg-[#222831]"></div>
            <div className="space-y-2">
              <h1 className="text-6xl font-black text-[#222831] tracking-tighter leading-none">Welcome.</h1>
              <p className="text-[#222831]/40 text-xl font-bold tracking-tight">Login to your workspace</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-8">
              {/* Email */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#222831]/30 uppercase tracking-[0.3em] ml-2">
                  Work Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none text-[#222831]/20 group-focus-within:text-[#222831] transition-all duration-500 group-focus-within:scale-110">
                    <Mail size={22} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@ilhamfrr.com"
                    className="w-full bg-white border-[3px] border-[#222831]/5 rounded-[32px] py-6 pl-16 pr-8 text-[#222831] font-bold text-lg placeholder:text-[#222831]/10 outline-none focus:border-[#222831] focus:bg-white shadow-sm focus:shadow-2xl focus:shadow-[#222831]/5 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-[11px] font-black text-[#222831]/30 uppercase tracking-[0.3em]">
                    Secret Key
                  </label>
                  <Link href="#" className="text-[10px] font-black text-[#222831]/60 uppercase tracking-[0.2em] hover:text-[#222831] transition-all">
                    Reset?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none text-[#222831]/20 group-focus-within:text-[#222831] transition-all duration-500 group-focus-within:scale-110">
                    <Lock size={22} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border-[3px] border-[#222831]/5 rounded-[32px] py-6 pl-16 pr-8 text-[#222831] font-bold text-lg placeholder:text-[#222831]/10 outline-none focus:border-[#222831] focus:bg-white shadow-sm focus:shadow-2xl focus:shadow-[#222831]/5 transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-6 bg-red-500/5 border-l-4 border-red-500 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-4 animate-shake">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                {error}
              </div>
            )}

            <button
              disabled={isLoading}
              className="w-full py-7 bg-[#222831] text-[#FFFAF0] font-black rounded-[32px] flex items-center justify-center gap-4 hover:gap-8 transition-all duration-700 shadow-2xl shadow-black/20 group active:scale-[0.97] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <Loader2 size={24} className="animate-spin" />
                  <span className="uppercase tracking-[0.2em] text-xs">Authenticating...</span>
                </div>
              ) : (
                <>
                  <span className="uppercase tracking-[0.2em] text-xs">Authorize Access</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                </>
              )}
            </button>
          </form>

          <div className="pt-8 flex items-center justify-between border-t border-[#222831]/5">
            <p className="text-[#222831]/20 text-[10px] font-black uppercase tracking-[0.4em]">
              &copy; 2026 ILHAMFRR.SYS
            </p>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-[#222831]/10"></div>
              <div className="w-2 h-2 rounded-full bg-[#222831]/10"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}
