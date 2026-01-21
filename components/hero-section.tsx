"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black"></div>

      {/* Clean green wave background - no dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-[55%]"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Single clean wave shape */}
          <path
            d="M0,320 Q360,220 720,300 T1440,320 L1440,600 L0,600 Z"
            fill="#1b4b2f"
            opacity="0.95"
          />
        </svg>
      </div>

      <div className="container relative z-10 px-4 md:px-6 py-12 lg:py-20">
        {/* Top section - Title and description */}
        <div className="text-center lg:text-left mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Left - Logo/Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-quilon tracking-[-0.02em] uppercase leading-[0.8] relative inline-block">
                <span className="relative" style={{ fontStretch: "condensed" }}>
                  UMP
                  <svg
                    className="absolute -top-3 -right-10 lg:-right-12 w-12 h-12 lg:w-16 lg:h-16 text-[#1b4b2f] drop-shadow-[0_0_8px_rgba(27,75,47,0.6)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </span>
                <br />
                <span
                  className="text-white"
                  style={{ fontStretch: "condensed" }}
                >
                  MUSIC
                </span>
              </h1>
            </div>

            {/* Right - Description */}
            <div className="space-y-4 max-w-md mx-auto lg:mx-0 lg:mt-8">
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-mono">
                Nos esforzamos por brindar una plataforma para empoderar a
                nuestros artistas para que puedan compartir sus historias
                auténticas y emociones con el mundo.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-neutral-500 font-mono uppercase tracking-wider">
                <span className="inline-block w-1.5 h-1.5 bg-[#1b4b2f] animate-pulse"></span>
                <span>Basado en Limón, CR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Photo frames - Horizontal layout on wave */}
        <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] mb-12">
          <div className="absolute inset-0 flex items-center justify-center gap-3 md:gap-6 lg:gap-8 px-4">
            {/* Photo Frame 1 - Left tilted */}
            <div className="w-[28%] md:w-[30%] h-[50%] md:h-[55%] transform -rotate-6 transition-transform hover:rotate-0 hover:scale-105 duration-500">
              <div className="relative w-full h-full bg-[#1b4b2f] p-[3px] md:p-1 shadow-2xl shadow-black/70 border-2 border-[#2d7a4a]">
                <div className="relative w-full h-full bg-neutral-950 overflow-hidden border border-neutral-800">
                  {/* Stronger halftone/Noise effect overlay */}

                  {/* Vignette effect */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono text-[10px] md:text-xs border border-dashed border-neutral-800">
                    [ FOTO 1 ]
                  </div>
                  {/* <Image src="/path/to/photo1.jpg" alt="Artist 1" fill className="object-cover saturate-0 contrast-125" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay z-10"></div> */}
                </div>
              </div>
            </div>

            {/* Photo Frame 2 - Center, slightly larger */}
            <div className="w-[36%] md:w-[35%] h-[60%] md:h-[65%] transform rotate-2 transition-transform hover:rotate-0 hover:scale-105 duration-500">
              <div className="relative w-full h-full bg-[#1b4b2f] p-[3px] md:p-1 shadow-2xl shadow-black/70 border-2 border-[#2d7a4a]">
                <div className="relative w-full h-full bg-neutral-950 overflow-hidden border border-neutral-800">
                  {/* Stronger halftone/Noise effect overlay */}

                  {/* Vignette effect */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono text-[10px] md:text-xs border border-dashed border-neutral-800">
                    [ FOTO 2 ]
                  </div>
                  {/* <Image src="/path/to/photo2.jpg" alt="Artist 2" fill className="object-cover saturate-0 contrast-125" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay z-10"></div> */}
                </div>
              </div>
            </div>

            {/* Photo Frame 3 - Right tilted */}
            <div className="w-[28%] md:w-[30%] h-[50%] md:h-[55%] transform rotate-6 transition-transform hover:rotate-0 hover:scale-105 duration-500">
              <div className="relative w-full h-full bg-[#1b4b2f] p-[3px] md:p-1 shadow-2xl shadow-black/70 border-2 border-[#2d7a4a]">
                <div className="relative w-full h-full bg-neutral-950 overflow-hidden border border-neutral-800">
                  {/* Stronger halftone/Noise effect overlay */}

                  {/* Vignette effect */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono text-[10px] md:text-xs border border-dashed border-neutral-800">
                    [ FOTO 3 ]
                  </div>
                  {/* <Image src="/path/to/photo3.jpg" alt="Artist 3" fill className="object-cover saturate-0 contrast-125" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay z-10"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <Button
            size="lg"
            className="bg-[#1b4b2f] text-white hover:bg-[#2d7a4a] font-black uppercase tracking-[0.15em] rounded-none h-12 px-8 shadow-lg shadow-green-950/50 border-2 border-[#2d7a4a] transition-all hover:border-[#3d9a5a]"
            asChild
          >
            <Link href="/artists">Explorar Artistas</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white/60 uppercase tracking-[0.15em] rounded-none h-12 px-8 font-black transition-all"
            asChild
          >
            <Link href="/about">Sobre Nosotros</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
