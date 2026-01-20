import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditReleaseForm from "./edit-form";

export default async function EditReleasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Parallel fetching
  const [releaseRes, artistsRes] = await Promise.all([
    supabase.from("releases").select("*").eq("id", id).single(),
    supabase.from("artists").select("id, name").eq("is_active", true),
  ]);

  const release = releaseRes.data;
  const artists = artistsRes.data;

  if (!release) {
    notFound();
  }

  return <EditReleaseForm release={release} artists={artists || []} />;
}
