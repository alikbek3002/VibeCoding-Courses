import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AkylTech — курсы вайб-кодинга и ИИ в Бишкеке",
    short_name: "AkylTech",
    description:
      "Создавай сайты и Telegram-боты с помощью ИИ — без кода. Оффлайн в Бишкеке.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1311",
    theme_color: "#0e1311",
    lang: "ru",
    categories: ["education"],
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
