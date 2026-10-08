"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import SkillsShowcase from "./SkillsShowcase";
import ProfileModal from "./ProfileModal";

const V = "#8b5cf6", C = "#06b6d4", G = "#10b981", A = "#f59e0b";

/* ════════════════════════════════════════════════════════
   GLITCH TEXT
════════════════════════════════════════════════════════ */
function GlitchText({ text, style }: { text: string; style?: React.CSSProperties }) {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const run = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    };
    const id = setInterval(run, 3500 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ position: "relative", display: "inline-block", ...style }}>
      {text}
      {glitching && <>
        <span style={{ position: "absolute", inset: 0, color: C, clipPath: "inset(30% 0 40% 0)", transform: "translate(-3px, 1px)", opacity: .8, pointerEvents: "none" }}>{text}</span>
        <span style={{ position: "absolute", inset: 0, color: "#f472b6", clipPath: "inset(60% 0 10% 0)", transform: "translate(3px, -1px)", opacity: .8, pointerEvents: "none" }}>{text}</span>
      </>}
    </span>
  );
}

/* ════════════════════════════════════════════════════════
   SCAN LINE PHOTO
════════════════════════════════════════════════════════ */
function ScanPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { if (inView) setTimeout(() => setRevealed(true), 300); }, [inView]);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", maxWidth: 360, margin: "0 auto" }}>
      {/* outer glow frame */}
      <div style={{
        position: "absolute", inset: -2,
        background: `linear-gradient(135deg, ${V}, ${C}, ${G}, ${V})`,
        borderRadius: 24,
        backgroundSize: "300% 300%",
        animation: "gradShift 4s ease infinite",
        zIndex: 0,
      }} />

      <style>{`
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes scanDown { 0%{top:0%} 100%{top:100%} }
      `}</style>

      {/* photo box */}
      <div style={{ position: "relative", zIndex: 1, borderRadius: 22, overflow: "hidden", background: "#050510" }}>
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={revealed ? { clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", aspectRatio: "3/4" }}
        >
          <Image src="/images/profile.jpeg" alt={portfolioData.personal.name} fill unoptimized sizes="(max-width: 900px) 90vw, 360px" style={{ objectFit: "cover", objectPosition: "top" }} />

          {/* scanline texture */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,.0) 0px,rgba(0,0,0,.0) 2px,rgba(0,0,0,.06) 2px,rgba(0,0,0,.06) 4px)", pointerEvents: "none" }} />

          {/* scan beam */}
          {revealed && (
            <div style={{ position: "absolute", left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C}cc, transparent)`, animation: "scanDown 2.5s linear infinite", animationDelay: "0.5s", pointerEvents: "none" }} />
          )}

          {/* bottom name overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "48px 20px 20px", background: "linear-gradient(transparent, rgba(5,5,16,.95))" }}>
            <p style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>{portfolioData.personal.name}</p>
            <p style={{ fontSize: 11, fontFamily: "monospace", color: C, marginTop: 4 }}>Full-Stack · AI · Data Science</p>
          </div>
        </motion.div>

        {/* corner brackets */}
        {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h], i) => (
          <div key={i} style={{ position: "absolute", [v]: 10, [h]: 10, width: 18, height: 18,
            borderTop: v === "top" ? `2px solid ${C}` : "none",
            borderBottom: v === "bottom" ? `2px solid ${C}` : "none",
            borderLeft: h === "left" ? `2px solid ${C}` : "none",
            borderRight: h === "right" ? `2px solid ${C}` : "none",
            zIndex: 10,
          }} />
        ))}
      </div>

      {/* floating badge — OPEN TO WORK */}
      <motion.div
        className="ab-badge-open"
        initial={{ opacity: 0, x: 30, y: -10 }}
        animate={revealed ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
        style={{ position: "absolute", background: "rgba(5,5,20,.92)", border: `1px solid ${G}55`, borderRadius: 14, padding: "12px 16px", backdropFilter: "blur(16px)", zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <motion.div animate={{ opacity: [1, .2, 1] }} transition={{ repeat: Infinity, duration: 1.3 }} style={{ width: 7, height: 7, borderRadius: "50%", background: G, boxShadow: `0 0 8px ${G}` }} />
          <span style={{ fontSize: 11, fontFamily: "monospace", color: G, fontWeight: 700 }}>OPEN TO WORK</span>
        </div>
      </motion.div>

      {/* floating badge — PROJECTS */}
      <motion.div
        className="ab-badge-proj"
        initial={{ opacity: 0, x: -30, y: 10 }}
        animate={revealed ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
        style={{ position: "absolute", background: "rgba(5,5,20,.92)", border: `1px solid ${V}55`, borderRadius: 14, padding: "12px 16px", backdropFilter: "blur(16px)", zIndex: 20 }}>
        <p style={{ fontSize: 22, fontWeight: 900, color: V, lineHeight: 1 }}>{portfolioData.personal.stats.projects}+</p>
        <p style={{ fontSize: 10, fontFamily: "monospace", color: "#64748b", marginTop: 2 }}>PROJECTS</p>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ANIMATED STAT
════════════════════════════════════════════════════════ */
interface AnimStatProps {
  value: number | string;
  suffix: string;
  label: string;
  color: string;
  idx: number;
}

function AnimStat({ value, suffix, label, color, idx }: AnimStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const raw = String(value);
  const m = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = m ? parseFloat(m[1]) : NaN;
  const tail = m ? m[2] : "";
  const isNum = Number.isFinite(target);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!inView) { setCount(0); setDone(false); return; }
    if (!isNum) { setDone(true); return; }
    const ctrl = animate(0, target, { duration: 1.6, delay: idx * .12, ease: "easeOut", onUpdate: v => setCount(Math.round(v)), onComplete: () => setDone(true) });
    return () => ctrl.stop();
  }, [inView]); // eslint-disable-line

  return (
    <div ref={ref} className="ab-stat" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <div style={{ position: "relative", width: 110, height: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* ring */}
        <svg style={{ position: "absolute", inset: 0, opacity: done ? 0.6 : 0.1, transition: "opacity .6s", transform: "rotate(-90deg)" }} width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="52" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="327" strokeDashoffset={done ? 0 : 327} style={{ transition: "stroke-dashoffset 1.6s ease" }} />
        </svg>
        <div style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: done ? color : "#fff", textShadow: done ? `0 0 28px ${color}66` : "none", transition: "all .5s", position: "relative", zIndex: 1 }}>
          {isNum ? count : raw}{isNum ? tail : ""}{suffix}
        </div>
      </div>
      <div style={{ fontSize: 11, fontFamily: "monospace", color: "#475569", letterSpacing: "0.06em" }}>{label}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   STAGGERED LETTER HEADING
════════════════════════════════════════════════════════ */
function SplitHeading({ text, gradient }: { text: string; gradient?: boolean }) {
  return (
    <span style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.035, type: "spring", stiffness: 180, damping: 18 }}
          style={{
            display: "inline-block",
            ...(gradient ? { background: "linear-gradient(135deg,#fff 30%,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "#fff" }),
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
        >{ch === " " ? " " : ch}</motion.span>
      ))}
    </span>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════ */
export default function AboutSection() {
  const [showModal, setShowModal] = useState(false);

  const stats = [
    { label: "Projects", value: portfolioData.personal.stats.projects, suffix: "+", color: V },
    { label: "Certifications", value: portfolioData.personal.stats.certifications, suffix: "", color: C },
    { label: "Years of Non-Industrial Coding", value: portfolioData.personal.stats.learningYears, suffix: "", color: G },
    { label: "Tech Stack", value: portfolioData.personal.stats.Technologies, suffix: "+", color: A },
  ];
  const lead: string = portfolioData.personal.bio[0];

  return (
    <>
      <style>{`
        /* ---------- desktop defaults ---------- */
        .ab-hero { position: relative; min-height: 100vh; display: flex; align-items: stretch; }
        .ab-grid { position: relative; z-index: 10; width: 100%; max-width: 1280px; margin: 0 auto; padding: 100px clamp(20px,5vw,64px) 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .ab-left { display: flex; flex-direction: column; min-width: 0; }
        .ab-h2 { font-size: clamp(36px, 5.5vw, 76px); font-weight: 900; line-height: 1.0; letter-spacing: -0.04em; margin: 0 0 6px; perspective: 400px; }
        .ab-lead { font-size: clamp(14px, 1.3vw, 16px); color: #64748b; line-height: 1.85; max-width: 440px; margin: 28px 0 40px; }
        .ab-btn { align-self: flex-start; }
        .ab-photo-col { display: flex; justify-content: center; padding-left: 20px; min-width: 0; }
        .ab-badge-open { top: 12%; right: -18%; }
        .ab-badge-proj { bottom: 18%; left: -16%; }

        .ab-stats { display: grid; grid-template-columns: repeat(4, 1fr); }
        .ab-stat-cell { border-right: 1px solid rgba(255,255,255,.05); }
        .ab-stat-cell:last-child { border-right: none; }
        .ab-stat { padding: 32px 16px; }

        /* ---------- tablet & mobile ---------- */
        @media (max-width: 900px) {
          .ab-hero { min-height: auto; }
          .ab-bg-left { clip-path: none !important; }
          .ab-bg-right, .ab-line { display: none !important; }
          .ab-grid { grid-template-columns: 1fr; gap: 44px; padding-top: 110px; padding-bottom: 56px; }
          .ab-h2 { font-size: clamp(40px, 12vw, 64px); }
          .ab-lead { max-width: 100%; margin: 22px 0 30px; }
          .ab-photo-col { padding-left: 0; }
          .ab-badge-open { top: 8%; right: 8px; }
          .ab-badge-proj { bottom: 16%; left: 8px; }

          .ab-stats { grid-template-columns: repeat(2, 1fr); }
          .ab-stat-cell:nth-child(2n) { border-right: none; }
          .ab-stat-cell:nth-child(-n+2) { border-bottom: 1px solid rgba(255,255,255,.05); }
          .ab-stat { padding: 24px 8px; }
        }

        /* ---------- small phones ---------- */
        @media (max-width: 560px) {
          .ab-grid { padding-top: 96px; gap: 36px; }
          .ab-btn { align-self: stretch; text-align: center; }
          .ab-badge-open, .ab-badge-proj { padding: 9px 12px !important; }
        }
      `}</style>

      <section id="about" style={{ position: "relative", overflow: "hidden" }}>

        {/* ══ SECTION 1: DIAGONAL SPLIT HERO ══ */}
        <div className="ab-hero">

          {/* diagonal clip left — dark */}
          <div className="ab-bg-left" style={{ position: "absolute", inset: 0, background: "rgba(8,6,24,1)", clipPath: "polygon(0 0, 58% 0, 45% 100%, 0 100%)", zIndex: 0 }} />
          {/* diagonal clip right — slightly lighter */}
          <div className="ab-bg-right" style={{ position: "absolute", inset: 0, background: "rgba(6,10,30,1)", clipPath: "polygon(58% 0, 100% 0, 100% 100%, 45% 100%)", zIndex: 0 }} />
          {/* diagonal accent line */}
          <div className="ab-line" style={{ position: "absolute", top: 0, bottom: 0, left: "calc(45% + 1px)", width: 2, background: `linear-gradient(180deg, transparent, ${V}, ${C}, ${G}, transparent)`, zIndex: 2, transform: "skewX(-8deg) translateX(-50%)", transformOrigin: "top" }} />

          {/* ambient glows */}
          <div style={{ position: "absolute", top: "10%", left: "5%", width: "40vw", height: "40vw", borderRadius: "50%", background: `radial-gradient(circle, ${V}18 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "35vw", height: "35vw", borderRadius: "50%", background: `radial-gradient(circle, ${C}14 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />

          <div className="ab-grid">

            {/* LEFT */}
            <div className="ab-left">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .1 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, background: `${V}12`, border: `1px solid ${V}35`, fontSize: 11, fontFamily: "monospace", color: "#a78bfa", letterSpacing: "0.14em", marginBottom: 24, width: "fit-content" }}>
                <motion.span animate={{ opacity: [1, .2, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: 6, height: 6, borderRadius: "50%", background: V, display: "block" }} />
                ABOUT ME
              </motion.div>

              <h2 className="ab-h2">
                <SplitHeading text="Passionate" />
                <br />
                <SplitHeading text="Tech" />
                {" "}
                <GlitchText text="Explorer" style={{ fontWeight: 900, background: `linear-gradient(120deg, ${V}, ${C})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} />
              </h2>

              <motion.p className="ab-lead" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .8 }}>
                {lead}
              </motion.p>

              {/* info rows */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .9 }}
                style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
                {[
                  { k: "Degree", v: "B.Tech CSE — Final Year", c: V },
                  { k: "Location", v: portfolioData.personal.location, c: C },
                  { k: "Status", v: "Open to Opportunities", c: G },
                ].map(row => (
                  <div key={row.k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "#334155", width: 70, flexShrink: 0 }}>{row.k}</span>
                    <div style={{ height: 1, width: 20, background: `${row.c}55`, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: row.c, fontFamily: "monospace", fontWeight: 600, minWidth: 0 }}>{row.v}</span>
                  </div>
                ))}
              </motion.div>

              <motion.button
                className="ab-btn"
                onClick={() => setShowModal(true)}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1 }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }}
                style={{ padding: "14px 36px", background: `linear-gradient(120deg, #7c3aed, #0891b2)`, border: "none", borderRadius: 14, color: "#fff", fontSize: 14, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", boxShadow: `0 12px 40px -8px ${V}88` }}
              >
                VIEW FULL PROFILE →
              </motion.button>
            </div>

            {/* RIGHT — scan photo */}
            <motion.div className="ab-photo-col" initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1], delay: .3 }}>
              <ScanPhoto />
            </motion.div>
          </div>
        </div>

        {/* ══ SECTION 2: STATS STRIP ══ */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", borderBottom: "1px solid rgba(255,255,255,.05)", background: "rgba(255,255,255,.015)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(12px,5vw,64px)" }}>
            <div className="ab-stats">
              {stats.map((s, i) => (
                <div key={i} className="ab-stat-cell">
                  <AnimStat idx={i} {...s} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ SECTION 3: SKILLS CUBE + LIVE TERMINAL ══ */}
        <SkillsShowcase />

      </section>

      <AnimatePresence>
        {showModal && <ProfileModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}