"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/components/lang-provider";

// Фото команды. Ключ — имя из lib/i18n.ts (одинаковое в ru/ky).
// Положи файл в /public/team/ и раскомментируй строку — появится фото
// вместо буквы-инициала. Пока пусто → у всех показывается инициал.
const PHOTOS: Record<string, string> = {
  // "Муканбетов Аликбек": "/team/alikbek.jpg",
};

// Секция «Команда» — слайдер с горизонтальной прокруткой. Карточки берутся
// из lib/i18n.ts → team[] (имя/роль). Фото — из PHOTOS выше (по имени).
export function Team() {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);

  // Стрелки нужны только когда карточек больше, чем влезает без прокрутки.
  const showNav = t.team.length > 3;

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="sec" id="team">
      <div className="wrap">
        <header className="sec-head team-head rv">
          <div>
            <p className="kick mono">{t.team_kick}</p>
            <h2 className="sec-h">{t.team_h}</h2>
          </div>
          {showNav && (
            <div className="team-nav">
              <button
                type="button"
                className="team-arrow"
                onClick={() => scroll(-1)}
                aria-label="Назад"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="team-arrow"
                onClick={() => scroll(1)}
                aria-label="Вперёд"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </header>

        <div className="team-track rv" ref={trackRef}>
          {t.team.map((m, i) => {
            const photo = PHOTOS[m.name];
            return (
              <article className="team-card" key={i}>
                <div className="team-ava">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={m.name}
                      fill
                      sizes="(max-width: 600px) 78vw, 250px"
                      className="team-photo"
                    />
                  ) : (
                    <span aria-hidden="true">{m.name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-role mono">{m.role}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
