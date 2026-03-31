"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Delayed entrance — navbar fuses with hero on first load
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effect for navbar — throttled with rAF for 60fps
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  const isDark = theme === "dark";

  // VISIBLE ON ALL PAGES NOW
  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-700 ease-out font-quilon",
        scrolled
          ? "bg-background/60 backdrop-blur-md py-3 border-b border-border"
          : "bg-transparent py-5",
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
              className="object-contain transition-all duration-300 brightness-0 dark:invert"
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
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full",
                  isActive(link.path) && "w-full",
                )}
              />
            </Link>
          ))}
        </nav>

        {/* ACTIONS & MOBILE NAV */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-foreground/60 hover:text-foreground hover:bg-muted transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={cn(
              "hidden sm:flex text-xs font-bold cursor-pointer transition-colors uppercase gap-1 items-center tracking-wider",
              "text-foreground/70 hover:text-foreground",
            )}
          >
            <span className={language === "es" ? "text-primary" : ""}>ES</span>
            <span className="text-foreground/20">/</span>
            <span className={language === "en" ? "text-primary" : ""}>EN</span>
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden hover:bg-foreground/10 transition-transform active:scale-95",
                  "text-foreground hover:text-primary",
                )}
              >
                <Menu className="h-8 w-8" strokeWidth={1.5} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-background border-r border-primary/20 text-foreground w-full sm:w-[400px] p-0"
            >
              <div className="flex flex-col h-full items-center justify-center space-y-8 font-quilon">
                {/* Mobile Logo */}
                <div className="relative h-12 w-32 mb-8">
                  <Image
                    src="/assets/UMP LOGO NEGATIVO.webp"
                    alt="UMP Music Logo"
                    fill
                    className="object-contain brightness-0 dark:invert"
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
                        "text-3xl font-black uppercase tracking-tighter py-2 transition-colors hover:text-primary",
                        isActive(link.path)
                          ? "text-primary"
                          : "text-foreground",
                      )}
                      onClick={handleLinkClick}
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-12 p-8 space-y-6 flex flex-col items-center">
                  {/* Mobile Theme Toggle */}
                  <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="flex items-center gap-3 text-sm font-bold tracking-widest text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {isDark ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                    <span>{isDark ? "LIGHT MODE" : "DARK MODE"}</span>
                  </button>

                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-4 text-sm font-bold tracking-widest text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <span className={cn(language === "es" && "text-primary")}>
                      ESPAÑOL
                    </span>
                    <span className="h-4 w-[1px] bg-foreground/20" />
                    <span className={cn(language === "en" && "text-primary")}>
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
