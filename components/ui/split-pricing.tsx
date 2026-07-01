"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, Send, Sparkles, Star, X } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { useLang } from "@/components/lang-provider";
import { WHATSAPP_URL } from "@/lib/i18n";

type Week = { n: string; t: string; d: string };
type PlanId = "online" | "standard" | "pro";

type Plan = {
  id: PlanId;
  stars: 1 | 2 | 3;
  badge?: string;
  tag: string;
  name: string;
  short: string;
  price: string;
  currency: string;
  period: string;
  note: string;
  features: readonly string[];
  weeks: readonly Week[];
  built: readonly string[];
  tools: readonly string[];
  support: string;
  oldPrice?: string;
  save?: string;
  featured?: boolean;
};

const planAccent: Record<PlanId, string> = {
  online: "border-[color:rgba(16,19,17,.08)] bg-white",
  pro: "border-[color:rgba(16,185,129,.45)] bg-white shadow-[0_28px_80px_-44px_rgba(16,185,129,.75)]",
  standard: "border-[color:rgba(16,19,17,.1)] bg-[color:rgba(230,246,239,.58)]",
};

const DetailList = ({ items }: { items: readonly Week[] }) => (
  <ol className="mt-3 grid gap-3">
    {items.map((item) => (
      <li key={`${item.n}-${item.t}`} className="grid grid-cols-[30px_1fr] gap-3">
        <span className="grid size-[30px] place-items-center rounded-[4px] bg-[var(--ink)] font-mono text-[11px] font-bold text-white">
          {item.n}
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold leading-tight text-[var(--ink)]">
            {item.t}
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-[var(--ink-3)]">
            {item.d}
          </span>
        </span>
      </li>
    ))}
  </ol>
);

const Chips = ({ items }: { items: readonly string[] }) => (
  <div className="mt-3 flex flex-wrap gap-2">
    {items.map((item) => (
      <span
        key={item}
        className="rounded-[4px] border border-[color:rgba(16,185,129,.22)] bg-white px-2.5 py-1 text-[12px] font-semibold text-[var(--acc-d)]"
      >
        {item}
      </span>
    ))}
  </div>
);

export function SplitPricing() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [detailPlanId, setDetailPlanId] = useState<PlanId | null>(null);
  const [signupPlanId, setSignupPlanId] = useState<PlanId | null>(null);

  const plans = useMemo<Plan[]>(
    () => [
      {
        id: "online",
        stars: 1,
        tag: t.plo_tag,
        name: t.plo_name,
        short: t.plo_short,
        price: t.plo_num,
        currency: t.plo_cur,
        period: t.plo_dur,
        note: t.plo_once,
        features: t.plo_features,
        weeks: t.plo_weeks,
        built: t.plo_built,
        tools: t.plo_tools,
        support: t.plo_support,
      },
      {
        id: "pro",
        stars: 3,
        badge: t.plp_badge,
        tag: t.plp_tag,
        name: t.plp_name,
        short: t.plp_short,
        oldPrice: t.plp_old,
        price: t.plp_num,
        currency: t.cur,
        period: t.plp_dur,
        note: t.plp_once,
        save: t.plp_save,
        features: t.plp_features,
        weeks: t.plp_weeks,
        built: t.plp_built,
        tools: t.plp_tools,
        support: t.plp_support,
        featured: true,
      },
      {
        id: "standard",
        stars: 2,
        tag: t.pls_tag,
        name: t.pls_name,
        short: t.pls_short,
        price: t.pls_num,
        currency: t.cur,
        period: t.pls_dur,
        note: t.pls_once,
        features: t.pls_features,
        weeks: t.pls_weeks,
        built: t.pls_built,
        tools: t.pls_tools,
        support: t.pls_support,
      },
    ],
    [t],
  );

  const detailPlan = plans.find((plan) => plan.id === detailPlanId) ?? null;
  const signupPlan = plans.find((plan) => plan.id === signupPlanId) ?? null;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
  };

  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 140, damping: 20, mass: 0.8 },
        },
      };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!signupPlan) return;

    const form = new FormData(event.currentTarget);
    const lines = [
      t.pl_form_wa_hello,
      `${t.pl_form_wa_plan}: ${signupPlan.name} (${signupPlan.price} ${signupPlan.currency})`,
      `${t.pl_form_wa_name}: ${form.get("name")}`,
      `${t.pl_form_wa_phone}: ${form.get("phone")}`,
      `${t.pl_form_wa_age}: ${form.get("age") || "-"}`,
      `${t.pl_form_wa_note}: ${form.get("note") || "-"}`,
    ];

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <motion.div
        className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        {plans.map((plan) => (
          <motion.article
            key={plan.id}
            variants={item}
            whileHover={reduce ? undefined : { y: -8 }}
            className={[
              "relative flex min-h-[520px] flex-col rounded-[8px] border p-6 transition-[box-shadow,border-color,transform] duration-300 md:p-7",
              "shadow-[0_18px_54px_-42px_rgba(16,19,17,.45)] hover:shadow-[0_28px_72px_-44px_rgba(16,19,17,.5)]",
              planAccent[plan.id],
            ].join(" ")}
          >
            {plan.badge ? (
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-b-[8px] rounded-t-[2px] bg-[var(--acc)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-normal text-[#06231a]">
                {plan.badge}
              </span>
            ) : null}

            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-1.5 text-[var(--acc)]">
                {Array.from({ length: plan.stars }).map((_, index) => (
                  <Star key={index} size={18} strokeWidth={2.4} fill="currentColor" />
                ))}
              </div>
              <p className="mono max-w-[140px] text-right text-[11px] font-bold uppercase tracking-normal text-[var(--ink-3)]">
                {plan.tag}
              </p>
            </div>

            <div className="mt-8 min-h-[122px]">
              <h3 className="font-display text-[29px] font-bold leading-[1.04] tracking-normal text-[var(--ink)]">
                {plan.name}
              </h3>
              <p className="mt-2 text-[15px] leading-snug text-[var(--ink-3)]">
                {plan.short}
              </p>
            </div>

            <div className="min-h-[104px]">
              {plan.oldPrice ? (
                <p className="font-display text-[20px] font-semibold leading-none text-[var(--ink-3)] line-through decoration-2">
                  {plan.oldPrice} {plan.currency}
                </p>
              ) : null}
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-display text-[42px] font-bold leading-none tracking-normal text-[var(--ink)] tabular-nums md:text-[46px]">
                  {plan.price}
                </span>
                <span className="text-[16px] font-semibold text-[var(--ink-3)]">
                  {plan.currency}
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-snug text-[var(--ink-3)]">
                {plan.period}
              </p>
              {plan.save ? (
                <p className="mt-2 inline-flex rounded-[4px] bg-[var(--acc)] px-2.5 py-1 text-[12px] font-bold text-[#06231a]">
                  {plan.save}
                </p>
              ) : null}
            </div>

            <ul className="mt-7 grid gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-[15px] leading-snug text-[var(--ink-2)]">
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--acc-d)]" strokeWidth={2.6} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <p className="mt-auto pt-7 text-[13px] leading-snug text-[var(--ink-3)]">
              {plan.note}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setDetailPlanId(plan.id)}
                className="btn btn-line min-h-[52px] whitespace-normal px-4 text-[15px] leading-tight"
              >
                <Sparkles size={17} />
                {t.pl_more}
              </button>
              <button
                type="button"
                onClick={() => setSignupPlanId(plan.id)}
                className={[
                  "btn min-h-[52px] whitespace-normal px-4 text-[15px] leading-tight",
                  plan.featured ? "btn-acc" : "btn-dark",
                ].join(" ")}
              >
                <Send size={17} />
                {t.pl_choose}
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <AnimatePresence>
        {detailPlan ? (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-[rgba(14,19,17,.55)] px-4 py-6 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setDetailPlanId(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="plan-detail-title"
              className="max-h-[88dvh] w-full max-w-[760px] overflow-y-auto rounded-[8px] bg-white p-5 shadow-[0_38px_100px_rgba(16,19,17,.28)] md:p-7"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono text-[11px] font-bold uppercase tracking-normal text-[var(--acc-d)]">
                    {detailPlan.tag}
                  </p>
                  <h3 id="plan-detail-title" className="mt-2 font-display text-[32px] font-bold leading-tight tracking-normal">
                    {detailPlan.name}
                  </h3>
                  <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-[var(--ink-3)]">
                    {detailPlan.support}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={t.pl_modal_close}
                  onClick={() => setDetailPlanId(null)}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--line-2)] bg-white text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-d)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-7 grid gap-6 md:grid-cols-[1.05fr_.95fr]">
                <section>
                  <h4 className="font-display text-[18px] font-bold tracking-normal">
                    {t.pl_modal_program}
                  </h4>
                  <DetailList items={detailPlan.weeks} />
                </section>
                <section className="grid content-start gap-5">
                  <div>
                    <h4 className="font-display text-[18px] font-bold tracking-normal">
                      {t.pl_modal_result}
                    </h4>
                    <Chips items={detailPlan.built} />
                  </div>
                  <div>
                    <h4 className="font-display text-[18px] font-bold tracking-normal">
                      {t.pl_modal_tools}
                    </h4>
                    <Chips items={detailPlan.tools} />
                  </div>
                </section>
              </div>

              <div className="mt-7 flex flex-col gap-3 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[15px] font-semibold text-[var(--ink)]">
                  {detailPlan.price} {detailPlan.currency}
                </p>
                <button
                  type="button"
                  className="btn btn-dark min-h-[52px] px-5 text-[15px]"
                  onClick={() => {
                    setDetailPlanId(null);
                    setSignupPlanId(detailPlan.id);
                  }}
                >
                  <Send size={17} />
                  {t.pl_choose}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {signupPlan ? (
          <motion.div
            className="fixed inset-0 z-[95] grid place-items-center bg-[rgba(14,19,17,.55)] px-4 py-6 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setSignupPlanId(null)}
          >
            <motion.form
              role="dialog"
              aria-modal="true"
              aria-labelledby="plan-signup-title"
              className="w-full max-w-[560px] rounded-[8px] bg-white p-5 shadow-[0_38px_100px_rgba(16,19,17,.28)] md:p-7"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onSubmit={submitLead}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono text-[11px] font-bold uppercase tracking-normal text-[var(--acc-d)]">
                    {signupPlan.name}
                  </p>
                  <h3 id="plan-signup-title" className="mt-2 font-display text-[31px] font-bold leading-tight tracking-normal">
                    {t.pl_form_title}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-[var(--ink-3)]">
                    {t.pl_form_intro}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={t.pl_modal_close}
                  onClick={() => setSignupPlanId(null)}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--line-2)] bg-white text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-d)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                <label className="grid gap-1.5 text-[13px] font-semibold text-[var(--ink-2)]">
                  {t.pl_form_name}
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className="min-h-[50px] rounded-[8px] border border-[var(--line-2)] bg-white px-4 text-[16px] text-[var(--ink)] outline-none transition focus:border-[var(--acc-d)] focus:ring-2 focus:ring-[rgba(16,185,129,.18)]"
                  />
                </label>
                <label className="grid gap-1.5 text-[13px] font-semibold text-[var(--ink-2)]">
                  {t.pl_form_phone}
                  <input
                    name="phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    placeholder="+996 ..."
                    className="min-h-[50px] rounded-[8px] border border-[var(--line-2)] bg-white px-4 text-[16px] text-[var(--ink)] outline-none transition focus:border-[var(--acc-d)] focus:ring-2 focus:ring-[rgba(16,185,129,.18)]"
                  />
                </label>
                <label className="grid gap-1.5 text-[13px] font-semibold text-[var(--ink-2)]">
                  {t.pl_form_age}
                  <input
                    name="age"
                    inputMode="numeric"
                    className="min-h-[50px] rounded-[8px] border border-[var(--line-2)] bg-white px-4 text-[16px] text-[var(--ink)] outline-none transition focus:border-[var(--acc-d)] focus:ring-2 focus:ring-[rgba(16,185,129,.18)]"
                  />
                </label>
                <label className="grid gap-1.5 text-[13px] font-semibold text-[var(--ink-2)]">
                  {t.pl_form_note}
                  <textarea
                    name="note"
                    rows={3}
                    className="resize-none rounded-[8px] border border-[var(--line-2)] bg-white px-4 py-3 text-[16px] text-[var(--ink)] outline-none transition focus:border-[var(--acc-d)] focus:ring-2 focus:ring-[rgba(16,185,129,.18)]"
                  />
                </label>
              </div>

              <p className="mt-4 text-[12.5px] leading-snug text-[var(--ink-3)]">
                {t.pl_form_notice}
              </p>

              <button type="submit" className="btn btn-acc mt-5 min-h-[54px] w-full px-5 text-[16px]">
                <Send size={18} />
                {t.pl_form_submit}
              </button>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
