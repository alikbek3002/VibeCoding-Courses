"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/components/lang-provider";

const PHOTOS: Record<string, string> = {
  "Муканбетов Аликбек": "/team/alikbek-balanced-v2.jpg",
  "Жусупбеков Эрбол": "/team/erbol-balanced-v2.jpg",
  "Бердибаев Чынгыз": "/team/chyngyz-balanced-v2.jpg",
  "Миртемиров Эмирхан": "/team/emirkhan-balanced-v2.jpg",
};

function TeamCard({
  name,
  role,
  hidden,
  className,
  sizes,
}: {
  name: string;
  role: string;
  hidden?: boolean;
  className?: string;
  sizes: string;
}) {
  const photo = PHOTOS[name];
  return (
    <article
      className={`team-card${className ? ` ${className}` : ""}`}
      aria-hidden={hidden || undefined}
    >
      <div className="team-ava">
        {photo ? (
          <Image
            src={photo}
            alt={hidden ? "" : name}
            fill
            sizes={sizes}
            loading="eager"
            className="team-photo"
          />
        ) : (
          <span aria-hidden="true">{name.charAt(0)}</span>
        )}
      </div>
      <h3 className="team-name">{name}</h3>
      <p className="team-role mono">{role}</p>
    </article>
  );
}

export function Team() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const n = t.team.length;
  const go = (dir: number) => setActive((i) => (i + dir + n) % n);

  return (
    <section className="sec" id="team">
      <div className="wrap">
        <header className="sec-head team-head rv">
          <p className="kick mono">{t.team_kick}</p>
          <h2 className="sec-h">{t.team_h}</h2>
        </header>

        {/* Десктоп: статичная сетка участников (без прокрутки) */}
        <div className="team-grid rv">
          {t.team.map((m, i) => (
            <TeamCard
              key={i}
              name={m.name}
              role={m.role}
              sizes="(max-width:980px) 45vw, 230px"
            />
          ))}
        </div>

        {/* Мобилка: по одному участнику, переключение кнопками */}
        <div className="team-stepper rv">
          <div className="team-stage">
            {t.team.map((m, i) => (
              <TeamCard
                key={i}
                name={m.name}
                role={m.role}
                hidden={i !== active}
                className={i === active ? "is-on" : ""}
                sizes="(max-width:480px) 88vw, 360px"
              />
            ))}
          </div>

          <div className="team-controls">
            <button
              type="button"
              className="team-arrow"
              aria-label="Предыдущий участник"
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <div className="team-dots" role="tablist" aria-label="Участники команды">
              {t.team.map((m, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  className={`team-dot${i === active ? " on" : ""}`}
                  aria-label={m.name}
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="team-arrow"
              aria-label="Следующий участник"
              onClick={() => go(1)}
            >
              ›
            </button>
          </div>

          <p className="team-count mono" aria-hidden="true">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
