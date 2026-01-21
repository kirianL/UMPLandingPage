"use client";

import { Artist, Release } from "@/lib/types";
import Image from "next/image";
import { ArrowRight, Disc } from "lucide-react";
import { FaInstagram, FaSpotify, FaApple, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import * as motion from "framer-motion/client";

import Dither from "@/components/ui/dither";

interface ArtistWithReleases extends Artist {
  releases: Release[];
}

export default function ArtistProfile({
  artist,
  lang = "es",
  dict,
}: {
  artist: ArtistWithReleases;
  lang?: string;
  dict: any; // Using any for simplicity as strictly typing large dicts can be verbose, but ideally should be typed
}) {
  const currentYear = new Date().getFullYear();
  const startYear = new Date(artist.created_at).getFullYear();

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-primary selection:text-black font-sans">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col pt-20 overflow-hidden">
        {/* Dither Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Dither
            waveColor={[0.1, 0.3, 0.18]}
            disableAnimation={false}
            enableMouseInteraction={false}
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.01}
          />
        </div>

        {/* Abstract Typographic Background */}
        <div className="absolute inset-0 select-none overflow-hidden pointer-events-none z-0 mix-blend-overlay opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
            <h1
              className="text-[40vw] font-black leading-none tracking-tighter text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
            >
              UMP
            </h1>
          </div>
        </div>

        {/* Ambient Light */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden mix-blend-soft-light">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "radial-gradient(circle at 50% -45%, rgba(26, 77, 46, 0.45) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Header Bar */}
        <div className="container mx-auto px-4 z-10">
          <div className="flex justify-between items-center py-3 md:py-4 border-b border-white/10 text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-widest text-neutral-500 relative">
            <span>ARTISTA // {artist.name}</span>
            <span className="hidden md:inline absolute left-1/2 -translate-x-1/2">
              EST // {startYear}
            </span>
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline">UMP MUSIC</span>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-6 lg:px-12 flex-1 grid grid-cols-1 md:grid-cols-12 items-center relative z-10 pt-4 sm:pt-6 md:pt-0 pb-8 sm:pb-12 gap-6 md:gap-8 lg:gap-16 xl:gap-24">
          {/* Metadata - Animated Stagger */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
            className="w-full md:col-span-5 lg:col-span-5 order-2 md:order-1 flex flex-col justify-end pb-8 md:pb-0"
          >
            <div className="space-y-6 lg:space-y-10">
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                className="inline-flex items-center gap-2 border-l-2 border-primary pl-3"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  {(lang === "en" && artist.role_en) ||
                    artist.role ||
                    dict.role_default}
                </span>
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                className="text-5xl sm:text-6xl md:text-5xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white"
              >
                {artist.name}
              </motion.h1>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.5 } },
                }}
                className="grid grid-cols-2 gap-x-4 md:gap-x-6 gap-y-4 border-t border-white/10 pt-6 max-w-sm"
              >
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-neutral-500 mb-1">
                    {dict.origin_label}
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    Limón, CR
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-neutral-500 mb-1">
                    {dict.since_label}
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    {startYear}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-neutral-500 mb-1">
                    {dict.genre_label}
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    Urbano / Trap
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-neutral-500 mb-1">
                    {dict.releases_label}
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    {artist.releases?.length || 0}
                  </p>
                </div>
              </motion.div>

              {/* Socials */}
              <div className="flex flex-wrap gap-6 pt-4 lg:pt-6">
                {artist.instagram_url && (
                  <a
                    href={artist.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-[#E1306C] transition-colors duration-300"
                  >
                    <FaInstagram className="h-8 w-8" />
                  </a>
                )}
                {artist.apple_music_url && (
                  <a
                    href={artist.apple_music_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-[#FA243C] transition-colors duration-300"
                  >
                    <FaApple className="h-8 w-8" />
                  </a>
                )}
                {artist.youtube_url && (
                  <a
                    href={artist.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-[#FF0000] transition-colors duration-300"
                  >
                    <FaYoutube className="h-8 w-8" />
                  </a>
                )}
                <Link
                  href="#discography"
                  className="text-neutral-400 hover:text-[#1DB954] transition-colors duration-300"
                >
                  <FaSpotify className="h-8 w-8" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Photo */}
          <div className="w-full md:col-span-7 lg:col-span-7 order-1 md:order-2 h-auto flex items-center justify-center md:justify-end mb-8 md:mb-0">
            <div className="relative w-full max-w-[280px] md:max-w-[300px] lg:max-w-[420px] xl:max-w-[500px] aspect-[3/4] md:aspect-[4/5] bg-neutral-900 overflow-hidden shadow-2xl shadow-black/50 border border-white/5 group">
              <div className="absolute inset-0 z-20 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
              <div className="relative w-full h-full animate-pulse-slow">
                {artist.photo_url ? (
                  <Image
                    src={artist.photo_url}
                    alt={artist.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                    <span className="font-mono text-neutral-600">
                      {dict.image_placeholder}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute top-4 left-4 z-30">
                <div className="h-2 w-12 bg-primary/80" />
              </div>
              <div className="absolute bottom-4 right-4 z-30 bg-black/80 backdrop-blur-sm px-3 py-1 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-white tracking-widest">
                  {dict.fig_profile}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIO SECTION */}
      <section className="bg-neutral-950 text-white py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-3 border-t-4 border-primary pt-4">
            <span className="block text-xs font-black uppercase tracking-widest mb-2 text-primary/70">
              {dict.chapter_1}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-white">
              {dict.the_story}
            </h2>
            <div className="mt-8 hidden md:block">
              <div className="w-12 h-px bg-white/20 mb-4" />
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                {dict.origin_journey}
              </p>
            </div>
          </div>

          <div className="md:col-span-9 md:pl-12">
            <div className="relative">
              <div className="absolute -left-4 md:-left-8 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />
              {/* Bio Logic: Prefer English if lang is 'en' and bio_en exists, else fallback to bio_es */}
              {lang === "en" && artist.bio_en ? (
                <div className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-black prose-headings:text-white prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:font-light prose-strong:text-white prose-strong:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                  <p className="first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px] first-letter:text-primary">
                    {artist.bio_en.split("\n")[0]}
                  </p>
                  {artist.bio_en
                    .split("\n")
                    .slice(1)
                    .map((para, i) => (
                      <p key={i} className="mt-6">
                        {para}
                      </p>
                    ))}
                </div>
              ) : artist.bio_es ? (
                <div className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-black prose-headings:text-white prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:font-light prose-strong:text-white prose-strong:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                  <p className="first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px] first-letter:text-primary">
                    {artist.bio_es.split("\n")[0]}
                  </p>
                  {artist.bio_es
                    .split("\n")
                    .slice(1)
                    .map((para, i) => (
                      <p key={i} className="mt-6">
                        {para}
                      </p>
                    ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-20 border border-white/10 bg-white/5 backdrop-blur-sm">
                  <p className="italic text-neutral-500 font-mono text-sm">
                    {dict.bio_unavailable}
                  </p>
                </div>
              )}

              {artist.bio_es && (
                <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-black text-primary">
                      {currentYear - startYear}+
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                      {dict.years_active}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-black text-white">
                      {artist.releases.length.toString().padStart(2, "0")}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                      {dict.releases_label}
                    </div>
                  </div>
                  <div className="text-center md:text-left col-span-2 md:col-span-1">
                    <div className="text-3xl md:text-4xl font-black text-white">
                      100%
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                      {dict.authentic}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DISCOGRAPHY */}
      <section
        id="discography"
        className="bg-neutral-950 py-12 sm:py-16 md:py-20 lg:py-24 border-t border-white/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 md:mb-12 border-b border-white/10 pb-4 sm:pb-6 gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2 block">
                {dict.sonic_archive}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter">
                {dict.latest_gems}
              </h2>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs md:text-sm text-neutral-500 uppercase tracking-wider">
                TOTAL // {artist.releases.length.toString().padStart(2, "0")}{" "}
                {dict.total_releases}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 md:gap-6 lg:gap-8">
            {artist.releases?.map((release, index) => (
              <div key={release.id} className="group flex flex-col gap-3">
                <div className="relative aspect-square bg-neutral-900 border border-white/10 overflow-hidden">
                  <div className="absolute top-0 left-0 bg-black/80 px-2 py-1 z-10 border-r border-b border-white/10">
                    <span className="text-[10px] font-mono text-white/50">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  {release.cover_url ? (
                    <Image
                      src={release.cover_url}
                      alt={release.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Disc className="h-10 w-10 text-neutral-800" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      {dict.listen_on}
                    </span>
                    <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
                      {release.spotify_url && (
                        <a
                          href={release.spotify_url}
                          target="_blank"
                          className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"
                        >
                          <FaSpotify className="h-4 w-4" />
                        </a>
                      )}
                      {release.apple_music_url && (
                        <a
                          href={release.apple_music_url}
                          target="_blank"
                          className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"
                        >
                          <FaApple className="h-4 w-4" />
                        </a>
                      )}
                      {release.youtube_url && (
                        <a
                          href={release.youtube_url}
                          target="_blank"
                          className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"
                        >
                          <FaYoutube className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white uppercase leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                    {release.title}
                  </h3>
                  <div className="flex justify-between items-center mt-1 border-t border-white/10 pt-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                      {release.type || "SINGLE"}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {new Date(
                        release.release_date || Date.now(),
                      ).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="border-t border-white/10 bg-black py-12 text-center">
        <Link
          href="/artists"
          className="group inline-flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
            {dict.back_to_team}
          </span>
          <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
