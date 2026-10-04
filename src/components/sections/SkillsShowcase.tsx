"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, Cpu, Database, Globe, GitBranch, Terminal,
  type LucideIcon,
} from "lucide-react";

/* ── colors ── */
const VIOLET = "#8b5cf6";
const CYAN = "#06b6d4";
const GREEN = "#10b981";
const AMBER = "#f59e0b";
const PINK = "#f472b6";
const INDIGO = "#818cf8";

/* ── skills (order = cube faces 0..5) ── */
type Skill = { label: string; color: string; icon: LucideIcon };

const SKILLS: Skill[] = [
  { label: "Full-Stack", color: VIOLET, icon: Code2 },
  { label: "AI / ML", color: CYAN, icon: Cpu },
  { label: "Data Science ", color: GREEN, icon: Database },
  { label: "Web Development ", color: AMBER, icon: Globe },
  { label: "Cloud", color: PINK, icon: GitBranch },
  { label: "Backend", color: INDIGO, icon: Terminal },
];

const HALF = "translateZ(calc(var(--cube) / 2))";

/* where each face sits on the cube */
const FACE_TRANSFORMS = [
  HALF,
  `rotateY(90deg) ${HALF}`,
  `rotateY(180deg) ${HALF}`,
  `rotateY(-90deg) ${HALF}`,
  `rotateX(90deg) ${HALF}`,
  `rotateX(-90deg) ${HALF}`,
];

/* rotation needed to bring each face to the front */
const TARGETS = [
  { x: 0, y: 0 },
  { x: 0, y: -90 },
  { x: 0, y: 180 },
  { x: 0, y: 90 },
  { x: -90, y: 0 },
  { x: 90, y: 0 },
];

/* shortest way to rotate from `cur` to `target`, so the cube never spins backwards */
const nearest = (cur: number, target: number) =>
  cur + ((((target - cur) % 360) + 540) % 360 - 180);

const INITIAL_SKILL = 3; // "Web Dev"
const AUTO_ADVANCE_MS = 3200;

/* ── terminal script ── */
type Line = { kind: "cmd" | "out"; text: string; color?: string };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "Kiran Eegala — Full-Stack Developer & AI Enthusiast", color: "#f1f5f9" },
  { kind: "cmd", text: "cat skills.txt" },
  { kind: "out", text: "React · Next.js · Node.js · Python · ML · Cloud", color: CYAN },
  { kind: "cmd", text: "cat status.txt" },
  { kind: "out", text: "Open to full-time roles & internships ✓", color: AMBER },
];

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: 12,
  flexWrap: "wrap",
};

function Cursor() {
  return (
    <span style={{ display: "inline-block", color: CYAN, animation: "skBlink 1s steps(1) infinite" }}>
      _
    </span>
  );
}

/* ════════════════════════════════════════════════════════
   LIVE TERMINAL
════════════════════════════════════════════════════════ */
function LiveTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [lines, setLines] = useState<string[]>([]);
  const [typingIndex, setTypingIndex] = useState(-1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;

    const setLine = (i: number, value: string) =>
      setLines((prev) => {
        const next = [...prev];
        next[i] = value;
        return next;
      });

    (async () => {
      setLines([]);
      setDone(false);
      await sleep(400);

      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled) return;
        const line = SCRIPT[i];

        if (line.kind === "cmd") {
          setTypingIndex(i);
          for (let c = 1; c <= line.text.length; c++) {
            if (cancelled) return;
            setLine(i, line.text.slice(0, c));
            await sleep(60);
          }
          setTypingIndex(-1);
          await sleep(350);
        } else {
          setLine(i, line.text);
          await sleep(500);
        }
      }

      if (!cancelled) setDone(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [inView]);

  return (
    <div ref={ref} className="sk-term-wrap">
      {/* label */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 18,
          fontFamily: "monospace", fontSize: 13, letterSpacing: "0.22em", color: CYAN,
        }}
      >
        <span
          style={{
            width: 8, height: 8, background: CYAN, display: "block",
            transform: "rotate(45deg)", boxShadow: `0 0 10px ${CYAN}`,
          }}
        />
        LIVE TERMINAL
      </div>

      {/* window */}
      <div
        style={{
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,.08)",
          background: "rgba(8,8,22,.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          overflow: "hidden",
          boxShadow: "0 30px 70px -20px rgba(0,0,0,.7)",
        }}
      >
        {/* title bar */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 10, padding: "18px 24px",
            background: "rgba(255,255,255,.03)",
            borderBottom: "1px solid rgba(255,255,255,.07)",
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((bg) => (
            <span key={bg} style={{ width: 15, height: 15, borderRadius: "50%", background: bg }} />
          ))}
          <span style={{ marginLeft: 16, fontFamily: "monospace", fontSize: 13, color: "#64748b" }}>
            kiran@portfolio:~
          </span>
        </div>

        {/* body */}
        <div
          style={{
            padding: "28px 28px 32px", minHeight: 320,
            display: "flex", flexDirection: "column", gap: 16,
            fontFamily: "monospace", fontSize: "clamp(13px, 1.25vw, 17px)",
          }}
        >
          {SCRIPT.map((line, i) => {
            const text = lines[i];
            if (text === undefined) return null;

            return line.kind === "cmd" ? (
              <div key={i} style={rowStyle}>
                <span style={{ color: "#14b8a6" }}>$</span>
                <span style={{ color: "#67e8f9" }}>
                  {text}
                  {typingIndex === i && <Cursor />}
                </span>
              </div>
            ) : (
              <div key={i} style={rowStyle}>
                <span style={{ color: CYAN }}>&gt;</span>
                <span style={{ color: line.color }}>{text}</span>
              </div>
            );
          })}

          {done && (
            <div style={rowStyle}>
              <span style={{ color: "#14b8a6" }}>$</span>
              <Cursor />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN: CUBE + LIST + TERMINAL
════════════════════════════════════════════════════════ */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

export default function SkillsShowcase() {
  const [active, setActive] = useState(INITIAL_SKILL);
  const [rot, setRot] = useState(TARGETS[INITIAL_SKILL]);
  const paused = useRef(false);

  const pause = () => { paused.current = true; };
  const resume = () => { paused.current = false; };

  /* rotate cube when the active skill changes */
  useEffect(() => {
    const target = TARGETS[active];
    setRot((prev) => ({ x: nearest(prev.x, target.x), y: nearest(prev.y, target.y) }));
  }, [active]);

  /* auto-advance (pauses while hovering the cube or the list) */
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % SKILLS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, []);

  const activeColor = SKILLS[active].color;

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px clamp(20px,5vw,64px) 80px" }}>
      <style>{`
        @keyframes skBlink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }

        .sk-grid {
          display: grid;
          grid-template-columns: minmax(0, 360px) 200px minmax(0, 1fr);
          gap: clamp(24px, 4vw, 64px);
          align-items: center;
        }
        .sk-scene {
          --cube: clamp(180px, 22vw, 290px);
          position: relative;
          height: calc(var(--cube) * 1.35);
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1100px;
        }
        .sk-list { display: flex; flex-direction: column; gap: 14px; }
        .sk-term-wrap { min-width: 0; }

        @media (max-width: 980px) {
          .sk-grid { grid-template-columns: 1fr; justify-items: center; gap: 36px; }
          .sk-scene { width: 100%; }
          .sk-list { width: 100%; max-width: 280px; }
          .sk-term-wrap { width: 100%; }
        }
      `}</style>

      <div className="sk-grid">
        {/* ───────── 3D CUBE ───────── */}
        <motion.div {...reveal()} className="sk-scene" onMouseEnter={pause} onMouseLeave={resume}>
          {/* glow behind cube */}
          <div
            style={{
              position: "absolute", width: "130%", aspectRatio: "1", borderRadius: "50%",
              background: `radial-gradient(circle, ${activeColor}30 0%, transparent 65%)`,
              filter: "blur(30px)", pointerEvents: "none",
            }}
          />

          {/* floor shadow */}
          <div
            style={{
              position: "absolute", bottom: "6%", width: "70%", height: 26, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(0,0,0,.65), transparent 70%)",
              filter: "blur(8px)", pointerEvents: "none",
            }}
          />

          {/* float */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* static tilt (so you can see the top/bottom edges) */}
            <div style={{ transformStyle: "preserve-3d", transform: "rotateX(8deg) rotateY(-10deg)" }}>
              {/* rotating cube */}
              <motion.div
                animate={{ rotateX: rot.x, rotateY: rot.y }}
                transition={{ type: "spring", stiffness: 55, damping: 15 }}
                style={{
                  position: "relative",
                  width: "var(--cube)",
                  height: "var(--cube)",
                  transformStyle: "preserve-3d",
                }}
              >
                {SKILLS.map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.label}
                      style={{
                        position: "absolute", inset: 0,
                        transform: FACE_TRANSFORMS[i],
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        borderRadius: 22,
                        background: "linear-gradient(150deg, rgba(22,20,56,.96), rgba(8,8,26,.97))",
                        border: `1px solid ${skill.color}55`,
                        boxShadow: `inset 0 0 44px ${skill.color}16`,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: 18,
                      }}
                    >
                      <div
                        style={{
                          width: "calc(var(--cube) * .3)",
                          height: "calc(var(--cube) * .3)",
                          borderRadius: 22,
                          background: `${skill.color}1c`,
                          border: `1px solid ${skill.color}55`,
                          boxShadow: `0 0 30px ${skill.color}25`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <Icon style={{ width: "52%", height: "52%", color: skill.color }} strokeWidth={1.8} />
                      </div>
                      <p
                        style={{
                          margin: 0, fontFamily: "monospace", fontWeight: 800,
                          fontSize: "clamp(13px, 1.5vw, 20px)", letterSpacing: "0.14em",
                          color: skill.color,
                        }}
                      >
                        {skill.label}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ───────── SKILL LIST ───────── */}
        <motion.div {...reveal(0.1)} className="sk-list" onMouseEnter={pause} onMouseLeave={resume}>
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            const on = active === i;
            return (
              <button
                key={skill.label}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: "none", border: "none", padding: 0,
                  cursor: "pointer", textAlign: "left",
                  transform: on ? "translateX(6px)" : "translateX(0)",
                  transition: "transform .3s",
                }}
              >
                <span
                  style={{
                    width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${skill.color}${on ? "26" : "14"}`,
                    border: `1px solid ${skill.color}${on ? "99" : "40"}`,
                    boxShadow: on ? `0 0 22px ${skill.color}44` : "none",
                    transition: "all .3s",
                  }}
                >
                  <Icon style={{ width: 20, height: 20, color: skill.color }} />
                </span>
                <span
                  style={{
                    fontFamily: "monospace", fontSize: 15,
                    color: on ? "#fff" : "#94a3b8", transition: "color .3s",
                  }}
                >
                  {skill.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ───────── TERMINAL ───────── */}
        <motion.div {...reveal(0.2)} style={{ minWidth: 0, width: "100%" }}>
          <LiveTerminal />
        </motion.div>
      </div>
    </div>
  );
}