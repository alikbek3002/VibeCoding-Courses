"use client";

import { SplineScene } from "@/components/ui/splite";

// Вторая секция: интерактивный 3D-робот слева. Правая колонка пока пустая —
// контент добавим позже. Робот перенесён сюда из hero.
export function RobotShowcase() {
  return (
    <section className="robot-sec" id="about">
      <div className="wrap robot-grid">
        <div className="robot-3d rv" aria-hidden="true">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="robot-3d-scene"
          />
        </div>
        {/* правая часть пока пустая */}
        <div className="robot-side" />
      </div>
    </section>
  );
}
