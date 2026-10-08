"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, animate } from "framer-motion";
import {
  User, GraduationCap, Briefcase, Wrench, Heart,
  ExternalLink, Award, Star, X, MapPin, Mail,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const GithubIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const V = "#8b5cf6", C = "#06b6d4", G = "#10b981", A = "#f59e0b";
const LINE = [V, C, G, A];

/* ── static data ── */
const education = [
  { degree: "Bachelor of Technology in Computer Science and Engineering", institute: "GIET Engineering College, Rajahmundry", status: "Pursuing", score: "CGPA: 8.1", link: "https://gietec.ac.in/" },
  { degree: "Diploma in Computer Engineering", institute: "Government Polytechnic College, Rebaka, Anakapalli", status: "Completed", score: "79.4%", link: "https://govtpolyanakapalli.ac.in/" },
  { degree: "10th Grade — Secondary School Education", institute: "Zilla Parishath High School, Anandapuram", status: "Completed", score: "550 / 600", link: "https://schools.org.in/" },
];

interface ExperienceItem {
  role: string;
  company: string;
  featured?: boolean;
  duration?: string;
  points?: string[];
  tags?: string[];
}

const experience: ExperienceItem[] = [
  { featured: true, role: "Full-Stack Developer Intern", company: "Vinukoti Business Solutions", duration: "6 months · During Diploma", points: ["Worked on real-world web applications: RecruitUs and Campus Connect", "Built and maintained both frontend and backend features"], tags: ["Full-Stack", "Frontend", "Backend", "RecruitUs", "Campus Connect"] },
  { role: "AI & Data Science Intern", company: "Pantech Prolabs India Pvt Ltd" },
  { role: "Web Development & Cloud Integration Intern", company: "SkillDzire" },
  { role: "Java Full Stack Development Intern", company: "BlackBucks" },
];

const softSkills = [
  { name: "Time Management", desc: "Balances multiple projects and deadlines effectively" },
  { name: "Decision Making", desc: "Analyzes situations to make well-informed decisions" },
  { name: "Problem Solving", desc: "Tackles complex coding and debugging challenges with ease" },
];

const strengths = [
  { label: "Quick Learner", desc: "Picks up new technologies rapidly" },
  { label: "Adaptability", desc: "Adjusts to new tools and environments" },
  { label: "Persistence", desc: "Keeps working until a solution is found" },
  { label: "Curiosity", desc: "Loves exploring how new things work" },
  { label: "Creativity", desc: "Builds innovative projects with fresh ideas" },
  { label: "Self-Motivation", desc: "Takes initiative to learn independently" },
  { label: "Continuous Learning", desc: "Consistently improves technical skills" },
  { label: "Positive Attitude", desc: "Stays open to feedback, learns from mistakes" },
];

const hobbies = [
  { emoji: "🎵", title: "Singing", desc: "Enjoys singing as a way to express creativity and unwind." },
  { emoji: "💻", title: "Learning New Technologies", desc: "Constantly exploring new frameworks, tools, and trends in tech." },
  { emoji: "🌿", title: "Exploring Nature & Travelling", desc: "Loves discovering new places and spending time outdoors." },
];

const focusAreas = [
  { label: "Full-Stack Development", color: V },
  { label: "AI / Machine Learning", color: C },
  { label: "Data Science", color: G },
  { label: "Cloud & DevOps", color: A },
];

const TABS = [
  { id: "about", label: "About", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "hobbies", label: "Hobbies", icon: Heart },
];

/* ── small helpers ── */
const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,.03)",
  border: "1px solid rgba(255,255,255,.07)",
  borderRadius: 16,
};

function Label({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.14em", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 10 }}>
      {children}
      <span style={{ flex: 1, height: 1, background: `${color}30` }} />
    </p>
  );
}

function CountUp({ value }: { value: string | number }) {
  const raw = String(value);
  const m = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = m ? parseFloat(m[1]) : NaN;
  const tail = m ? m[2] : "";
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!Number.isFinite(target)) return;
    const ctrl = animate(0, target, { duration: 1.2, ease: "easeOut", onUpdate: v => setN(Math.round(v)) });
    return () => ctrl.stop();
  }, [target]);
  return <>{Number.isFinite(target) ? `${n}${tail}` : raw}</>;
}

/* ════════════════════════════════════════════════════════
   TAB CONTENT
════════════════════════════════════════════════════════ */
function TabContent({ tab }: { tab: string }) {
  if (tab === "about") {
    const bio: string[] = portfolioData.personal.bio;
    const [lead, ...rest] = bio;
    const s = portfolioData.personal.stats;
    const stats = [
      { label: "PROJECTS", value: `${s.projects}+`, color: V },
      { label: "certifications", value: `${s.certifications}`, color: C },
      { label: "Years Non-industry Technical experience", value: `${s.learningYears}`, color: G },
      { label: "TECH STACK", value: `${s.Technologies}+`, color: A },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <p style={{ fontSize: "clamp(16px, 1.5vw, 20px)", lineHeight: 1.65, color: "#f1f5f9", fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>{lead}</p>
        <div className="pm-paras">
          {rest.map((para, i) => (
            <p key={i} style={{ ...cardStyle, margin: 0, padding: "16px 18px", fontSize: 13.5, color: "#94a3b8", lineHeight: 1.75, fontWeight: 300, borderLeft: `3px solid ${LINE[i % 4]}88`, borderRadius: 14 }}>{para}</p>
          ))}
        </div>
        <div>
          <Label color={C}>FOCUS AREAS</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {focusAreas.map(f => (
              <span key={f.label} style={{ padding: "7px 14px", borderRadius: 999, fontSize: 12, fontFamily: "monospace", color: f.color, background: `${f.color}12`, border: `1px solid ${f.color}44` }}>{f.label}</span>
            ))}
          </div>
        </div>
        <div>
          <Label color={V}>AT A GLANCE</Label>
          <div className="pm-stats">
            {stats.map(st => (
              <div key={st.label} style={{ position: "relative", overflow: "hidden", padding: "18px 12px 14px", borderRadius: 16, textAlign: "center", border: `1px solid ${st.color}33`, background: `linear-gradient(165deg, ${st.color}16, rgba(255,255,255,.02))` }}>
                <span style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 2, background: `linear-gradient(90deg, transparent, ${st.color}, transparent)` }} />
                <p style={{ margin: 0, fontSize: 30, fontWeight: 900, color: st.color, lineHeight: 1, letterSpacing: "-0.03em", textShadow: `0 0 24px ${st.color}55` }}>
                  <CountUp value={st.value} />
                </p>
                <p style={{ margin: "8px 0 0", fontSize: 10, fontFamily: "monospace", color: "#64748b", letterSpacing: "0.12em" }}>{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tab === "education") return (
    <div style={{ position: "relative", paddingLeft: 28 }}>
      <div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: `linear-gradient(180deg, ${V}, ${C}, ${G})`, borderRadius: 999 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {education.map((e, i) => (
          <div key={i} style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: -28, top: 20, width: 16, height: 16, borderRadius: "50%", background: "#080814", border: `3px solid ${LINE[i]}`, boxShadow: `0 0 12px ${LINE[i]}88` }} />
            <div style={{ ...cardStyle, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <p style={{ margin: 0, fontWeight: 700, color: "#fff", fontSize: 14, lineHeight: 1.45 }}>{e.degree}</p>
                <a href={e.link} target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", flexShrink: 0 }}><ExternalLink style={{ width: 14, height: 14 }} /></a>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#94a3b8" }}>{e.institute}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: LINE[i], background: `${LINE[i]}18`, border: `1px solid ${LINE[i]}44`, padding: "2px 10px", borderRadius: 999 }}>{e.status}</span>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "#cbd5e1", marginLeft: "auto" }}>{e.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (tab === "experience") return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {experience.map((exp, i) => {
        if (exp.featured) return (
          <div key={i} style={{ background: `linear-gradient(135deg, ${V}14, ${C}08)`, border: `1px solid ${V}40`, borderRadius: 18, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 800, color: "#fff", fontSize: 15 }}>{exp.role}</p>
                <p style={{ margin: "3px 0 0", fontSize: 13, color: "#a78bfa" }}>{exp.company} <span style={{ color: "#64748b" }}>· {exp.duration}</span></p>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 999, border: "1px solid rgba(251,191,36,.35)", background: "rgba(251,191,36,.08)", color: "#fbbf24", fontSize: 11, fontWeight: 600 }}><Award style={{ width: 11, height: 11 }} />Featured</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {exp.points?.map((p: string, k: number) => <li key={k} style={{ display: "flex", gap: 8, fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}><span style={{ color: V }}>▸</span><span>{p}</span></li>)}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {exp.tags?.map((t: string) => <span key={t} style={{ padding: "3px 10px", borderRadius: 999, border: `1px solid ${V}44`, background: `${V}12`, color: "#c4b5fd", fontSize: 11 }}>{t}</span>)}
            </div>
          </div>
        );
        return (
          <div key={i} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: LINE[i], boxShadow: `0 0 10px ${LINE[i]}`, flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: "#fff", fontSize: 13 }}>{exp.role}</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748b" }}>{exp.company}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (tab === "skills") return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      <div>
        <Label color={C}>SOFT SKILLS</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {softSkills.map((s, i) => (
            <div key={i} style={{ ...cardStyle, display: "flex", gap: 14, alignItems: "center", padding: "13px 16px", borderRadius: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: `${C}14`, border: `1px solid ${C}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontFamily: "monospace", color: C }}>{i + 1}</div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#fff" }}>{s.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748b" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label color={V}>STRENGTHS</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>
          {strengths.map((s, i) => (
            <div key={i} style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(15,23,42,.6)", border: "1px solid rgba(255,255,255,.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                <Star style={{ width: 12, height: 12, color: V }} />
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#fff" }}>{s.label}</p>
              </div>
              <p style={{ margin: 0, fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (tab === "hobbies") return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
      {hobbies.map((h, i) => (
        <div key={i} style={{ padding: "22px 20px", borderRadius: 18, background: `linear-gradient(160deg, ${LINE[i]}12, rgba(255,255,255,.02))`, border: `1px solid ${LINE[i]}33`, display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 32, lineHeight: 1 }}>{h.emoji}</span>
          <p style={{ margin: 0, fontWeight: 700, color: "#fff", fontSize: 14 }}>{h.title}</p>
          <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.65 }}>{h.desc}</p>
        </div>
      ))}
    </div>
  );

  return null;
}

/* ════════════════════════════════════════════════════════
   PROFILE MODAL
════════════════════════════════════════════════════════ */
export default function ProfileModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("about");
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeRef.current(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!mounted) return null;

  const p: any = portfolioData.personal;
  const socials = [
    p.github && { href: p.github, label: "GitHub", icon: GithubIcon, color: "#e2e8f0" },
    p.linkedin && { href: p.linkedin, label: "LinkedIn", icon: LinkedinIcon, color: "#38bdf8" },
    p.email && { href: `mailto:${p.email}`, label: "Email", icon: Mail, color: A },
  ].filter(Boolean) as { href: string; label: string; icon: any; color: string }[];

  const infoRows = [
    { icon: GraduationCap, k: "Degree", v: "B.Tech CSE — Final Year", c: V },
    { icon: MapPin, k: "Location", v: p.location, c: C },
    { icon: Briefcase, k: "Status", v: "Open to Opportunities", c: G },
  ];

  return createPortal(
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}
      data-lenis-prevent
      style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(.5rem,3vw,2rem)", backgroundColor: "rgba(3,3,8,.88)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
    >
      <style>{`
        .pm-modal {
          position: relative; width: 100%; max-width: 62rem;
          height: min(700px, 90vh); border-radius: 28px;
          background: #080814; border: 1px solid rgba(255,255,255,.1);
          overflow: hidden; display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
        }
        @supports (height: 100dvh) { .pm-modal { height: min(700px, 90dvh); } }

        .pm-left {
          position: relative; z-index: 1; display: flex; flex-direction: column;
          align-items: center; gap: 16px; padding: 28px 18px 18px;
          border-right: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(180deg, rgba(139,92,246,.10), rgba(6,182,212,.04) 55%, rgba(8,8,20,0));
          overflow-y: auto;
        }

        /* ── circular profile photo ── */
        .pm-photo-wrap {
          position: relative;
          width: 100px; height: 100px; flex-shrink: 0;
          border-radius: 50%;
          /* cyan/blue gradient border only */
          padding: 3px;
          background: linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6);
          box-shadow: 0 0 20px rgba(6,182,212,.35), 0 0 40px rgba(59,130,246,.2);
        }
        .pm-photo-inner {
          width: 100%; height: 100%;
          border-radius: 50%; overflow: hidden;
          background: #050510;
          position: relative;
        }

        .pm-name-block { text-align: center; }
        .pm-mobile-id { display: none; }
        .pm-info { display: flex; flex-direction: column; gap: 12px; padding: 14px 16px; border-radius: 16px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); width: 100%; }
        .pm-social { display: flex; gap: 10px; width: 100%; }

        .pm-right { position: relative; z-index: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; }
        .pm-tabbar { padding: 18px 64px 0 28px; flex-shrink: 0; }
        .pm-tabs { display: flex; gap: 4px; padding: 4px; border-radius: 16px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); width: fit-content; max-width: 100%; overflow-x: auto; scrollbar-width: none; }
        .pm-tabs::-webkit-scrollbar { display: none; }
        .pm-tab { position: relative; display: flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 12px; border: none; background: transparent; cursor: pointer; font-family: monospace; font-size: 12px; flex-shrink: 0; transition: color .2s; }
        .pm-content { flex: 1; min-height: 0; overflow-y: auto; padding: 24px 28px 28px; }
        .pm-content::-webkit-scrollbar { width: 6px; }
        .pm-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 4px; }

        .pm-paras { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .pm-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }

        @media (max-width: 760px) {
          .pm-modal { grid-template-columns: 1fr; grid-template-rows: auto minmax(0, 1fr); height: 92vh; border-radius: 22px; }
          @supports (height: 100dvh) { .pm-modal { height: 92dvh; } }
          .pm-left { flex-direction: row; align-items: center; gap: 14px; padding: 14px 56px 14px 16px; border-right: none; border-bottom: 1px solid rgba(255,255,255,.07); overflow: visible; }
          .pm-photo-wrap { width: 56px; height: 56px; padding: 2px; }
          .pm-name-block, .pm-info, .pm-social { display: none; }
          .pm-mobile-id { display: block; min-width: 0; }
          .pm-tabbar { padding: 12px 16px 0; }
          .pm-tab { padding: 8px 13px; }
          .pm-content { padding: 18px 16px 24px; }
          .pm-paras { grid-template-columns: 1fr; }
          .pm-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <motion.div
        className="pm-modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: .94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .94, y: 28 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        style={{ boxShadow: `0 40px 90px rgba(0,0,0,.85), 0 0 80px -30px ${V}66` }}
      >
        {/* ambient glows */}
        <div style={{ position: "absolute", top: -120, left: -80, width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${V}30, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -140, right: -60, width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle, ${C}22, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} />

        {/* top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${V}, ${C}, ${G}, transparent)`, zIndex: 6 }} />

        {/* close */}
        <button onClick={onClose} aria-label="Close"
          style={{ position: "absolute", top: 14, right: 14, zIndex: 10, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <X style={{ width: 16, height: 16, color: "#e2e8f0" }} />
        </button>

        {/* ───────── LEFT: ID CARD ───────── */}
        <aside className="pm-left">

          {/* circular photo with cyan-blue border only */}
          <div className="pm-photo-wrap">
            <div className="pm-photo-inner">
              <Image
                src="/images/profile.jpeg"
                alt={p.name}
                fill
                unoptimized
                sizes="100px"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </div>

          {/* name below photo — desktop */}
          <div className="pm-name-block">
            <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{p.name}</p>
            <p style={{ margin: "4px 0 0", fontSize: 11, fontFamily: "monospace", color: C }}>Full-Stack · AI · Data Science</p>
          </div>

          {/* mobile-only name */}
          <div className="pm-mobile-id">
            <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{p.name}</p>
            <p style={{ margin: "3px 0 0", fontSize: 11, fontFamily: "monospace", color: C }}>Final-Year B.Tech CSE</p>
            <p style={{ margin: "5px 0 0", display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontFamily: "monospace", color: G, fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: G, boxShadow: `0 0 8px ${G}`, display: "block" }} />
              OPEN TO WORK
            </p>
          </div>

          {/* info rows */}
          <div className="pm-info">
            {infoRows.map(row => {
              const Icon = row.icon;
              return (
                <div key={row.k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `${row.c}14`, border: `1px solid ${row.c}33` }}>
                    <Icon style={{ width: 15, height: 15, color: row.c }} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 10, fontFamily: "monospace", color: "#64748b", letterSpacing: "0.1em" }}>{row.k.toUpperCase()}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 12.5, fontFamily: "monospace", fontWeight: 700, color: row.c }}>{row.v}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* socials */}
          {socials.length > 0 && (
            <div className="pm-social">
              {socials.map(s => {
                const Icon = s.icon;
                return (
                  <motion.a key={s.label} href={s.href} target={s.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={s.label}
                    whileHover={{ y: -3, scale: 1.06 }} whileTap={{ scale: .94 }}
                    style={{ flex: 1, height: 44, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: `${s.color}10`, border: `1px solid ${s.color}33` }}>
                    <Icon style={{ width: 18, height: 18, color: s.color }} />
                  </motion.a>
                );
              })}
            </div>
          )}
        </aside>

        {/* ───────── RIGHT: TABS + CONTENT ───────── */}
        <div className="pm-right">
          <div className="pm-tabbar">
            <div className="pm-tabs">
              {TABS.map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button key={tab.id} className="pm-tab" onClick={() => setActiveTab(tab.id)} style={{ color: active ? "#fff" : "#64748b" }}>
                    {active && (
                      <motion.span layoutId="pm-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        style={{ position: "absolute", inset: 0, borderRadius: 12, background: `linear-gradient(120deg, ${V}55, ${C}33)`, border: `1px solid ${V}88`, boxShadow: `0 6px 22px -8px ${V}99` }} />
                    )}
                    <Icon style={{ position: "relative", width: 14, height: 14, color: active ? "#ddd6fe" : "#64748b" }} />
                    <span style={{ position: "relative" }}>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pm-content" data-lenis-prevent>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>
                <TabContent tab={activeTab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}