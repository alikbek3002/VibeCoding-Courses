"use client";

import { useLang } from "@/components/lang-provider";

export function Skills() {
  const { t } = useLang();

  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <header className="sec-head rv">
          <p className="kick mono">{t.sk_kick}</p>
          <h2 className="sec-h">{t.sk_h}</h2>
        </header>
        <div className="bento">
          <article className="tile tile-wide rv">
            <div className="tile-head">
              <span className="tile-tag mono">01</span>
              <h3>{t.sk1_t}</h3>
            </div>
            <p>{t.sk1_d}</p>
            <div className="tile-mock mock-site">
              <span className="ms-bar" />
              <span className="ms-h" />
              <span className="ms-h sh" />
              <span className="ms-btn" />
            </div>
          </article>

          <article className="tile rv">
            <div className="tile-head">
              <span className="tile-tag mono">02</span>
              <h3>{t.sk2_t}</h3>
            </div>
            <p>{t.sk2_d}</p>
            <div className="tile-mock mock-bot">
              <span className="mb-line" />
              <span className="mb-line you" />
              <span className="mb-line" />
            </div>
          </article>

          <article className="tile rv">
            <div className="tile-head">
              <span className="tile-tag mono">03</span>
              <h3>{t.sk3_t}</h3>
            </div>
            <p>{t.sk3_d}</p>
            <div className="tile-mock mock-db mono">
              <span>id</span>
              <span>name</span>
              <span>status</span>
              <span>01</span>
              <span>Айбек</span>
              <span className="ok">paid</span>
              <span>02</span>
              <span>Нурзат</span>
              <span className="wait">wait</span>
            </div>
          </article>

          <article className="tile rv">
            <div className="tile-head">
              <span className="tile-tag mono">04</span>
              <h3>{t.sk4_t}</h3>
            </div>
            <p>{t.sk4_d}</p>
            <div className="tile-mock mock-term mono">
              <span className="tg">› build crm</span>
              <span className="tw">clients · deals…</span>
              <span className="td">✓ dashboard ready</span>
            </div>
          </article>

          <article className="tile tile-wide rv">
            <div className="tile-head">
              <span className="tile-tag mono">05</span>
              <h3>{t.sk5_t}</h3>
            </div>
            <p>{t.sk5_d}</p>
            <div className="tile-mock mock-tools mono">
              <span>Claude Code</span>
              <span>Supabase</span>
              <span>MCP</span>
              <span>21st.dev</span>
              <span>Lovable</span>
              <span>Vercel</span>
            </div>
          </article>

          <article className="tile rv">
            <div className="tile-head">
              <span className="tile-tag mono">06</span>
              <h3>{t.sk6_t}</h3>
            </div>
            <p>{t.sk6_d}</p>
            <div className="tile-mock mock-demo">
              <span className="mock-demo-dot" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
