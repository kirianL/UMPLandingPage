"use client";

import { useState } from "react";
import { updateRelease } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Artist, Release } from "@/lib/types";

export default function EditReleaseForm({
  release,
  artists,
}: {
  release: Release;
  artists: Artist[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await updateRelease(release.id, formData);

    if (result.success) {
      toast.success(result.message);
      router.refresh();
      router.push("/admin/releases");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Editar Lanzamiento
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
                defaultValue={release.title}
                required
                className="bg-neutral-900 border-neutral-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Artista Principal
              </label>
              <select
                name="artist_id"
                defaultValue={release.artist_id}
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
                  defaultValue={release.type || "single"}
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
                  defaultValue={
                    release.release_date
                      ? new Date(release.release_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
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
              <div className="flex flex-col gap-4">
                {release.cover_url && (
                  <div className="relative aspect-square w-48 rounded-md overflow-hidden border border-neutral-800 bg-neutral-900">
                    <Image
                      src={release.cover_url}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <Input
                  type="file"
                  name="cover_file"
                  accept="image/*"
                  className="bg-neutral-900 border-neutral-800 text-white cursor-pointer file:cursor-pointer file:text-primary file:font-semibold"
                />
                <p className="text-xs text-neutral-500">
                  Deja vacío para mantener la imagen actual.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Platform Links
              </h3>
              <div className="space-y-2">
                <Input
                  name="spotify_url"
                  defaultValue={release.spotify_url || ""}
                  placeholder="Spotify URL"
                  className="bg-neutral-900 border-neutral-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Input
                  name="apple_music_url"
                  defaultValue={release.apple_music_url || ""}
                  placeholder="Apple Music URL"
                  className="bg-neutral-900 border-neutral-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Input
                  name="youtube_url"
                  defaultValue={release.youtube_url || ""}
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
