import { createClient } from "@/lib/supabase/server";
import { Artist } from "@/lib/types";
import RosterFilter from "./roster-filter";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "Team" : "Equipo",
    description: isEn
      ? "Meet the artists, DJs, and producers who define the sound of UMPmusic."
      : "Conoce a los artistas, DJs y productores que definen el sonido de UMPmusic.",
    alternates: {
      canonical: `/${lang}/artists`,
      languages: { es: "/es/artists", en: "/en/artists" },
    },
  };
}

export const revalidate = 60;

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

import { getDictionary } from "@/lib/dictionaries";

export default async function ArtistsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const artists = await getArtists();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="container px-4 md:px-6 mb-12 pt-8">
        <div className="flex flex-col space-y-4 mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] md:text-xs font-mono text-muted-foreground tracking-[0.2em] uppercase border border-border px-2 py-1">
              {dict.artists.breadcrumb}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-quilon text-foreground tracking-[-0.02em] uppercase leading-[0.8]">
            <span
              className="relative inline-block"
              style={{ fontStretch: "condensed" }}
            >
              {dict.artists.title_sub}
              <br />
              <span className="text-[#18943a]">{dict.artists.title_main}</span>
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg font-mono pt-4">
            {dict.artists.subtitle}
          </p>
        </div>

        <RosterFilter artists={artists} dict={dict.components.roster_filter} />
      </section>
    </div>
  );
}
