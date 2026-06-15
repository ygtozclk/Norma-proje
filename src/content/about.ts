export type Stat = {
  value: number;
  format: (n: number, locale: string) => string;
  unit?: string;
  label: { tr: string; en: string };
};

export const stats: Stat[] = [
  {
    value: 120,
    format: (n) => `${n}+`,
    label: { tr: "Tamamlanan proje", en: "Completed projects" },
  },
  {
    value: 15,
    format: (n) => `${n}`,
    label: { tr: "Yıl tecrübe", en: "Years of experience" },
  },
  {
    value: 250000,
    format: (n, locale) => new Intl.NumberFormat(locale).format(n),
    unit: "m²",
    label: { tr: "İnşa edilen alan", en: "Built area" },
  },
  {
    value: 98,
    format: (n, locale) => (locale === "tr" ? `%${n}` : `${n}%`),
    label: { tr: "Müşteri memnuniyeti", en: "Client satisfaction" },
  },
];
