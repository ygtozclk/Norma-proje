"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import NavLink from "@/components/layout/NavLink";
import MobileMenu from "@/components/layout/MobileMenu";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", key: "home" },
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

const SECTION_IDS = ["about", "services", "projects", "contact"] as const;

export default function Header() {
  const t = useTranslations("nav");
  const scrolled = useScrolled(80);
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <>
      <ScrollProgressBar />
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-white/8 bg-graphite/70 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300",
            scrolled ? "py-3" : "py-4"
          )}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Norma Proje"
              width={409}
              height={151}
              priority
              className={cn(
                "w-auto transition-all duration-300",
                scrolled ? "h-9 md:h-11" : "h-10 md:h-[52px]"
              )}
            />
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {links.map((link) => {
              const isActive =
                link.key === "home" ? activeSection === null : activeSection === link.key;
              return (
                <NavLink
                  key={link.key}
                  href={link.href}
                  showUnderline
                  active={isActive}
                  className={cn(
                    "py-1 text-sm font-medium transition-colors",
                    isActive ? "text-azure" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(link.key)}
                </NavLink>
              );
            })}
            <LocaleSwitcher />
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            <LocaleSwitcher />
            <MobileMenu activeSection={activeSection} />
          </div>
        </div>
      </header>
    </>
  );
}
