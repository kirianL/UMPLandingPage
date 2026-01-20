import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditArtistForm from "./edit-form";

export default async function EditArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: artist } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();

  if (!artist) {
    notFound();
  }

  return <EditArtistForm artist={artist} />;
}
