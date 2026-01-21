import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminArtistsPage() {
  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Equipo
          </h1>
        </div>
        <Button
          asChild
          className="bg-primary text-black hover:bg-primary/90 font-bold"
        >
          <Link href="/admin/artists/create">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Miembro
          </Link>
        </Button>
      </div>

      <div className="border border-white/10 rounded-lg overflow-hidden bg-neutral-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-black text-neutral-400 font-medium border-b border-white/10">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4 hidden md:table-cell">Slug</th>
              <th className="p-4 hidden md:table-cell">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {artists?.map((artist) => (
              <tr
                key={artist.id}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 relative rounded overflow-hidden bg-black shrink-0">
                      {artist.photo_url && (
                        <img
                          src={artist.photo_url}
                          alt={artist.name}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white">{artist.name}</div>
                      <div className="text-xs text-neutral-500 md:hidden">
                        {artist.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-neutral-400 font-mono">
                  {artist.slug}
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${artist.is_active ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                  >
                    {artist.is_active ? "ACTIVO" : "INACTIVO"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-neutral-400 hover:text-white"
                      asChild
                    >
                      <Link href={`/artists/${artist.slug}`} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-950"
                      asChild
                    >
                      <Link href={`/admin/artists/${artist.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {(!artists || artists.length === 0) && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-neutral-500">
                  No hay miembros registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
