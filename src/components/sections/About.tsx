"use client";

import { useLocale, useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { stats } from "@/content/about";

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale() as "tr" | "en";

  return (
    <Section id="about" className="overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.03]" aria-hidden="true" />

      <Reveal>
        <SectionHeader kicker={t("kicker")} title={t("title")} />
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t("lead")}</p>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label.en} delay={0.1 * i}>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="whitespace-nowrap font-mono text-2xl font-bold text-azure sm:text-3xl md:text-4xl">
                <CountUp value={stat.value} format={(n) => stat.format(Math.round(n), locale)} />
                {stat.unit && (
                  <span className="ml-1 text-base font-normal text-muted-foreground sm:text-lg">
                    {stat.unit}
                  </span>
                )}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label[locale]}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
