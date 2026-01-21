"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export function HeroSection({
  dict,
}: {
  dict: {
    location_line1: string;
    location_line2: string;
    location_line3: string;
    established: string;
  };
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center"
    >
      {/* 
        LCP OPTIMIZATION: 
        Moved Background Image OUT of motion.div.
        It is now a static layer to ensure fast FCP/LCP. 
        Parallax effect on background is disabled for maximum performance.
      */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-neutral-950" />

        {/* User Requested Background Image - Optimized with next/image for Mobile LCP */}
        <div className="relative w-full h-full">
          <Image
            src="/assets/home/Home.jpeg"
            alt="Limon Aesthetic"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover opacity-75 mix-blend-overlay"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-[#050505]" />

        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      {/* Cinematic Pulse Effect - Separated from LCP Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Subtle dynamic light - Clean, no grunge */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-neutral-800/10 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container px-4 flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full max-w-6xl flex flex-col items-center gap-8 md:gap-12"
        >
          {/* Main Logo - Forced White & Optimized */}
          <div className="relative w-full aspect-[3/1] max-w-[800px]">
            <Image
              src="/assets/LOGO-UMP.webp"
              alt="UMP Music"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              className="object-contain brightness-0 invert opacity-100 drop-shadow-2xl"
            />
          </div>

          {/* Location Emphasis - Requested "Remarcar que es de Limón" */}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl md:text-5xl font-black font-quilon text-white uppercase tracking-[-0.02em] text-center leading-tight">
              {dict.location_line1}{" "}
              <span className="text-primary">{dict.location_line2}</span>{" "}
              <br className="md:hidden" /> {dict.location_line3}
            </h2>
            <div className="h-1 w-24 bg-primary rounded-full mt-4" />
          </div>

          {/* Minimalist tagline / Badge */}
          <div className="flex items-center gap-4 mt-8 opacity-60">
            <span className="text-white font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
              {dict.established}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
      </motion.div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
