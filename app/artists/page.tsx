import { createClient } from "@/lib/supabase/server";
import { Artist } from "@/lib/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Artistas | UMPmusic",
  description: "Conoce a los artistas que definen el sonido de UMPmusic.",
};

export const revalidate = 60; // Revalidate every 60 seconds

async function getArtists() {
  const supabase = await createClient();
  try {
    const { data: artists, error } = await supabase
      .from("artists")
      .select("*")
      .eq("is_active", true)
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching artists:", error);
      return [];
    }
    return artists as Artist[];
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

export default async function ArtistsPage() {
  const artists = await getArtists();
  const hasArtists = artists && artists.length > 0;

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="container px-4 md:px-6 py-12">
        <div className="flex flex-col space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Nuestros <span className="text-primary">Artistas</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg">
            El roster oficial de UMPmusic. Talento puro de Limón para el mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hasArtists ? (
            artists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5 transition-colors group-hover:border-primary/50">
                  {artist.photo_url ? (
                    <img
                      src={artist.photo_url}
                      alt={artist.name}
                      className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono">
                      [ FOTO {artist.name.toUpperCase()} ]
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <span className="text-black font-black text-2xl uppercase tracking-tighter flex items-center gap-2">
                      Ver Perfil <ArrowRight className="h-6 w-6" />
                    </span>
                  </div>

                  {/* Info Badge */}
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-0 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-primary font-bold font-mono uppercase tracking-widest">
                      {artist.tagline_es || "Artista UMP"}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-neutral-800 rounded-lg">
              <p className="text-neutral-500 font-mono mb-4">
                No hay artistas activos en este momento.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
