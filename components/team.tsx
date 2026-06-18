"use client";

import Image from "next/image";
import { useLang } from "@/components/lang-provider";

const PHOTOS: Record<string, string> = {
  "Муканбетов Аликбек": "/team/alikbek-v2.jpg",
  "Жусупбеков Эрбол": "/team/erbol.jpg",
  "Бердибаев Чынгыз": "/team/chyngyz.jpg",
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

        <div className="team-grid rv">
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
