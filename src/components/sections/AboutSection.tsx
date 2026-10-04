"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  User, Code2, Award, GitCommit, Calendar,
  X, GraduationCap, Briefcase, Wrench, Heart,
  ExternalLink, Star,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

/* ─── Colors used for the vertical lines / dots ──────────────── */
const LINE_COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

/* ─── Education ──────────────────────────────────────────────── */
const education = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institute: "GIET Engineering College, Rajahmundry",
    status: "Pursuing",
    score: "CGPA: 8.1",
    link: "https://gietec.ac.in/",
  },
  {
    degree: "Diploma in Computer Engineering",
    institute: "Government Polytechnic College, Rebaka, Anakapalli",
    status: "Completed",
    score: "79.4%",
    link: "https://govtpolyanakapalli.ac.in/",
  },
  {
    degree: "10th Grade — Secondary School Education",
    institute: "Zilla Parishath High School, Anandapuram",
    status: "Completed",
    score: "550 / 600",
    link: "https://schools.org.in/visakhapatnam/28132502007/zphs-anandapuram.html",
  },
];

/* ─── Experience ─────────────────────────────────────────────── */
const experience = [
  {
    featured: true,
    role: "Full-Stack Developer Intern",
    company: "Vinukoti Business Solutions",
    duration: "6 months · During Diploma",
    points: [
      "Worked on real-world web applications: RecruitUs and Campus Connect",
      "Built and maintained both frontend and backend features",
      // add your own points here
    ],
    tags: ["Full-Stack", "Frontend", "Backend", "RecruitUs", "Campus Connect"],
  },
  { role: "AI & Data Science Intern", company: "Pantech Prolabs India Pvt Ltd" },
  { role: "Web Development & Cloud Integration Intern", company: "SkillDzire" },
  { role: "Java Full Stack Development Intern", company: "BlackBucks" },
];

/* ─── Skills ─────────────────────────────────────────────────── */
const softSkills = [
  { name: "Time Management", desc: "Balances multiple projects and deadlines effectively" },
  { name: "Decision Making", desc: "Analyzes situations to make well-informed decisions" },
  { name: "Problem Solving", desc: "Tackles complex coding and debugging challenges with ease" },
];

const strengths = [
  { label: "Quick Learner", desc: "Picks up new technologies and concepts rapidly" },
  { label: "Adaptability", desc: "Adjusts to new tools, technologies, and environments" },
  { label: "Persistence", desc: "Keeps working on a problem until a solution is found" },
  { label: "Curiosity", desc: "Loves exploring and understanding how new things work" },
  { label: "Creativity", desc: "Enjoys building innovative projects and coming up with new ideas" },
  { label: "Self-Motivation", desc: "Takes initiative to learn and improve independently" },
  { label: "Continuous Learning", desc: "Consistently improves technical and communication skills" },
  { label: "Positive Attitude", desc: "Stays open to feedback and learns from mistakes" },
];

/* ─── Hobbies ────────────────────────────────────────────────── */
const hobbies = [
  { emoji: "🎵", title: "Singing", desc: "Enjoys singing as a way to express creativity and unwind." },
  { emoji: "💻", title: "Learning New Technologies", desc: "Constantly exploring new frameworks, tools, and trends in tech." },
  { emoji: "🌿", title: "Exploring Nature & Travelling", desc: "Loves discovering new places, experiencing different cultures, and spending time outdoors." },
];

/* ─── Tabs ───────────────────────────────────────────────────── */
const TABS = [
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "hobbies", label: "Hobbies", icon: Heart },
];

/* ─── Tab Content ────────────────────────────────────────────── */
function ModalContent({ tab }: { tab: string }) {
  /* ── Education ── */
  if (tab === "education") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {education.map((edu, i) => {
          const color = LINE_COLORS[i % LINE_COLORS.length];
          return (
            <div
              key={i}
              style={{
                borderLeft: `3px solid ${color}`,
                paddingLeft: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-white text-base leading-snug">{edu.degree}</p>
                <a
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit institute website"
                  className="shrink-0 text-slate-400 hover:text-cyan-400 transition-colors mt-0.5"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-slate-400">{edu.institute}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "4px" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: color,
                    display: "inline-block",
                  }}
                />
                <span className="text-xs font-mono text-slate-400">{edu.status}</span>
                <span className="text-xs font-mono text-slate-300 ml-auto">{edu.score}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /* ── Experience ── */
  if (tab === "experience") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Internships</p>

        {experience.map((exp: any, i: number) => {
          const color = LINE_COLORS[i % LINE_COLORS.length];

          /* ⭐ Featured card (Full-Stack Developer Intern) */
          if (exp.featured) {
            return (
              <div
                key={i}
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.06))",
                  border: "1px solid rgba(139,92,246,0.35)",
                  borderLeft: "4px solid #8b5cf6",
                  borderRadius: "16px",
                  padding: "24px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <p className="font-bold text-white text-lg">{exp.role}</p>
                    <p className="text-sm font-semibold" style={{ color: "#a78bfa" }}>
                      {exp.company}
                      <span className="text-slate-400 font-normal"> · {exp.duration}</span>
                    </p>
                  </div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      border: "1px solid rgba(251,191,36,0.4)",
                      background: "rgba(251,191,36,0.1)",
                      color: "#fbbf24",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Real-World Experience
                  </span>
                </div>

                <ul style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "4px", listStyle: "none" }}>
                  {exp.points.map((p: string, k: number) => (
                    <li
                      key={k}
                      className="text-sm text-slate-300 leading-relaxed"
                      style={{ display: "flex", gap: "10px" }}
                    >
                      <span style={{ color: "#8b5cf6" }}>•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingTop: "4px" }}>
                  {exp.tags.map((t: string) => (
                    <span
                      key={t}
                      style={{
                        padding: "5px 14px",
                        borderRadius: "999px",
                        border: "1px solid rgba(139,92,246,0.4)",
                        background: "rgba(139,92,246,0.12)",
                        color: "#c4b5fd",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          }

          /* Normal internship cards */
          return (
            <div
              key={i}
              style={{
                borderLeft: `3px solid ${color}`,
                paddingLeft: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <p className="font-semibold text-white text-base">{exp.role}</p>
              <p className="text-sm text-slate-400">{exp.company}</p>
            </div>
          );
        })}
      </div>
    );
  }

  /* ── Skills ── */
  if (tab === "skills") {
    const headingStyle = (c: string, bg: string, border: string): React.CSSProperties => ({
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 18px",
      borderRadius: "999px",
      color: c,
      background: bg,
      border: `1px solid ${border}`,
      fontSize: "13px",
      fontWeight: 700,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      marginBottom: "24px",
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
        {/* Soft Skills */}
        <div>
          <span className="font-mono" style={headingStyle("#22d3ee", "rgba(34,211,238,0.12)", "rgba(34,211,238,0.4)")}>
            <Wrench className="w-4 h-4" />
            Soft Skills
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {softSkills.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <span
                  style={{
                    marginTop: "8px",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#22d3ee",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p className="text-base font-semibold text-white">{s.name}</p>
                  <p className="text-sm text-slate-400" style={{ marginTop: "4px" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div>
          <span className="font-mono" style={headingStyle("#a78bfa", "rgba(139,92,246,0.12)", "rgba(139,92,246,0.4)")}>
            <Star className="w-4 h-4" />
            Strengths
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "16px" }}>
            {strengths.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 18px",
                  borderRadius: "14px",
                  background: "rgba(15,23,42,0.6)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Star className="w-4 h-4 text-violet-400" />
                  <p className="text-sm font-semibold text-white">{s.label}</p>
                </div>
                <p className="text-xs text-slate-400 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Hobbies ── */
  if (tab === "hobbies") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {hobbies.map((h, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/60 border border-white/5"
          >
            <span className="text-3xl">{h.emoji}</span>
            <div>
              <p className="text-base font-semibold text-white">{h.title}</p>
              <p className="text-sm text-slate-400 leading-relaxed mt-1">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

/* ─── Modal ──────────────────────────────────────────────────── */
function DetailsModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("education");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!mounted) return null;

  const content = (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(0.75rem, 3vw, 2rem)",
        backgroundColor: "rgba(0,0,0,0.92)",
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0a0a18",
          position: "relative",
          width: "100%",
          maxWidth: "56rem",
          borderRadius: "1.5rem",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b border-white/10"
          style={{ padding: "28px 32px 20px 32px" }}
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">About Kiran Eegala</h2>
            <p className="text-xs font-mono text-cyan-400 mt-1">Final-Year B.Tech CSE</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto"
          style={{ padding: "20px 32px 20px 32px" }}
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono transition-all ${
                  active
                    ? "bg-slate-800 text-white border border-white/10"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div
          style={{
            padding: "16px 32px 32px 32px",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ModalContent tab={activeTab} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(content, document.body);
}

/* ─── Scroll-triggered Stat Card ─────────────────────────────── */
const STAT_ACCENTS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

function StatCard({ stat, idx }: { stat: any; idx: number }) {
  const Icon = stat.icon;
  const accent = STAT_ACCENTS[idx % STAT_ACCENTS.length];
  const ref = useRef<HTMLDivElement>(null);

  // true while the card is on screen (replays every time the user scrolls back)
  const inView = useInView(ref, { amount: 0.5 });

  // works for numbers (4) and strings like "20+"
  const raw = String(stat.value);
  const m = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = m ? parseFloat(m[1]) : NaN;
  const tail = m ? m[2] : "";
  const isNumeric = Number.isFinite(target);

  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      setDone(false);
      return;
    }
    if (!isNumeric) {
      setDone(true);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.8,
      delay: idx * 0.15,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={ref}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 50, scale: 0.9, filter: "blur(6px)" }
      }
      transition={{ type: "spring", stiffness: 120, damping: 16, delay: idx * 0.15 }}
      className="backdrop-blur-xl flex flex-col items-center text-center"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "28px 20px 32px 20px",
        borderRadius: "18px",
        gap: "10px",
        background: "rgba(2,6,23,0.45)",
        border: `1px solid ${done ? accent + "88" : "rgba(255,255,255,0.1)"}`,
        boxShadow: done ? `0 0 35px ${accent}40` : "0 0 0 rgba(0,0,0,0)",
        transition: "border-color .6s ease, box-shadow .6s ease",
      }}
    >
      {/* Light sweep that runs across the card when it appears */}
      <motion.div
        initial={false}
        animate={inView ? { x: ["-120%", "320%"] } : { x: "-120%" }}
        transition={{ duration: 1.4, delay: idx * 0.15 + 0.2, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "40%",
          pointerEvents: "none",
          background: `linear-gradient(100deg, transparent, ${accent}55, transparent)`,
          transform: "skewX(-20deg)",
        }}
      />

      {/* Icon pops in with a spin */}
      <motion.div
        initial={false}
        animate={inView ? { scale: [0, 1.3, 1], rotate: [-180, 10, 0] } : { scale: 0, rotate: -180 }}
        transition={{ duration: 0.8, delay: idx * 0.15 + 0.2, ease: "easeOut" }}
        className={`p-3 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-md`}
        style={{ position: "relative", boxShadow: done ? `0 8px 24px ${accent}80` : undefined }}
      >
        <Icon className="w-5 h-5" />
      </motion.div>

      {/* Number counting up */}
      <div
        className="text-3xl font-black font-display tracking-tight"
        style={{
          position: "relative",
          color: done ? accent : "#fff",
          textShadow: done ? `0 0 18px ${accent}99` : "none",
          transition: "color .6s ease, text-shadow .6s ease",
        }}
      >
        {isNumeric ? count : raw}
        {isNumeric ? tail : ""}
        {stat.suffix}
      </div>

      {/* Label */}
      <div className="text-xs font-mono text-slate-400" style={{ position: "relative" }}>
        {stat.label}
      </div>

      {/* Progress bar that fills while counting */}
      <motion.div
        initial={false}
        animate={{ width: inView ? "100%" : "0%" }}
        transition={{ duration: 1.8, delay: idx * 0.15, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }}
      />
    </motion.div>
  );
}

/* ─── Orbit: tags travel around the photo with fake depth ─────── */
function useIsDesktop(breakpoint = 768) {
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

function OrbitChip({
  time,
  phase,
  rx,
  ry,
  color,
  children,
}: {
  time: MotionValue<number>;
  phase: number; // where on the ellipse this chip starts (radians)
  rx: number;
  ry: number;
  color: string;
  children: React.ReactNode;
}) {
  // Position on the ellipse
  const x = useTransform(time, (t) => Math.cos(t + phase) * rx);
  const y = useTransform(time, (t) => Math.sin(t + phase) * ry);
  // sin > 0 means the chip is on the near side (in front of the photo)
  const depth = useTransform(time, (t) => (Math.sin(t + phase) + 1) / 2); // 0 (far) .. 1 (near)
  const scale = useTransform(depth, (d) => 0.78 + d * 0.3);
  const opacity = useTransform(depth, (d) => 0.45 + d * 0.55);
  const zIndex = useTransform(depth, (d) => Math.round(d * 20)); // photo sits at z-index 10

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 0,
        height: 0,
        x,
        y,
        scale,
        opacity,
        zIndex,
      }}
    >
      <div
        className="text-xs sm:text-sm font-mono whitespace-nowrap rounded-full"
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          padding: "8px 16px",
          color,
          background: "rgba(8,11,22,0.88)",
          border: `1px solid ${color}66`,
          boxShadow: `0 14px 26px -12px ${color}99`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function OrbitStage({ onOpenDetails }: { onOpenDetails: () => void }) {
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const pausedRef = useRef(false);
  const time = useMotionValue(0);

  // Slow, continuous travel. Pauses while the cursor is over the stage.
  useAnimationFrame((_, delta) => {
    if (reduceMotion || pausedRef.current) return;
    time.set(time.get() + (delta / 1000) * 0.32);
  });

  const rx = isDesktop ? 330 : 120;
  const ry = isDesktop ? 96 : 56;
  const photo = isDesktop ? 200 : 150;

  const chips = [
    { label: "⚡ Problem Solver", color: "#22d3ee" },
    { label: "🚀 Full-Stack Engineer", color: "#a78bfa" },
    { label: "▤ Data Science", color: "#34d399" },
    { label: "🤖 AI / ML Enthusiast", color: "#f472b6" },
    { label: `📍 ${portfolioData.personal.location}`, color: "#fbbf24" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div
        onPointerEnter={() => (pausedRef.current = true)}
        onPointerLeave={() => (pausedRef.current = false)}
        className="relative w-full"
        style={{ height: isDesktop ? 340 : 270, overflowX: "clip" }}
      >
        {/* glow behind everything */}
        <div
          className="absolute pointer-events-none rounded-full blur-[110px]"
          style={{
            left: "50%",
            top: "50%",
            width: 380,
            height: 260,
            marginLeft: -190,
            marginTop: -130,
            background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
            opacity: 0.28,
          }}
        />

        {/* the orbit path */}
        <div
          className="absolute pointer-events-none rounded-[50%]"
          style={{
            left: "50%",
            top: "50%",
            width: rx * 2,
            height: ry * 2,
            marginLeft: -rx,
            marginTop: -ry,
            border: "1.5px dashed rgba(139,92,246,0.45)",
            boxShadow: "0 0 40px rgba(139,92,246,0.15), inset 0 0 40px rgba(6,182,212,0.08)",
            zIndex: 1,
          }}
        />
        <div
          className="absolute pointer-events-none rounded-[50%]"
          style={{
            left: "50%",
            top: "50%",
            width: rx * 2 + 70,
            height: ry * 2 + 40,
            marginLeft: -(rx + 35),
            marginTop: -(ry + 20),
            border: "1px solid rgba(6,182,212,0.18)",
            zIndex: 1,
          }}
        />

        {/* Photo, sits between the far and near chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute rounded-full bg-gradient-to-tr from-violet-600 via-cyan-500 to-emerald-400"
          style={{
            left: "50%",
            top: "50%",
            width: photo,
            height: photo,
            marginLeft: -photo / 2,
            marginTop: -photo / 2,
            padding: 3,
            zIndex: 10,
            boxShadow: "0 0 70px rgba(139,92,246,0.55), 0 0 28px rgba(6,182,212,0.35)",
          }}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#070712]">
            <Image
              src="/images/profile.jpg"
              alt={portfolioData.personal.name}
              fill
              unoptimized
              sizes="200px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Orbiting tags */}
        {chips.map((chip, i) => (
          <OrbitChip
            key={chip.label}
            time={time}
            phase={(i / chips.length) * Math.PI * 2}
            rx={rx}
            ry={ry}
            color={chip.color}
          >
            {chip.label}
          </OrbitChip>
        ))}
      </div>

      {/* Identity */}
      <h3 className="mt-4 font-display font-black tracking-tight text-white text-3xl sm:text-5xl text-center">
        {portfolioData.personal.name}
      </h3>
      <p className="mt-2 text-sm font-mono text-cyan-400">Final-Year B.Tech CSE</p>

      <button
        onClick={onOpenDetails}
        className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-mono font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all"
        style={{ boxShadow: "0 16px 32px -12px rgba(139,92,246,0.7)" }}
      >
        My Details
      </button>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function AboutSection() {
  const [showModal, setShowModal] = useState(false);

  const stats = [
    { label: "Projects Completed", value: portfolioData.personal.stats.projects, suffix: "+", icon: Code2, color: "from-violet-500 to-indigo-500" },
    { label: "Certifications", value: portfolioData.personal.stats.certifications, suffix: "", icon: Award, color: "from-cyan-500 to-blue-500" },
    { label: "Years Coding", value: portfolioData.personal.stats.learningYears, suffix: " Yrs", icon: Calendar, color: "from-emerald-500 to-teal-500" },
    { label: "Technologies", value: portfolioData.personal.stats.Technologies, suffix: "", icon: GitCommit, color: "from-amber-500 to-orange-500" },
  ];

  const [lead, ...rest]: string[] = portfolioData.personal.bio;

  return (
    <>
      <section id="about" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest">
            <User className="w-3.5 h-3.5 text-violet-400" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
            Passionate Tech {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400">
              Explorer
            </span>
          </h2>
        </div>

        {/* Orbit: photo in the centre, tags travelling around it */}
        <OrbitStage onOpenDetails={() => setShowModal(true)} />

        {/* Bio as large editorial text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 mx-auto text-center"
          style={{ maxWidth: "52rem" }}
        >
          {lead && (
            <p className="text-xl sm:text-3xl font-light text-white leading-snug">{lead}</p>
          )}

          {rest.length > 0 && (
            <div
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left text-slate-400 font-light leading-relaxed text-base sm:text-lg"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32 }}
            >
              {rest.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} idx={idx} />
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <DetailsModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}