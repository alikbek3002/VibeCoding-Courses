"use client";

import { useLang } from "@/components/lang-provider";
import { WHATSAPP_URL } from "@/lib/i18n";
import { SplineScene } from "@/components/ui/splite";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="hero">
      <div className="wrap hero-grid">
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
            <a
              className="btn btn-line"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
            >
              <span>{t.hero_b2}</span>
            </a>
          </div>
          <p className="hero-meta mono rv">{t.hero_meta}</p>
        </div>

        {/* interactive 3D scene — frameless, robot stands free on the section */}
        <div className="hero-3d rv" aria-hidden="true">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="hero-3d-scene"
          />
        </div>
      </div>
    </section>
  );
}
