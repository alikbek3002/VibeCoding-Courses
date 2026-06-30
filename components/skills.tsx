"use client";

import { useLang } from "@/components/lang-provider";

/**
 * Декоративное «AI-ядро» — лёгкая SVG-катушка вместо WebGL/Three.js.
 * Никакого JS-рантайма и requestAnimationFrame: всё анимируется CSS-трансформами
 * (composited), поэтому не грузит главный поток. aria-hidden — чисто декор.
 */
function SkillsScene() {
  // Кольца катушки: вертикальные эллипсы вдоль оси X с лёгкой волной по Y.
  const rings = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const cx = 70 + t * 500; // 70 → 570
    const cy = 210 + Math.sin(t * Math.PI * 2) * 16;
    const ry = 118 + Math.sin(t * Math.PI) * 14;
    const opacity = 0.28 + Math.sin(t * Math.PI) * 0.6;
    const strokeWidth = i % 3 === 0 ? 3 : 2;
    return { cx, cy, ry, opacity, strokeWidth, i };
  });

  return (
    <svg
      className="skills-scene"
      viewBox="0 0 640 420"
      fill="none"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="sk-coil" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7ef0c0" />
          <stop offset="0.5" stopColor="#1fb976" />
          <stop offset="1" stopColor="#0a8f64" />
        </linearGradient>
        <radialGradient id="sk-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#b9f7d8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#b9f7d8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* мягкое свечение в центре */}
      <ellipse cx="320" cy="210" rx="250" ry="150" fill="url(#sk-glow)" />

      {/* плавающая катушка */}
      <g className="skills-coil">
        {/* осевой луч */}
        <line
          x1="60"
          y1="210"
          x2="580"
          y2="210"
          stroke="url(#sk-coil)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
        {rings.map((r) => (
          <ellipse
            key={r.i}
            cx={r.cx}
            cy={r.cy}
            rx="30"
            ry={r.ry}
            stroke="url(#sk-coil)"
            strokeWidth={r.strokeWidth}
            opacity={r.opacity}
          />
        ))}
      </g>
    </svg>
  );
}

export function Skills() {
  const { t } = useLang();

  const skills: Array<{
    title: string;
    desc: string;
    tag: string;
  }> = [
    {
      title: t.sk1_t,
      desc: t.sk1_d,
      tag: t.sk1_tag,
    },
    {
      title: t.sk2_t,
      desc: t.sk2_d,
      tag: t.sk2_tag,
    },
    {
      title: t.sk3_t,
      desc: t.sk3_d,
      tag: t.sk3_tag,
    },
    {
      title: t.sk4_t,
      desc: t.sk4_d,
      tag: t.sk4_tag,
    },
  ];

  return (
    <section className="sec skills-sec" id="skills">
      <div className="wrap skills-wrap">
        <header className="sec-head skills-head rv">
          <p className="kick mono">{t.sk_kick}</p>
          <h2 className="skills-title">
            {t.sk_h_main}
            <span>{t.sk_h_accent}</span>
            <i aria-hidden="true" />
          </h2>
          <p className="sec-sub">{t.sk_sub}</p>
        </header>

        <div className="skills-map">
          <div className="skills-core" aria-hidden="true">
            <span className="skills-core-k mono">AI</span>
            <div className="skills-core-scene">
              <SkillsScene />
            </div>
          </div>

          <div className="skill-slabs">
            {skills.map((skill, index) => (
              <article className="skill-slab rv" key={skill.title}>
                <span className="skill-slab-num mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="skill-slab-copy">
                  <span className="skill-slab-tag mono">{skill.tag}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                </div>
                <div className="skill-slab-signal" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
