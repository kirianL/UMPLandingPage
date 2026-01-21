"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";
import { revalidatePath } from "next/cache";

export async function createRelease(formData: FormData) {
  const supabase = await createClient();

  const artist_id = formData.get("artist_id");
  const title = (formData.get("title") as string)?.trim();
  const type = formData.get("type") as string;
  const release_date = formData.get("release_date") as string;
  const link = (formData.get("link") as string)?.trim();
  const spotify_url = (formData.get("spotify_url") as string)?.trim();
  const apple_music_url = (formData.get("apple_music_url") as string)?.trim();
  const youtube_url = (formData.get("youtube_url") as string)?.trim();

  const coverFile = formData.get("cover_file") as File;
  let cover_url = "";

  if (coverFile && coverFile.size > 0) {
    try {
      cover_url = await uploadImage(coverFile, "images", "releases");
    } catch (error) {
      return {
        success: false,
        message: "Error subiendo portada: " + (error as Error).message,
      };
    }
  }

  const { error } = await supabase.from("releases").insert({
    artist_id,
    title,
    type,
    release_date,
    cover_url,
    link,
    spotify_url,
    apple_music_url,
    youtube_url,
  });

  if (error) {
    console.error("Error creating release:", error);
    return {
      success: false,
      message: "Error al crear lanzamiento: " + error.message,
    };
  }

  revalidatePath("/artists");
  revalidatePath("/admin/releases");
  return { success: true, message: "Lanzamiento creado correctamente" };
}

export async function updateRelease(id: string, formData: FormData) {
  const supabase = await createClient();

  const artist_id = formData.get("artist_id");
  const title = (formData.get("title") as string)?.trim();
  const type = formData.get("type") as string;
  const release_date = formData.get("release_date") as string;
  const link = (formData.get("link") as string)?.trim();
  const spotify_url = (formData.get("spotify_url") as string)?.trim();
  const apple_music_url = (formData.get("apple_music_url") as string)?.trim();
  const youtube_url = (formData.get("youtube_url") as string)?.trim();

  const coverFile = formData.get("cover_file") as File;
  let cover_url;

  if (coverFile && coverFile.size > 0) {
    try {
      cover_url = await uploadImage(coverFile, "images", "releases");
    } catch (error) {
      return {
        success: false,
        message: "Error subiendo portada: " + (error as Error).message,
      };
    }
  }

  const updateData: any = {
    artist_id,
    title,
    type,
    release_date,
    link,
    spotify_url,
    apple_music_url,
    youtube_url,
  };

  if (cover_url) {
    updateData.cover_url = cover_url;
  } else if (formData.get("delete_cover") === "on") {
    updateData.cover_url = null;
  }

  const { error } = await supabase
    .from("releases")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating release:", error);
    return {
      success: false,
      message: "Error al actualizar lanzamiento: " + error.message,
    };
  }

  revalidatePath("/artists");
  revalidatePath("/admin/releases");
  return { success: true, message: "Lanzamiento actualizado correctamente" };
}

export async function deleteRelease(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("releases").delete().eq("id", id);

  if (error) {
    console.error("Error deleting release", error);
    return {
      success: false,
      message: "Error al eliminar lanzamiento: " + error.message,
    };
  }

  revalidatePath("/artists");
  revalidatePath("/admin/releases");
  return { success: true, message: "Lanzamiento eliminado correctamente" };
}
