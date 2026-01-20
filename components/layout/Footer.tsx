import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-14 w-40">
                <img
                  src="/assets/LOGO-UMP.webp"
                  alt="UMP Music Logo"
                  className="h-full w-full object-contain object-left invert brightness-0"
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Sello discográfico independiente de Puerto Limón, Costa Rica.
              Representando la cultura real y el sonido del Caribe.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wider">
              EXPLORA
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/artists"
                  className="hover:text-primary transition-colors"
                >
                  Artistas
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-primary transition-colors"
                >
                  Noticias
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-primary transition-colors"
                >
                  Eventos
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wider">
              CONTACTO
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:info@umpmusic.com"
                  className="hover:text-primary transition-colors"
                >
                  info@umpmusic.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="hover:text-primary transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  className="hover:text-primary transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://spotify.com"
                  className="hover:text-primary transition-colors"
                >
                  Spotify
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} UMPmusic. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Términos
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
