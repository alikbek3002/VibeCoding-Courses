'use client';

import React, { useRef, useEffect, useState } from 'react';
// --- Internal Helper Components (Not exported) --- //

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ShaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glProgramRef = useRef<WebGLProgram | null>(null);
  const glBgColorLocationRef = useRef<WebGLUniformLocation | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const [backgroundColor, setBackgroundColor] = useState([1.0, 1.0, 1.0]);

  useEffect(() => {
    const root = document.documentElement;
    const updateColor = () => {
      // Scoped to the section: dark when this canvas lives inside a `.dark` subtree.
      const isDark =
        canvasRef.current?.closest('.dark') != null || root.classList.contains('dark');
      setBackgroundColor(isDark ? [0, 0, 0] : [1.0, 1.0, 1.0]);
    };
    updateColor();
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateColor();
        }
      }
    });
    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const gl = glRef.current;
    const program = glProgramRef.current;
    const location = glBgColorLocationRef.current;
    if (gl && program && location) {
      gl.useProgram(program);
      gl.uniform3fv(location, new Float32Array(backgroundColor));
    }
  }, [backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) { console.error("WebGL not supported"); return; }
    glRef.current = gl;

    const vertexShaderSource = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      mat2 rotate2d(float angle){ float c=cos(angle),s=sin(angle); return mat2(c,-s,s,c); }
      float variation(vec2 v1,vec2 v2,float strength,float speed){ return sin(dot(normalize(v1),normalize(v2))*strength+iTime*speed)/100.0; }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff = center-uv;
        float len = length(diff);
        len += variation(diff,vec2(0.,1.),5.,2.);
        len -= variation(diff,vec2(1.,0.),5.,2.);
        float circle = smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(circle);
      }
      void main(){
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        uv.x *= 1.5; uv.x -= 0.25;
        float mask = 0.0;
        float radius = .35;
        vec2 center = vec2(.5);
        mask += paintCircle(uv,center,radius,.035).r;
        mask += paintCircle(uv,center,radius-.018,.01).r;
        mask += paintCircle(uv,center,radius+.018,.005).r;
        vec2 v=rotate2d(iTime)*uv;
        vec3 foregroundColor=vec3(v.x,v.y,.7-v.y*v.x);
        vec3 color=mix(uBackgroundColor,foregroundColor,mask);
        color=mix(color,vec3(1.),paintCircle(uv,center,radius,.003).r);
        gl_FragColor=vec4(color,1.);
      }`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Could not create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation error");
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) throw new Error("Could not create program");
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    glProgramRef.current = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, 'iTime');
    const iResLoc = gl.getUniformLocation(program, 'iResolution');
    glBgColorLocationRef.current = gl.getUniformLocation(program, 'uBackgroundColor');
    gl.uniform3fv(glBgColorLocationRef.current, new Float32Array(backgroundColor));

    let animationFrameId: number;
    const render = (time: number) => {
      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    const handleResize = () => {
      // Size to the section (the canvas's own box), not the whole window.
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0 bg-background" />;
};


// --- EXPORTED Building Blocks --- //

/**
 * We export the Props interface so you can easily type the data for your plans.
 */
export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: 'primary' | 'secondary';
  // Integration extras (backward compatible):
  href?: string; // makes the CTA open a link (e.g. WhatsApp)
  popularLabel?: string; // translatable "Most Popular" badge text
}

/**
 * We export the PricingCard component itself in case you want to use it elsewhere.
 */
export const PricingCard = ({
  planName, description, price, features, buttonText, isPopular = false, buttonVariant = 'primary', href, popularLabel = 'Most Popular',
}: PricingCardProps) => {
  const primary = buttonVariant === 'primary';
  const btnClass = `mt-auto flex w-full items-center justify-center rounded-full px-6 py-3.5 font-sans text-[15px] font-semibold transition-all duration-200 ${
    primary
      ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25'
      : 'border border-black/15 bg-white text-[#101311] hover:border-[#101311] hover:bg-[#101311] hover:text-white'
  }`;
  return (
    <div
      className={`group relative flex w-full max-w-md flex-1 flex-col rounded-[26px] bg-white p-9 transition-all duration-300 ease-out hover:z-20 hover:scale-105 hover:shadow-[0_36px_85px_-30px_rgba(16,19,17,0.45)] ${
        isPopular
          ? 'border border-emerald-500/30 ring-1 ring-emerald-500/15 shadow-[0_28px_70px_-26px_rgba(16,185,129,0.45)]'
          : 'border border-black/[0.07] shadow-[0_20px_55px_-30px_rgba(16,19,17,0.4)]'
      }`}
    >
      <div className="mb-5 flex min-h-[26px] items-center">
        {isPopular && (
          <span className="inline-flex items-center rounded-full bg-emerald-500 px-3.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-white">
            {popularLabel}
          </span>
        )}
      </div>

      <h3 className="font-display text-[28px] font-semibold leading-none tracking-[-0.01em] text-[#101311]">
        {planName}
      </h3>
      <p className="mt-2.5 font-sans text-[14.5px] leading-relaxed text-[#828d86]">
        {description}
      </p>

      <div className="mt-6 flex items-baseline">
        <span className="font-display text-[42px] font-bold leading-none tracking-[-0.02em] text-[#101311]">
          {price}
        </span>
      </div>

      <div className="my-7 h-px w-full bg-black/[0.08]" />

      <ul className="mb-8 flex flex-col gap-3.5 font-sans">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-[14.5px] leading-snug text-[#454f49]">
            <span className="mt-px grid size-5 shrink-0 place-content-center rounded-full bg-emerald-500/15 text-emerald-600">
              <CheckIcon className="size-[13px]" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={btnClass}>
          {buttonText}
        </a>
      ) : (
        <button type="button" className={btnClass}>
          {buttonText}
        </button>
      )}
    </div>
  );
};


// --- EXPORTED Customizable Page Component --- //

interface ModernPricingPageProps {
  /** The main title. Can be a string or a ReactNode for more complex content. */
  title: React.ReactNode;
  /** The subtitle text appearing below the main title. */
  subtitle: React.ReactNode;
  /** An array of plan objects that conform to PricingCardProps. */
  plans: PricingCardProps[];
  /** Whether to show the animated WebGL background. Defaults to true. */
  showAnimatedBackground?: boolean;
}

export const ModernPricingPage = ({
  title,
  subtitle,
  plans,
  showAnimatedBackground = true,
}: ModernPricingPageProps) => {
  // Section-scoped (not a full-screen takeover): relative + overflow-hidden so the
  // animated canvas stays inside this band instead of covering the whole site.
  return (
    <div className="relative w-full overflow-hidden bg-background text-foreground">
      {showAnimatedBackground && <ShaderCanvas />}
      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 py-28">
        <div className="w-full max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-[44px] md:text-[64px] font-extralight leading-[1.05] tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-cyan-500 to-blue-600 dark:from-white dark:via-cyan-300 dark:to-blue-400 font-display">
            {title}
          </h1>
          <p className="mt-4 text-[18px] md:text-[22px] text-foreground/80 max-w-2xl mx-auto font-sans">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full max-w-5xl">
          {plans.map((plan) => <PricingCard key={plan.planName} {...plan} />)}
        </div>
      </main>
    </div>
  );
};
