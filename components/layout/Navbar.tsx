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
import { useLanguage } from "@/components/providers/language-provider";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* LOGO */}
        <Link href={`/${language}`} className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="relative h-16 w-32">
              <Image
                src="/assets/LOGO-UMP.webp"
                alt="UMP Music Logo"
                fill
                className="object-contain invert brightness-0"
                priority
                sizes="(max-width: 768px) 100px, 128px"
              />
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: t("nav.team"), path: `/${language}/artists` },
            { name: t("nav.news"), path: `/${language}/news` },
            { name: t("nav.about"), path: `/${language}/about` },
            { name: t("nav.contact"), path: `/${language}/contact` },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              prefetch={true}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ACTIONS & MOBILE NAV */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="text-xs font-bold text-muted-foreground hover:text-white cursor-pointer transition-colors hidden sm:block uppercase"
          >
            <span className={language === "es" ? "text-white" : ""}>ES</span> /{" "}
            <span className={language === "en" ? "text-white" : ""}>EN</span>
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
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
              className="bg-black/90 backdrop-blur-xl border-l border-white/10 text-white w-[260px] p-0"
            >
              <div className="flex flex-col h-full bg-gradient-to-b from-black/50 to-transparent">
                <SheetHeader className="p-6 pb-2 border-b border-white/5 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-20">
                      <Image
                        src="/assets/LOGO-UMP.webp"
                        alt="UMP Music Logo"
                        fill
                        className="object-contain invert brightness-0"
                        priority
                      />
                    </div>
                  </div>
                  <SheetTitle className="sr-only">
                    Menú de Navegación
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Navegación principal
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-3 mt-2">
                  {[
                    { name: t("nav.home"), path: `/${language}` },
                    { name: t("nav.team"), path: `/${language}/artists` },
                    { name: t("nav.news"), path: `/${language}/news` },
                    { name: t("nav.about"), path: `/${language}/about` },
                    { name: t("nav.contact"), path: `/${language}/contact` },
                  ].map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      prefetch={true}
                      className={`group flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:bg-white/5 ${
                        isActive(link.path)
                          ? "bg-white/10 text-white border-l-2 border-primary"
                          : "text-neutral-400 hover:text-white border-l-2 border-transparent"
                      }`}
                      onClick={handleLinkClick}
                    >
                      <span className="text-sm font-bold tracking-wider">
                        {link.name}
                      </span>
                      <span
                        className={`block h-1.5 w-1.5 rounded-full transition-colors ${
                          isActive(link.path)
                            ? "bg-primary shadow-[0_0_8px_rgba(26,77,46,0.8)]"
                            : "bg-transparent group-hover:bg-white/20"
                        }`}
                      />
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto p-6 border-t border-white/5 space-y-4">
                  <button
                    onClick={toggleLanguage}
                    className="w-full py-2 text-xs font-bold text-neutral-400 hover:text-white cursor-pointer transition-colors uppercase border border-white/10 rounded-md hover:bg-white/5 flex items-center justify-center gap-2"
                  >
                    <span className={language === "es" ? "text-white" : ""}>
                      ESPAÑOL
                    </span>
                    <span className="text-white/20">|</span>
                    <span className={language === "en" ? "text-white" : ""}>
                      ENGLISH
                    </span>
                  </button>
                  <p className="text-[10px] text-center text-neutral-600 font-mono uppercase">
                    © 2026 UMP Music
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
