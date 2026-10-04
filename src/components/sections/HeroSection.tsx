"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, FileText, Sparkles, ChevronDown, Terminal } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const ACCENT = "#5B7BFF";
const STRING = "#F5C97A"; // string colour in the code card
const KEYWORD = "#8FA6FF";
const PROP = "#8FB4FF";

// Tracks whether the viewport is at least `breakpoint` px wide.
// Used to set the grid columns inline so the layout does not depend on Tailwind's lg: classes.
function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);

  // 3D tilt: targets are set by the pointer (or the idle sway), springs smooth them
  const rxTarget = useMotionValue(-8);
  const ryTarget = useMotionValue(16);
  const rotateX = useSpring(rxTarget, { stiffness: 90, damping: 16 });
  const rotateY = useSpring(ryTarget, { stiffness: 90, damping: 16 });

  const fullName: string = portfolioData.personal.name;
  const [firstName, ...restName] = fullName.split(" ");
  const lastName = restName.join(" ");
  const initials = fullName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const currentRole: string = portfolioData.personal.subRoles[roleIndex];

  // Rotating roles (drives both the headline role and the role line in the code card)
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolioData.personal.subRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Gentle idle sway when the pointer is not over the hero
  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    const start = performance.now();
    const loop = (now: number) => {
      if (!activeRef.current) {
        const t = (now - start) / 1000;
        rxTarget.set(-8 + Math.sin(t * 0.8) * 4);
        ryTarget.set(16 + Math.cos(t * 0.6) * 7);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, rxTarget, ryTarget]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
    const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
    ryTarget.set(Math.max(-24, Math.min(24, nx * 60)));
    rxTarget.set(Math.max(-16, Math.min(16, -ny * 40)));
    activeRef.current = true;
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        activeRef.current = false;
      }}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-5 md:px-8 pt-28 pb-16 overflow-hidden"
    >
      {/* Soft background glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Two columns on desktop (set inline via useIsDesktop), single column below 1024px */}
      <div
        className="relative z-10 items-center"
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "minmax(0, 1fr) minmax(0, 1fr)" : "minmax(0, 1fr)",
          width: "100%",
          maxWidth: "72rem",
          marginInline: "auto",
          gap: "3.5rem",
        }}
      >
        {/* ---------- Left: copy ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="min-w-0 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1D29]/80 border border-white/10 text-slate-300 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Final-Year CSE Student · Open to Opportunities</span>
          </div>

          <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[0.92] text-6xl sm:text-7xl lg:text-8xl text-white">
            <span className="block">{firstName}</span>
            {lastName && (
              <span className="block" style={{ color: ACCENT }}>
                {lastName}
              </span>
            )}
          </h1>

          <div className="mt-5 h-10 flex items-center overflow-hidden">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-white"
            >
              <Sparkles className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
              <span>{currentRole}</span>
            </motion.div>
          </div>

          <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed max-w-md">
            {portfolioData.personal.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white font-semibold text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: ACCENT }}
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={portfolioData.personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1A1D29] hover:bg-[#222638] border border-white/10 text-slate-100 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" style={{ color: ACCENT }} />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-terminal"))}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl border border-white/10 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors"
              title="Press ~ to open developer CLI"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>CLI [~]</span>
            </button>
          </div>
        </motion.div>

        {/* ---------- Right: 3D code card ---------- */}
        <div
          className="min-w-0 flex items-center justify-center"
          style={{ perspective: 1200, height: 500 }}
          aria-hidden="true"
        >
          <motion.div
            ref={stageRef}
            className="relative"
            style={{
              width: "min(480px, calc(100vw - 5rem))",
              height: 380,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* floor shadow */}
            <div
              className="absolute rounded-[50%] blur-2xl"
              style={{
                left: "8%",
                right: "8%",
                bottom: -64,
                height: 40,
                backgroundColor: "rgba(91,123,255,0.3)",
                transform: "translateZ(-80px)",
              }}
            />

            {/* depth plates */}
            <div className="absolute inset-0 rounded-[22px]" style={{ background: ACCENT, opacity: 0.2, transform: "translateZ(-48px)" }} />
            <div className="absolute inset-0 rounded-[22px]" style={{ background: ACCENT, opacity: 0.4, transform: "translateZ(-32px)" }} />
            <div className="absolute inset-0 rounded-[22px]" style={{ background: ACCENT, opacity: 0.75, transform: "translateZ(-16px)" }} />

            {/* code window: fully opaque so the text stays sharp */}
            <div
              className="absolute inset-0 rounded-[22px] overflow-hidden border border-white/10 flex flex-col"
              style={{
                backgroundColor: "#080B16",
                transform: "translateZ(8px)",
                boxShadow: "0 30px 60px -20px rgba(91,123,255,0.35)",
              }}
            >
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 text-xs font-mono text-slate-500">
                <span className="block w-[11px] h-[11px] rounded-full bg-[#3A4056]" />
                <span className="block w-[11px] h-[11px] rounded-full bg-[#3A4056]" />
                <span className="block w-[11px] h-[11px] rounded-full bg-[#3A4056]" />
                <span className="ml-2">developer.ts</span>
              </div>

              <div className="flex-1 flex flex-col justify-center px-5 py-3 font-mono text-[13px] sm:text-[14px] leading-[1.85] text-slate-100">
                <CodeLine n={1}>
                  <span style={{ color: KEYWORD }}>const</span> developer = {"{"}
                </CodeLine>
                <CodeLine n={2} indent>
                  <span style={{ color: PROP }}>name</span>: <span style={{ color: STRING }}>&quot;{fullName.toUpperCase()}&quot;</span>,
                </CodeLine>
                <CodeLine n={3} indent>
                  <span style={{ color: PROP }}>role</span>:{" "}
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ color: STRING, display: "inline-block" }}
                  >
                    &quot;{currentRole}&quot;
                  </motion.span>
                  ,
                </CodeLine>
                <CodeLine n={4} indent>
                  <span style={{ color: PROP }}>studying</span>: <span style={{ color: STRING }}>&quot;CSE, final year&quot;</span>,
                </CodeLine>
                <CodeLine n={5} indent>
                  <span style={{ color: PROP }}>status</span>: <span style={{ color: STRING }}>&quot;Open to opportunities&quot;</span>,
                </CodeLine>
                <CodeLine n={6} indent>
                  <span style={{ color: PROP }}>focus</span>: <span style={{ color: STRING }}>&quot;{portfolioData.personal.tagline}&quot;</span>,
                </CodeLine>
                <CodeLine n={7}>{"};"}</CodeLine>
              </div>
            </div>

            {/* floating chips: kept at the card edges so they never cover the code */}
            <Chip style={{ top: -22, right: -12 }} z={90} label="Next.js" note="frontend" />
            <Chip style={{ bottom: 36, left: -22 }} z={120} label="Node" note="backend" />
            <Chip style={{ bottom: -22, right: 24 }} z={70} label="Databases" note="data" />

            <div
              className="absolute grid place-items-center text-white font-extrabold text-2xl tracking-tight"
              style={{
                top: 70,
                right: -14,
                width: 60,
                height: 60,
                borderRadius: 18,
                backgroundColor: ACCENT,
                transform: "translateZ(150px) rotate(8deg)",
                boxShadow: "0 22px 30px -10px rgba(91,123,255,0.5)",
              }}
            >
              {initials}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        className="mt-12 flex flex-col items-center gap-2 text-slate-400 hover:text-blue-300 transition-colors cursor-pointer group"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-4 h-4" style={{ color: ACCENT }} />
      </motion.button>
    </section>
  );
}

function CodeLine({
  n,
  indent,
  children,
}: {
  n: number;
  indent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <span className="w-6 shrink-0 text-right pr-3 text-slate-600 select-none">{n}</span>
      <span className="min-w-0 flex-1" style={{ paddingLeft: indent ? "2ch" : 0 }}>
        {children}
      </span>
    </div>
  );
}

function Chip({
  style,
  z,
  label,
  note,
}: {
  style: React.CSSProperties;
  z: number;
  label: string;
  note: string;
}) {
  return (
    <div
      className="absolute flex items-center gap-2 rounded-2xl border border-white/10 px-3.5 py-2.5 text-sm font-bold text-white whitespace-nowrap"
      style={{
        ...style,
        backgroundColor: "#1A1D29",
        transform: `translateZ(${z}px)`,
        boxShadow: "0 18px 30px -12px rgba(91,123,255,0.35)",
      }}
    >
      {label}
      <span className="font-mono text-[11px] font-normal text-slate-400">{note}</span>
    </div>
  );
}