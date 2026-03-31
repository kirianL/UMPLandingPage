"use client";

import * as motion from "framer-motion/client";
import NewsCard from "@/components/news-card";
import { News } from "@/lib/types";

interface NewsContentProps {
  news: any[];
  dict: any;
  lang: string;
}

export default function NewsContent({ news, dict, lang }: NewsContentProps) {
  const revealUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden selection:bg-primary selection:text-primary-foreground pt-8 md:pt-14 pb-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 w-full">
        
        {/* HEADER MINI-BAR AL ESTILO REVISTA */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex justify-between items-center border-b border-border py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span>{dict.news.header_archive}</span>
          <span>{dict.news.header_sub}</span>
        </motion.div>

        {/* HERO SECTION - TIPOGRAFÍA EXTREMA (Mobile First) */}
        <section className="relative py-12 md:py-24 border-b border-border">
          <motion.h1
            initial="hidden" animate="visible" variants={revealUp}
            className="text-[14vw] sm:text-[12vw] md:text-[9vw] leading-[0.85] font-black font-quilon uppercase tracking-tighter text-foreground text-center sm:text-left drop-shadow-sm flex flex-col items-center sm:items-start"
          >
            <span className="block text-primary">{dict.news.title_1}</span>
            <span className="block">{dict.news.title_2}</span>
          </motion.h1>
          
          <div className="mt-12 md:mt-20 flex justify-center sm:justify-start">
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="font-mono text-sm md:text-base uppercase max-w-sm text-center md:text-left text-muted-foreground"
            >
              {dict.news.hero_desc}
            </motion.p>
          </div>
        </section>

        {/* GRID DE NOTICIAS */}
        <section className="py-20 md:py-32">
          {news && news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {news.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NewsCard
                    news={item}
                    dict={dict.components.news_card}
                    lang={lang}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-dashed border-border py-32 text-center"
            >
              <p className="text-muted-foreground font-mono uppercase tracking-widest text-sm">
                {dict.news.no_news}
              </p>
            </motion.div>
          )}
        </section>

      </div>
    </div>
  );
}
