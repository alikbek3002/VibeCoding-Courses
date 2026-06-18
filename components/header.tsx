"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLang } from "@/components/lang-provider";
import { WHATSAPP_URL } from "@/lib/i18n";

export function Header() {
  const { t, lang, setLang } = useLang();
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
        <a href="#top" className="logo logo-brand" aria-label="AkylTech">
          <span className="logo-stage" aria-hidden="true">
            <Image
              src="/brand/akyltech-logo-full-cut.png"
              alt=""
              fill
              sizes="150px"
              className="logo-img logo-img-full"
              loading="eager"
            />
          </span>
        </a>
        <nav className="nav" aria-label="Навигация">
          <a href="#skills">{t.nav_skills}</a>
          <a href="#team">{t.nav_team}</a>
          <a href="#works">{t.nav_works}</a>
          <a href="#plans">{t.nav_plans}</a>
          <a href="#how">{t.nav_how}</a>
        </nav>
        <div className="hdr-act">
          <div className="lang" role="group" aria-label="Язык">
            <button
              className={"lang-b" + (lang === "ru" ? " is-on" : "")}
              onClick={() => setLang("ru")}
              type="button"
            >
              RU
            </button>
            <button
              className={"lang-b" + (lang === "kg" ? " is-on" : "")}
              onClick={() => setLang("kg")}
              type="button"
            >
              KG
            </button>
          </div>
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
