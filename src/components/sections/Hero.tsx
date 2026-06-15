"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import LazyHeroScene from "@/components/three/LazyHeroScene";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero() {
  const t = useTranslations("hero");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <LazyHeroScene />
      </div>

      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : contentY,
          opacity: prefersReducedMotion ? 1 : contentOpacity,
        }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-32"
      >
        <motion.h1
          {...fadeUp(0)}
          className="max-w-3xl text-[clamp(3rem,8vw,6rem)] font-display leading-[1.05] font-bold tracking-tight"
        >
          {t("title")} <span className="text-azure">{t("titleAccent")}</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.15)}
          className="mt-6 max-w-xl text-lg text-muted-foreground"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticWrapper>
            <Button size="lg">{t("ctaPrimary")}</Button>
          </MagneticWrapper>
          <MagneticWrapper>
            <Button size="lg" variant="outline">
              {t("ctaSecondary")}
            </Button>
          </MagneticWrapper>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : indicatorOpacity }}
        className="relative z-10 mb-8 self-center"
      >
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-col items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          <span>{t("scroll")}</span>
          <motion.span
            className="block h-10 w-px bg-muted-foreground/40"
            animate={
              prefersReducedMotion
                ? undefined
                : { scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
