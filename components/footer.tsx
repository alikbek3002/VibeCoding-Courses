"use client";

import { useLang } from "@/components/lang-provider";
import { WHATSAPP_URL } from "@/lib/i18n";
import { LANDINGS } from "@/lib/landings";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="ft">
      <div className="wrap ft-in">
        <div className="ft-brand">
          <a href="#top" className="ft-logo" aria-label="AkylTech">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/akyltech-logo.svg"
              alt="AkylTech"
              className="ft-logo-img"
            />
          </a>
          <p className="ft-tag">{t.ft_tag}</p>
        </div>
        <nav className="ft-col" aria-label="Разделы">
          <span className="ft-h mono">{t.ft_nav}</span>
          <a href="/#skills">{t.nav_skills}</a>
          <a href="/#plans">{t.nav_plans}</a>
          <a href="/#how">{t.nav_how}</a>
          <a href="/#works">{t.nav_works}</a>
        </nav>
        <nav className="ft-col" aria-label="Направления">
          <span className="ft-h mono">Направления</span>
          {LANDINGS.map((l) => (
            <a href={`/${l.slug}`} key={l.slug}>
              {l.navLabel}
            </a>
          ))}
        </nav>
        <div className="ft-col">
          <span className="ft-h mono">{t.ft_contact}</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener">
            +996 227 221 145
          </a>
          <a href="https://www.instagram.com/akyltech_kg/" target="_blank" rel="noopener">
            Instagram
          </a>
          <span className="ft-city">{t.ft_city}</span>
        </div>
      </div>
      <div className="wrap ft-bot mono">
        <span>© 2026 AkylTech</span>
        <span>{t.ft_made}</span>
      </div>
    </footer>
  );
}
