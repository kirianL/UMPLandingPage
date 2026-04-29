"use client";

import * as motion from "framer-motion/client";
import NewsStackCard from "@/components/news-stack-card";
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

        {/* HERO SECTION - TIPOGRAFÍA EXTREMA */}
        <section className="relative py-8 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title with staggered word reveal */}
            <motion.h1
              className="text-[14vw] sm:text-[12vw] md:text-[9vw] leading-[0.85] font-black font-quilon uppercase tracking-tighter text-foreground text-center sm:text-left drop-shadow-sm flex flex-col items-center sm:items-start overflow-hidden"
            >
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="block text-primary"
              >
                {dict.news.title_1}
              </motion.span>
              {dict.news.title_2 && (
                <motion.span 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                  className="block"
                >
                  {dict.news.title_2}
                </motion.span>
              )}
            </motion.h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-6 md:mt-10 flex justify-center sm:justify-start"
          >
            <p className="font-mono text-sm md:text-base uppercase max-w-sm text-center md:text-left text-muted-foreground">
              {dict.news.hero_desc}
            </p>
          </motion.div>

          {/* Animated divider line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="h-px bg-border mt-8 md:mt-12 origin-left"
          />
        </section>

        {/* GRID DE NOTICIAS */}
        <section className="pt-0 pb-16">
          {news && news.length > 0 ? (
            <div className="flex flex-col relative w-full">
              {news.map((item, index) => (
                <NewsStackCard
                  key={item.id}
                  news={item}
                  dict={dict.components.news_card}
                  lang={lang}
                  index={index}
                  total={news.length}
                />
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
