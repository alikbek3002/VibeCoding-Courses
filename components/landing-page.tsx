import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WHATSAPP_URL } from "@/lib/i18n";
import { LANDINGS, getLanding, landingJsonLd } from "@/lib/landings";

/**
 * Общий шаблон SEO-страницы. Контент берётся из lib/landings.ts по slug.
 * Server component → весь текст рендерится в HTML (индексируется).
 */
export function LandingPage({ slug }: { slug: string }) {
  const l = getLanding(slug);
  if (!l) return null;
  const others = LANDINGS.filter((x) => x.slug !== slug);

  return (
    <>
      <Header />
      <main>
        <section className="sec lp-hero">
          <div className="wrap">
            <nav className="crumbs mono" aria-label="Хлебные крошки">
              <Link href="/">Главная</Link>
              <span aria-hidden="true">/</span>
              <span>{l.crumb}</span>
            </nav>
            <p className="kick mono">{l.kicker}</p>
            <h1 className="sec-h lp-h1">{l.h1}</h1>
            <p className="sec-sub lp-intro">{l.intro}</p>
            <div className="lp-cta">
              <a
                className="btn btn-acc"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener"
              >
                Записаться
              </a>
              <Link className="btn btn-line" href="/#plans">
                Тарифы и цены
              </Link>
            </div>
          </div>
        </section>

        <section className="sec sec-soft">
          <div className="wrap">
            <h2 className="lp-h2">{l.blocksTitle}</h2>
            <div className="lp-grid">
              {l.blocks.map((b, i) => (
                <article className="lp-card" key={i}>
                  <h3>{b.t}</h3>
                  <p>{b.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap lp-narrow">
            <h2 className="lp-h2">Частые вопросы</h2>
            <div className="lp-faq">
              {l.faq.map((f, i) => (
                <details key={i}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="sec sec-soft">
          <div className="wrap">
            <h2 className="lp-h2">Смотрите также</h2>
            <div className="lp-also">
              {others.map((o) => (
                <Link className="lp-also-link" href={`/${o.slug}`} key={o.slug}>
                  <span className="mono" aria-hidden="true">
                    →
                  </span>
                  {o.navLabel}
                </Link>
              ))}
              <Link className="lp-also-link" href="/">
                <span className="mono" aria-hidden="true">
                  →
                </span>
                Главная страница
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(l)) }}
      />
    </>
  );
}
