import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/components/lang-provider";

const SITE_URL = "https://akyltech.kg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "AkylTech — школа vibe coding в Бишкеке: сайты и Telegram-боты с ИИ без кода",
  description:
    "Оффлайн-школа AkylTech в Бишкеке. Научись создавать сайты, лендинги и Telegram-боты с помощью искусственного интеллекта — без программирования. Курсы для всех от 13 до 40 лет. Запись через WhatsApp.",
  keywords: [
    "vibe coding Бишкек",
    "создание сайтов без кода",
    "обучение ИИ Бишкек",
    "курсы программирования Кыргызстан",
    "разработка Telegram бот",
    "школа AkylTech",
    "no-code Бишкек",
    "сайт с помощью ИИ",
    "Lovable",
    "Claude",
    "Supabase",
  ],
  authors: [{ name: "AkylTech" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "AkylTech",
    title: "AkylTech — школа vibe coding в Бишкеке",
    description:
      "Создавай сайты и Telegram-боты с помощью ИИ, без кода. Оффлайн в Бишкеке, с нуля до проекта в портфолио.",
    url: SITE_URL + "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AkylTech — школа vibe coding в Бишкеке",
    description: "Сайты и Telegram-боты с помощью ИИ. Без кода. Оффлайн, Бишкек.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1311",
};

// Structured data — EducationalOrganization + два курса
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "AkylTech",
  description:
    "Оффлайн-школа vibe coding в Бишкеке: создание сайтов и Telegram-ботов с помощью ИИ без программирования.",
  url: SITE_URL + "/",
  areaServed: "Бишкек, Кыргызстан",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Бишкек",
    addressCountry: "KG",
  },
  telephone: "+996770172008",
  sameAs: ["https://wa.me/996770172008"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Курсы vibe coding",
    itemListElement: [
      {
        "@type": "Course",
        name: "Полный курс vibe coding",
        description:
          "Два месяца практики: сайты и лендинги через Lovable и Claude, веб-приложения, Telegram-боты на Python, CRM. Claude Code, Supabase, MCP, 21st.dev. Деплой на Vercel.",
        provider: { "@type": "Organization", name: "AkylTech" },
        offers: { "@type": "Offer", price: "60000", priceCurrency: "KGS" },
      },
      {
        "@type": "Course",
        name: "Первый месяц (база)",
        description:
          "Основы вайб-кодинга за месяц: сайты, лендинги и портфолио через Lovable и Claude. Дизайн через промпты, деплой на Vercel.",
        provider: { "@type": "Organization", name: "AkylTech" },
        offers: { "@type": "Offer", price: "30000", priceCurrency: "KGS" },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Грузим шрифты через <link>, а не next/font, чтобы 1:1 повторить
            типографику прототипа и фолбэк кириллицы. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Montserrat:wght@500;600;700&family=Playfair+Display:ital,wght@1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
