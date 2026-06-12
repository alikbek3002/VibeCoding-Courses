"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { I18N, type Dict, type Lang } from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");

  // Держим <html lang> в синхроне (ru -> "ru", kg -> "ky")
  useEffect(() => {
    document.documentElement.lang = lang === "kg" ? "ky" : "ru";
  }, [lang]);

  const value: LangContextValue = {
    lang,
    t: I18N[lang],
    setLang,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
}
