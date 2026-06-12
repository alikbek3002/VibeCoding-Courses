"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  /** короткий тег-технология: «Lovable», «Python», «Supabase»… */
  tag: string;
  /** ссылка на живую работу. «#» = заглушка (кнопка не уводит никуда) */
  href: string;
  /** путь к скриншоту в /public, напр. "/works/coffee.png". Нет — рисуем брендовый плейсхолдер */
  img?: string;
  /** иконка (lucide-react) */
  icon: React.ReactNode;
}

const ACCENT = "#10b981";
const ACCENT_D = "#0a8f64";
const INK = "#101311";
const INK_2 = "#454f49";

/** Раскладка одной карточки в 3D-коверфлоу по её смещению от центра. */
function layout(offset: number) {
  const abs = Math.abs(offset);
  const isActive = offset === 0;
  return {
    isActive,
    visible: abs <= 2,
    rotateY: offset * -22,
    x: offset * 248,
    z: isActive ? 60 : -abs * 150,
    scale: isActive ? 1 : Math.max(0.74, 1 - abs * 0.13),
    opacity: abs > 2 ? 0 : 1 - abs * 0.32,
    zIndex: 30 - abs,
  };
}

interface CardProps {
  project: ProjectItem;
  offset: number;
  reduce: boolean;
  openLabel: string;
  onActivate: () => void;
}

const ProjectCard = React.memo(function ProjectCard({
  project,
  offset,
  reduce,
  openLabel,
  onActivate,
}: CardProps) {
  const { isActive, visible, rotateY, x, z, scale, opacity, zIndex } =
    layout(offset);
  const isExternal = /^https?:\/\//.test(project.href);

  return (
    <motion.article
      onClick={onActivate}
      aria-hidden={!isActive}
      initial={false}
      animate={
        reduce
          ? { x, opacity, scale: isActive ? 1 : 0.92 }
          : { rotateY, x, z, scale, opacity }
      }
      transition={
        reduce
          ? { duration: 0.2 }
          : { type: "spring", stiffness: 240, damping: 30 }
      }
      className={cn(
        "absolute left-1/2 top-0 -ml-[150px] w-[300px] select-none",
        isActive ? "cursor-default" : "cursor-pointer",
      )}
      style={{
        zIndex,
        pointerEvents: visible ? "auto" : "none",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        className="flex h-[428px] flex-col overflow-hidden rounded-[20px] border bg-white"
        style={{
          borderColor: "#e6e8e2",
          boxShadow: isActive
            ? "0 34px 70px -24px rgba(16,185,129,.34), 0 18px 40px -22px rgba(16,19,17,.32)"
            : "0 20px 44px -20px rgba(16,19,17,.22)",
        }}
      >
        {/* ── Скриншот / плейсхолдер ── */}
        <div className="relative h-[196px] overflow-hidden">
          {project.img ? (
            <Image
              src={project.img}
              alt={project.title}
              fill
              sizes="340px"
              className="object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_D} 70%, #06231a 130%)`,
              }}
            >
              <span
                className="text-[84px] font-bold leading-none text-white/95"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title.charAt(0)}
              </span>
              <span
                className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-sm"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                превью
              </span>
            </div>
          )}
          {/* затемнение снизу для глубины — только у активной */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: isActive ? 1 : 0,
              background:
                "linear-gradient(to top, rgba(16,19,17,.42), transparent 55%)",
            }}
          />
        </div>

        {/* ── Контент ── */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start gap-3">
            <motion.span
              animate={{ scale: isActive && !reduce ? 1.06 : 1 }}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white"
              style={{
                background: ACCENT,
                boxShadow: "0 8px 18px -6px rgba(16,185,129,.6)",
              }}
            >
              {project.icon}
            </motion.span>
            <h3
              className="mt-0.5 text-[20px] font-bold leading-tight"
              style={{ color: INK, letterSpacing: "-0.02em" }}
            >
              {project.title}
            </h3>
          </div>

          <p
            className="text-[14px] leading-relaxed"
            style={{ color: INK_2 }}
          >
            {project.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2">
            <span
              className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold"
              style={{
                background: "#e6f6ef",
                color: ACCENT_D,
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              {project.tag}
            </span>

            <AnimatePresence>
              {isActive && (
                <motion.a
                  href={project.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isExternal) e.preventDefault();
                  }}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: 12 }}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white transition-colors"
                  style={{ background: INK }}
                >
                  {openLabel}
                  <ExternalLink className="h-3.5 w-3.5" />
                </motion.a>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

interface ProjectCarouselProps {
  items: ProjectItem[];
  openLabel: string;
  className?: string;
}

export function ProjectCarousel({
  items,
  openLabel,
  className,
}: ProjectCarouselProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = items.length;

  const go = React.useCallback(
    (dir: number) => setIndex((i) => (i + dir + n) % n),
    [n],
  );
  const jump = React.useCallback((i: number) => setIndex(i), []);

  /** круговое смещение: ближайший путь по кольцу, чтобы коверфлоу был «бесконечным» */
  const circularOffset = (position: number) => {
    let off = position - index;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    return off;
  };

  // автопрокрутка — пауза при наведении/фокусе/перетаскивании и при reduced-motion
  React.useEffect(() => {
    if (paused || reduceMotion || n <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % n), 4500);
    return () => clearInterval(id);
  }, [paused, reduceMotion, n]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="карусель"
      aria-label="Работы учеников"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
      }}
      style={{ outline: "none" }}
    >
      {/* сцена с перспективой */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragStart={() => setPaused(true)}
        onDragEnd={onDragEnd}
        className="relative mx-auto h-[452px] w-full"
        style={{ perspective: 1800, perspectiveOrigin: "50% 45%" }}
      >
        {items.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            offset={circularOffset(i)}
            reduce={reduceMotion}
            openLabel={openLabel}
            onActivate={() => jump(i)}
          />
        ))}
      </motion.div>

      {/* стрелки */}
      <div className="pointer-events-none absolute inset-x-0 top-[150px] z-40 flex items-center justify-between px-1 sm:px-2 md:-mx-4">
        <button
          type="button"
          aria-label="Предыдущая работа"
          onClick={() => go(-1)}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border bg-white/90 text-[#101311] shadow-lg backdrop-blur transition-transform hover:scale-110 active:scale-95"
          style={{ borderColor: "#e6e8e2" }}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Следующая работа"
          onClick={() => go(1)}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border bg-white/90 text-[#101311] shadow-lg backdrop-blur transition-transform hover:scale-110 active:scale-95"
          style={{ borderColor: "#e6e8e2" }}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* точки + счётчик */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              type="button"
              key={i}
              aria-label={`Работа ${i + 1}`}
              aria-current={i === index}
              onClick={() => jump(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? 26 : 8,
                height: 8,
                background: i === index ? ACCENT : "#d4d8cf",
              }}
            />
          ))}
        </div>
        <span
          className="text-[12px]"
          style={{ color: "#828d86", fontFamily: '"JetBrains Mono", monospace' }}
        >
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
