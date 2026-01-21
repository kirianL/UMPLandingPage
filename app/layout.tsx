import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollReset from "@/components/layout/ScrollReset";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const quilon = localFont({
  src: [
    {
      path: "../public/assets/fonts/WEB/fonts/Quilon-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/WEB/fonts/Quilon-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/WEB/fonts/Quilon-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/WEB/fonts/Quilon-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-quilon",
  display: "swap",
  preload: true,
});

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
        className={`${inter.className} ${quilon.variable} min-h-screen bg-black text-foreground antialiased selection:bg-primary selection:text-black`}
      >
        <ScrollReset />
        <main className="flex-1 min-h-screen flex flex-col">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
