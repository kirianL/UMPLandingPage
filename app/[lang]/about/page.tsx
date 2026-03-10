import { getDictionary } from "@/lib/dictionaries";
import AboutContent from "./content";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "About Us" : "Nosotros",
    description: isEn
      ? "Learn the story of UMPmusic, the independent record label born in Limón, Costa Rica."
      : "Conocé la historia de UMPmusic, el sello discográfico independiente nacido en Limón, Costa Rica.",
    alternates: {
      canonical: `/${lang}/about`,
      languages: { es: "/es/about", en: "/en/about" },
    },
  };
}
export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <AboutContent dict={dict} />;
}
