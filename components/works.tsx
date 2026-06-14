"use client";

import {
  type LucideIcon,
  Plane,
  Briefcase,
  Speaker,
  Bot,
  NotebookPen,
  Clapperboard,
  GraduationCap,
  ShoppingBag,
  Rocket,
  Heart,
} from "lucide-react";
import { useLang } from "@/components/lang-provider";
import {
  ProjectCarousel,
  type ProjectItem,
} from "@/components/ui/project-carousel";

/**
 * Метаданные 10 наших работ. ТЕКСТ (название/описание) правится в lib/i18n.ts → works[].
 * Здесь правятся ссылка, тег-категория, иконка и скриншот — по индексу 0..9.
 *
 *  • href — ссылка на живой проект (открывается в новой вкладке).
 *  • img  — скриншот карточки в /public/works/ (1200×784, формат карточки 1.53:1).
 *  • tag  — короткая категория. Можно заменить на инструмент (Lovable, Claude…), если нужно.
 *  • Icon — любая иконка из lucide-react.
 *  Порядок здесь и в lib/i18n.ts → works[] должен совпадать.
 */
const META: { Icon: LucideIcon; tag: string; href: string; img?: string }[] = [
  { Icon: Plane,         tag: "Travel",   href: "https://meyman.app/",           img: "/works/meyman.jpg" },     // 0 — Meyman, travel-платформа
  { Icon: Briefcase,     tag: "HR",       href: "https://opus-work.org/",        img: "/works/opus.jpg" },       // 1 — OPUS, поиск сотрудников
  { Icon: Speaker,       tag: "Прокат",   href: "https://zvuk.kg/",              img: "/works/zvuk.jpg" },       // 2 — ZVUK.KG, аренда звука и света
  { Icon: Bot,           tag: "Telegram", href: "https://t.me/MReviewerBot",     img: "/works/mreviewer.jpg" },  // 3 — MReviewer, бот для WB/Ozon
  { Icon: NotebookPen,   tag: "EdTech",   href: "https://ruts-edu.online/login", img: "/works/ruts.jpg" },       // 4 — РОБ, электронный журнал
  { Icon: Clapperboard,  tag: "Прокат",   href: "https://50kvartal.rent/",       img: "/works/50kvartal.jpg" },  // 5 — 50 Квартал, аренда оборудования
  { Icon: GraduationCap, tag: "EdTech",   href: "https://akylzone.com/",         img: "/works/akylzone.jpg" },   // 6 — AkylZone, учебный центр
  { Icon: ShoppingBag,   tag: "Магазин",  href: "https://neuronshop.store/",     img: "/works/neuronshop.jpg" }, // 7 — NeuronShop, интернет-магазин
  { Icon: Rocket,        tag: "Бизнес",   href: "https://apkgz.org/",            img: "/works/apkgz.jpg" },      // 8 — Accelerate Prosperity KG
  { Icon: Heart,         tag: "Telegram", href: "https://t.me/dom_matery_bot",   img: "/works/dom_matery.jpg" }, // 9 — Эне үйү, бот поддержки
];

export function Works() {
  const { t } = useLang();

  const items: ProjectItem[] = t.works.map((w, i) => {
    const m = META[i];
    const Icon = m.Icon;
    return {
      id: String(i + 1),
      title: w.t,
      description: w.d,
      tag: m.tag,
      href: m.href,
      img: m.img,
      icon: <Icon className="h-5 w-5" strokeWidth={1.8} />,
    };
  });

  return (
    <section className="sec sec-soft" id="works">
      <div className="wrap">
        <header className="sec-head rv">
          <p className="kick mono">{t.wk_kick}</p>
          <h2 className="sec-h">{t.wk_h}</h2>
        </header>
        <div className="rv">
          <ProjectCarousel items={items} openLabel={t.wk_open} />
        </div>
        <p className="works-note mono rv">{t.wk_note}</p>
      </div>
    </section>
  );
}
