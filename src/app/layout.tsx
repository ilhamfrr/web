"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  return (
    <html lang="id" className={inter.variable}>
      <body className="bg-[#FFFAF0] text-[#222831] antialiased">
        {!isAdminPath && <Navbar />}
        <main className="min-h-screen">{children}</main>
        {!isAdminPath && <Footer />}
      </body>
    </html>
  );
}
