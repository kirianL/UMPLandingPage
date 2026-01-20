import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <img
              src="/assets/LOGO-UMP.webp"
              alt="UMP Music Logo"
              className="h-16 w-auto object-contain invert brightness-0"
            />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/artists"
            prefetch={true}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            ARTISTAS
          </Link>
          <Link
            href="/news"
            prefetch={true}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            NOTICIAS
          </Link>
          <Link
            href="/about"
            prefetch={true}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            NOSOTROS
          </Link>
          <Link
            href="/contact"
            prefetch={true}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            CONTACTO
          </Link>
        </nav>

        {/* ACTIONS & MOBILE NAV */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-muted-foreground hover:text-white cursor-pointer transition-colors hidden sm:block">
            ES / EN
          </span>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 hover:text-primary"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black/95 border-white/10 text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-bold text-white">
                  MENÚ
                </SheetTitle>
                <SheetDescription className="text-left text-neutral-400">
                  Explora el universo UMP Music
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium py-10">
                <Link href="/" className="hover:text-primary transition-colors">
                  HOME
                </Link>
                <Link
                  href="/artists"
                  className="hover:text-primary transition-colors"
                >
                  ARTISTAS
                </Link>
                <Link
                  href="/news"
                  className="hover:text-primary transition-colors"
                >
                  NOTICIAS
                </Link>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  NOSOTROS
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  CONTACTO
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
