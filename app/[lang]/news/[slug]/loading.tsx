import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      <div className="relative z-10 container mx-auto px-4 max-w-6xl pt-24 md:pt-32 pb-20">
        {/* Navigation Skeleton */}
        <div className="mb-12">
          <div className="h-8 w-32 bg-white/5 rounded-full animate-pulse" />
        </div>

        {/* Header Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-20 items-end">
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            <div className="flex gap-4">
              <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-16 w-3/4 bg-white/5 rounded animate-pulse" />
              <div className="h-16 w-1/2 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
          <div className="lg:col-span-4 lg:pl-8">
            <div className="space-y-2">
              <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Image Skeleton */}
        <div className="mb-24 relative w-full aspect-[21/9] bg-neutral-900 rounded-sm border border-white/5 animate-pulse" />

        {/* Body Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="hidden lg:block lg:col-span-2">
            <div className="h-32 w-full bg-white/5 rounded animate-pulse" />
          </div>
          <div className="lg:col-span-8 space-y-4">
            <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
