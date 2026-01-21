import { createClient } from "@/lib/supabase/server";
import { Artist } from "@/lib/types";
import RosterFilter from "./roster-filter";

export const metadata = {
  title: "Roster | UMPmusic",
  description:
    "Conoce a los artistas, DJs y productores que definen el sonido de UMPmusic.",
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

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="container px-4 md:px-6 py-12">
        <div className="flex flex-col space-y-4 mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Nuestro <span className="text-primary">Equipo</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg">
            Talento puro de Limón para el mundo. Artistas, DJs y Productores.
          </p>
        </div>

        <RosterFilter artists={artists} />
      </section>
    </div>
  );
}
