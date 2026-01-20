export type Artist = {
  id: string;
  slug: string;
  name: string;
  tagline_es: string | null;
  tagline_en: string | null;
  bio_es: string | null;
  bio_en: string | null;
  photo_url: string | null;
  spotify_url: string | null;
  apple_music_url: string | null;
  youtube_url: string | null;
  instagram_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type Release = {
  id: string;
  artist_id: string;
  title: string;
  release_date: string | null;
  cover_url: string | null;
  link: string | null;
  spotify_url: string | null;
  apple_music_url: string | null;
  youtube_url: string | null;
  type: "single" | "album" | "ep" | "mixtape" | null;
  created_at: string;
};

export type News = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  is_published: boolean;
  published_at: string;
  created_at: string;
};
