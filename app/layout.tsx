import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReset from "@/components/layout/ScrollReset";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UMPmusic | Sello Discográfico Independiente",
  description: "La casa del sonido real de Limón, Costa Rica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-black text-foreground antialiased selection:bg-primary selection:text-black`}
      >
        <ScrollReset />
        <Navbar />
        <main className="flex-1 min-h-screen flex flex-col">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
