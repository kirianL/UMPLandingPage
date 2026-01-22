"use client";

import dynamic from "next/dynamic";

const Dither = dynamic(() => import("@/components/ui/dither"), { ssr: false });

export default function NewsBackground() {
  return (
    <>
      {/* Dither Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Dither
          waveColor={[0.09, 0.58, 0.23]}
          disableAnimation
          enableMouseInteraction={false}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.01}
        />
      </div>

      {/* Ambient Green Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40vh] bg-[#18943a]/20 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 right-0 w-[60%] h-[30vh] bg-[#18943a]/10 rounded-full blur-[100px] opacity-30" />
      </div>

      {/* Grain Texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
