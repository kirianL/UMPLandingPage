"use client";

import React, { createContext, useContext } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Client-side dictionary for Navbar/Footer static elements
const clientTranslations = {
  es: {
    "nav.home": "HOME",
    "nav.team": "EQUIPO",
    "nav.news": "NOTICIAS",
    "nav.about": "NOSOTROS",
    "nav.contact": "CONTACTO",
    "nav.admin": "ADMIN",
  },
  en: {
    "nav.home": "HOME",
    "nav.team": "ROSTER",
    "nav.news": "NEWS",
    "nav.about": "ABOUT",
    "nav.contact": "CONTACT",
    "nav.admin": "ADMIN",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  // Derive language from URL params, fallback to 'es'
  const language = (params?.lang as Language) || "es";

  const toggleLanguage = () => {
    const newLang = language === "es" ? "en" : "es";
    if (!pathname) return;

    // Construct new path: replace /es/ with /en/ or vice versa
    // We assume the URL starts with /es/ or /en/ because of middleware
    const segments = pathname.split("/");
    // segments[0] is "", segments[1] is the locale if validated by middleware
    if (segments[1] === "es" || segments[1] === "en") {
      segments[1] = newLang;
      router.push(segments.join("/"));
    } else {
      // Fallback for weird cases, just prepending? No, middleware should enforce it.
      // If we are here, we might be in a route that bypassed middleware or similar.
      // But for public pages, it should work.
      router.push(`/${newLang}${pathname}`);
    }
  };

  const t = (key: string) => {
    return (
      clientTranslations[language]?.[
        key as keyof typeof clientTranslations.es
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
