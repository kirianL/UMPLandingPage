import { createClient } from "@/lib/supabase/server";
import NewsCard from "@/components/news-card";
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

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="container px-4 md:px-6 mb-12 pt-8">
        <div className="">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] md:text-xs font-mono text-muted-foreground tracking-[0.2em] uppercase border border-border px-2 py-1">
              {dict.news.breadcrumb}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-quilon text-foreground uppercase tracking-[-0.02em] leading-[0.8] mb-6">
            <span style={{ fontStretch: "condensed" }}>
              {dict.news.title_sub}
              <br />
              <span className="text-[#18943a]">{dict.news.title_main}</span>
            </span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-mono">
            {dict.news.subtitle}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container px-4">
        {news && news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {news.map((item) => (
              <div key={item.id}>
                <NewsCard
                  news={item}
                  dict={dict.components.news_card}
                  lang={lang}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border rounded-lg py-24 text-center">
            <p className="text-muted-foreground font-mono">
              {dict.news.no_news}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
