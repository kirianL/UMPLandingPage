"use client";

import { Artist, Release } from "@/lib/types";
import Image from "next/image";
import { ArrowRight, Disc } from "lucide-react";
import { FaSpotify, FaApple, FaYoutube, FaInstagram, FaSoundcloud } from "react-icons/fa";
import Link from "next/link";
import * as motion from "framer-motion/client";

interface ArtistWithReleases extends Artist {
  releases: Release[];
}

export default function ProducerProfile({
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

  const isPurple = artist.slug === "milletck" || artist.name.toLowerCase().includes("mille") || artist.slug.toLowerCase() === "ckayy" || artist.name.toLowerCase().includes("ckayy");
  const isRed = artist.slug.toLowerCase() === "kidoffi" || artist.name.toLowerCase().includes("kidoffi");
  const isPink = artist.slug.toLowerCase() === "jimena-alvarado" || artist.name.toLowerCase().includes("jimena");
  
  const bgImage = isPurple
    ? "/assets/backgrounds/Background_purple.png"
    : isRed
    ? "/assets/backgrounds/Background_red.png"
    : isPink
    ? "/assets/backgrounds/Background_pink.png"
    : "/assets/backgrounds/Backgroud_blue.png";
    
  const longestWordLength = Math.max(...artist.name.split(' ').map(w => w.length));
  const mobileTextSize = longestWordLength > 8 ? "text-[15vw]" : longestWordLength > 6 ? "text-[18vw]" : longestWordLength > 5 ? "text-[22vw]" : "text-[28vw]";
  const desktopTextSize = longestWordLength > 8 ? "md:text-[12vw]" : longestWordLength > 6 ? "md:text-[15vw]" : "md:text-[20vw]";
  
  const themeText = isPurple ? "text-[#d8b4fe]" : isRed ? "text-[#ef4444]" : isPink ? "text-[#f472b6]" : "text-[#bbdbfa]";
  const themeBg60 = isPurple ? "bg-[#d8b4fe]/60" : isRed ? "bg-[#ef4444]/60" : isPink ? "bg-[#f472b6]/60" : "bg-[#bbdbfa]/60";
  const themeSelection = isPurple ? "selection:bg-[#d8b4fe]" : isRed ? "selection:bg-[#ef4444]" : isPink ? "selection:bg-[#f472b6]" : "selection:bg-[#bbdbfa]";
  const themeGroupHoverText = isPurple ? "group-hover:text-[#d8b4fe]" : isRed ? "group-hover:text-[#ef4444]" : isPink ? "group-hover:text-[#f472b6]" : "group-hover:text-[#bbdbfa]";

  // Theme-aware colors: system bg (black/white) for all
  const bgMain = "bg-background";
  const bgAlt = "bg-muted";
  const textMain = "text-foreground";
  const textMuted = "text-muted-foreground";
  const borderClr = "border-border";
  const selectionBg = "selection:text-background";
  const gradientVia = "via-background/60";
  const gradientTo = "to-background";
  const proseClasses = "prose prose-lg md:prose-2xl max-w-4xl prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-light prose-strong:text-foreground";

  return (
    <div className={`min-h-screen ${bgMain} ${textMain} ${themeSelection} ${selectionBg} font-sans -mt-20`}>
      {/* HERO SECTION */}
      <section className="relative w-full h-[100svh] flex flex-col items-center justify-end overflow-x-clip overflow-y-visible">
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Atmospheric Background"
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${gradientVia} ${gradientTo}`} />
        </div>



        {/* Huge Text (Behind Image) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none pb-[180px] md:pb-0">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`${mobileTextSize} ${desktopTextSize} font-black uppercase tracking-tighter leading-[0.85] ${themeText} text-center opacity-90 select-none`}
          >
            {artist.name.replace(/ñ/gi, 'N').split(' ').map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Artist Image (In Front of Text) */}
        <div className="absolute bottom-[120px] md:bottom-0 z-20 w-[90%] max-w-[400px] md:w-full md:max-w-3xl aspect-[4/5] md:aspect-auto md:h-[85vh] flex justify-center pointer-events-none">
          {artist.photo_url ? (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full [mask-image:linear-gradient(to_top,transparent,black_15%)]"
            >
              <Image
                src={artist.photo_url}
                alt={artist.name}
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-end pb-32">
               <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-sm">
                 <span className="font-mono text-xs text-white/40">{dict.image_placeholder}</span>
               </div>
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-8 md:bottom-12 z-30 w-full px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center md:items-start text-center md:text-left gap-3 pointer-events-auto"
          >
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className={`hidden md:block h-px w-6 ${themeBg60}`}></div>
              <span className={`text-[10px] font-mono tracking-[0.2em] ${themeText} uppercase`}>
                {artist.role || dict.role_producer || "PRODUCTOR"}
              </span>
            </div>
            <p className={`text-xs md:text-sm ${textMuted} uppercase tracking-widest leading-relaxed`}>
              {artist.name}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center md:flex-col md:items-end gap-x-6 gap-y-2 md:gap-y-4 pointer-events-auto"
          >
            {artist.instagram_url && (
              <a href={artist.instagram_url} target="_blank" rel="noreferrer" className={`group relative overflow-hidden flex text-[10px] md:text-xs font-mono tracking-[0.2em] ${themeText} uppercase`}>
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  [ INSTAGRAM ]
                </span>
                <span className="absolute left-0 top-full inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full text-white">
                  [ INSTAGRAM ]
                </span>
              </a>
            )}
            {artist.spotify_url && (
              <a href={artist.spotify_url} target="_blank" rel="noreferrer" className={`group relative overflow-hidden flex text-[10px] md:text-xs font-mono tracking-[0.2em] ${themeText} uppercase`}>
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  [ SPOTIFY ]
                </span>
                <span className="absolute left-0 top-full inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full text-white">
                  [ SPOTIFY ]
                </span>
              </a>
            )}
            {artist.youtube_url && (
              <a href={artist.youtube_url} target="_blank" rel="noreferrer" className={`group relative overflow-hidden flex text-[10px] md:text-xs font-mono tracking-[0.2em] ${themeText} uppercase`}>
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  [ YOUTUBE ]
                </span>
                <span className="absolute left-0 top-full inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full text-white">
                  [ YOUTUBE ]
                </span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className={`${bgMain} py-24 md:py-32 relative z-10`}>
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-4 lg:col-span-3">
             <div className="sticky top-32">
               <span className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] ${textMuted} block mb-4`}>
                 {dict.technique_vision || "TÉCNICA // VISIÓN"}
               </span>
               <h2 className={`text-3xl md:text-4xl font-bold uppercase tracking-tight ${textMain} mb-8`}>
                 {dict.the_sound || "EL SONIDO"}
               </h2>
               
               <div className={`space-y-6 pt-8 border-t ${borderClr}`}>
                 <div>
                   <p className={`text-[10px] font-mono ${textMuted} uppercase tracking-widest mb-1`}>{dict.years_active || "AÑOS ACTIVO"}</p>
                   <p className="text-2xl font-bold">{currentYear - startYear}+</p>
                 </div>
                 <div>
                   <p className={`text-[10px] font-mono ${textMuted} uppercase tracking-widest mb-1`}>{dict.productions_label || "PRODUCCIONES"}</p>
                   <p className="text-2xl font-bold">{artist.releases?.length || 0}</p>
                 </div>
               </div>
             </div>
          </div>
          
          <div className="md:col-span-8 lg:col-span-9">
             {bioContent ? (
                <div className={proseClasses}>
                  <p className={`text-2xl md:text-4xl ${textMain} font-medium leading-tight mb-8`}>
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
                <div className={`py-20 border ${borderClr} flex justify-center items-center rounded-sm`}>
                   <p className={`font-mono text-sm ${textMuted} uppercase tracking-widest`}>
                     {dict.bio_unavailable || "[ BIOGRAFÍA NO DISPONIBLE ]"}
                   </p>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* DISCOGRAPHY SECTION */}
      {artist.releases && artist.releases.length > 0 && (
        <section className={`${bgAlt} py-24 md:py-32`}>
          <div className="container mx-auto px-6 md:px-12">
            <div className="mb-16 flex flex-col md:flex-row justify-between items-baseline gap-6">
              <div>
                <span className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] ${textMuted} block mb-4`}>
                  {dict.catalog_label || "CATÁLOGO"}
                </span>
                <h2 className={`text-4xl md:text-6xl font-bold uppercase tracking-tight ${textMain}`}>
                  {dict.tracks_label || "TRACKS"}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {artist.releases.map((release, index) => (
                <div key={release.id} className="group cursor-pointer">
                  <div className={`relative aspect-square ${bgMain} overflow-hidden mb-4 rounded-sm border ${isRed ? 'border-border group-hover:border-foreground/20' : 'border-white/5 group-hover:border-white/20'} transition-colors`}>
                    {release.cover_url ? (
                       <Image
                         src={release.cover_url}
                         alt={release.title}
                         fill
                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                         className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                       />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center">
                         <Disc className="h-12 w-12 text-white/20" />
                       </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      {release.spotify_url && (
                        <a href={release.spotify_url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#ebf213] text-black flex items-center justify-center hover:scale-110 transition-transform">
                          <FaSpotify className="w-4 h-4" />
                        </a>
                      )}
                      {release.youtube_url && (
                        <a href={release.youtube_url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#ebf213] text-black flex items-center justify-center hover:scale-110 transition-transform">
                          <FaYoutube className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className={`font-bold text-lg uppercase leading-tight group-hover:${themeText} transition-colors`}>{release.title}</h3>
                    <span className={`font-mono text-[10px] ${textMuted} border ${isRed ? 'border-foreground/20' : 'border-white/20'} px-2 py-1 rounded-sm`}>
                      {new Date(release.release_date || Date.now()).getFullYear()}
                    </span>
                  </div>
                  <p className={`text-xs ${textMuted} font-mono mt-1 uppercase tracking-wider`}>{dict.beat_label || "BEAT"}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER NAV */}
      <div className={`border-t ${borderClr} ${bgMain} py-16 md:py-24 text-center`}>
        <Link
          href={`/${lang}/artists`}
          className="group inline-flex flex-col items-center gap-6"
        >
          <span className={`text-xs font-mono ${textMuted} uppercase tracking-[0.2em] group-hover:${textMain} transition-colors`}>
            {dict.back_to_team || "VOLVER AL EQUIPO"}
          </span>
          <div className={`h-16 w-16 rounded-full border ${isRed ? 'border-foreground/20' : 'border-white/20'} flex items-center justify-center group-hover:bg-[#ebf213] group-hover:border-[#ebf213] group-hover:text-black transition-all duration-300`}>
            <ArrowRight className="h-6 w-6 rotate-180 group-hover:-translate-x-2 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
