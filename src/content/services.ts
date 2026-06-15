import {
  Ruler,
  LayoutGrid,
  Building2,
  Kanban,
  Hammer,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: { tr: string; en: string };
  desc: { tr: string; en: string };
};

export const services: Service[] = [
  {
    icon: Ruler,
    title: { tr: "Mimari Tasarım", en: "Architectural Design" },
    desc: {
      tr: "Konsept'ten uygulama projesine işlevsel ve estetik çözümler.",
      en: "Functional and aesthetic solutions from concept to applied design.",
    },
  },
  {
    icon: LayoutGrid,
    title: { tr: "Statik & Betonarme", en: "Structural & Reinforced Concrete" },
    desc: {
      tr: "Güvenli, optimize taşıyıcı sistem tasarımı.",
      en: "Safe, optimized structural system design.",
    },
  },
  {
    icon: Building2,
    title: { tr: "Anahtar Teslim İnşaat", en: "Turnkey Construction" },
    desc: {
      tr: "Kazıdan teslime tek elden yapım süreci.",
      en: "End-to-end construction, from excavation to handover.",
    },
  },
  {
    icon: Kanban,
    title: { tr: "Proje Yönetimi", en: "Project Management" },
    desc: {
      tr: "Bütçe, zaman ve kaliteyi hizada tutan yönetim.",
      en: "Management that keeps budget, schedule and quality aligned.",
    },
  },
  {
    icon: Hammer,
    title: { tr: "Tadilat & Renovasyon", en: "Renovation & Retrofit" },
    desc: {
      tr: "Mevcut yapıların modernizasyonu.",
      en: "Modernization of existing buildings.",
    },
  },
  {
    icon: Lightbulb,
    title: { tr: "Danışmanlık", en: "Consulting" },
    desc: {
      tr: "Fizibilite, ruhsat ve teknik süreç danışmanlığı.",
      en: "Feasibility, permitting and technical process consulting.",
    },
  },
];
