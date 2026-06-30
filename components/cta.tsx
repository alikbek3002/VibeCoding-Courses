"use client";

import { useLang } from "@/components/lang-provider";
import { WHATSAPP_URL } from "@/lib/i18n";

export function Cta() {
  const { t } = useLang();

  return (
    <section className="cta">
      <div className="wrap cta-in rv">
        <p className="kick mono">{t.cta_kick}</p>
        <h2 className="cta-h">{t.cta_h}</h2>
        <p className="cta-p">{t.cta_p}</p>
        <a
          className="btn btn-acc btn-lg"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
        >
          <span className="wa" aria-hidden="true" />
          <span>{t.cta_b}</span>
        </a>
        <p className="cta-ph mono">+996 227 221 145</p>
      </div>
    </section>
  );
}
