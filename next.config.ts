import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Пустой turbopack-конфиг обязателен: в Next 16 `next build` (и Vercel) идут
  // через Turbopack по умолчанию, и наличие webpack() ниже БЕЗ этого блока
  // валит сборку с "webpack config and no turbopack config". Так Next понимает,
  // что webpack() — осознанный выбор для `next dev --webpack`, а не забытая
  // миграция. Turbopack сам по себе webpack() игнорирует.
  turbopack: {},
  // Dev-вотчер (режим --webpack) не должен реагировать на запись в служебные
  // папки инструментов. Playwright MCP пишет логи в /.playwright-mcp, и без
  // этого исключения вотчер уходит в бесконечный цикл пересборки:
  // rebuild → Fast Refresh пишет в консоль → лог меняется → снова rebuild.
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/.next/**",
        "**/.playwright-mcp/**",
      ],
    };
    return config;
  },
};

export default nextConfig;
