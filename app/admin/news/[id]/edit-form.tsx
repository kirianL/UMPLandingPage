"use client";

import { useState } from "react";
import { updateNews } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { News } from "@/lib/types";
import { toast } from "sonner";

export default function EditNewsForm({ newsItem }: { newsItem: News }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await updateNews(newsItem.id, formData);

    if (result.success) {
      toast.success(result.message);
      router.refresh(); // Refresh data
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Editar Noticia: {newsItem.title}
        </h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="text-white border-neutral-800 hover:bg-neutral-900"
        >
          Cancelar
        </Button>
      </div>

      <form action={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Título <span className="text-red-500">*</span>
              </label>
              <Input
                name="title"
                defaultValue={newsItem.title}
                required
                className="bg-neutral-900 border-neutral-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Slug (URL) <span className="text-red-500">*</span>
              </label>
              <Input
                name="slug"
                defaultValue={newsItem.slug}
                required
                className="bg-neutral-900 border-neutral-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Resumen (Excerpt)
              </label>
              <textarea
                name="excerpt"
                defaultValue={newsItem.excerpt || ""}
                rows={3}
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Contenido Completo
              </label>
              <textarea
                name="content"
                defaultValue={newsItem.content || ""}
                rows={10}
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              />
            </div>
          </div>

          {/* Media & Settings */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Imagen de Portada
              </label>
              <div className="flex flex-col gap-4">
                {newsItem.image_url && (
                  <div className="relative aspect-video w-full rounded-md overflow-hidden border border-neutral-800 bg-neutral-900">
                    <Image
                      src={newsItem.image_url}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <Input
                  type="file"
                  name="image_file"
                  accept="image/*"
                  className="bg-neutral-900 border-neutral-800 text-white cursor-pointer file:cursor-pointer file:text-primary file:font-semibold"
                />
                <p className="text-xs text-neutral-500">
                  Deja vacío para mantener la imagen actual.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4 border-t border-neutral-800">
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
                defaultChecked={newsItem.is_published}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="is_published"
                className="text-sm font-medium text-white"
              >
                Publicar Noticia
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-neutral-800">
          <Button
            type="submit"
            className="bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider min-w-[150px]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
