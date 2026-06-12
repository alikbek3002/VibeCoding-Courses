"use client";

import { useEffect } from "react";

/**
 * Появление элементов с классом .rv при скролле — как в прототипе:
 * каждому .rv задаём небольшой stagger-delay среди соседей-.rv,
 * затем добавляем .in, когда верх элемента поднимается выше 92% вьюпорта.
 */
export function RevealController() {
  useEffect(() => {
    let els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));

    // stagger по индексу среди соседних .rv
    els.forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      const sibs = Array.from(parent.children).filter((c) =>
        c.classList.contains("rv"),
      );
      el.style.transitionDelay = Math.min(sibs.indexOf(el), 5) * 0.06 + "s";
    });

    const check = () => {
      const threshold = window.innerHeight * 0.92;
      els = els.filter((el) => {
        if (el.getBoundingClientRect().top < threshold) {
          el.classList.add("in");
          return false; // больше не следим
        }
        return true;
      });
      if (els.length === 0) {
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    const raf = requestAnimationFrame(check);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
