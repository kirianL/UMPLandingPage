"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { News } from "@/lib/types";

export default function NewsCard({
  news,
  dict,
  lang = "es",
}: {
  news: Pick<
    News,
    // Add new optional fields to Pick
    | "id"
    | "title"
    | "slug"
    | "image_url"
    | "published_at"
    | "excerpt"
    | "title_en"
    | "excerpt_en"
  >;
  dict: {
    no_image: string;
    read_article: string;
  };
  lang?: string;
}) {
  return (
    <Link
      href={`/${lang}/news/${news.slug}`}
      className="group block"
      prefetch={true}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 border border-white/10 mb-4">
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-900">
            <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest">
              {dict.no_image}
            </span>
          </div>
        )}

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1">
          <time
            dateTime={news.published_at}
            className="text-[10px] font-mono text-white uppercase tracking-wider"
            suppressHydrationWarning
          >
            {new Date(news.published_at).toLocaleDateString(
              lang === "en" ? "en-US" : "es-ES",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            )}
          </time>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white uppercase leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {lang === "en" && news.title_en ? news.title_en : news.title}
        </h3>
        {(lang === "en" && news.excerpt_en
          ? news.excerpt_en
          : news.excerpt) && (
          <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
            {lang === "en" && news.excerpt_en ? news.excerpt_en : news.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">
          <span>{dict.read_article}</span>
          <ArrowUpRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}
