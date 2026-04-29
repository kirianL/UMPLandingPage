"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { News } from "@/lib/types";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function NewsStackCard({
  news,
  dict,
  lang = "es",
  index,
  total,
}: {
  news: Pick<
    News,
    | "id"
    | "title"
    | "slug"
    | "image_url"
    | "published_at"
    | "created_at"
    | "excerpt"
    | "title_en"
    | "excerpt_en"
  >;
  dict: any;
  lang?: string;
  index: number;
  total: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 100px", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, index === total - 1 ? 1 : 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, index === total - 1 ? 1 : 0.4]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        opacity,
        top: "120px", 
      }}
      className="sticky w-full bg-background pt-12 pb-12 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 lg:gap-24 origin-top mb-[50vh] md:mb-[70vh] border-t border-border"
    >
      {/* LEFT CONTENT (Text) */}
      <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
        <div className="flex flex-col gap-3 md:gap-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-quilon uppercase tracking-tighter leading-tight text-foreground">
            {lang === "en" && news.title_en ? news.title_en : news.title}
          </h2>
          
          <p className="text-muted-foreground font-mono text-xs md:text-sm uppercase tracking-widest leading-relaxed">
            {lang === "en" && news.excerpt_en ? news.excerpt_en : news.excerpt}
          </p>

          <div className="pt-6 md:pt-8">
            <Link
              href={`/${lang}/news/${news.slug}`}
              className="group inline-flex items-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
            >
              [ {dict.read_article || (lang === "en" ? "VIEW MORE" : "VER MÁS")} ]
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        {/* Date below text */}
        <div className="mt-12 opacity-50">
          <span className="text-[10px] font-mono uppercase tracking-widest text-foreground">
             {new Date(news.published_at || news.created_at).toLocaleDateString(
               lang === "en" ? "en-US" : "es-ES",
               { year: "numeric", month: "long", day: "numeric", timeZone: "America/Costa_Rica" }
             )}
          </span>
        </div>
      </div>

      {/* RIGHT CONTENT (Image) - ALWAYS HORIZONTAL */}
      <div className="w-full md:w-7/12 aspect-[4/3] md:aspect-video relative overflow-hidden bg-muted">
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority={index === 0}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              [ {dict.no_image || "NO IMAGE"} ]
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
