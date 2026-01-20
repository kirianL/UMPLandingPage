"use client";

import { useState } from "react";
import { createArtist } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CreateArtistForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const result = await createArtist(formData);

    if (result.success) {
      setMessage({ type: "success", text: result.message });
      // Redirect to list after success
      setTimeout(() => {
        router.push("/admin/artists");
      }, 1000);
    } else {
      setMessage({ type: "error", text: result.message });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Nuevo Artista
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
                Nombre del Artista <span className="text-red-500">*</span>
              </label>
              <Input
                name="name"
                required
                placeholder="Ej: Xeuz"
                className="bg-neutral-900 border-neutral-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Slug (URL) <span className="text-red-500">*</span>
              </label>
              <Input
                name="slug"
                required
                placeholder="Ej: xeuz"
                className="bg-neutral-900 border-neutral-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Tagline (Rol)
              </label>
              <Input
                name="tagline_es"
                placeholder="Ej: ARTISTA EXCLUSIVO"
                className="bg-neutral-900 border-neutral-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Biografía (Español)
              </label>
              <textarea
                name="bio_es"
                rows={8}
                placeholder="Escribe la biografía aquí..."
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
              <Input
                type="file"
                name="photo_file"
                accept="image/*"
                className="bg-neutral-900 border-neutral-800 text-white cursor-pointer file:cursor-pointer file:text-primary file:font-semibold"
              />
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
                  className="bg-neutral-900 border-neutral-800 text-white"
                  placeholder="https://open.spotify.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-400">
                  YouTube URL
                </label>
                <Input
                  name="youtube_url"
                  className="bg-neutral-900 border-neutral-800 text-white"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-md border ${
              message.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-500"
                : "bg-red-500/10 border-red-500/20 text-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

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
              "Crear Artista"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
