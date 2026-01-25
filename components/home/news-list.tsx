"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface NewsItem {
  id: string;
  title: string;
  title_en?: string | null;
  slug: string;
  image_url: string | null;
  published_at: string;
}

export function NewsList({
  news,
  dict,
  lang,
}: {
  news: NewsItem[];
  dict: {
    latest_news_title_1: string;
    latest_news_title_2: string;
    view_archive: string;
    news_badge: string;
    no_image: string;
  };
  lang: string;
}) {
  // Take first 3 for a balanced grid, or 5 for bento. Let's do 3 for now for clean "Latest" section.
  const displayNews = news.slice(0, 3);

  return (
    <section className="py-12 md:py-20 bg-neutral-950 relative overflow-hidden">
      <div className="container px-4">
        {/* Header - Localized */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black font-quilon text-white uppercase tracking-[-0.02em] leading-[0.9]">
              {dict.latest_news_title_1}{" "}
              <span className="text-neutral-600">
                {dict.latest_news_title_2}
              </span>
            </h2>
          </div>
          <Link
            href={`/${lang}/news`}
            className="group flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest border border-white/20 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-all"
          >
            {dict.view_archive}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid Layout - Visual Cards */}
        {/* Mobile: 2 Columns | Desktop: 3 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {displayNews.map((item, index) => (
            <Link
              key={item.id}
              href={`/${lang}/news/${item.slug}`}
              className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5"
            >
              {/* Image with Zoom Effect */}
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                  <span className="text-neutral-600 font-mono text-xs">
                    [ {dict.no_image} ]
                  </span>
                </div>
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-white text-black text-[8px] md:text-[10px] font-bold uppercase tracking-wider rounded-sm opacity-80">
                    {dict.news_badge}
                  </span>
                  <ArrowUpRight className="text-white w-4 h-4 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <div className="transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                  <time
                    dateTime={item.published_at}
                    className="text-primary font-mono text-[8px] md:text-xs uppercase tracking-widest block mb-1 md:mb-2"
                    suppressHydrationWarning
                  >
                    {new Date(item.published_at).toLocaleDateString(
                      lang === "es" ? "es-ES" : "en-US",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </time>
                  <h3 className="text-lg md:text-3xl font-bold font-quilon text-white uppercase leading-none md:leading-tight line-clamp-3 group-hover:text-white transition-colors">
                    {lang === "en" && item.title_en
                      ? item.title_en
                      : item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
