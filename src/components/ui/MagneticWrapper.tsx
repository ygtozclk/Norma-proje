"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type MagneticWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const PULL_FACTOR = 0.2;
const MAX_PULL = 6;

export default function MagneticWrapper({ children, className }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canHover = useMediaQuery("(pointer: fine)");
  const enabled = canHover && !prefersReducedMotion;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, relX * PULL_FACTOR)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, relY * PULL_FACTOR)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={enabled ? { x: springX, y: springY } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
