"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { projects, type ProjectCategory } from "@/content/projects";

const categories: Array<ProjectCategory | "all"> = [
  "all",
  "residential",
  "commercial",
  "industrial",
  "public",
];

export default function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "tr" | "en";
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const filtered =
    active === "all" ? projects : projects.filter((project) => project.category === active);

  return (
    <Section id="projects">
      <Reveal>
        <SectionHeader kicker={t("kicker")} title={t("title")} />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-2 font-mono text-xs tracking-widest uppercase">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                "rounded-full border px-4 py-2 transition-colors",
                active === category
                  ? "border-azure text-azure"
                  : "border-border text-muted-foreground hover:border-azure/50 hover:text-foreground"
              )}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 0.08}>
            <div className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-azure">
              <div className="relative aspect-video overflow-hidden bg-grid">
                <div className="absolute inset-0 bg-gradient-to-b from-azure/15 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt=""
                    width={160}
                    height={59}
                    className="w-32 opacity-10 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="absolute top-4 left-4 font-mono text-xs tracking-widest text-azure uppercase">
                  {t(`categories.${project.category}`)}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold">{project.title[locale]}</h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {project.city} · {project.year}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
