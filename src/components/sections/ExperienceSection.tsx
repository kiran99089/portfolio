"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  Award,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const ACCENT = "#5B7BFF";
// One colour per certificate panel
const TINTS = ["#5B7BFF", "#8B5CF6", "#22D3EE", "#34D399", "#F472B6", "#F5C97A"];

const PANEL_W = 290;
const PANEL_H = 190;

const mod = (a: number, n: number) => ((a % n) + n) % n;

/* ------------------------------------------------------------------ */
/* 3D ring of certificates                                             */
/* ------------------------------------------------------------------ */
function CertificateRing() {
  const certs = portfolioData.certifications;
  const n = certs.length;

  const step = 360 / Math.max(n, 1);
  // Radius so neighbouring panels sit side by side without overlapping
  const radius = Math.round((PANEL_W / 2) / Math.tan(Math.PI / Math.max(n, 3)) * 1.18);

  const target = useMotionValue(0);
  const angle = useSpring(target, { stiffness: 55, damping: 18, mass: 1 });

  const [active, setActive] = useState(0);

  // The panel facing the viewer is the one whose angle is closest to 0
  useMotionValueEvent(angle, "change", (latest) => {
    if (n === 0) return;
    setActive(mod(Math.round(-latest / step), n));
  });

  const snap = useCallback(() => {
    target.set(Math.round(target.get() / step) * step);
  }, [target, step]);

  const go = useCallback(
    (dir: number) => {
      target.set(Math.round(target.get() / step) * step - dir * step);
    },
    [target, step]
  );

  const goTo = (i: number) => {
    const k = Math.round(-target.get() / step);
    let d = mod(i - mod(k, n), n);
    if (d > n / 2) d -= n;
    target.set(-(k + d) * step);
  };

  // Auto-rotate only while the mouse is over the certificates.
  // Arrows, dots, drag and keyboard keep working at any time.
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hovering || reduceMotion || n < 2) return;
    const id = setInterval(() => go(1), 2800);
    return () => clearInterval(id);
  }, [hovering, reduceMotion, n, go]);

  if (n === 0) return null;

  const current = certs[active];
  const tint = TINTS[active % TINTS.length];
  const year = String(current.date).match(/\d{4}/)?.[0] ?? String(current.date);

  return (
    <div
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
    >
      {/* Stage */}
      <motion.div
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Certifications"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        onPan={(_, info) => target.set(target.get() + info.delta.x * 0.45)}
        onPanEnd={snap}
        className="relative outline-none overflow-hidden"
        style={{
          height: 330,
          perspective: 1500,
          perspectiveOrigin: "50% 30%",
          touchAction: "pan-y",
          cursor: "grab",
        }}
      >
        {/* glow behind the ring, in the active colour */}
        <div
          className="absolute pointer-events-none rounded-full blur-[110px]"
          style={{
            left: "50%",
            top: 50,
            width: 460,
            height: 240,
            marginLeft: -230,
            backgroundColor: tint,
            opacity: 0.22,
            transition: "background-color 0.7s",
          }}
        />

        {/* floor ring */}
        <div
          className="absolute pointer-events-none rounded-[50%]"
          style={{
            left: "50%",
            bottom: 8,
            width: radius * 2 + 120,
            height: 70,
            marginLeft: -(radius + 60),
            border: `1.5px solid ${tint}55`,
            boxShadow: `0 0 40px ${tint}44, inset 0 0 40px ${tint}22`,
            transition: "border-color 0.7s, box-shadow 0.7s",
          }}
        />

        {/* tilt the whole ring slightly toward the viewer */}
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(-9deg)" }}
        >
          <motion.div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              width: 0,
              height: 0,
              z: -radius,
              rotateY: angle,
              transformStyle: "preserve-3d",
            }}
          >
            {certs.map((cert, i) => {
              const t = TINTS[i % TINTS.length];
              const isActive = i === active;
              return (
                <div
                  key={cert.id}
                  onClick={() => !isActive && goTo(i)}
                  className="absolute rounded-[22px] border overflow-hidden"
                  style={{
                    width: PANEL_W,
                    height: PANEL_H,
                    marginLeft: -PANEL_W / 2,
                    marginTop: -PANEL_H / 2,
                    transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    backgroundColor: "#080B16",
                    borderColor: isActive ? `${t}AA` : "rgba(255,255,255,0.14)",
                    boxShadow: isActive ? `0 30px 50px -22px ${t}99` : "none",
                    opacity: isActive ? 1 : 0.7,
                    transition: "opacity 0.5s, border-color 0.5s, box-shadow 0.5s",
                    cursor: isActive ? "default" : "pointer",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(110% 90% at 0% 0%, ${t}55 0%, transparent 62%), radial-gradient(80% 60% at 100% 100%, ${t}33 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 38%)",
                    }}
                  />
                  <div className="relative h-full flex flex-col p-6">
                    <div className="flex items-center justify-between">
                      <ShieldCheck className="w-6 h-6" style={{ color: t }} />
                      <span className="text-xs font-mono text-slate-400">{cert.date}</span>
                    </div>
                    <h4 className="mt-auto font-display font-extrabold tracking-tight text-white text-xl leading-tight">
                      {cert.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-slate-400">{cert.issuer}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Active certificate details */}
      <div className="mt-6 flex flex-col items-center text-center" style={{ minHeight: 150 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <span className="text-xs font-mono" style={{ color: tint }}>
              {current.issuer} · {year}
            </span>
            <h3 className="mt-2 font-display font-extrabold tracking-tight text-white text-2xl sm:text-3xl">
              {current.title}
            </h3>

            {current.credentialUrl ? (
              <a
                href={current.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold text-sm transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: ACCENT, boxShadow: `0 14px 24px -10px ${ACCENT}` }}
              >
                <span>View Certificate</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span className="mt-4 text-xs font-mono text-slate-500">Certificate coming soon</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-5">
        <button
          onClick={() => go(-1)}
          aria-label="Previous certificate"
          className="p-3 rounded-full bg-[#1A1D29] hover:bg-[#222638] border border-white/10 text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {certs.map((c, i) => (
            <button
              key={c.id}
              onClick={() => goTo(i)}
              aria-label={`Show ${c.title}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 26 : 8,
                height: 8,
                backgroundColor: i === active ? tint : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next certificate"
          className="p-3 rounded-full bg-[#1A1D29] hover:bg-[#222638] border border-white/10 text-slate-200 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto space-y-24">
      {/* 1. Experience Timeline */}
      <div>
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-400 to-emerald-400">Internships</span>
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {portfolioData.experiences.map((exp, idx) => {
            const featured = exp.id === "exp-1"; // Full-Stack Developer Intern (real-world experience)
            return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative group"
            >
              {/* Timeline Node Pulsing Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 group-hover:scale-125 transition-all ${
                  featured
                    ? "animate-pulse bg-violet-400 border-violet-300"
                    : "bg-slate-900 border-cyan-400 group-hover:bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                }`}
                style={featured ? { boxShadow: "0 0 22px rgba(167,139,250,1)" } : undefined}
              />

              <div
                className={`p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-xl space-y-4 transition-all ${
                  featured ? "" : "bg-slate-950/40 border border-white/10 hover:border-cyan-500/40"
                }`}
                style={
                  featured
                    ? {
                        background: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(6,182,212,0.08))",
                        border: "1px solid rgba(139,92,246,0.55)",
                        borderLeft: "5px solid #8b5cf6",
                        boxShadow: "0 0 45px rgba(139,92,246,0.28)",
                      }
                    : undefined
                }
              >
                {featured && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      border: "1px solid rgba(251,191,36,0.45)",
                      background: "rgba(251,191,36,0.1)",
                      color: "#fbbf24",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Featured · Real-World Experience
                  </span>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <h3 className={`font-bold font-display text-white ${featured ? "text-2xl" : "text-xl"}`}>
                      {exp.role}
                    </h3>
                    <p className="text-sm font-mono text-cyan-300">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-violet-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {exp.description.map((desc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Certifications: 3D rotating ring */}
      <div className="space-y-10">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
            <span>Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400">
              Certifications
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light">
            Drag the ring, or use the arrows to browse.
          </p>
        </div>

        <CertificateRing />
      </div>
    </section>
  );
}