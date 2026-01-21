"use client";

import { useState } from "react";
import { createNews } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateNewsForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await createNews(formData);

    if (result.success) {
      toast.success(result.message);
      // Redirect to list
      setTimeout(() => {
        router.push("/admin/news");
      }, 500);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Nueva Noticia
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
                Título (Español) <span className="text-red-500">*</span>
              </label>
              <Input
                name="title"
                required
                className="bg-neutral-900 border-neutral-800 text-white"
                placeholder="Título impactante..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Título (Inglés)
              </label>
              <Input
                name="title_en"
                className="bg-neutral-900 border-neutral-800 text-white"
                placeholder="Impactful title..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Slug (URL) <span className="text-red-500">*</span>
              </label>
              <Input
                name="slug"
                required
                className="bg-neutral-900 border-neutral-800 text-white"
                placeholder="titulo-impactante"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Resumen (Español)
              </label>
              <textarea
                name="excerpt"
                rows={3}
                placeholder="Breve descripción para el listado..."
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Resumen (Inglés)
              </label>
              <textarea
                name="excerpt_en"
                rows={3}
                placeholder="Short description for the list..."
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Contenido Completo (Español)
              </label>
              <textarea
                name="content"
                rows={10}
                placeholder="Escribe el artículo aquí..."
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Contenido Completo (Inglés)
              </label>
              <textarea
                name="content_en"
                rows={10}
                placeholder="Write the article here..."
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
              <Input
                type="file"
                name="image_file"
                accept="image/*"
                className="bg-neutral-900 border-neutral-800 text-white cursor-pointer file:cursor-pointer file:text-primary file:font-semibold"
              />
            </div>

            <div className="flex items-center space-x-2 pt-4 border-t border-neutral-800">
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
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
                Creando...
              </>
            ) : (
              "Crear Noticia"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
