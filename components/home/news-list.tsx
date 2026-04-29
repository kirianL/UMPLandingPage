"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import NewsStackCard from "@/components/news-stack-card";

interface NewsItem {
  id: string;
  title: string;
  title_en: string | null;
  slug: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
  excerpt: string | null;
  excerpt_en: string | null;
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
  const displayNews = news.slice(0, 3);

  return (
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      <div className="container px-4">
        {/* Header - Localized */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black font-quilon text-foreground uppercase tracking-[-0.02em] leading-[0.9]">
              {dict.latest_news_title_1}{" "}
              <span className="text-muted-foreground">
                {dict.latest_news_title_2}
              </span>
            </h2>
          </div>
          <Link
            href={`/${lang}/news`}
            className="group flex items-center gap-2 text-foreground font-mono text-xs uppercase tracking-widest border border-border rounded-full px-6 py-3 hover:bg-foreground hover:text-background transition-all"
          >
            {dict.view_archive}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stacking Layout - Editorial Visuals */}
        <div className="flex flex-col relative w-full pt-4">
          {displayNews.map((item, index) => (
            <NewsStackCard
              key={item.id}
              news={item}
              dict={dict}
              lang={lang}
              index={index}
              total={displayNews.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
