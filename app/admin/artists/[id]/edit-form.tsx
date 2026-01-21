"use client";

import { useState } from "react";
import { updateArtist } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner"; // Assuming sonner based on typical shadcn setup, will verify in next steps if incorrect

export default function EditArtistForm({ artist }: { artist: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await updateArtist(artist.id, formData);

    if (result.success) {
      toast.success(result.message);
      router.refresh();
      router.push("/admin/artists");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Editar Miembro: {artist.name}
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
                Nombre
              </label>
              <Input
                name="name"
                defaultValue={artist.name}
                required
                className="bg-neutral-900 border-neutral-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Slug (URL)
              </label>
              <Input
                name="slug"
                defaultValue={artist.slug}
                required
                className="bg-neutral-900 border-neutral-800 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">
                  Rol (Español)
                </label>
                <select
                  name="role"
                  defaultValue={artist.role || "Artista"}
                  className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Artista">Artista</option>
                  <option value="DJ">DJ</option>
                  <option value="Productor">Productor</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Biografía (Español)
              </label>
              <textarea
                name="bio_es"
                defaultValue={artist.bio_es}
                rows={5}
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Biografía (Inglés)
              </label>
              <textarea
                name="bio_en"
                defaultValue={artist.bio_en || ""}
                rows={5}
                placeholder="Write the biography here..."
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          {/* Media & Socials */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Foto de Perfil
              </label>
              <div className="flex flex-col gap-4">
                {artist.photo_url && (
                  <div className="space-y-2">
                    <div className="relative h-48 w-48 rounded-md overflow-hidden border border-neutral-800 bg-neutral-900">
                      <Image
                        src={artist.photo_url}
                        alt="Preview"
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="delete_photo"
                        name="delete_photo"
                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <label
                        htmlFor="delete_photo"
                        className="text-sm text-red-400 font-medium"
                      >
                        Eliminar foto actual
                      </label>
                    </div>
                  </div>
                )}
                <Input
                  type="file"
                  name="photo_file"
                  accept="image/*"
                  className="bg-neutral-900 border-neutral-800 text-white cursor-pointer file:cursor-pointer file:text-primary file:font-semibold"
                />
                <p className="text-xs text-neutral-500">
                  Deja vacío para mantener la imagen actual.
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t border-neutral-800 pt-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Redes Sociales
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-400">
                  Instagram URL
                </label>
                <Input
                  name="instagram_url"
                  defaultValue={artist.instagram_url}
                  className="bg-neutral-900 border-neutral-800 text-white"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-400">
                  Spotify URL
                </label>
                <Input
                  name="spotify_url"
                  defaultValue={artist.spotify_url}
                  className="bg-neutral-900 border-neutral-800 text-white"
                  placeholder="https://open.spotify.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-400">
                  Apple Music URL
                </label>
                <Input
                  name="apple_music_url"
                  defaultValue={artist.apple_music_url}
                  className="bg-neutral-900 border-neutral-800 text-white"
                  placeholder="https://music.apple.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-400">
                  YouTube URL
                </label>
                <Input
                  name="youtube_url"
                  defaultValue={artist.youtube_url}
                  className="bg-neutral-900 border-neutral-800 text-white"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                defaultChecked={artist.is_active}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="is_active"
                className="text-sm font-medium text-white"
              >
                Visible al público (Activo)
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
