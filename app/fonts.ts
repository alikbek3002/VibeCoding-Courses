import {
  Hanken_Grotesk,
  JetBrains_Mono,
  Montserrat,
  Playfair_Display,
  Bricolage_Grotesque,
} from "next/font/google";

/**
 * Самохостинг шрифтов через next/font: файлы скачиваются на этапе сборки и
 * раздаются с нашего домена — ноль render-blocking запросов к Google и нулевой
 * CLS (next/font подставляет fallback с size-adjust). Подключается как CSS-vars
 * к <html>, дальше маппится в @theme inline (globals.css).
 *
 * Кириллица нужна там, где есть русский текст: заголовки (Montserrat) и
 * mono-кикеры (JetBrains Mono). У Hanken Grotesk базовой кириллицы нет —
 * русский body и сейчас рендерится фолбэком, так что ["latin"] ничего не меняет.
 * Bricolage — только латиница/цифры в мок-интерфейсах.
 */

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-montserrat",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-jetbrains",
  preload: false,
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
  variable: "--font-playfair",
  preload: false,
});

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  preload: false,
});
