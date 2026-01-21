import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { Artist, Release } from "@/lib/types";
import { notFound } from "next/navigation";
import ArtistProfile from "@/components/team/ArtistProfile";
import DJProfile from "@/components/team/DJProfile";
import ProducerProfile from "@/components/team/ProducerProfile";
import { getDictionary } from "@/lib/dictionaries";

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
    description: artist.role || `Perfil oficial de ${artist.name} en UMPmusic.`,
  };
}

async function getArtist(slug: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("artists")
    .select(
      `
      *,
      releases (
        id,
        title,
        type,
        release_date,
        cover_url,
        spotify_url,
        apple_music_url,
        youtube_url
      )
    `,
    )
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
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const artist = await getArtist(slug);
  const dict = await getDictionary(lang);

  if (!artist) {
    notFound();
  }

  const role = (artist.role || "").toLowerCase();

  // Role-based Dispatcher
  if (role.includes("dj") || role.includes("selector")) {
    return (
      <DJProfile
        artist={artist}
        lang={lang}
        dict={dict.components.artist_profile}
      />
    );
  }

  if (
    role.includes("productor") ||
    role.includes("producer") ||
    role.includes("ingeniero")
  ) {
    return (
      <ProducerProfile
        artist={artist}
        lang={lang}
        dict={dict.components.artist_profile}
      />
    );
  }

  // Default to standard Artist profile
  return (
    <ArtistProfile
      artist={artist}
      lang={lang}
      dict={dict.components.artist_profile}
    />
  );
}
