import { createClient } from "@/lib/supabase/server";
import NewsCard from "@/components/news-card";

export const revalidate = 60; // Revalidate every 60 seconds for freshness

import { getDictionary } from "@/lib/dictionaries";

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
      "id, title, title_en, slug, published_at, image_url, excerpt, excerpt_en",
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="container px-4 md:px-6 mb-12 pt-8">
        <div className="">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] md:text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase border border-neutral-800 px-2 py-1">
              {dict.news.breadcrumb}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-quilon text-white uppercase tracking-[-0.02em] leading-[0.8] mb-6">
            <span style={{ fontStretch: "condensed" }}>
              {dict.news.title_sub}
              <br />
              <span className="text-[#1b4b2f]">{dict.news.title_main}</span>
            </span>
          </h1>
          <p className="text-base md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-mono">
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
          <div className="border border-dashed border-white/10 rounded-lg py-24 text-center">
            <p className="text-neutral-500 font-mono">{dict.news.no_news}</p>
          </div>
        )}
      </div>
    </div>
  );
}
