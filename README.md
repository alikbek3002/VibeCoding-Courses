# AkylTech — лендинг

Лендинг офлайн-школы vibe coding в Бишкеке. Перенесён из прототипа Claude Design
на **Next.js 16 (App Router) + TypeScript + Tailwind v4**.

## Запуск

```bash
npm run dev      # дев-сервер на http://localhost:3000
npm run build    # production-сборка
npm start        # запуск собранной версии
npm run lint     # ESLint
```

## Структура

```
app/
  layout.tsx        SEO-метаданные, шрифты (Google Fonts), JSON-LD, провайдер языка
  page.tsx          сборка секций лендинга
  globals.css       Tailwind + фирменный CSS (токены, секции, анимации) — стиль правится здесь
components/
  lang-provider.tsx контекст языка RU/KG (useLang)
  header.tsx        шапка: логотип, навигация, переключатель языка, CTA
  hero.tsx          герой + живая анимация «промпт → готовый сайт»
  marquee.tsx       бегущая строка инструментов
  skills.tsx        бенто-сетка навыков
  plans.tsx         тарифы (Базовый / Углублённый)
  how.tsx           4 шага «как проходит»
  works.tsx         примеры работ (кофейня / Telegram-бот / CRM)
  cta.tsx           блок призыва (WhatsApp)
  footer.tsx        футер
  reveal-controller.tsx  reveal-анимации при скролле
lib/
  i18n.ts           все тексты RU/KG + WHATSAPP_URL — контент правится здесь
```

## Где что менять

- **Тексты и переводы:** `lib/i18n.ts` (объекты `I18N.ru` / `I18N.kg`).
  Кыргызский — черновой, правится там же.
- **Стиль / цвета / типографика:** `app/globals.css` (CSS-переменные в `:root`).
- **WhatsApp / контакты:** константа `WHATSAPP_URL` в `lib/i18n.ts`.
- **SEO (title, description, OG, JSON-LD):** `app/layout.tsx`.

## Деплой на Vercel

```bash
npm i -g vercel   # один раз
vercel            # превью-деплой
vercel --prod     # прод
```

Либо подключить репозиторий на vercel.com — фреймворк определится автоматически.
После привязки домена обновите `SITE_URL` в `app/layout.tsx`.

## TODO (из брифа)

- Причесать кыргызский перевод (`lib/i18n.ts`, объект `I18N.kg`).
- Заменить мокапы в «Работах» на реальные скриншоты проектов учеников.
- При желании — блок отзывов / преподавателей / карта адреса.
