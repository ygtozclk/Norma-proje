"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {routing.locales.map((cur) => (
        <Link
          key={cur}
          href={pathname}
          locale={cur}
          className={
            cur === locale
              ? "font-bold text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }
        >
          {cur.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
