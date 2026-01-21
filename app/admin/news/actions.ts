"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";
import { revalidatePath } from "next/cache";

export async function createNews(formData: FormData) {
  const supabase = await createClient();

  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const title_en = (formData.get("title_en") as string)?.trim();
  const excerpt_en = (formData.get("excerpt_en") as string)?.trim();
  const content_en = (formData.get("content_en") as string)?.trim();
  const is_published = formData.get("is_published") === "on";

  const imageFile = formData.get("image_file") as File;
  let image_url = "";

  if (imageFile && imageFile.size > 0) {
    try {
      image_url = await uploadImage(imageFile, "images", "news");
    } catch (error) {
      return {
        success: false,
        message: "Error subiendo imagen: " + (error as Error).message,
      };
    }
  }

  const { error } = await supabase.from("news").insert({
    title,
    slug,
    excerpt,
    content,
    title_en,
    excerpt_en,
    content_en,
    image_url,
    is_published,
    published_at: is_published ? new Date().toISOString() : null,
    author_id: (await supabase.auth.getUser()).data.user?.id,
  });

  if (error) {
    console.error("Error creating news:", error);
    return {
      success: false,
      message: "Error al crear noticia: " + error.message,
    };
  }

  revalidatePath("/news");
  revalidatePath("/admin/news");
  return { success: true, message: "Noticia creada correctamente" };
}

export async function updateNews(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const title_en = (formData.get("title_en") as string)?.trim();
  const excerpt_en = (formData.get("excerpt_en") as string)?.trim();
  const content_en = (formData.get("content_en") as string)?.trim();
  const is_published = formData.get("is_published") === "on";

  const imageFile = formData.get("image_file") as File;
  let image_url;

  if (imageFile && imageFile.size > 0) {
    try {
      image_url = await uploadImage(imageFile, "images", "news");
    } catch (error) {
      return {
        success: false,
        message: "Error subiendo imagen: " + (error as Error).message,
      };
    }
  }

  const updateData: any = {
    title,
    slug,
    excerpt,
    content,
    title_en,
    excerpt_en,
    content_en,
    is_published,
  };

  if (image_url) {
    updateData.image_url = image_url;
  } else if (formData.get("delete_image") === "on") {
    updateData.image_url = null;
  }

  const { error } = await supabase.from("news").update(updateData).eq("id", id);

  if (error) {
    console.error("Error updating news:", error);
    return {
      success: false,
      message: "Error al actualizar noticia: " + error.message,
    };
  }

  revalidatePath("/news");
  revalidatePath("/admin/news");
  return { success: true, message: "Noticia actualizada correctamente" };
}

export async function deleteNews(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("news").delete().eq("id", id);

  if (error) {
    console.error("Error deleting news", error);
    return {
      success: false,
      message: "Error al eliminar noticia: " + error.message,
    };
  }

  revalidatePath("/news");
  revalidatePath("/admin/news");
  return { success: true, message: "Noticia eliminada correctamente" };
}
