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
      {/* SECTION 1: EDITORIAL HERO (GREEN THEME) */}
      <section className="relative h-[85vh] flex flex-col justify-center items-center px-4 overflow-hidden mb-24">
        {/* Background elements (Emerald/Teal Glows) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60vh] h-[60vh] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70vh] h-[70vh] bg-teal-500/10 rounded-full blur-[140px] animate-pulse delay-700" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30vw] h-[30vw] bg-green-900/10 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          <motion.span
            variants={fadeIn}
            className="text-xs md:text-sm font-bold tracking-[0.3em] text-emerald-500 mb-6 inline-block uppercase"
          >
            {dict.about.hero_subtitle}
          </motion.span>
          <motion.h1
            variants={fadeIn}
            className="text-[14vw] leading-[0.85] font-bold tracking-tighter text-white mb-2 mix-blend-overlay"
          >
            {dict.about.h1_title}
          </motion.h1>
          <motion.div
            variants={fadeIn}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mt-8 opacity-70"
          />
        </motion.div>
      </section>

      {/* SECTION 2: MAIN NARRATIVE */}
      <section className="container mx-auto px-6 md:px-12 mb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-12 lg:col-span-10 lg:col-start-2 text-center"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-neutral-200">
              <span className="text-emerald-500 font-normal">"</span>
              {dict.about.intro_p1}
              <span className="text-emerald-500 font-normal">"</span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: HISTORY & ROOTS (New Section) */}
      <section className="container mx-auto px-6 md:px-12 mb-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Abstract Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[400px] md:h-[600px] w-full bg-neutral-900 overflow-hidden flex items-center justify-center border border-white/5"
          >
            <div className="absolute inset-0 bg-emerald-900/20 mix-blend-color-dodge" />
            <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-800/20 via-black to-black animate-slow-spin opacity-50" />
            <span className="text-[200px] font-bold text-white/5 absolute select-none">
              LIMÓN
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <span className="text-emerald-500 text-sm tracking-widest uppercase mb-4 font-bold border-l-2 border-emerald-500 pl-4">
              {dict.about.history_title}
            </span>
            <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed mb-8">
              {dict.about.intro_p2}
            </p>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
              {dict.about.history_text}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: TALENT HIGHLIGHT (New Section - Fast/Modern) */}
      <section className="w-full py-24 bg-neutral-900/30 border-y border-white/5 mb-40 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600 mb-8 inline-block">
              {dict.about.talent_title}
            </h3>
            <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
              {dict.about.talent_text}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: VIDEO GALLERY */}
      <section className="container mx-auto px-4 mb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="h-px w-12 bg-emerald-800" />
          <h3 className="text-sm font-bold tracking-[0.3em] text-emerald-500 uppercase">
            {dict.about.videos_title}
          </h3>
          <span className="h-px flex-1 bg-neutral-800" />
        </motion.div>

        {/* 4 VIDEO PLACEHOLDERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-black p-1 border border-white/10">
          {[1, 2, 3, 4].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-video group overflow-hidden bg-neutral-900"
            >
              <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-colors duration-500 z-10 pointer-events-none" />

              {/* VIDEO TAG (Placeholder behaviour) */}
              <video
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
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
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="text-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center bg-black/20">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
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
