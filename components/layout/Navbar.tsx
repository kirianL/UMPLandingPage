"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Delayed entrance — navbar fuses with hero on first load
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  // VISIBLE ON ALL PAGES NOW
  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-700 ease-out font-quilon",
        !mounted
          ? "opacity-0 -translate-y-3"
          : scrolled
            ? "opacity-100 translate-y-0 bg-black/60 backdrop-blur-md py-3 border-b border-white/5"
            : "opacity-100 translate-y-0 bg-transparent py-5",
      )}
    >
      <div className="container flex items-center justify-between px-6 md:px-12">
        {/* LOGO */}
        <Link href={`/${language}`} className="flex items-center gap-2 group">
          <div className="relative h-8 w-24 md:h-10 md:w-28 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/assets/UMP LOGO NEGATIVO.webp"
              alt="UMP Music Logo"
              fill
              className="object-contain transition-all duration-300 brightness-0 invert"
              priority
              sizes="(max-width: 768px) 96px, 112px"
            />
          </div>
        </Link>

        {/* DESKTOP NAV - MINIMALIST */}
        <nav className="hidden md:flex items-center gap-10">
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
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group",
                isActive(link.path)
                  ? "text-[#18943A]" // Active Green
                  : "text-white/70 hover:text-white", // Always White Text
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-0 h-[2px] bg-[#18943A] transition-all duration-300 group-hover:w-full",
                  isActive(link.path) && "w-full",
                )}
              />
            </Link>
          ))}
        </nav>

        {/* ACTIONS & MOBILE NAV */}
        <div className="flex items-center gap-6">
          <button
            onClick={toggleLanguage}
            className={cn(
              "hidden sm:flex text-xs font-bold cursor-pointer transition-colors uppercase gap-1 items-center tracking-wider",
              "text-white/70 hover:text-white", // Always White
            )}
          >
            <span className={language === "es" ? "text-[#18943A]" : ""}>
              ES
            </span>
            <span className="text-white/20">/</span>
            <span className={language === "en" ? "text-[#18943A]" : ""}>
              EN
            </span>
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden hover:bg-white/10 transition-transform active:scale-95",
                  "text-white hover:text-[#18943A]", // Always White
                )}
              >
                <Menu className="h-8 w-8" strokeWidth={1.5} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-[#050505] border-r border-[#18943A]/20 text-white w-full sm:w-[400px] p-0"
            >
              <div className="flex flex-col h-full items-center justify-center space-y-8 font-quilon">
                {/* Mobile Logo */}
                <div className="relative h-12 w-32 mb-8">
                  <Image
                    src="/assets/UMP LOGO NEGATIVO.webp"
                    alt="UMP Music Logo"
                    fill
                    className="object-contain brightness-0 invert"
                    priority
                  />
                </div>

                <nav className="flex flex-col gap-6 items-center">
                  {[
                    { name: t("nav.home"), path: `/${language}` },
                    { name: t("nav.team"), path: `/${language}/artists` },
                    { name: t("nav.news"), path: `/${language}/news` },
                    { name: t("nav.about"), path: `/${language}/about` },
                    { name: t("nav.contact"), path: `/${language}/contact` },
                  ].map((link, idx) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      prefetch={true}
                      className={cn(
                        "text-3xl font-black uppercase tracking-tighter py-2 transition-colors hover:text-[#18943A]",
                        isActive(link.path) ? "text-[#18943A]" : "text-white",
                      )}
                      onClick={handleLinkClick}
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-12 p-8 space-y-6 flex flex-col items-center">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-4 text-sm font-bold tracking-widest text-white/60 hover:text-white transition-colors"
                  >
                    <span className={cn(language === "es" && "text-[#18943A]")}>
                      ESPAÑOL
                    </span>
                    <span className="h-4 w-[1px] bg-white/20" />
                    <span className={cn(language === "en" && "text-[#18943A]")}>
                      ENGLISH
                    </span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
