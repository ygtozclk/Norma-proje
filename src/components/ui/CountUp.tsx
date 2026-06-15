"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type CountUpProps = {
  value: number;
  format?: (n: number) => string;
  duration?: number;
};

export default function CountUp({
  value,
  format = (n) => `${Math.round(n)}`,
  duration = 1.5,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });

    return () => controls.stop();
  }, [isInView, value, duration, prefersReducedMotion]);

  return <span ref={ref}>{format(display)}</span>;
}
