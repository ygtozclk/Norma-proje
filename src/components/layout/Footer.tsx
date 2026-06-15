import Image from "next/image";
import { useTranslations } from "next-intl";
import NavLink from "@/components/layout/NavLink";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/content/contact";

const links = [
  { href: "/", key: "home" },
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tSite = useTranslations("site");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Image
              src="/logo.png"
              alt="Norma Proje"
              width={409}
              height={151}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <nav className="flex flex-col gap-2 font-mono text-sm">
            {links.map((link) => (
              <NavLink
                key={link.key}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-azure"
              >
                {tNav(link.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href={`tel:${PHONE_TEL}`} className="transition-colors hover:text-azure">
              {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-azure">
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {tSite("name")}. {t("rights")}
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
