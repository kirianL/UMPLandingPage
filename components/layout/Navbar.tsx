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
              className="bg-black/95 border-white/10 text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-bold text-white font-quilon">
                  MENÚ
                </SheetTitle>
                <SheetDescription className="text-left text-neutral-400">
                  Explora el universo UMP Music
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-3 text-lg font-medium py-6">
                {[
                  { name: "HOME", path: "/" },
                  { name: "ARTISTAS", path: "/artists" },
                  { name: "NOTICIAS", path: "/news" },
                  { name: "NOSOTROS", path: "/about" },
                  { name: "CONTACTO", path: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`transition-colors hover:text-primary ${
                      isActive(link.path) ? "text-primary" : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
