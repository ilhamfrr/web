"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Produk", href: "/products" },
  { label: "Project", href: "/affiliate" },
  { label: "Tentang", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkPage = ['/', '/blog', '/affiliate', '/products', '/about', '/contact'].includes(pathname) || 
                     pathname.startsWith('/products/') || 
                     pathname.startsWith('/blog/');

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
        ? "py-4 bg-[#FFFAF0]/80 backdrop-blur-xl shadow-2xl shadow-black/5"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className={`text-3xl md:text-4xl font-black tracking-tighter transition-colors duration-500 ${
            !scrolled && isDarkPage 
              ? 'text-[#FFFAF0]' 
              : 'text-[#222831]'
          }`}
        >
          IlhamFrr
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="flex items-center gap-2 mr-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const isHeroDark = !scrolled && isDarkPage;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 text-sm font-bold transition-all rounded-full ${isActive
                    ? isHeroDark ? "bg-[#FFFAF0] text-[#222831]" : "bg-[#222831] text-[#FFFAF0]"
                    : isHeroDark 
                      ? "text-[#FFFAF0]/70 hover:text-[#FFFAF0] hover:bg-white/10"
                      : "text-[#222831]/70 hover:text-[#222831] hover:bg-[#222831]/5"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/contact"
            className={`!py-3 !px-8 !text-[10px] !rounded-full uppercase tracking-[0.2em] font-black flex items-center gap-2 group transition-all duration-500 ${
              !scrolled && isDarkPage
                ? "bg-[#FFFAF0] text-[#222831] hover:bg-white"
                : "bg-[#222831] text-[#FFFAF0] hover:bg-black"
              }`}
          >
            Konsultasi <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-500 ${
            !scrolled && isDarkPage 
              ? 'bg-white/10 text-[#FFFAF0]' 
              : 'bg-[#222831]/5 text-[#222831]'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-[#FFFAF0] p-8 flex flex-col justify-center space-y-8 animate-fade-up z-[-1]">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-5xl font-black tracking-tight transition-all ${pathname === link.href ? "text-[#222831]" : "text-[#222831]/30"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-8 border-t border-[#222831]/10">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="bg-[#222831] text-[#FFFAF0] font-black py-6 rounded-[2rem] uppercase tracking-[0.2em] flex items-center justify-center gap-2 group w-full text-lg shadow-2xl"
            >
              Mulai Konsultasi <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
