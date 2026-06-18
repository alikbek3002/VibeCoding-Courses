"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/components/lang-provider";

function SkillsScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let raf = 0;
    let cleanup: (() => void) | undefined;

    void import("three").then((THREE) => {
      if (disposed || !canvasRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0.16, 7.2);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0xffffff, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const group = new THREE.Group();
      group.scale.set(1.18, 1.18, 1.18);
      scene.add(group);

      const glass = new THREE.MeshPhysicalMaterial({
        color: 0x21c785,
        transparent: true,
        opacity: 0.48,
        roughness: 0.16,
        metalness: 0.02,
        transmission: 0.28,
        thickness: 0.6,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      for (let i = 0; i < 9; i += 1) {
        const radius = 0.86 + Math.sin(i * 0.7) * 0.16;
        const tube = i % 3 === 0 ? 0.036 : 0.026;
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(radius, tube, 28, 132),
          glass.clone(),
        );
        ring.position.x = (i - 4) * 0.42;
        ring.position.y = Math.sin(i * 0.9) * 0.18;
        ring.position.z = Math.cos(i * 0.65) * 0.24;
        ring.rotation.x = 0.26 + i * 0.025;
        ring.rotation.y = Math.PI / 2 + i * 0.08;
        ring.rotation.z = Math.sin(i) * 0.14;
        group.add(ring);
      }

      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 3.7, 18),
        new THREE.MeshBasicMaterial({
          color: 0x16b978,
          transparent: true,
          opacity: 0.54,
        }),
      );
      beam.rotation.z = 0.02;
      group.add(beam);

      const glow = new THREE.Mesh(
        new THREE.TorusGeometry(1.92, 0.018, 20, 180),
        new THREE.MeshBasicMaterial({
          color: 0xb9f7d8,
          transparent: true,
          opacity: 0.34,
          depthWrite: false,
        }),
      );
      glow.rotation.x = 0.35;
      glow.rotation.y = Math.PI / 2;
      group.add(glow);

      scene.add(new THREE.AmbientLight(0xffffff, 1.2));
      const key = new THREE.PointLight(0x7df0bd, 28, 18);
      key.position.set(1.8, 2.2, 3.6);
      scene.add(key);

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      resize();

      const render = (time = 0) => {
        const t = time * 0.001;
        group.rotation.y = Math.sin(t * 0.32) * 0.28;
        group.rotation.x = 0.04 + Math.sin(t * 0.24) * 0.045;
        group.position.y = Math.sin(t * 0.45) * 0.08;
        group.children.forEach((child, index) => {
          child.rotation.z += 0.0009 + index * 0.00005;
        });
        renderer.render(scene, camera);
        if (!reduceMotion && !disposed) {
          raf = requestAnimationFrame(render);
        }
      };
      render();

      cleanup = () => {
        observer.disconnect();
        group.traverse((object) => {
          const mesh = object as import("three").Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        });
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="skills-scene" aria-hidden="true" />;
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
