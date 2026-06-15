"use client";

import { forwardRef } from "react";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  active?: boolean;
  showUnderline?: boolean;
  onNavigate?: () => void;
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { href, className, children, active = false, showUnderline = false, onNavigate },
  ref
) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith("#") && href !== "/") return;

    e.preventDefault();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = getLenis();

    if (href === "/") {
      onNavigate?.();
      if (lenis) {
        lenis.scrollTo(0, { duration: reduced ? 0 : 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    const header = document.querySelector("header");
    const offset = header ? -header.getBoundingClientRect().height : 0;

    onNavigate?.();

    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset, duration: reduced ? 0 : 1.2 });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    }
  }

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      className={cn(showUnderline && "group relative", className)}
    >
      {children}
      {showUnderline && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-azure transition-transform duration-300 ease-out",
            active ? "scale-x-100" : "group-hover:scale-x-100"
          )}
        />
      )}
    </a>
  );
});

export default NavLink;
