"use client";

export function ArtistGradient() {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(141, 125, 202, 0.3), transparent),
              radial-gradient(ellipse 60% 80% at 0% 50%, rgba(96, 96, 128, 0.2), transparent),
              radial-gradient(ellipse 60% 80% at 100% 50%, rgba(33, 33, 33, 0.3), transparent),
              linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1e 100%)
            `,
            animation: "gradientShift 15s ease infinite",
          }}
        />

        {/* Animated overlay for depth */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(141, 125, 202, 0.15), transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(96, 96, 128, 0.15), transparent 50%)
            `,
            animation: "gradientFloat 20s ease-in-out infinite alternate",
          }}
        />

        {/* Subtle noise texture for grain effect */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
        }

        @keyframes gradientFloat {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(30px, -30px) scale(1.05);
          }
        }
      `}</style>
    </>
  );
}
