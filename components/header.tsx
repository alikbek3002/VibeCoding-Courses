"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/components/lang-provider";
import { WHATSAPP_URL } from "@/lib/i18n";

export function Header() {
  const { t } = useLang();
  const hdrRef = useRef<HTMLElement>(null);

  // Граница/тень шапки появляется при скролле
  useEffect(() => {
    const el = hdrRef.current;
    if (!el) return;
    const onScroll = () => el.classList.toggle("on", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="hdr" ref={hdrRef}>
      <div className="wrap hdr-in">
        <a href="/" className="logo logo-brand" aria-label="AkylTech">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/akyltech-logo.svg"
            alt="AkylTech"
            className="logo-img"
          />
        </a>
        <nav className="nav" aria-label="Навигация">
          <a href="/#skills">{t.nav_skills}</a>
          <a href="/#team">{t.nav_team}</a>
          <a href="/#works">{t.nav_works}</a>
          <a href="/#plans">{t.nav_plans}</a>
          <a href="/#how">{t.nav_how}</a>
        </nav>
        <div className="hdr-act">
          <a
            className="btn btn-dark btn-s"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
          >
            {t.nav_cta}
          </a>
        </div>
      </div>
    </header>
  );
}
