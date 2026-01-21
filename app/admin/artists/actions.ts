"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";
import { revalidatePath } from "next/cache";

export async function createArtist(formData: FormData) {
  const supabase = await createClient();

  const name = (formData.get("name") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const role = (formData.get("role") as string)?.trim();
  const bio_es = (formData.get("bio_es") as string)?.trim();
  const instagram_url = (formData.get("instagram_url") as string)?.trim();
  const spotify_url = (formData.get("spotify_url") as string)?.trim();
  const apple_music_url = (formData.get("apple_music_url") as string)?.trim();
  const youtube_url = (formData.get("youtube_url") as string)?.trim();

  const photoFile = formData.get("photo_file") as File;
  let photo_url = "";

  if (photoFile && photoFile.size > 0) {
    try {
      photo_url = await uploadImage(photoFile, "images", "artists");
    } catch (error) {
      return {
        success: false,
        message: "Error subiendo imagen: " + (error as Error).message,
      };
    }
  }

  const { error } = await supabase.from("artists").insert({
    name,
    slug,
    role,
    photo_url,
    bio_es,
    instagram_url,
    spotify_url,
    apple_music_url,
    youtube_url,
    is_active: true,
  });

  if (error) {
    console.error("Error creating artist:", error);
    return {
      success: false,
      message: "Error al crear artista: " + error.message,
    };
  }

  revalidatePath("/artists");
  revalidatePath("/admin/artists");

  return { success: true, message: "Artista creado correctamente" };
}

export async function updateArtist(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = (formData.get("name") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const role = (formData.get("role") as string)?.trim();
  const bio_es = (formData.get("bio_es") as string)?.trim();
  const instagram_url = (formData.get("instagram_url") as string)?.trim();
  const spotify_url = (formData.get("spotify_url") as string)?.trim();
  const apple_music_url = (formData.get("apple_music_url") as string)?.trim();
  const youtube_url = (formData.get("youtube_url") as string)?.trim();
  const is_active = formData.get("is_active") === "on";

  const photoFile = formData.get("photo_file") as File;
  let photo_url;

  if (photoFile && photoFile.size > 0) {
    try {
      photo_url = await uploadImage(photoFile, "images", "artists");
    } catch (error) {
      return {
        success: false,
        message: "Error subiendo imagen: " + (error as Error).message,
      };
    }
  }

  const updateData: any = {
    name,
    slug,
    role,
    bio_es,
    instagram_url,
    spotify_url,
    apple_music_url,
    youtube_url,
    is_active,
  };

  if (photo_url) {
    updateData.photo_url = photo_url;
  }

  const { error } = await supabase
    .from("artists")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating artist:", error);
    return {
      success: false,
      message: "Error al actualizar artista: " + error.message,
    };
  }

  revalidatePath("/artists");
  revalidatePath(`/artists/${slug}`);
  revalidatePath("/admin/artists");

  return { success: true, message: "Artista actualizado correctamente" };
}

export async function deleteArtist(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("artists").delete().eq("id", id);

  if (error) {
    console.error("Error deleting artist", error);
    return {
      success: false,
      message: "Error al eliminar artista: " + error.message,
    };
  }

  revalidatePath("/artists");
  revalidatePath("/admin/artists");

  return { success: true, message: "Artista eliminado correctamente" };
}
