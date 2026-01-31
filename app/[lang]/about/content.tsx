"use client";

import * as motion from "framer-motion/client";

interface AboutContentProps {
  dict: any; // Using any for dictionary to avoid complex type duplication for now
}

export default function AboutContent({ dict }: AboutContentProps) {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white font-quilon overflow-hidden">
      {/* SECTION 1: EDITORIAL HERO */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center px-4 overflow-hidden mb-24">
        {/* Background elements (abstract gradient/glow) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.span
            variants={fadeIn}
            className="text-xs md:text-sm font-bold tracking-[0.2em] text-neutral-400 mb-4 inline-block uppercase"
          >
            {dict.about.hero_subtitle}
          </motion.span>
          <motion.h1
            variants={fadeIn}
            className="text-[12vw] leading-none font-bold tracking-tighter mix-blend-difference text-white mb-8"
          >
            {dict.about.h1_title}
          </motion.h1>
        </motion.div>
      </section>

      {/* SECTION 2: NARRATIVE (Editorial Layout) */}
      <section className="container mx-auto px-6 md:px-12 mb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 md:sticky md:top-24"
          >
            <h2 className="text-3xl md:text-5xl font-light leading-tight">
              {dict.about.intro_p1}
            </h2>
            <div className="w-24 h-1 bg-white mt-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-6 md:col-start-7 flex flex-col gap-8 text-lg text-neutral-300 font-light leading-relaxed"
          >
            <p>{dict.about.intro_p2}</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: VIDEO GALLERY */}
      <section className="container mx-auto px-4 mb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="h-px w-12 bg-neutral-700" />
          <h3 className="text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase">
            {dict.about.videos_title}
          </h3>
          <span className="h-px flex-1 bg-neutral-800" />
        </motion.div>

        {/* 4 VIDEO PLACEHOLDERS */}
        {/* Mobile: 1 col, md: 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-video group overflow-hidden bg-neutral-900 border border-neutral-800"
            >
              {/* VIDEO TAG (Placeholder behaviour) */}
              <video
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                autoPlay
                loop
                muted
                playsInline
                // Placeholder source
              >
                <source src="" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Placeholder Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-neutral-500 text-xs tracking-widest uppercase mb-2">
                    Production {item}
                  </p>
                  <div className="w-12 h-12 rounded-full border border-neutral-600 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
