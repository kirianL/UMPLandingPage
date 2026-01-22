import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ShareButton from "@/components/news/share-button";
import { getDictionary } from "@/lib/dictionaries";
import NewsBackground from "@/components/news/news-background";
import NewsArticleContent from "@/components/news/news-article-content";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data: news } = await supabase
    .from("news")
    .select("slug")
    .eq("is_published", true);

  return news?.map(({ slug }) => ({ slug })) || [];
}

import { cache } from "react";

// Cached data fetcher
const getNewsItem = cache(async (slug: string) => {
  const supabase = await createServerClient();
  const { data: newsItem } = await supabase
    .from("news")
    .select(
      "id, title, title_en, slug, image_url, published_at, excerpt, excerpt_en, content, content_en",
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  return newsItem;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const news = await getNewsItem(slug);

  if (!news) return { title: "Noticia no encontrada" };
  const isEn = lang === "en";

  return {
    title: `${isEn && news.title_en ? news.title_en : news.title} | UMP News`,
    description: isEn && news.excerpt_en ? news.excerpt_en : news.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);
  const isEn = lang === "en";

  const newsItem = await getNewsItem(slug);

  if (!newsItem) {
    notFound();
  }

  const contentParagraphs = (
    isEn && newsItem.content_en ? newsItem.content_en : newsItem.content
  )?.split("\n");

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-primary selection:text-black overflow-x-hidden">
      <NewsBackground />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl pt-20 md:pt-28 pb-16 md:pb-24">
        {/* Back Navigation */}
        <Link
          href={`/${lang}/news`}
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary transition-all duration-300 mb-8 md:mb-12 font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] group"
        >
          <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
          <span>{dict.news.back_to_news}</span>
        </Link>

        {/* Header Section */}
        <header className="mb-12 md:mb-16">
          {/* Green Accent Bar */}
          <div className="w-16 h-1 bg-primary mb-6 md:mb-8" />

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8 text-xs md:text-sm">
            <div className="flex items-center gap-2 text-primary font-mono font-bold">
              <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <time dateTime={newsItem.published_at}>
                {new Date(newsItem.published_at).toLocaleDateString(
                  lang === "en" ? "en-US" : "es-ES",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </time>
            </div>
            <span className="text-neutral-600">•</span>
            <div className="flex items-center gap-2 text-neutral-500 font-mono">
              <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>
                {Math.ceil((contentParagraphs?.join(" ").length || 0) / 1000)}{" "}
                min
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-quilon text-white uppercase tracking-[-0.02em] leading-[0.85] mb-6 md:mb-8">
            {isEn && newsItem.title_en ? newsItem.title_en : newsItem.title}
          </h1>

          {/* Excerpt */}
          {(isEn && newsItem.excerpt_en
            ? newsItem.excerpt_en
            : newsItem.excerpt) && (
            <p className="text-base md:text-xl text-neutral-400 font-light leading-relaxed max-w-3xl border-l-2 border-primary/50 pl-4 md:pl-6">
              {isEn && newsItem.excerpt_en
                ? newsItem.excerpt_en
                : newsItem.excerpt}
            </p>
          )}

          {/* Share Button - Mobile */}
          <div className="mt-6 md:hidden">
            <ShareButton
              title={newsItem.title}
              dict={dict.components.share_button}
            />
          </div>
        </header>

        {/* Featured Image */}
        {newsItem.image_url && (
          <div className="mb-12 md:mb-16 relative w-full aspect-video md:aspect-[21/9] overflow-hidden border border-white/10 bg-neutral-900">
            <Image
              src={newsItem.image_url}
              alt={newsItem.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Share Sidebar - Desktop */}
          <aside className="hidden md:block md:col-span-2 sticky top-24 h-fit">
            <div className="flex flex-col gap-4 border-l-2 border-primary/30 pl-4">
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                {dict.news.share_label}
              </span>
              <ShareButton
                title={newsItem.title}
                dict={dict.components.share_button}
              />
            </div>
          </aside>

          <NewsArticleContent paragraphs={contentParagraphs || []} />
        </div>

        {/* Footer Navigation */}
        <footer className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-white/10">
          <Link
            href={`/${lang}/news`}
            className="group inline-flex flex-col gap-2 hover:gap-3 transition-all"
          >
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest group-hover:text-primary transition-colors">
              {dict.news.back_to_news}
            </span>
            <span className="text-2xl md:text-3xl font-black font-quilon text-white uppercase tracking-tight group-hover:text-primary transition-colors flex items-center gap-3">
              {dict.news.read_all_news}
              <ArrowLeft className="h-6 w-6 rotate-180 group-hover:translate-x-2 transition-transform" />
            </span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
