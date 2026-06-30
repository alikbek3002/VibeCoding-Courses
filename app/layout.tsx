import type { Metadata, Viewport } from "next";
import "./globals.css";
import { hanken, montserrat, jetbrains, playfair, bricolage } from "./fonts";
import { LangProvider } from "@/components/lang-provider";

const fontVars = [
  hanken.variable,
  montserrat.variable,
  jetbrains.variable,
  playfair.variable,
  bricolage.variable,
].join(" ");

const SITE_URL = "https://akyltech.dev";
const TITLE =
  "AkylTech — курсы вайб-кодинга и ИИ в Бишкеке: сайты и Telegram-боты без кода";
const DESCRIPTION =
  "Оффлайн-курсы вайб-кодинга и ИИ в Бишкеке от AkylTech. Научись создавать сайты, лендинги и Telegram-боты с помощью искусственного интеллекта — без программирования. Для всех от 13 до 40 лет. Запись через WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — AkylTech",
  },
  description: DESCRIPTION,
  applicationName: "AkylTech",
  keywords: [
    "AkylTech",
    "vibe coding Бишкек",
    "вайб кодинг",
    "создание сайтов без кода",
    "сайт с помощью ИИ",
    "обучение ИИ Бишкек",
    "курсы программирования Кыргызстан",
    "курсы программирования Бишкек",
    "разработка Telegram бот",
    "Telegram бот на Python",
    "курсы вайб-кодинга Бишкек",
    "no-code Бишкек",
    "ИИ курсы Кыргызстан",
    "Lovable",
    "Claude Code",
    "Supabase",
    "Cursor",
  ],
  authors: [{ name: "AkylTech", url: SITE_URL }],
  creator: "AkylTech",
  publisher: "AkylTech",
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: "ky_KG",
    siteName: "AkylTech",
    title: "AkylTech — курсы вайб-кодинга и ИИ в Бишкеке",
    description:
      "Создавай сайты и Telegram-боты с помощью ИИ, без кода. Оффлайн в Бишкеке, с нуля до проекта в портфолио.",
    url: SITE_URL + "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AkylTech — курсы вайб-кодинга и ИИ в Бишкеке",
    description: "Сайты и Telegram-боты с помощью ИИ. Без кода. Оффлайн, Бишкек.",
  },
  appleWebApp: {
    capable: true,
    title: "AkylTech",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0e1311",
  colorScheme: "light",
};

// Structured data (@graph): организация + сайт + два курса + FAQ
const ORG_ID = SITE_URL + "/#organization";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": ORG_ID,
      name: "AkylTech",
      alternateName: "АкылТех",
      description:
        "Оффлайн-курсы вайб-кодинга и ИИ в Бишкеке: создание сайтов, Telegram-ботов и CRM с помощью ИИ без программирования.",
      url: SITE_URL + "/",
      logo: SITE_URL + "/brand/icon-512.png",
      image: SITE_URL + "/opengraph-image.png",
      areaServed: { "@type": "City", name: "Бишкек" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Бишкек",
        addressCountry: "KG",
      },
      telephone: "+996227221145",
      email: "reviewpulse.official@gmail.com",
      sameAs: [
        "https://wa.me/996227221145",
        "https://www.instagram.com/akyltech_kg/",
      ],
      foundingDate: "2025",
    },
    {
      "@type": "WebSite",
      "@id": SITE_URL + "/#website",
      url: SITE_URL + "/",
      name: "AkylTech",
      inLanguage: ["ru", "ky"],
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "Course",
      name: "Стандарт вайбкодер — 1 месяц",
      description:
        "Первый месяц практики: сайты, лендинги и портфолио через Lovable и Claude, интерактив и деплой на Vercel. Оффлайн в Бишкеке, 3 раза в неделю по 2 часа.",
      url: SITE_URL + "/#plans",
      provider: { "@id": ORG_ID },
      inLanguage: "ru",
      offers: {
        "@type": "Offer",
        price: "30000",
        priceCurrency: "KGS",
        category: "Paid",
        availability: "https://schema.org/InStock",
        url: SITE_URL + "/#plans",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        courseWorkload: "P1M",
        location: { "@type": "Place", name: "Бишкек, Кыргызстан" },
      },
    },
    {
      "@type": "Course",
      name: "Про вайбкодер — полный курс (2 месяца)",
      description:
        "Полный путь: сайты и лендинги, веб-приложения, Telegram-боты на Python, базы данных и собственная CRM. Claude Code, Supabase, MCP, 21st.dev, деплой на Vercel и Railway. Оффлайн в Бишкеке, 3 раза в неделю.",
      url: SITE_URL + "/#plans",
      provider: { "@id": ORG_ID },
      inLanguage: "ru",
      offers: {
        "@type": "Offer",
        price: "500",
        priceCurrency: "USD",
        category: "Paid",
        availability: "https://schema.org/InStock",
        url: SITE_URL + "/#plans",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        courseWorkload: "P2M",
        location: { "@type": "Place", name: "Бишкек, Кыргызстан" },
      },
    },
    {
      "@type": "FAQPage",
      "@id": SITE_URL + "/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Нужен ли опыт в программировании?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Нет. Курс с нуля: ты описываешь задачу словами, а код пишет искусственный интеллект.",
          },
        },
        {
          "@type": "Question",
          name: "Где и как проходят занятия?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Оффлайн в Бишкеке, 3 раза в неделю по 2 часа. Нужен только ноутбук.",
          },
        },
        {
          "@type": "Question",
          name: "Сколько стоит обучение?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Тариф «Стандарт» (1 месяц) — $300, тариф «Про» (весь курс, 2 месяца) — $500.",
          },
        },
        {
          "@type": "Question",
          name: "Для какого возраста подходит курс?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Для всех от 13 до 40 лет.",
          },
        },
        {
          "@type": "Question",
          name: "Что я смогу делать после курса?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Создавать сайты, лендинги, Telegram-боты и собственную CRM с помощью ИИ, а также выкладывать проекты в интернет.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={fontVars}>
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
