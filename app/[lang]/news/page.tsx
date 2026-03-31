import { createClient } from "@/lib/supabase/server";
import NewsContent from "./content";
import type { Metadata } from "next";

export const revalidate = 60;

import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "News" : "Noticias",
    description: isEn
      ? "The latest releases, events, and news from UMPmusic."
      : "Los últimos lanzamientos, eventos y noticias de UMPmusic.",
    alternates: {
      canonical: `/${lang}/news`,
      languages: { es: "/es/news", en: "/en/news" },
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select(
      "id, title:title_es, title_en, slug, published_at, created_at, image_url, excerpt:excerpt_es, excerpt_en",
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return <NewsContent news={news || []} dict={dict} lang={lang} />;
}

