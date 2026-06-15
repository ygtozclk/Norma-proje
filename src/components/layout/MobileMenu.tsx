"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import NavLink from "@/components/layout/NavLink";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", key: "home" },
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

type MobileMenuProps = {
  activeSection: string | null;
};

export default function MobileMenu({ activeSection }: MobileMenuProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const panelId = "mobile-menu";
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const previousOverflowRef = useRef("");

  useEffect(() => {
    if (!open) return;

    getLenis()?.stop();
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function close() {
    document.body.style.overflow = previousOverflowRef.current;
    getLenis()?.start();
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((v) => !v)}
        className="flex size-10 items-center justify-center text-foreground"
      >
        {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={t("openMenu")}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: "100%" }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
            }
            className="fixed inset-0 z-50 flex flex-col bg-graphite"
          >
            <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden="true" />

            <div className="relative flex items-center justify-end px-6 py-4">
              <button
                type="button"
                aria-label={t("closeMenu")}
                onClick={close}
                className="flex size-10 items-center justify-center text-foreground"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col items-start justify-center gap-3 px-8">
              {links.map((link, i) => {
                const isActive = link.key === "home" ? activeSection === null : activeSection === link.key;
                return (
                  <NavLink
                    key={link.key}
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    active={isActive}
                    onNavigate={close}
                    className={cn(
                      "font-display text-4xl font-bold transition-colors",
                      isActive ? "text-azure" : "text-foreground hover:text-azure"
                    )}
                  >
                    {t(link.key)}
                  </NavLink>
                );
              })}
            </nav>

            <div className="relative flex justify-center px-8 py-10">
              <LocaleSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
