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
  const isLast = index === total - 1;

  // ── ENTRANCE: track when card enters viewport from bottom ──
  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.4"],
  });

  // ── EXIT: track when card is being covered by the next one ──
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.2", "start start"],
  });

  // ── ENTRANCE TRANSFORMS ──
  // Text slides in from left, image slides in from right
  const textX = useTransform(enterProgress, [0, 1], [-60, 0]);
  const imageX = useTransform(enterProgress, [0, 1], [80, 0]);
  const enterOpacity = useTransform(enterProgress, [0, 0.5, 1], [0, 0.4, 1]);

  // Image parallax — moves slightly slower for depth
  const imageY = useTransform(enterProgress, [0, 1], [40, 0]);

  // Image reveal clip (wipes from right to left)
  const clipProgress = useTransform(enterProgress, [0.1, 0.8], [100, 0]);

  // ── EXIT TRANSFORMS (archiving effect) ──
  const scale = useTransform(exitProgress, [0, 1], [1, isLast ? 1 : 0.92]);
  const exitOpacity = useTransform(exitProgress, [0, 1], [1, isLast ? 1 : 0.15]);
  const blur = useTransform(exitProgress, [0, 1], [0, isLast ? 0 : 6]);
  const yShift = useTransform(exitProgress, [0, 1], [0, isLast ? 0 : -20]);

  // Each card stacks slightly lower to show stacking depth
  const stickyTop = 80 + index * 15;

  return (
    <div
      ref={containerRef}
      className="min-h-[260px] md:min-h-[320px]"
      style={{ position: "relative" }}
    >
      <motion.div
        style={{
          scale,
          opacity: exitOpacity,
          y: yShift,
          position: "sticky",
          top: `${stickyTop}px`,
        }}
        className="w-full bg-background flex flex-row items-stretch origin-top border-t border-border py-6 md:py-10 overflow-hidden"
      >
        {/* LEFT CONTENT (Text) — slides in from the left */}
        <motion.div
          style={{ x: textX, opacity: enterOpacity }}
          className="flex-1 flex flex-col justify-center pr-4 md:pr-12 lg:pr-16"
        >
          <div className="flex flex-col gap-2 md:gap-3">
            <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black font-quilon uppercase tracking-tighter leading-tight text-foreground">
              {lang === "en" && news.title_en ? news.title_en : news.title}
            </h2>
            
            <p className="text-muted-foreground font-mono text-[8px] md:text-xs uppercase tracking-widest leading-relaxed line-clamp-2 md:line-clamp-3">
              {lang === "en" && news.excerpt_en ? news.excerpt_en : news.excerpt}
            </p>

            <div className="pt-2 md:pt-4">
              <Link
                href={`/${lang}/news/${news.slug}`}
                className="group inline-flex items-center gap-2 text-[8px] md:text-xs font-mono uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors duration-300"
              >
                [ {dict.read_article || (lang === "en" ? "VIEW MORE" : "VER MÁS")} ]
                <ArrowUpRight className="w-3 h-3 hidden md:block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT (Image) — slides in from the right with parallax + clip reveal */}
        <motion.div
          style={{ x: imageX, y: imageY, opacity: enterOpacity }}
          className="w-[45%] md:w-[55%] shrink-0 relative overflow-hidden bg-muted aspect-square md:aspect-[4/3]"
        >
          {news.image_url ? (
            <motion.div
              className="w-full h-full relative"
              style={{
                clipPath: clipProgress.get
                  ? undefined
                  : undefined,
              }}
            >
              <Image
                src={news.image_url}
                alt={news.title}
                fill
                sizes="(max-width: 768px) 45vw, 55vw"
                className="object-cover"
                priority={index === 0}
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                [ {dict.no_image || "NO IMAGE"} ]
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
