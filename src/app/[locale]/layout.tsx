import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import SmoothScroll from "@/components/layout/SmoothScroll";

const BASE_URL = "https://normaproje.com";

const fontDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
});

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTR = locale === "tr";

  return {
    title: {
      template: "%s | Norma Proje",
      default: isTR
        ? "Norma Proje | Geleceği İnşa Ediyoruz"
        : "Norma Proje | Building What's Next",
    },
    description: isTR
      ? "Ankara merkezli mimari tasarım, anahtar teslim inşaat ve proje yönetimi. Norma Proje ile geleceği bugünden inşa edin."
      : "Architectural design, turnkey construction and project management based in Ankara. Build the future today with Norma Proje.",
    keywords: [
      "inşaat",
      "construction",
      "mimari tasarım",
      "proje yönetimi",
      "Ankara",
      "anahtar teslim",
    ],
    openGraph: {
      type: "website",
      locale: isTR ? "tr_TR" : "en_US",
      siteName: "Norma Proje",
      url: `${BASE_URL}/${locale}`,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Norma Proje",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        tr: `${BASE_URL}/tr`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/tr`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`dark h-full ${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
