import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Disc, Newspaper } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
          Panel de Control
        </h1>
        <p className="text-neutral-400">
          Gestiona el contenido del sitio web desde aquí.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/artists" className="group">
          <Card className="bg-neutral-900 border-white/10 hover:border-primary/50 transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-200">
                Artistas
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                Gestionar
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Añadir, editar o desactivar perfiles.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/releases" className="group">
          <Card className="bg-neutral-900 border-white/10 hover:border-primary/50 transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-200">
                Lanzamientos
              </CardTitle>
              <Disc className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                Catálogo
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Subir nuevos singles, álbumes o mixtapes.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/news" className="group">
          <Card className="bg-neutral-900 border-white/10 hover:border-primary/50 transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-200">
                Noticias
              </CardTitle>
              <Newspaper className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                Blog
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Publicar artículos y novedades.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
