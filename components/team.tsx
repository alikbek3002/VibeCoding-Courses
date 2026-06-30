"use client";

import Image from "next/image";
import { useLang } from "@/components/lang-provider";

const PHOTOS: Record<string, string> = {
  "Муканбетов Аликбек": "/team/alikbek-v2.jpg",
  "Жусупбеков Эрбол": "/team/erbol.jpg",
  "Бердибаев Чынгыз": "/team/chyngyz-v2.jpg",
  "Миртемиров Эмирхан": "/team/emirkhan.jpg",
};

export function Team() {
  const { t } = useLang();

  return (
    <section className="sec" id="team">
      <div className="wrap">
        <header className="sec-head team-head rv">
          <p className="kick mono">{t.team_kick}</p>
          <h2 className="sec-h">{t.team_h}</h2>
        </header>

        {/* Бесконечная авто-карусель: карточки продублированы, трек едет по кругу
            (translateX -50%), на наведение встаёт на паузу. */}
        <div className="team-marquee rv">
          <div className="team-track">
            {[...t.team, ...t.team].map((m, i) => {
              const photo = PHOTOS[m.name];
              const dup = i >= t.team.length;
              return (
                <article
                  className="team-card"
                  key={i}
                  aria-hidden={dup || undefined}
                >
                  <div className="team-ava">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={dup ? "" : m.name}
                        fill
                        sizes="250px"
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
      </div>
    </section>
  );
}
