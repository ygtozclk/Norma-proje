"use client";

import { motion, useScroll } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 z-50 h-0.5 w-full origin-left bg-azure"
      aria-hidden="true"
    />
  );
}
