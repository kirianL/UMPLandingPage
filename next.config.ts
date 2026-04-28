import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* ═══ Image Optimization ═══ */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // 31 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  /* ═══ Production Compiler ═══ */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* ═══ Experimental ═══ */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "react-icons",
      "@radix-ui/react-dialog",
      "@radix-ui/react-avatar",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
    ],
  },

  /* ═══ HTTP Headers — Cache + Security ═══ */
  headers: async () => [
    /* Static assets — immutable 1 year */
    {
      source: "/assets/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|mp4|MP4)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    /* All pages — security & perf hints */
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-DNS-Prefetch-Control", value: "on" },
      ],
    },
  ],
};

export default nextConfig;
