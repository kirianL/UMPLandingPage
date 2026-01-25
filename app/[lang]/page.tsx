import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Artist } from "@/lib/types";
import Image from "next/image";
import { HeroSection } from "@/components/hero-section";
import { NewsList } from "@/components/home/news-list";

export const revalidate = 60; // Revalidate every 60 seconds

async function getFeaturedArtists() {
  const supabase = await createClient();
  try {
    const { data: artists, error } = await supabase
      .from("artists")
      .select("id, name, slug, photo_url, role")
      .eq("is_active", true)
      .limit(4);

    if (error) {
      console.error("Error fetching artists:", error);
      return null;
    }
    return artists as Artist[];
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
}

async function getLatestNews() {
  const supabase = await createClient();
  try {
    const { data: news, error } = await supabase
      .from("news")
      .select(
        "id, title:title_es, title_en, slug, image_url, published_at, created_at, excerpt:excerpt_es, excerpt_en",
      )
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(5); // Increased limit for list view

    if (error) {
      console.error("Error fetching news:", error);
      return [];
    }
    return news;
  } catch (err) {
    console.error("Unexpected error fetching news:", err);
    return [];
  }
}

import { getDictionary } from "@/lib/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const artists = await getFeaturedArtists();
  const latestNews = await getLatestNews();
  const hasArtists = artists && artists.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {/* Hero Section */}
      <HeroSection dict={dict.hero} />

      {/* FEATURED ARTISTS - MASONRY / EDITORIAL STYLE */}
      <section className="py-12 md:py-20 bg-[#050505] relative z-20">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.2em]">
                {dict.home.featured_subtitle}
              </span>
              <h2 className="text-4xl md:text-6xl font-black font-quilon text-white tracking-[-0.02em] uppercase leading-[0.9]">
                {lang === "es" ? (
                  <>
                    Nuestras <span className="text-neutral-600">Estrellas</span>
                  </>
                ) : (
                  <>
                    Our <span className="text-neutral-600">Stars</span>
                  </>
                )}
              </h2>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white hover:text-black font-mono text-xs uppercase tracking-widest px-8 hidden md:inline-flex"
              asChild
            >
              <Link href={`/${lang}/artists`}>{dict.home.view_all_team}</Link>
            </Button>
          </div>

          {/* Mobile: 2 Columns | Desktop: 4 Columns */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {hasArtists ? (
              artists.map((artist, idx) => (
                <Link
                  key={artist.id}
                  href={`/${lang}/artists/${artist.slug}`}
                  className={`group relative block aspect-[3/4] overflow-hidden ${
                    idx === 1 ? "" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-neutral-900" />
                  {artist.photo_url ? (
                    <Image
                      src={artist.photo_url}
                      alt={artist.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-800 font-mono text-xs border border-white/10">
                      {dict.home.no_image}
                    </div>
                  )}

                  {/* Overlay Info - Adjusted for Mobile readability */}
                  <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                    <span className="text-primary font-mono text-[8px] md:text-[10px] uppercase tracking-widest mb-1 md:mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {artist.role || (lang === "es" ? "Artista" : "Artist")}
                    </span>
                    <h3 className="text-xl md:text-4xl font-black font-quilon text-white uppercase tracking-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      {artist.name}
                    </h3>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 py-20 text-center border border-dashed border-white/10 rounded-lg">
                <p className="text-neutral-500 font-mono">
                  {dict.home.no_artists}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LATEST NEWS - EDITORIAL COMPONENT */}
      <NewsList
        news={latestNews}
        lang={lang}
        dict={{
          latest_news_title_1: dict.home.latest_news_title_1,
          latest_news_title_2: dict.home.latest_news_title_2,
          view_archive: dict.home.view_archive,
          news_badge: dict.home.news_badge,
          no_image: dict.home.no_image,
        }}
      />

      {/* SOCIAL CONNECT */}
      <section className="py-24 md:py-32 bg-black text-white text-center border-t border-white/10">
        <div className="container px-4 max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-quilon uppercase tracking-tighter leading-[0.9]">
            {lang === "es" ? (
              <>
                Sigue el <br /> <span className="text-primary">Movimiento</span>
              </>
            ) : (
              <>
                Follow <br /> <span className="text-primary">The Movement</span>
              </>
            )}
          </h2>

          <div className="flex flex-row justify-center items-center gap-4 md:gap-12 md:grid md:grid-cols-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-all hover:-translate-y-2"
            >
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <span className="font-mono text-sm uppercase tracking-widest border-b border-transparent group-hover:border-white transition-all">
                Instagram
              </span>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-all hover:-translate-y-2"
            >
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </div>
              <span className="font-mono text-sm uppercase tracking-widest border-b border-transparent group-hover:border-white transition-all">
                YouTube
              </span>
            </a>

            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-all hover:-translate-y-2"
            >
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2" />
                  <path d="M8 14.5c2.5-1 5.5-1 8 0" />
                  <path d="M7 11.5c3-1.5 7-1.5 10 0" />
                  <path d="M6 8.5c4-2 8-2 12 0" />
                </svg>
              </div>
              <span className="font-mono text-sm uppercase tracking-widest border-b border-transparent group-hover:border-white transition-all">
                Spotify
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
