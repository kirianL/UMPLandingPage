import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollReset from "@/components/layout/ScrollReset";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

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

/* ═══ SEO: Viewport ═══ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

/* ═══ SEO: Global Metadata ═══ */
export const metadata: Metadata = {
  title: {
    default: "UMPmusic | Sello Discográfico Independiente",
    template: "%s | UMPmusic",
  },
  description:
    "UMPmusic es el sello discográfico independiente de Limón, Costa Rica. Descubrí artistas, DJs y productores del Caribe costarricense.",
  keywords: [
    "UMP music",
    "sello discográfico",
    "Limón Costa Rica",
    "música independiente",
    "artistas caribeños",
    "productores musicales",
    "independent record label",
  ],
  authors: [{ name: "UMPmusic" }],
  creator: "UMPmusic",
  publisher: "UMPmusic",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://umpmusic.com",
  ),
  openGraph: {
    type: "website",
    locale: "es_CR",
    alternateLocale: "en_US",
    siteName: "UMPmusic",
    title: "UMPmusic | Sello Discográfico Independiente",
    description:
      "La casa del sonido real de Limón, Costa Rica. Artistas, DJs y productores del Caribe.",
    images: [
      {
        url: "/assets/og-image.webp",
        width: 1200,
        height: 630,
        alt: "UMPmusic — El Sonido de Limón",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UMPmusic | Sello Discográfico Independiente",
    description: "La casa del sonido real de Limón, Costa Rica.",
    images: ["/assets/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.className} ${quilon.variable} min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="ump-theme"
        >
          <ScrollReset />
          <main className="flex-1 min-h-screen flex flex-col">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
