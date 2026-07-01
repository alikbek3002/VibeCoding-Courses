"use client";

import { useLang } from "@/components/lang-provider";
import { SplitPricing } from "@/components/ui/split-pricing";

export function Plans() {
  const { t } = useLang();

  return (
    <section className="sec" id="plans">
      <div className="wrap">
        <header className="sec-head plans-head rv">
          <p className="kick mono">{t.pl_kick}</p>
          <h2 className="sec-h">{t.pl_h}</h2>
          {t.pl_sub ? <p className="sec-sub">{t.pl_sub}</p> : null}
        </header>
        <SplitPricing />
      </div>
    </section>
  );
}
