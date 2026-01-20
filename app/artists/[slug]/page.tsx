import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { Artist, Release } from "@/lib/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Disc, Share2 } from "lucide-react";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import * as motion from "framer-motion/client";

interface ArtistWithReleases extends Artist {
  releases: Release[];
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data: artists } = await supabase
    .from("artists")
    .select("slug")
    .eq("is_active", true);

  return artists?.map(({ slug }) => ({ slug })) || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = await getArtist(slug);
  if (!artist) return { title: "Artista no encontrado" };

  return {
    title: `${artist.name} | UMPmusic`,
    description:
      artist.tagline_es || `Perfil oficial de ${artist.name} en UMPmusic.`,
  };
}

async function getArtist(slug: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("artists")
    .select("*, releases(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching artist:", error);
    return null;
  }

  if (!data) return null;

  return data as ArtistWithReleases;
}

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = await getArtist(slug);

  if (!artist) {
    notFound();
  }

  const currentYear = new Date().getFullYear();
  const startYear = new Date(artist.created_at).getFullYear();

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-primary selection:text-black font-sans">
      {/* --------------------------------------------------------------------------------
         HERO SECTION - EDITORIAL MAGAZINE STYLE
         -------------------------------------------------------------------------------- */}
      <section className="relative w-full min-h-screen flex flex-col pt-20 overflow-hidden">
        {/* Abstract Typographic Background */}
        <div className="absolute inset-0 select-none overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.03]">
            <h1
              className="text-[40vw] font-black leading-none tracking-tighter text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
            >
              UMP
            </h1>
          </div>
        </div>

        {/* Technical Header Bar */}
        <div className="container mx-auto px-4 z-10">
          <div className="flex justify-between items-center py-3 md:py-4 border-b border-white/10 text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-widest text-neutral-500">
            <span className="truncate">
              <span className="hidden sm:inline">ARTISTA // </span>
              {artist.slug.toUpperCase()}
            </span>
            <div className="hidden md:flex gap-4 lg:gap-8">
              <span>EST // {startYear}</span>
              <span className="hidden lg:inline">UMP EDITORIAL</span>
            </div>
            <span className="hidden sm:inline">VOL. 1</span>
          </div>
        </div>

        {/* Main Hero Content Grid */}
        <div className="container mx-auto px-4 flex-1 flex flex-col md:flex-row items-center relative z-10 pt-6 sm:pt-8 pb-8 sm:pb-12 gap-8 sm:gap-12 md:gap-8">
          {/* LEFT: Metadata & Info (Mobile Order 2) */}
          <div className="w-full md:w-5/12 order-2 md:order-1 flex flex-col justify-end pb-8">
            <div className="space-y-8">
              {/* Role Badge */}
              <div className="inline-flex items-center gap-2 border-l-2 border-primary pl-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  {artist.tagline_es || "ARTISTA EXCLUSIVO"}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                {artist.name}
              </h1>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 border-t border-white/10 pt-4 sm:pt-6 max-w-sm">
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-neutral-500 mb-1">
                    Origen
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    Limón, CR
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-neutral-500 mb-1">
                    Desde
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    {startYear}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-neutral-500 mb-1">
                    Género
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    Urbano / Trap
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-neutral-500 mb-1">
                    Lanzamientos
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    {artist.releases?.length || 0}
                  </p>
                </div>
              </div>

              {/* Connect */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                {artist.instagram_url && (
                  <Button
                    variant="outline"
                    className="rounded-none border-white/20 hover:bg-white hover:text-black uppercase text-[10px] sm:text-xs font-bold tracking-widest h-9 sm:h-10 px-4 sm:px-6 gap-2"
                    asChild
                  >
                    <a
                      href={artist.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="h-4 w-4" /> Instagram
                    </a>
                  </Button>
                )}
                <Button
                  className="rounded-none bg-primary text-black hover:bg-primary/90 uppercase text-[10px] sm:text-xs font-bold tracking-widest h-9 sm:h-10 px-4 sm:px-6 gap-2"
                  asChild
                >
                  <Link href="#discography">
                    <FaSpotify className="h-4 w-4" /> Escuchar
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT: Photo Card (Mobile Order 1) */}
          <div className="w-full md:w-7/12 order-1 md:order-2 h-auto md:h-[70vh] relative flex items-center justify-center md:justify-end mb-8 md:mb-0">
            {/* Floating Card Container */}
            <div className="relative w-full max-w-xs md:max-w-lg aspect-[3/4] md:aspect-[4/5] bg-neutral-900 overflow-hidden shadow-2xl shadow-black/50 border border-white/5 group">
              {/* Film Grain Texture Overlay */}
              <div className="absolute inset-0 z-20 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>

              {/* Photo with Progressive Zoom */}
              <motion.div
                className="relative w-full h-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {artist.photo_url ? (
                  <Image
                    src={artist.photo_url}
                    alt={artist.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                    <span className="font-mono text-neutral-600">
                      [ IMAGEN_NO_DISPONIBLE ]
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Editorial Overlays on Image */}
              <div className="absolute top-4 left-4 z-30">
                <div className="h-2 w-12 bg-primary/80" />
              </div>
              <div className="absolute bottom-4 right-4 z-30 bg-black/80 backdrop-blur-sm px-3 py-1 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-white tracking-widest">
                  FIG. 01 // PERFIL
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------------------
         CHAPTER I: THE STORY (Bio) - DARK ATMOSPHERIC DESIGN
         -------------------------------------------------------------------------------- */}
      <section className="bg-neutral-950 text-white py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
        {/* Background Atmospheric Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px]" />
          {/* Subtle noise texture */}
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
          {/* Section Title */}
          <div className="md:col-span-3 border-t-4 border-primary pt-4">
            <span className="block text-xs font-black uppercase tracking-widest mb-2 text-primary/70">
              Capítulo I
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-white">
              La
              <br />
              Historia
            </h2>

            {/* Decorative Element */}
            <div className="mt-8 hidden md:block">
              <div className="w-12 h-px bg-white/20 mb-4" />
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Origen // Trayectoria
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-9 md:pl-12">
            <div className="relative">
              {/* Decorative Side Border */}
              <div className="absolute -left-4 md:-left-8 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

              {artist.bio_es ? (
                <div
                  className="prose prose-invert prose-lg md:prose-xl max-w-none 
                  prose-headings:font-black prose-headings:text-white
                  prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:font-light
                  prose-strong:text-white prose-strong:font-bold
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                >
                  {/* First paragraph with drop cap */}
                  <p className="first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px] first-letter:text-primary">
                    {artist.bio_es.split("\n")[0]}
                  </p>

                  {/* Rest of paragraphs */}
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
                    [ BIOGRAFÍA_NO_DISPONIBLE ]
                  </p>
                </div>
              )}

              {/* Quote or Stats Section */}
              {artist.bio_es && (
                <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-black text-primary">
                      {currentYear - startYear}+
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                      Años Activo
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-black text-white">
                      {artist.releases.length.toString().padStart(2, "0")}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                      Lanzamientos
                    </div>
                  </div>
                  <div className="text-center md:text-left col-span-2 md:col-span-1">
                    <div className="text-3xl md:text-4xl font-black text-white">
                      100%
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                      Auténtico
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------------------
         DISCOGRAPHY - GRID SYSTEM
         -------------------------------------------------------------------------------- */}
      <section
        id="discography"
        className="bg-neutral-950 py-12 sm:py-16 md:py-20 lg:py-24 border-t border-white/10"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 md:mb-12 border-b border-white/10 pb-4 sm:pb-6 gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2 block">
                Archivo Sonoro
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter">
                Últimas Joyas
              </h2>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs md:text-sm text-neutral-500 uppercase tracking-wider">
                TOTAL // {artist.releases.length.toString().padStart(2, "0")}{" "}
                LANZAMIENTOS
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 md:gap-6 lg:gap-8">
            {artist.releases?.map((release, index) => (
              <div key={release.id} className="group flex flex-col gap-3">
                <div className="relative aspect-square bg-neutral-900 border border-white/10 overflow-hidden">
                  {/* Number overlay */}
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Disc className="h-10 w-10 text-neutral-800" />
                    </div>
                  )}

                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Escuchar en
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

      {/* --------------------------------------------------------------------------------
         FOOTER NAV
         -------------------------------------------------------------------------------- */}
      <div className="border-t border-white/10 bg-black py-12 text-center">
        <Link
          href="/artists"
          className="group inline-flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
            Volver al índice
          </span>
          <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
