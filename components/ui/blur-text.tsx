"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number; y: number };
    visible: { filter: string; opacity: number; y: number };
  };
  duration?: number;
  delay?: number;
}

const defaultContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const defaultChildVariants = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

export const BlurText = ({
  text,
  className,
  variant,
  duration = 0.8,
  delay = 0,
}: BlurTextProps) => {
  const letters = Array.from(text);

  const containerVariants = {
    ...defaultContainerVariants,
    visible: {
      ...defaultContainerVariants.visible,
      transition: {
        ...defaultContainerVariants.visible.transition,
        delayChildren: delay,
      },
    },
  };

  const childVariants = variant || defaultChildVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "flex flex-wrap justify-center font-bold tracking-tighter",
        className,
      )}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};
