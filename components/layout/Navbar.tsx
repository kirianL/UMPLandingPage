"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container max-w-6xl flex h-14 items-center justify-between px-4 md:px-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-24 md:h-10 md:w-32 transition-transform hover:scale-105">
            <Image
              src="/assets/LOGO-UMP.webp"
              alt="UMP Music Logo"
              fill
              className="object-contain invert brightness-0"
              priority
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { name: "EQUIPO", path: "/artists" },
            { name: "NOTICIAS", path: "/news" },
            { name: "NOSOTROS", path: "/about" },
            { name: "CONTACTO", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              prefetch={true}
              className={`text-xs font-bold tracking-widest transition-colors hover:text-primary ${
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ACTIONS & MOBILE NAV */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-widest text-muted-foreground hover:text-white cursor-pointer transition-colors hidden sm:block">
            ES / EN
          </span>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 hover:text-primary h-8 w-8"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black/95 border-l border-white/10 text-white w-full sm:max-w-md p-0"
            >
              <SheetHeader className="p-6 border-b border-white/10 flex flex-row items-center justify-between">
                <div className="relative h-8 w-24">
                  <Image
                    src="/assets/LOGO-UMP.webp"
                    alt="UMP Music Logo"
                    fill
                    className="object-contain invert brightness-0"
                    sizes="96px"
                  />
                </div>
                {/* Close button is handled by Sheet primitive, but we can style the header area */}
                <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                <SheetDescription className="sr-only">
                  Explora el universo UMP Music
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100">
                <nav className="flex flex-col gap-6 p-8 mt-4">
                  {[
                    { name: "HOME", path: "/" },
                    { name: "ARTISTAS", path: "/artists" },
                    { name: "NOTICIAS", path: "/news" },
                    { name: "NOSOTROS", path: "/about" },
                    { name: "CONTACTO", path: "/contact" },
                  ].map((link, index) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`text-4xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-300 hover:text-primary hover:pl-4 font-quilon ${
                        isActive(link.path) ? "text-primary pl-4" : "text-white"
                      }`}
                      onClick={handleLinkClick}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto p-8 border-t border-white/10">
                  <p className="text-xs text-neutral-500 font-mono text-center">
                    © 2025 UMP MUSIC. <br /> TODOS LOS DERECHOS RESERVADOS.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
