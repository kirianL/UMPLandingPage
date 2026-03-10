import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/providers/language-provider";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

import { getDictionary } from "@/lib/dictionaries";

/* ═══ Dynamic metadata per language ═══ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: {
      default: isEn
        ? "UMPmusic | Independent Record Label"
        : "UMPmusic | Sello Discográfico Independiente",
      template: "%s | UMPmusic",
    },
    description: isEn
      ? "UMPmusic is the independent record label from Limón, Costa Rica. Discover Caribbean artists, DJs, and producers."
      : "UMPmusic es el sello discográfico independiente de Limón, Costa Rica. Descubrí artistas, DJs y productores del Caribe.",
    openGraph: {
      locale: isEn ? "en_US" : "es_CR",
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <LanguageProvider>
      <Navbar />
      <main className="flex-1 min-h-screen flex flex-col pt-20">
        {children}
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </LanguageProvider>
  );
}
