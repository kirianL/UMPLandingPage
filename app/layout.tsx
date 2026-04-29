import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollReset from "@/components/layout/ScrollReset";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
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
  fallback: ["system-ui", "sans-serif"],
});

/* ═══ SEO: Viewport ═══ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
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
    "UMPmusic",
    "música Limón",
    "Caribbean music",
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
        type: "image/webp",
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
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  manifest: "/manifest.json",
  category: "music",
};

/* ═══ JSON-LD Structured Data ═══ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "UMPmusic",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://umpmusic.com",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://umpmusic.com"}/assets/UMP LOGO NEGATIVO.webp`,
  description:
    "Sello discográfico independiente de Limón, Costa Rica. Artistas, DJs y productores del Caribe costarricense.",
  foundingLocation: {
    "@type": "Place",
    name: "Limón, Costa Rica",
  },
  genre: ["Reggae", "Dancehall", "Latin", "Urban", "Caribbean"],
  sameAs: [
    "https://instagram.com",
    "https://youtube.com",
    "https://spotify.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* ── Resource Hints ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        )}
        <link rel="dns-prefetch" href="https://instagram.com" />
        <link rel="dns-prefetch" href="https://youtube.com" />
        <link rel="dns-prefetch" href="https://spotify.com" />
      </head>
      <body
        className={`${inter.variable} ${quilon.variable} font-sans min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-black`}
      >
        {/* ── JSON-LD Structured Data ── */}
        <Script
          id="json-ld-musicgroup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
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
