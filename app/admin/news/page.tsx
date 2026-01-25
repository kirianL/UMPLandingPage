import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Newspaper, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AdminNewsPage() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("id, title:title_es, slug, image_url, published_at, is_published")
    .order("published_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
            Noticias
          </h1>
        </div>
        <Button
          asChild
          className="w-full md:w-auto bg-primary text-black hover:bg-primary/90 font-bold"
        >
          <Link href="/admin/news/create">
            <Plus className="mr-2 h-4 w-4" /> Nueva Noticia
          </Link>
        </Button>
      </div>

      <div className="border border-white/10 rounded-lg overflow-hidden bg-neutral-900 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-black text-neutral-400 font-medium border-b border-white/10">
            <tr>
              <th className="p-4">Título</th>
              <th className="p-4 hidden md:table-cell">Slug</th>
              <th className="p-4 hidden md:table-cell">Fecha</th>
              <th className="p-4 hidden md:table-cell">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {news?.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-16 relative rounded overflow-hidden bg-black shrink-0 border border-white/10 flex items-center justify-center">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Newspaper className="h-5 w-5 text-neutral-600" />
                      )}
                    </div>
                    <div className="font-bold text-white line-clamp-1">
                      {item.title}
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-neutral-400 font-mono text-xs">
                  {item.slug}
                </td>
                <td className="p-4 hidden md:table-cell text-neutral-400 font-mono">
                  {new Date(item.published_at).toLocaleDateString()}
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${item.is_published ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}
                  >
                    {item.is_published ? "PUBLICADO" : "BORRADOR"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-950"
                    asChild
                  >
                    <Link href={`/admin/news/${item.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
            {(!news || news.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-neutral-500">
                  No hay noticias registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
