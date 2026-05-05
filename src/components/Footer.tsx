import Link from "next/link";
import { Mail } from "lucide-react";

// Custom SVG Brand Icons (since Lucide removed them in latest versions)
const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const socials = [
  { href: "https://twitter.com/ilhamfrr", icon: TwitterIcon, label: "Twitter" },
  { href: "https://linkedin.com/in/ilhamfrr", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "mailto:hello@ilhamfrr.dev", icon: Mail, label: "Email" },
];

const footerLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Produk", href: "/products" },
  { label: "Sumber Daya", href: "/affiliate" },
  { label: "Tentang", href: "/about" },
  { label: "Kontak", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#FFFAF0] bg-[#222831]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-4xl font-black text-[#FFFAF0] tracking-tighter group">
              IlhamFrr
            </Link>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs">
              Fullstack developer & content creator. Membangun produk digital
              dan berbagi apa yang saya pelajari.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Hubungi Saya
            </h3>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#FFFAF0] text-[#222831] hover:bg-[#8900FF] hover:text-[#FFFAF0] transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#FFFAF0]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} IlhamFrr. Hak cipta dilindungi undang-undang.</p>
          <p>Dibuat dengan Semangat · Sabar · Teliti</p>
        </div>
      </div>
    </footer>
  );
}
