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

type Plan = {
  id: string;
  hot: boolean;
  tag: string;
  name: string;
  num: string;
  dur: string;
  features: string[];
  forWhom: string;
  cta: string;
};

export function SplitPricing() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const featHead = lang === "kg" ? "// эмне кирет" : "// что внутри";

  const plans: Plan[] = [
    {
      id: "base",
      hot: false,
      tag: t.pl1_tag,
      name: t.pl1_name,
      num: t.pl1_num,
      dur: t.pl1_dur,
      features: [t.pl1_f1, t.pl1_f2, t.pl1_f3, t.pl1_f4],
      forWhom: t.pl1_for,
      cta: t.pl_cta,
    },
    {
      id: "deep",
      hot: true,
      tag: t.pl2_tag,
      name: t.pl2_name,
      num: t.pl2_num,
      dur: t.pl2_dur,
      features: [t.pl2_f1, t.pl2_f2, t.pl2_f3, t.pl2_f4, t.pl2_f5],
      forWhom: t.pl2_for,
      cta: t.pl_cta2,
    },
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
      className="mx-auto flex max-w-[1080px] flex-col gap-7 max-[480px]:gap-5"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {plans.map((p) => {
        const hot = p.hot;
        return (
          <motion.div
            key={p.id}
            variants={item}
            whileHover={reduce ? undefined : { y: -6 }}
            className={`group relative grid w-full grid-cols-1 rounded-[22px] bg-white transition-shadow duration-300 md:min-h-[320px] md:grid-cols-[2fr_3fr] ${
              hot
                ? "border-[1.5px] border-[color:rgba(16,185,129,.35)] shadow-[0_28px_70px_-30px_rgba(16,185,129,.45)]"
                : "border border-[var(--line)] shadow-[var(--shadow)]"
            }`}
          >
            {hot && (
              <span className="absolute -top-3 left-7 z-10 inline-flex items-center rounded-full bg-[var(--ink)] px-3.5 py-1.5 font-sans text-[11px] font-semibold tracking-[.03em] text-[var(--acc)] md:left-10">
                {t.pl_badge}
              </span>
            )}

            {/* LEFT — identity + price + for-whom + CTA */}
            <div
              className={`flex min-w-0 flex-col rounded-t-[22px] p-7 md:rounded-l-[22px] md:rounded-tr-none md:p-10 ${
                hot ? "bg-[var(--acc-soft)]" : "bg-white"
              }`}
            >
              <p className="mono text-[12px] font-medium text-[var(--acc-d)]">
                {p.tag}
              </p>
              <h3 className="mt-2 font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--ink)]">
                {p.name}
              </h3>
              <div className="mt-6 flex items-baseline gap-2 whitespace-nowrap">
                <span className="font-display text-[clamp(44px,5vw,52px)] font-bold leading-none tracking-[-0.02em] text-[var(--ink)]">
                  {p.num}
                </span>
                <span className="font-sans text-[15px] font-medium text-[var(--ink-3)]">
                  {t.cur}
                </span>
              </div>
              <p className="mt-2 font-sans text-[12.5px] text-[var(--ink-3)]">
                {p.dur}
              </p>
              <p className="mt-1 font-sans text-[12px] text-[var(--ink-3)]">
                {t.pl_once}
              </p>
              <div className="mt-auto pt-8">
                <p className="border-t border-dashed border-[var(--line-2)] pt-[18px] font-sans text-[14px] leading-[1.45] text-[var(--ink-3)]">
                  {p.forWhom}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-block mt-[22px] whitespace-normal text-center leading-snug ${hot ? "btn-dark" : "btn-line"}`}
                >
                  {p.cta}
                </a>
              </div>
            </div>

            {/* RIGHT — feature panel (identical --paper on both cards) */}
            <div className="flex flex-col justify-center rounded-b-[22px] border-t border-[var(--line)] bg-[var(--paper)] p-7 md:rounded-r-[22px] md:rounded-bl-none md:border-t-0 md:border-l md:border-[var(--line)] md:p-10">
              <p className="mono mb-5 text-[12px] font-medium text-[var(--acc-d)]">
                {featHead}
              </p>
              <ul className="grid grid-cols-1 gap-x-7 gap-y-3.5 font-sans sm:grid-cols-2">
                {p.features.map((f, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 text-[14.5px] leading-snug text-[var(--ink-2)] ${
                      hot && i === p.features.length - 1 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <span
                      className={`mt-px grid size-5 shrink-0 place-content-center rounded-full ${
                        hot
                          ? "bg-[var(--acc)] text-white"
                          : "bg-[var(--acc-soft)] text-[var(--acc-d)]"
                      }`}
                    >
                      <CheckIcon className="size-[13px]" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
