"use client";

import {
  type LucideIcon,
  Utensils,
  Bot,
  LayoutDashboard,
  ShoppingBag,
  Globe,
  Scissors,
  Gamepad2,
  Dumbbell,
  Calendar,
  Database,
} from "lucide-react";
import { useLang } from "@/components/lang-provider";
import {
  ProjectCarousel,
  type ProjectItem,
} from "@/components/ui/project-carousel";

/**
 * Метаданные 10 работ. ТЕКСТ (название/описание) правится в lib/i18n.ts → works[].
 * Здесь правятся ссылка, тег-технология, иконка и скриншот — по индексу 0..9.
 *
 *  • href — ссылка на живую работу. Пока стоит "#" (кнопка ни на что не ведёт).
 *           Замени на реальный URL, напр. "https://moy-proekt.vercel.app".
 *  • img  — скриншот. Положи файл в /public/works/ и укажи путь,
 *           напр. img: "/works/coffee.png". Без него рисуется брендовый плейсхолдер.
 *  • Icon — любая иконка из lucide-react.
 */
const META: { Icon: LucideIcon; tag: string; href: string; img?: string }[] = [
  { Icon: Utensils, tag: "Lovable", href: "#" }, // 0 — лендинг для кофейни
  { Icon: Bot, tag: "Python", href: "#" }, // 1 — бот для записи
  { Icon: LayoutDashboard, tag: "Supabase", href: "#" }, // 2 — мини-CRM
  { Icon: ShoppingBag, tag: "Next.js", href: "#" }, // 3 — интернет-магазин
  { Icon: Globe, tag: "Claude", href: "#" }, // 4 — портфолио
  { Icon: Scissors, tag: "Lovable", href: "#" }, // 5 — барбершоп
  { Icon: Gamepad2, tag: "Telegram", href: "#" }, // 6 — бот-викторина
  { Icon: Dumbbell, tag: "Vercel", href: "#" }, // 7 — фитнес-студия
  { Icon: Calendar, tag: "21st.dev", href: "#" }, // 8 — сайт-афиша
  { Icon: Database, tag: "Supabase", href: "#" }, // 9 — дашборд аналитики
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
