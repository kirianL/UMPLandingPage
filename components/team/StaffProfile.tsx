"use client";

import { Artist, Release } from "@/lib/types";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import * as motion from "framer-motion/client";

interface ArtistWithReleases extends Artist {
  releases: Release[];
}

export default function StaffProfile({
  artist,
  lang = "es",
  dict,
}: {
  artist: ArtistWithReleases;
  lang?: string;
  dict: any;
}) {
  const currentYear = new Date().getFullYear();
  const startYear = new Date(artist.created_at).getFullYear();
  const isEn = lang === "en";

  const bioContent = isEn && artist.bio_en ? artist.bio_en : artist.bio_es;
  const roleDisplay = (isEn && artist.role_en) ? artist.role_en : (artist.role || dict.role_staff || "STAFF");

  return (
    <div className="min-h-screen bg-[#010314] text-white selection:bg-[#bbdbfa] selection:text-[#010314] font-sans -mt-20">
      {/* HERO SECTION */}
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/backgrounds/Backgroud_blue.png"
            alt="Atmospheric Background"
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010314]/60 to-[#010314]" />
        </div>



        {/* Huge Text (Behind Image) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[25vw] md:text-[20vw] font-black uppercase tracking-tighter leading-none text-[#bbdbfa] whitespace-nowrap opacity-90 select-none"
          >
            {artist.name}
          </motion.h1>
        </div>

        {/* Artist Image (In Front of Text) */}
        <div className="absolute bottom-0 z-20 w-full max-w-[90%] md:max-w-3xl h-[75vh] md:h-[85vh] flex justify-center pointer-events-none">
          {artist.photo_url ? (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={artist.photo_url}
                alt={artist.name}
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#010314] to-transparent" />
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-end pb-32">
               <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-sm">
                 <span className="font-mono text-xs text-white/40">{dict.image_placeholder}</span>
               </div>
            </div>
          )}
        </div>

        <div className="absolute left-6 md:left-12 bottom-16 md:bottom-20 z-30 flex flex-col gap-3 max-w-[70%] md:max-w-sm pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-3 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-[#bbdbfa]/60"></div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#bbdbfa] uppercase">
                {roleDisplay}
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#bbbbbb] uppercase tracking-widest leading-relaxed">
              {isEn && artist.tagline_en ? artist.tagline_en : (artist.tagline_es || "BEHIND THE SCENES")}
            </p>
          </motion.div>
        </div>

        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-8 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-8 pointer-events-auto"
          >
            {artist.instagram_url && (
              <a href={artist.instagram_url} target="_blank" rel="noreferrer" className="text-[10px] font-mono tracking-[0.3em] text-[#bbdbfa] hover:text-white uppercase transition-colors" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                INSTAGRAM
              </a>
            )}
            {artist.spotify_url && (
              <a href={artist.spotify_url} target="_blank" rel="noreferrer" className="text-[10px] font-mono tracking-[0.3em] text-[#bbdbfa] hover:text-white uppercase transition-colors" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                SPOTIFY
              </a>
            )}
            {artist.youtube_url && (
              <a href={artist.youtube_url} target="_blank" rel="noreferrer" className="text-[10px] font-mono tracking-[0.3em] text-[#bbdbfa] hover:text-white uppercase transition-colors" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                YOUTUBE
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-[#010314] py-24 md:py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-4 lg:col-span-3">
             <div className="sticky top-32">
               <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-[#bbbbbb] block mb-4">
                 {dict.origin_journey || "ORIGEN // TRAYECTORIA"}
               </span>
               <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-8">
                 {dict.the_story || "LA HISTORIA"}
               </h2>
               
               <div className="space-y-6 pt-8 border-t border-white/10">
                 <div>
                   <p className="text-[10px] font-mono text-[#bbbbbb] uppercase tracking-widest mb-1">{dict.years_active || "AÑOS ACTIVO"}</p>
                   <p className="text-2xl font-bold">{currentYear - startYear}+</p>
                 </div>
                 <div>
                   <p className="text-[10px] font-mono text-[#bbbbbb] uppercase tracking-widest mb-1">{dict.quality || "DEDICACIÓN"}</p>
                   <p className="text-2xl font-bold">100%</p>
                 </div>
               </div>
             </div>
          </div>
          
          <div className="md:col-span-8 lg:col-span-9">
             {bioContent ? (
                <div className="prose prose-invert prose-lg md:prose-2xl max-w-4xl prose-p:text-[#bbbbbb] prose-p:leading-relaxed prose-p:font-light prose-strong:text-white">
                  <p className="text-2xl md:text-4xl text-white font-medium leading-tight mb-8">
                    {bioContent.split("\n")[0]}
                  </p>
                  {bioContent
                    .split("\n")
                    .slice(1)
                    .map((para, i) => (
                      <p key={i} className="mt-6 text-base md:text-xl">
                        {para}
                      </p>
                    ))}
                </div>
              ) : (
                <div className="py-20 border border-white/10 flex justify-center items-center rounded-sm">
                   <p className="font-mono text-sm text-[#bbbbbb] uppercase tracking-widest">
                     {dict.bio_unavailable || "[ BIOGRAFÍA NO DISPONIBLE ]"}
                   </p>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="border-t border-white/10 bg-[#010314] py-16 md:py-24 text-center">
        <Link
          href={`/${lang}/artists`}
          className="group inline-flex flex-col items-center gap-6"
        >
          <span className="text-xs font-mono text-[#bbbbbb] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
            {dict.back_to_team || "VOLVER AL EQUIPO"}
          </span>
          <div className="h-16 w-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#ebf213] group-hover:border-[#ebf213] group-hover:text-black transition-all duration-300">
            <ArrowRight className="h-6 w-6 rotate-180 group-hover:-translate-x-2 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
