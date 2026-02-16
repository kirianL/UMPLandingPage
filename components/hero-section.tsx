"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Volume2, VolumeX, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

/* ═══ EASING ═══ */
const ease = [0.16, 1, 0.3, 1] as const;

/* ═══ CHARACTER-BY-CHARACTER REVEAL ═══ */
function CharReveal({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {text.split("").map((ch, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.03,
              ease,
            }}
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ═══ HERO SECTION ═══ */
export function HeroSection({ dict }: { dict: any }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const { language } = useLanguage();

  /* Parallax */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const vidScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    videoRef.current
      ?.play()
      .then(() => setReady(true))
      .catch(() => setReady(true));
  }, []);

  /* Texts */
  const t = dict?.brutalist || {};
  const sub =
    t.subtext_1 ||
    (language === "es"
      ? "Definiendo el sonido de Limón."
      : "Defining the sound of Limón.");
  const sub2 =
    t.subtext_2 ||
    (language === "es" ? "Operando globalmente." : "Operating globally.");
  const cta =
    t.cta_roster || (language === "es" ? "Explorar Roster" : "Explore Roster");

  return (
    <section
      ref={ref}
      className="relative w-full h-[100dvh] bg-black text-white overflow-hidden font-quilon"
    >
      {/* ── VIDEO ── */}
      <motion.div style={{ scale: vidScale }} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setReady(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <source src="/assets/home/mille%20v2.MP4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── OVERLAY — heavy bottom, light top ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/50 to-black/10" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 h-full flex flex-col justify-end px-5 sm:px-8 md:px-12 lg:px-16 pb-6 sm:pb-8 md:pb-10">
        {/* ── HEADLINE ── */}
        <div className="mb-3 sm:mb-4">
          <h1>
            <CharReveal
              text="EL SONIDO"
              delay={0.3}
              className="text-[clamp(2.6rem,9vw,8rem)] font-black uppercase tracking-[-0.04em] leading-[0.88] text-white block"
            />
            <CharReveal
              text="DE LIMÓN"
              delay={0.6}
              className="text-[clamp(2.6rem,9vw,8rem)] font-black uppercase tracking-[-0.04em] leading-[0.88] text-[#18943A] block"
            />
          </h1>
        </div>

        {/* ── GREEN ACCENT LINE + SUBTEXT ── */}
        <div className="flex items-start gap-3 mb-4 sm:mb-5">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="w-8 sm:w-10 h-[2px] bg-[#18943A] mt-[9px] origin-left shrink-0"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease }}
            className="text-[12px] sm:text-[13px] md:text-sm text-white/40 leading-relaxed max-w-xs"
          >
            {sub} <span className="text-white/65 font-medium">{sub2}</span>
          </motion.p>
        </div>

        {/* ── CTA + MUTE ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease }}
          className="flex items-center gap-4 mb-5 sm:mb-6"
        >
          <Link href={`/${language}/artists`}>
            <Button className="bg-[#18943A] hover:bg-[#147a30] text-white font-bold tracking-[0.12em] uppercase h-10 sm:h-11 px-6 sm:px-8 text-[10px] sm:text-[11px] transition-all hover:scale-[1.02] active:scale-[0.98]">
              {cta}
            </Button>
          </Link>
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !muted;
                setMuted(!muted);
              }
            }}
            className="h-10 w-10 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </motion.div>

        {/* ── SCROLL INDICATOR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="w-3 h-3 text-white/20" />
          </motion.div>
          <span className="text-[8px] uppercase tracking-[0.25em] text-white/20 font-bold">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
