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

export function SplitPricing() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  // Один прайс на весь курс. Фичи показаны как путь по месяцам:
  // 1-й месяц — база (доступен и отдельно), 2-й месяц — продукт.
  const groups = [
    { head: t.pl_m1_head, features: [t.pl_m1_f1, t.pl_m1_f2, t.pl_m1_f3, t.pl_m1_f4] },
    { head: t.pl_m2_head, features: [t.pl_m2_f1, t.pl_m2_f2, t.pl_m2_f3, t.pl_m2_f4] },
  ];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
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
      className="mx-auto w-full max-w-[940px]"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        variants={item}
        whileHover={reduce ? undefined : { y: -6 }}
        className="group relative grid w-full grid-cols-1 rounded-[22px] border-[1.5px] border-[color:rgba(16,185,129,.35)] bg-white shadow-[0_28px_70px_-30px_rgba(16,185,129,.45)] transition-shadow duration-300 md:min-h-[360px] md:grid-cols-[2fr_3fr]"
      >
        <span className="absolute -top-3 left-7 z-10 inline-flex items-center rounded-full bg-[var(--ink)] px-3.5 py-1.5 font-sans text-[11px] font-semibold tracking-[.03em] text-[var(--acc)] md:left-10">
          {t.pl_badge}
        </span>

        {/* LEFT — identity + price + starter option + for-whom + CTA */}
        <div className="flex min-w-0 flex-col rounded-t-[22px] bg-[var(--acc-soft)] p-7 md:rounded-l-[22px] md:rounded-tr-none md:p-10">
          <p className="mono text-[12px] font-medium text-[var(--acc-d)]">
            {t.pl_tag}
          </p>
          <h3 className="mt-2 font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--ink)]">
            {t.pl_name}
          </h3>
          <div className="mt-6 flex items-baseline gap-2 whitespace-nowrap">
            <span className="font-display text-[clamp(44px,5vw,52px)] font-bold leading-none tracking-[-0.02em] text-[var(--ink)]">
              {t.pl_num}
            </span>
            <span className="font-sans text-[15px] font-medium text-[var(--ink-3)]">
              {t.cur}
            </span>
          </div>
          <p className="mt-2 font-sans text-[12.5px] text-[var(--ink-3)]">
            {t.pl_dur}
          </p>
          <p className="mt-1 font-sans text-[12px] text-[var(--ink-3)]">
            {t.pl_once}
          </p>

          {/* Стартовая опция — только первый месяц (база) */}
          <div className="mt-5 rounded-[14px] border border-dashed border-[var(--line-2)] bg-white/60 px-4 py-3">
            <p className="font-sans text-[12.5px] font-medium text-[var(--ink-2)]">
              {t.pl_starter_label}
            </p>
            <p className="mt-0.5 font-sans text-[13px] text-[var(--ink-3)]">
              {t.pl_starter_note} —{" "}
              <span className="font-semibold text-[var(--ink)]">
                {t.pl_starter_num} {t.cur}
              </span>
            </p>
            <p className="mt-0.5 font-sans text-[11.5px] text-[var(--ink-3)]">
              {t.pl_starter_dur}
            </p>
          </div>

          <div className="mt-auto pt-7">
            <p className="border-t border-dashed border-[var(--line-2)] pt-[18px] font-sans text-[14px] leading-[1.45] text-[var(--ink-3)]">
              {t.pl_for}
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-block btn-dark mt-[22px] whitespace-normal text-center leading-snug"
            >
              {t.pl_cta}
            </a>
          </div>
        </div>

        {/* RIGHT — feature panel, разбито по месяцам */}
        <div className="flex flex-col justify-center gap-6 rounded-b-[22px] border-t border-[var(--line)] bg-[var(--paper)] p-7 md:rounded-r-[22px] md:rounded-bl-none md:border-t-0 md:border-l md:border-[var(--line)] md:p-10">
          {groups.map((g, gi) => (
            <div key={gi}>
              <p className="mono mb-4 text-[12px] font-medium text-[var(--acc-d)]">
                {g.head}
              </p>
              <ul className="grid grid-cols-1 gap-x-7 gap-y-3.5 font-sans sm:grid-cols-2">
                {g.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[14.5px] leading-snug text-[var(--ink-2)]"
                  >
                    <span className="mt-px grid size-5 shrink-0 place-content-center rounded-full bg-[var(--acc)] text-white">
                      <CheckIcon className="size-[13px]" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
