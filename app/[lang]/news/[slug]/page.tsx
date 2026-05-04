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

export const revalidate = 300;
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

const getNewsItem = cache(async (slug: string) => {
  const decodedSlug = decodeURIComponent(slug);
  const supabase = await createServerClient();
  const { data: newsItem } = await supabase
    .from("news")
    .select(
      "id, title:title_es, title_en, slug, image_url, published_at, created_at, excerpt:excerpt_es, excerpt_en, content:content_es, content_en",
    )
    .eq("slug", decodedSlug)
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
  const decodedSlug = decodeURIComponent(slug);
  const news = await getNewsItem(decodedSlug);

  if (!news) return { title: "Noticia no encontrada" };
  const isEn = lang === "en";
  const title = isEn && news.title_en ? news.title_en : news.title;
  const description = isEn && news.excerpt_en ? news.excerpt_en : news.excerpt;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ultimatemediaproductions.com";

  return {
    title,
    description,
    openGraph: {
      title,
      description: description || undefined,
      images: news.image_url
        ? [{ url: news.image_url, width: 1200, height: 630, alt: title, type: "image/jpeg" }]
        : [{ url: `${siteUrl}/assets/og-image.webp`, width: 1200, height: 630 }],
      type: "article",
      publishedTime: news.published_at || news.created_at,
      siteName: "UMPmusic",
      url: `${siteUrl}/${lang}/news/${decodedSlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || undefined,
      images: news.image_url
        ? [{ url: news.image_url, width: 1200, height: 630, alt: title }]
        : [{ url: `${siteUrl}/assets/og-image.webp`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `/${lang}/news/${decodedSlug}`,
      languages: {
        es: `/es/news/${decodedSlug}`,
        en: `/en/news/${decodedSlug}`,
      },
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const dict = await getDictionary(lang);
  const isEn = lang === "en";

  const newsItem = await getNewsItem(decodedSlug);

  if (!newsItem) {
    notFound();
  }
  
  // Fetch latest 3 news items for the showcase
  const supabase = await createServerClient();
  const { data: latestNews } = await supabase
    .from("news")
    .select("id, title:title_es, title_en, slug, image_url, published_at, created_at, excerpt:excerpt_es, excerpt_en")
    .eq("is_published", true)
    .neq("id", newsItem.id) // exclude current
    .order("published_at", { ascending: false })
    .limit(3);

  const displayDate = newsItem.published_at || newsItem.created_at;

  const contentParagraphs = (
    isEn && newsItem.content_en ? newsItem.content_en : newsItem.content
  )?.split("\n");

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-black overflow-x-hidden">
      {/* We removed NewsBackground to have a clean dark modern look */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 pt-20 md:pt-32 pb-16 md:pb-24 max-w-[1400px]">
        
        {/* Back Navigation */}
        <Link
          href={`/${lang}/news`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 mb-16 md:mb-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] group"
        >
          <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
          <span>{dict.news.back_to_news || "BACK TO NEWS"}</span>
        </Link>

        {/* Header Section - Modern Editorial Layout */}
        <header className="flex flex-col md:flex-row gap-12 md:gap-24 mb-20 md:mb-32">
          
          {/* Left Column - Small Meta */}
          <div className="w-full md:w-1/4 flex flex-col gap-6">
            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              {dict.news.about_article || "ABOUT THIS ARTICLE"}
            </span>
            
            {/* Metadata */}
            <div className="flex flex-col gap-3 text-xs md:text-sm text-muted-foreground">
              <time dateTime={displayDate} className="font-mono uppercase tracking-widest text-foreground" suppressHydrationWarning>
                {new Date(displayDate).toLocaleDateString(
                  lang === "en" ? "en-US" : "es-ES",
                  { year: "numeric", month: "long", day: "numeric", timeZone: "America/Costa_Rica" }
                )}
              </time>
              <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-foreground">
                <Clock className="h-3 w-3" />
                <span>
                  {Math.ceil((contentParagraphs?.join(" ").length || 0) / 1000)} {dict.news.min_read || "MIN READ"}
                </span>
              </div>
            </div>

            {/* Share Button - Desktop */}
            <div className="hidden md:block mt-8">
              <span className="block text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-4">
                {dict.news.share_label || "SHARE"}
              </span>
              <ShareButton title={newsItem.title} dict={dict.components?.share_button || {}} />
            </div>
          </div>

          {/* Right Column - Massive Text & Image */}
          <div className="w-full md:w-3/4 flex flex-col">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black font-quilon text-foreground uppercase tracking-tighter leading-[0.85] mb-12">
              {isEn && newsItem.title_en ? newsItem.title_en : newsItem.title}
            </h1>

            {/* Featured Image */}
            {newsItem.image_url && (
              <div className="mb-12 relative w-full md:w-2/3 aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={newsItem.image_url}
                  alt={newsItem.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            )}

            {/* Excerpt */}
            {(isEn && newsItem.excerpt_en ? newsItem.excerpt_en : newsItem.excerpt) && (
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-foreground uppercase tracking-[0.2em] shrink-0">
                  {dict.news.overview || "[ OVERVIEW ]"}
                </span>
                <p className="text-sm md:text-base text-muted-foreground font-mono uppercase tracking-widest leading-relaxed max-w-xl">
                  {isEn && newsItem.excerpt_en ? newsItem.excerpt_en : newsItem.excerpt}
                </p>
              </div>
            )}
            
            {/* Share Button - Mobile */}
            <div className="mt-12 md:hidden">
              <ShareButton title={newsItem.title} dict={dict.components?.share_button || {}} />
            </div>
          </div>
        </header>

        {/* Article Content — Centered editorial column */}
        <div className="flex justify-center">
          <div className="w-full max-w-[720px] relative">
            {/* Floating Share Sidebar - Desktop */}
            <aside className="hidden lg:block absolute -left-20 top-0 w-14 sticky top-24 h-fit">
              <div className="flex flex-col gap-4 border-l-2 border-primary/30 pl-3">
                <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">
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
        </div>

        {/* LATEST NEWS SHOWCASE */}
        {latestNews && latestNews.length > 0 && (
          <section className="mt-24 md:mt-32 pt-12 md:pt-16 border-t border-border">
            <div className="mb-8 md:mb-12">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                {dict.news.portfolio || "PORTFOLIO"}
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-quilon uppercase tracking-tighter text-foreground mb-2">
                {dict.news.latest_news_showcase || "LATEST EPISODES SHOWCASE"}
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {dict.news.discover_stories || "DISCOVER CAPTIVATING STORIES AND INSIGHTS."}
              </p>
            </div>

            {/* Mobile: vertical cards | Desktop: 3 column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {latestNews.map((item) => (
                <Link
                  href={`/${lang}/news/${item.slug}`}
                  key={item.id}
                  className="group flex flex-col bg-transparent overflow-hidden border border-border hover:border-primary/40 transition-all duration-300"
                >
                  {/* Image — always full width horizontal */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted shrink-0">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={lang === "en" && item.title_en ? item.title_en : item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        {dict.components?.news_card?.no_image || "NO IMAGE"}
                      </div>
                    )}
                    {/* Date badge */}
                    <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm border border-border px-2.5 py-1">
                      <time
                        dateTime={item.published_at || item.created_at}
                        className="text-[9px] font-mono text-foreground uppercase tracking-wider"
                        suppressHydrationWarning
                      >
                        {new Date(item.published_at || item.created_at).toLocaleDateString(
                          lang === "en" ? "en-US" : "es-ES",
                          { month: "short", day: "numeric", timeZone: "America/Costa_Rica" }
                        )}
                      </time>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="p-4 md:p-5 flex flex-col flex-1">
                    <h3 className="text-base md:text-lg font-black font-quilon uppercase leading-tight text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {lang === "en" && item.title_en ? item.title_en : item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4 flex-1">
                      {lang === "en" && item.excerpt_en ? item.excerpt_en : item.excerpt}
                    </p>
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-foreground group-hover:text-primary transition-colors">
                      [ {dict.components?.news_card?.read_article || (isEn ? "READ ARTICLE" : "LEER ARTÍCULO")} ]
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <footer className="mt-20 pt-12 border-t border-border flex justify-center">
          <Link
            href={`/${lang}/news`}
            className="group inline-flex items-center gap-4 hover:gap-6 transition-all"
          >
            <ArrowLeft className="h-4 w-4 text-foreground transition-transform" />
            <span className="text-sm font-mono text-foreground uppercase tracking-widest transition-colors">
              {dict.news.back_to_news || "BACK TO ALL NEWS"}
            </span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
