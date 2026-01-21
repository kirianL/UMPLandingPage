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
      .limit(3);

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
      .select("id, title, slug, image_url, published_at")
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

export default async function Home() {
  const artists = await getFeaturedArtists();
  const latestNews = await getLatestNews();
  const hasArtists = artists && artists.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {/* HERO SECTION */}
      <HeroSection />

      {/* FEATURED ARTISTS - MASONRY / EDITORIAL STYLE */}
      <section className="py-12 md:py-20 bg-[#050505] relative z-20">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.2em]">
                Nuestro Talento
              </span>
              <h2 className="text-4xl md:text-6xl font-black font-quilon text-white tracking-[-0.02em] uppercase leading-[0.9]">
                Nuestras <span className="text-neutral-600">Estrellas</span>
              </h2>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white hover:text-black font-mono text-xs uppercase tracking-widest px-8 hidden md:inline-flex"
              asChild
            >
              <Link href="/artists">Ver Todos</Link>
            </Button>
          </div>

          {/* Mobile: 2 Columns | Desktop: 3 Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
            {hasArtists ? (
              artists.map((artist, idx) => (
                <Link
                  key={artist.id}
                  href={`/artists/${artist.slug}`}
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
                      [ NO IMAGE ]
                    </div>
                  )}

                  {/* Overlay Info - Adjusted for Mobile readability */}
                  <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                    <span className="text-primary font-mono text-[8px] md:text-[10px] uppercase tracking-widest mb-1 md:mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {artist.role || "Artista"}
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
                  No hay artistas destacados disponibles.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LATEST NEWS - EDITORIAL COMPONENT */}
      <NewsList news={latestNews} />

      {/* DEMO SUBMISSION / CTA */}
      <section className="py-24 md:py-32 bg-white text-black text-center border-t border-black/5">
        <div className="container px-4 max-w-3xl mx-auto space-y-8">
          <div className="inline-block border border-black/20 rounded-full px-4 py-1 mb-4">
            <span className="text-[10px] font-bold tracking-[0.2em] font-mono uppercase">
              Scouting
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-quilon uppercase tracking-tighter leading-[0.9]">
            ¿Tienes música <br /> <span className="text-primary">nueva?</span>
          </h2>

          <p className="text-neutral-600 font-medium text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Siempre estamos buscando el próximo sonido que defina a Puerto
            Limón. Envíanos tus demos o contáctanos para bookings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="mailto:demos@umpmusic.com"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-xs font-mono font-bold uppercase tracking-widest text-white transition-all hover:bg-primary hover:scale-105"
            >
              Enviar Demo
            </a>
            <a
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/20 px-8 text-xs font-mono font-bold uppercase tracking-widest text-black transition-all hover:bg-black/5"
            >
              Contacto
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
