"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Start Project", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-white p-2 px-6 text-center font-semibold uppercase tracking-widest text-[#18943A] hover:bg-[#18943A] hover:text-white dark:bg-neutral-950 dark:text-neutral-50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#18943A]/40",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {text}
        </span>
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
          <span>{text}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
      <div className="absolute left-[10%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-none transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-[#18943A]"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
