"use client";

import { useLang } from "@/components/lang-provider";
import { WHATSAPP_URL } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="ft">
      <div className="wrap ft-in">
        <div className="ft-brand">
          <span className="logo-tx">
            Akyl<span className="g">Tech</span>
          </span>
          <p className="ft-tag">{t.ft_tag}</p>
        </div>
        <nav className="ft-col" aria-label="Разделы">
          <span className="ft-h mono">{t.ft_nav}</span>
          <a href="#skills">{t.nav_skills}</a>
          <a href="#plans">{t.nav_plans}</a>
          <a href="#how">{t.nav_how}</a>
          <a href="#works">{t.nav_works}</a>
        </nav>
        <div className="ft-col">
          <span className="ft-h mono">{t.ft_contact}</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener">
            +996 770 172 008
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
