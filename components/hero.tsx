"use client";

import { useLang } from "@/components/lang-provider";
import { WHATSAPP_URL } from "@/lib/i18n";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-l">
          <p className="kick rv">{t.hero_kick}</p>
          <h1
            className="hero-h rv"
            dangerouslySetInnerHTML={{ __html: t.hero_h }}
          />
          <p className="hero-p rv">{t.hero_p}</p>
          <div className="hero-cta rv">
            <a
              className="btn btn-acc"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
            >
              <span>{t.hero_b1}</span>
            </a>
            <a className="btn btn-line" href="#skills">
              <span>{t.hero_b2}</span>
            </a>
          </div>
          <div className="hero-facts rv">
            {t.hero_facts.map((f, i) => (
              <div className="hero-fact" key={i}>
                <span className="hero-fact-v">{f.v}</span>
                <span className="hero-fact-l">{f.l}</span>
              </div>
            ))}
          </div>
          <p className="hero-meta mono rv">{t.hero_meta}</p>
        </div>
      </div>
    </section>
  );
}
