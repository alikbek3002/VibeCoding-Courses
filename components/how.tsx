"use client";

import { useLang } from "@/components/lang-provider";

export function How() {
  const { t } = useLang();

  const steps = [
    { n: "01", title: t.how1_t, desc: t.how1_d },
    { n: "02", title: t.how2_t, desc: t.how2_d },
    { n: "03", title: t.how3_t, desc: t.how3_d },
    { n: "04", title: t.how4_t, desc: t.how4_d },
  ];

  return (
    <section className="sec" id="how">
      <div className="wrap how-wrap">
        <header className="sec-head rv">
          <p className="kick mono">{t.how_kick}</p>
          <h2 className="sec-h">{t.how_h}</h2>
        </header>
        <ol className="steps">
          {steps.map((s) => (
            <li className="step rv" key={s.n}>
              <span className="step-n mono">{s.n}</span>
              <div className="step-b">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
