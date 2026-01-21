"use client";

import { useState } from "react";
import { createRelease } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Artist } from "@/lib/types";

export default function CreateReleaseForm({ artists }: { artists: Artist[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await createRelease(formData);

    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        router.push("/admin/releases");
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
          Nuevo Lanzamiento
        </h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="text-white border-white/10 hover:bg-neutral-900"
        >
          Cancelar
        </Button>
      </div>

      <form action={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Título
              </label>
              <Input
                name="title"
                required
                className="bg-neutral-900 border-neutral-800 text-white"
                placeholder="Nombre del Single/Album"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Artista Principal
              </label>
              <select
                name="artist_id"
                required
                className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Seleccionar Artista...</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">
                  Tipo
                </label>
                <select
                  name="type"
                  required
                  className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="single">Single</option>
                  <option value="album">Album</option>
                  <option value="ep">EP</option>
                  <option value="mixtape">Mixtape</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">
                  Fecha de Lanzamiento
                </label>
                <Input
                  type="date"
                  name="release_date"
                  required
                  className="bg-neutral-900 border-neutral-800 text-white"
                />
              </div>
            </div>
          </div>

          {/* Media & Links */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Portada (Cover Art)
              </label>
              <Input
                type="file"
                name="cover_file"
                accept="image/*"
                required
                className="bg-neutral-900 border-neutral-800 text-white cursor-pointer file:cursor-pointer file:text-primary file:font-semibold"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Platform Links
              </h3>
              <div className="space-y-2">
                <Input
                  name="spotify_url"
                  placeholder="Spotify URL"
                  className="bg-neutral-900 border-neutral-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Input
                  name="apple_music_url"
                  placeholder="Apple Music URL"
                  className="bg-neutral-900 border-neutral-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Input
                  name="youtube_url"
                  placeholder="YouTube URL"
                  className="bg-neutral-900 border-neutral-800 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-white/10">
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
              "Crear Lanzamiento"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
