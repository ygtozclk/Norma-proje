export type ProjectCategory = "residential" | "commercial" | "industrial" | "public";

export type Project = {
  id: string;
  title: { tr: string; en: string };
  category: ProjectCategory;
  city: string;
  year: number;
};

export const projects: Project[] = [
  {
    id: "cankaya-rezidans",
    title: { tr: "Çankaya Rezidans", en: "Çankaya Residence" },
    category: "residential",
    city: "Ankara",
    year: 2024,
  },
  {
    id: "sogutozu-ofis-kulesi",
    title: { tr: "Söğütözü Ofis Kulesi", en: "Söğütözü Office Tower" },
    category: "commercial",
    city: "Ankara",
    year: 2023,
  },
  {
    id: "osb-uretim-tesisi",
    title: { tr: "OSB Üretim Tesisi", en: "OIZ Production Facility" },
    category: "industrial",
    city: "Kayseri",
    year: 2023,
  },
  {
    id: "kentsel-donusum-bloku",
    title: { tr: "Kentsel Dönüşüm Bloğu", en: "Urban Renewal Block" },
    category: "residential",
    city: "Ankara",
    year: 2022,
  },
  {
    id: "avm-yenileme",
    title: { tr: "AVM Yenileme", en: "Shopping Mall Renovation" },
    category: "commercial",
    city: "İstanbul",
    year: 2024,
  },
  {
    id: "belediye-hizmet-binasi",
    title: { tr: "Belediye Hizmet Binası", en: "Municipal Service Building" },
    category: "public",
    city: "Ankara",
    year: 2022,
  },
];
