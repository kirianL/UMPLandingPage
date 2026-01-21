import { createClient } from "@/lib/supabase/server";
import NewsCard from "@/components/news-card";

export const revalidate = 60; // Revalidate every 60 seconds for freshness

export default async function NewsPage() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("id, title, slug, published_at, image_url")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <div className="min-h-screen bg-black pt-24 pb-24">
      {/* Header */}
      <div className="container px-4 mb-16">
        <div className="border-t border-white/10 pt-8">
          <span className="block text-xs font-mono text-primary uppercase tracking-widest mb-4">
            Newsroom // 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">
            Últimas
            <br />
            Noticias
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Mantente al día con los últimos lanzamientos, anuncios y eventos
            exclusivos de UMP Music Group.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container px-4">
        {news && news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {news.map((item) => (
              <div key={item.id}>
                <NewsCard news={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-white/10 rounded-lg py-24 text-center">
            <p className="text-neutral-500 font-mono">
              No hay noticias publicadas en este momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
