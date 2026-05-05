"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  Link2, 
  Home, 
  LogOut, 
  Loader2, 
  ChevronRight,
  Shield,
  Settings
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      return;
    }

    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    
    if (!isLoggedIn) {
      router.replace("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.replace("/admin/login");
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Articles", icon: FileText },
    { href: "/admin/products", label: "Storefront", icon: ShoppingBag },
    { href: "/admin/affiliate", label: "Resources", icon: Link2 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  // Loading state while checking authorization
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#222831] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-white animate-spin opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="text-white/20 w-6 h-6" />
          </div>
        </div>
        <div className="space-y-1 text-center">
          <p className="text-white text-[10px] font-black tracking-[0.4em] uppercase">Authenticating</p>
          <div className="flex gap-1 justify-center">
            <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce delay-75"></div>
            <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce delay-150"></div>
            <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  // If we are on the login page, don't show the sidebar/layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 font-sans selection:bg-white selection:text-zinc-950">
      {/* Admin Sidebar */}
      <aside className="w-72 border-r border-zinc-800 bg-[#222831] hidden md:flex flex-col fixed inset-y-0 z-50">
        {/* Sidebar Header / Logo */}
        <div className="p-10 border-b border-zinc-800/50">
          <Link href="/admin" className="group flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-zinc-950 shadow-xl shadow-white/5 group-hover:scale-110 transition-all duration-500">
              <Shield size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white text-lg tracking-tighter leading-tight">IlhamFrr</span>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Console v2.0</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? "bg-white text-zinc-950 shadow-2xl shadow-white/10" 
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={20} className={isActive ? "text-zinc-950" : "group-hover:scale-110 transition-transform"} />
                  <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>
                </div>
                {isActive && <ChevronRight size={16} className="text-zinc-950/30" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-8 border-t border-zinc-800/50 space-y-4">
          <Link
            href="/"
            className="flex items-center gap-4 px-5 py-3 text-zinc-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest group"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-800">
              <Home size={14} />
            </div>
            Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 px-5 py-4 text-red-500 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all text-xs font-black uppercase tracking-[0.2em]"
          >
            <div className="w-8 h-8 rounded-lg bg-red-500/5 flex items-center justify-center">
              <LogOut size={16} />
            </div>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        {/* Top Header Placeholder / Glass effect header can go here if needed */}
        
        <main className="flex-1 p-8 md:p-16 overflow-y-auto">
          {children}
        </main>
        
        {/* Content Footer */}
        <footer className="p-8 md:p-16 border-t border-zinc-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">
              &copy; 2026 ILHAMFRR.ADMIN.SYS
            </p>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/5"></div>
              <div className="w-2 h-2 rounded-full bg-white/5"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
