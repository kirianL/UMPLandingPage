import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/news/share-button";
import { getDictionary } from "@/lib/dictionaries";

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

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[60px] opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[60px] opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl pt-24 md:pt-32 pb-20">
        {/* Navigation */}
        <Link
          href={`/${lang}/news`}
          className="inline-flex items-center gap-3 text-neutral-400 hover:text-primary transition-all duration-300 mb-12 font-mono text-xs uppercase tracking-[0.2em] group border border-white/5 rounded-full px-4 py-2 bg-black/50 backdrop-blur-sm hover:border-primary/50"
        >
          <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
          <span className="relative top-[1px]">{dict.news.back_to_news}</span>
        </Link>

        {/* Creative Header Layout */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-20 items-end">
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            {/* Metadata Tags - More Editorial */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 w-full md:w-fit gap-8">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-neutral-500">
                <span className="text-primary font-bold">
                  {new Date(newsItem.published_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="lg:hidden">
                <ShareButton
                  title={newsItem.title}
                  dict={dict.components.share_button}
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-quilon text-white uppercase tracking-[-0.02em] leading-[0.9]">
              {isEn && newsItem.title_en ? newsItem.title_en : newsItem.title}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:text-right lg:border-l lg:border-white/10 lg:pl-8 lg:py-2">
            {(isEn && newsItem.excerpt_en
              ? newsItem.excerpt_en
              : newsItem.excerpt) && (
              <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed">
                {isEn && newsItem.excerpt_en
                  ? newsItem.excerpt_en
                  : newsItem.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* Featured Media */}
        {newsItem.image_url && (
          <div className="mb-24 relative w-full aspect-[21/9] group overflow-hidden rounded-sm border border-white/10">
            <div className="absolute inset-0 bg-neutral-900" />
            <Image
              src={newsItem.image_url}
              alt={newsItem.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
              <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">
                {dict.news.featured_image}
              </span>
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="hidden lg:block lg:col-span-2 sticky top-32 h-fit space-y-8">
            <div className="flex flex-col gap-4 border-l-2 border-white/10 pl-4 py-2">
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest block mb-2">
                {dict.news.share_label}
              </span>
              <ShareButton
                title={newsItem.title}
                dict={dict.components.share_button}
              />
            </div>
          </div>

          <article
            className="lg:col-span-8 prose prose-invert prose-lg md:prose-xl max-w-none 
            prose-headings:font-black prose-headings:font-quilon prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white
            prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:font-light
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline hover:prose-a:text-white transition-colors
            prose-strong:text-white prose-strong:font-bold
            prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
            prose-img:rounded-lg prose-img:border prose-img:border-white/10 prose-img:shadow-2xl"
          >
            {(isEn && newsItem.content_en
              ? newsItem.content_en
              : newsItem.content
            )
              ?.split("\n")
              .map((paragraph: string, idx: number) => {
                if (
                  paragraph.length < 50 &&
                  paragraph === paragraph.toUpperCase() &&
                  paragraph.length > 3
                ) {
                  return (
                    <h3 key={idx} className="text-2xl mt-12 mb-6 text-primary">
                      {paragraph}
                    </h3>
                  );
                }

                return paragraph.trim() !== "" && <p key={idx}>{paragraph}</p>;
              })}
          </article>
        </div>

        {/* Footer Navigation */}
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <Link
            href={`/${lang}/news`}
            className="group flex flex-col items-center md:items-start gap-2"
          >
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest group-hover:text-primary transition-colors">
              {dict.news.back_to_news}
            </span>
            <span className="text-2xl font-black font-quilon text-white uppercase tracking-tight group-hover:text-neutral-300 transition-colors">
              {dict.news.read_all_news}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
