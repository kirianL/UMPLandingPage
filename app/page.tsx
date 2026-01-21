import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Artist } from "@/lib/types";
import Image from "next/image";
import { HeroSection } from "@/components/hero-section";

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
      .limit(3);

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
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <HeroSection />

      {/* FEATURED ARTISTS */}
      <section className="py-24 bg-black relative">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
                Artistas <span className="text-primary">Destacados</span>
              </h2>
              <p className="text-muted-foreground max-w-md">
                El talento que está moviendo las calles y las plataformas
                digitales.
              </p>
            </div>
            <Button
              variant="link"
              className="text-white hover:text-primary p-0 h-auto group"
            >
              Ver todos los artistas{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hasArtists ? (
              artists.map((artist) => (
                <Link
                  key={artist.id}
                  href={`/artists/${artist.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5">
                    {artist.photo_url ? (
                      // Optimización futura: Usar <Image> de Next.js
                      // Optimización: Usando <Image> de Next.js
                      <div className="relative w-full h-full">
                        <Image
                          src={artist.photo_url}
                          alt={artist.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono">
                        [ FOTO {artist.name.toUpperCase()} ]
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-black font-black text-2xl uppercase tracking-tighter">
                        Ver Perfil
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-2xl font-bold text-white uppercase italic">
                        {artist.name}
                      </h3>
                      <p className="text-sm text-neutral-400 font-mono">
                        {artist.role || "Artista UMP"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // FALLBACK PLACEHOLDERS (if DB is empty or error)
              <>
                <Link href="/artists/xeuz" className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5">
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono">
                      [ FOTO XEUZ ]
                    </div>
                    <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-black font-black text-2xl uppercase tracking-tighter">
                        Ver Perfil
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-2xl font-bold text-white uppercase italic">
                        Xeuz
                      </h3>
                      <p className="text-sm text-neutral-400 font-mono">
                        Trap / Dancehall
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href="/artists/banton" className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5">
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono">
                      [ FOTO BANTON ]
                    </div>
                    <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-black font-black text-2xl uppercase tracking-tighter">
                        Ver Perfil
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-2xl font-bold text-white uppercase italic">
                        Banton
                      </h3>
                      <p className="text-sm text-neutral-400 font-mono">
                        Reggae / Roots
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href="/artists/generic" className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5">
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono">
                      [ FOTO LIL G ]
                    </div>
                    <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-black font-black text-2xl uppercase tracking-tighter">
                        Ver Perfil
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-2xl font-bold text-white uppercase italic">
                        Lil G
                      </h3>
                      <p className="text-sm text-neutral-400 font-mono">
                        Hip Hop
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* LATEST NEWS / MUSIC */}
      <section className="py-24 bg-neutral-950 border-t border-white/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase text-center md:text-left">
              Latest <span className="text-primary">News</span>
            </h2>
            <Button
              variant="link"
              className="text-white hover:text-primary p-0 h-auto group"
              asChild
            >
              <Link href="/news">
                Todas las noticias{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {latestNews && latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map((newsItem) => (
                <Link
                  key={newsItem.id}
                  href={`/news/${newsItem.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-video bg-neutral-900 border border-white/10 overflow-hidden mb-4">
                    {newsItem.image_url ? (
                      <Image
                        src={newsItem.image_url}
                        alt={newsItem.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-600 font-mono text-xs">
                        [ NO IMAGE ]
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-2 py-1 bg-primary text-black text-[10px] font-bold uppercase tracking-wider">
                        News
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs text-neutral-500 font-mono block">
                      {new Date(newsItem.published_at).toLocaleDateString()}
                    </span>
                    <h3 className="text-xl font-bold text-white uppercase leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {newsItem.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-white/10 rounded-lg py-12 text-center">
              <p className="text-neutral-500 font-mono">
                No hay noticias recientes.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="py-24 bg-primary text-black">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-6">
            Únete al movimiento
          </h2>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto opacity-80">
            Recibe las últimas noticias, lanzamientos exclusivos y fechas de
            eventos directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex h-12 w-full rounded-none border border-black/20 bg-white/10 px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button
              size="lg"
              className="bg-black text-white hover:bg-black/80 rounded-none h-12 px-8 uppercase font-bold"
            >
              Suscribirse
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
