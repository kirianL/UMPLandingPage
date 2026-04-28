import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umpmusic.com";

export const revalidate = 3600; // Regenerate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  /* ── Static routes ── */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/es`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/es/artists`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/en/artists`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/es/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/en/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/es/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/en/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/es/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/en/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  /* ── Dynamic artist pages ── */
  let artistRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: artists } = await supabase
      .from("artists")
      .select("slug, updated_at")
      .eq("is_active", true);

    if (artists) {
      artistRoutes = artists.flatMap((artist) => [
        {
          url: `${BASE_URL}/es/artists/${artist.slug}`,
          lastModified: new Date(artist.updated_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        },
        {
          url: `${BASE_URL}/en/artists/${artist.slug}`,
          lastModified: new Date(artist.updated_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        },
      ]);
    }
  } catch {
    // Silently fail — static routes still get served
  }

  /* ── Dynamic news pages ── */
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: news } = await supabase
      .from("news")
      .select("slug, published_at, updated_at")
      .eq("is_published", true);

    if (news) {
      newsRoutes = news.flatMap((item) => [
        {
          url: `${BASE_URL}/es/news/${item.slug}`,
          lastModified: new Date(item.updated_at || item.published_at || new Date()),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
        {
          url: `${BASE_URL}/en/news/${item.slug}`,
          lastModified: new Date(item.updated_at || item.published_at || new Date()),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
      ]);
    }
  } catch {
    // Silently fail
  }

  return [...staticRoutes, ...artistRoutes, ...newsRoutes];
}
