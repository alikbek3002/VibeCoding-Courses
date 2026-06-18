"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLang } from "@/components/lang-provider";
import { WHATSAPP_URL } from "@/lib/i18n";

// Инлайн-галочка (без зависимости от lucide) — цвет наследуется из text-* через currentColor
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const Feature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-[14.5px] leading-snug text-[var(--ink-2)]">
    <span className="mt-px grid size-5 shrink-0 place-content-center rounded-full bg-[var(--acc)] text-white">
      <CheckIcon className="size-[13px]" />
    </span>
    <span>{children}</span>
  </li>
);

export function SplitPricing() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  // Две карточки-тарифа: «Стандарт» (1-й месяц) и «Про» (весь курс, 2 месяца, со скидкой).
  const standardFeatures = [t.pls_f1, t.pls_f2, t.pls_f3, t.pls_f4];
  const proFeatures = [t.plp_f1, t.plp_f2, t.plp_f3, t.plp_f4];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.9 },
        },
      };

  return (
    <motion.div
      className="mx-auto grid w-full max-w-[940px] grid-cols-1 items-stretch gap-5 md:grid-cols-2"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* ── Тариф «Стандарт» — 1-й месяц ── */}
      <motion.div
        variants={item}
        whileHover={reduce ? undefined : { y: -6 }}
        className="relative flex flex-col rounded-[2px] border border-[var(--line-2)] bg-white p-7 shadow-[0_18px_50px_-32px_rgba(0,0,0,.3)] transition-shadow duration-300 md:p-9"
      >
        <p className="mono text-[12px] font-medium text-[var(--acc-d)]">
          {t.pls_tag}
        </p>
        <h3 className="mt-2 font-display text-[24px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--ink)]">
          {t.pls_name}
        </h3>

        <div className="mt-5 flex items-baseline gap-2 whitespace-nowrap">
          <span className="font-display text-[clamp(38px,4.6vw,46px)] font-bold leading-none tracking-[-0.02em] text-[var(--ink)]">
            {t.pls_num}
          </span>
          <span className="font-sans text-[15px] font-medium text-[var(--ink-3)]">
            {t.cur}
          </span>
        </div>
        <p className="mt-2 font-sans text-[12.5px] text-[var(--ink-3)]">
          {t.pls_dur}
        </p>
        <p className="mt-1 font-sans text-[12px] text-[var(--ink-3)]">
          {t.pls_once}
        </p>

        <ul className="mt-7 grid gap-3.5 font-sans">
          {standardFeatures.map((f, i) => (
            <Feature key={i}>{f}</Feature>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <p className="border-t border-dashed border-[var(--line-2)] pt-[18px] font-sans text-[13.5px] leading-[1.45] text-[var(--ink-3)]">
            {t.pls_for}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-block btn-line mt-[22px] whitespace-normal text-center leading-snug"
          >
            {t.pls_cta}
          </a>
        </div>
      </motion.div>

      {/* ── Тариф «Про» — весь курс, со скидкой (выделенная карточка) ── */}
      <motion.div
        variants={item}
        whileHover={reduce ? undefined : { y: -6 }}
        className="group relative flex flex-col rounded-[2px] border-[1.5px] border-[color:rgba(16,185,129,.4)] bg-[var(--acc-soft)] p-7 shadow-[0_28px_70px_-30px_rgba(16,185,129,.5)] transition-shadow duration-300 md:p-9"
      >
        <span className="absolute -top-3 left-7 z-10 inline-flex items-center rounded-[2px] bg-[var(--ink)] px-3.5 py-1.5 font-sans text-[11px] font-semibold tracking-[.03em] text-[var(--acc)] md:left-9">
          {t.plp_badge}
        </span>

        <p className="mono text-[12px] font-medium text-[var(--acc-d)]">
          {t.plp_tag}
        </p>
        <h3 className="mt-2 font-display text-[24px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--ink)]">
          {t.plp_name}
        </h3>

        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {/* старая цена — слева, зачёркнута, меньше: сразу видно, что это скидка */}
          <span className="font-display text-[22px] font-semibold leading-none text-[var(--ink-3)] line-through decoration-2">
            {t.plp_old} {t.cur}
          </span>
          {/* цена со скидкой */}
          <span className="font-display text-[clamp(34px,4vw,42px)] font-bold leading-none tracking-[-0.02em] text-[var(--ink)]">
            {t.plp_num}
          </span>
          <span className="font-sans text-[15px] font-medium text-[var(--ink-3)]">
            {t.cur}
          </span>
        </div>
        <span className="mt-3 inline-flex w-fit items-center rounded-[2px] bg-[var(--acc)] px-3 py-1.5 font-sans text-[13px] font-bold tracking-[.01em] text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,.65)]">
          {t.plp_save}
        </span>
        <p className="mt-2.5 font-sans text-[12.5px] text-[var(--ink-3)]">
          {t.plp_dur}
        </p>
        <p className="mt-1 font-sans text-[12px] text-[var(--ink-3)]">
          {t.plp_once}
        </p>

        <p className="mono mt-7 text-[12px] font-medium text-[var(--acc-d)]">
          {t.plp_incl}
        </p>
        <ul className="mt-3.5 grid gap-3.5 font-sans">
          {proFeatures.map((f, i) => (
            <Feature key={i}>{f}</Feature>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <p className="border-t border-dashed border-[var(--line-2)] pt-[18px] font-sans text-[13.5px] leading-[1.45] text-[var(--ink-3)]">
            {t.plp_for}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-block btn-dark mt-[22px] whitespace-normal text-center leading-snug"
          >
            {t.plp_cta}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
