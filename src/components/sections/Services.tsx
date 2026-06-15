"use client";

import { useLocale, useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/content/services";

export default function Services() {
  const t = useTranslations("services");
  const locale = useLocale() as "tr" | "en";

  return (
    <Section id="services">
      <Reveal>
        <SectionHeader kicker={t("kicker")} title={t("title")} />
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.title.en} delay={(i % 3) * 0.08}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-azure">
                <span className="absolute top-6 right-6 font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="size-8 text-azure transition-[filter] duration-300 group-hover:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--azure)_70%,transparent)]" />
                <h3 className="mt-6 font-display text-xl font-semibold">
                  {service.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.desc[locale]}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
