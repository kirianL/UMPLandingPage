"use client";

import { useState } from "react";
import { Artist } from "@/lib/types";
import Link from "next/link";
import { ArrowRight, Disc, Mic2, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type FilterType = "all" | "artista" | "dj" | "productor";

export default function RosterFilter({ artists }: { artists: Artist[] }) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredArtists = artists.filter((artist) => {
    if (filter === "all") return true;
    const role = (artist.role || "artista").toLowerCase();
    return role.includes(filter);
  });

  const tabs: { id: FilterType; label: string; icon: any }[] = [
    { id: "all", label: "Todos", icon: Disc },
    { id: "artista", label: "Artistas", icon: Mic2 },
    { id: "dj", label: "DJs", icon: Disc },
    { id: "productor", label: "Productores", icon: Music },
  ];

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Filter Tabs - New Style */}
      <div className="flex flex-wrap items-center gap-6 pb-4 border-b border-white/10">
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mr-2">
          Filtrar por:
        </span>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={cn(
                "relative px-4 py-1.5 text-sm font-bold uppercase tracking-wider transition-colors duration-300",
                filter === tab.id
                  ? "text-black"
                  : "text-neutral-400 hover:text-white",
              )}
            >
              {filter === tab.id && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.label}
                <span
                  className={cn(
                    "text-[10px] align-top",
                    filter === tab.id ? "text-black/60" : "text-neutral-600",
                  )}
                >
                  {tab.id === "all"
                    ? artists.length
                    : artists.filter((a) =>
                        (a.role || "artista").toLowerCase().includes(tab.id),
                      ).length}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredArtists.map((artist) => (
            <motion.div
              key={artist.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/artists/${artist.slug}`}
                className="group block h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5 transition-colors group-hover:border-primary/50 h-full">
                  {artist.photo_url ? (
                    <img
                      src={artist.photo_url}
                      alt={artist.name}
                      className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono">
                      [ FOTO {artist.name.toUpperCase()} ]
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <span className="text-black font-black text-2xl uppercase tracking-tighter flex items-center gap-2">
                      Ver Perfil <ArrowRight className="h-6 w-6" />
                    </span>
                  </div>

                  {/* Info Badge */}
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-0 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-primary font-bold font-mono uppercase tracking-widest">
                      {artist.role || "Artista UMP"}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredArtists.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-20 text-center border border-dashed border-neutral-800 rounded-lg"
          >
            <p className="text-neutral-500 font-mono">
              No hay talentos en esta categoría aún.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
