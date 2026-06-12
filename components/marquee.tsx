"use client";

import { useLang } from "@/components/lang-provider";

export function Marquee() {
  const { t } = useLang();
  // дублируем список для бесшовного цикла (анимация уезжает на -50%)
  const items = [...t.marquee, ...t.marquee];

  return (
    <section className="marq" aria-hidden="true">
      <div className="marq-track">
        {items.map((text, i) => (
          <span className="marq-item" key={i}>
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
