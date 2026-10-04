"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { portfolioData, Project } from "@/data/portfolio";
import ProjectDetailModal from "./ProjectDetailModal";

const ACCENT = "#5B7BFF";
// Each project gets its own colour
const TINTS = ["#5B7BFF", "#8B5CF6", "#22D3EE", "#34D399", "#F472B6", "#F5C97A"];

function useIsDesktop(breakpoint = 800) {
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

/* ------------------------------------------------------------------ */
/* One 3D card                                                         */
/* ------------------------------------------------------------------ */
function ProjectCard({
  project,
  tint,
  offset,
  isDesktop,
  onSelect,
  onCaseStudy,
}: {
  project: Project;
  tint: string;
  offset: number; // 0 = centre, -1 = one to the left, 1 = one to the right
  isDesktop: boolean;
  onSelect: () => void;
  onCaseStudy: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const active = offset === 0;
  const abs = Math.abs(offset);

  const cardW = isDesktop ? 380 : 300;
  const cardH = 440;
  const spacing = isDesktop ? 330 : 210;

  // Pointer tilt, only on the centre card
  const tiltXTarget = useMotionValue(0);
  const tiltYTarget = useMotionValue(0);
  const tiltX = useSpring(tiltXTarget, { stiffness: 120, damping: 14 });
  const tiltY = useSpring(tiltYTarget, { stiffness: 120, damping: 14 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!active || reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    tiltYTarget.set(nx * 16);
    tiltXTarget.set(-ny * 14);
  };
  const resetTilt = () => {
    tiltXTarget.set(0);
    tiltYTarget.set(0);
  };

  const visible = abs <= 2;

  return (
    <motion.div
      onClick={() => !active && onSelect()}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      animate={{
        x: offset * spacing,
        z: -abs * 170,
        rotateY: offset === 0 ? 0 : offset > 0 ? -38 : 38,
        scale: active ? 1 : 0.9,
        opacity: !visible ? 0 : active ? 1 : abs === 1 ? 0.75 : 0.35,
      }}
      transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.9 }}
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        width: cardW,
        height: cardH,
        marginLeft: -cardW / 2,
        zIndex: 10 - abs,
        transformStyle: "preserve-3d",
        cursor: active ? "default" : "pointer",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      {/* depth plates: gives the card real thickness */}
      <div
        className="absolute inset-0 rounded-[26px]"
        style={{ background: tint, opacity: 0.22, transform: "translateZ(-36px)" }}
      />
      <div
        className="absolute inset-0 rounded-[26px]"
        style={{ background: tint, opacity: 0.45, transform: "translateZ(-22px)" }}
      />
      <div
        className="absolute inset-0 rounded-[26px]"
        style={{ background: tint, opacity: 0.8, transform: "translateZ(-10px)" }}
      />

      {/* tilting face */}
      <motion.div
        className="absolute inset-0 rounded-[26px]"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
          boxShadow: active
            ? `0 40px 70px -25px ${tint}99`
            : "0 20px 40px -20px rgba(0,0,0,0.6)",
        }}
      >
        {/* background layer (clipped, so the text layer can float above it) */}
        <div
          className="absolute inset-0 rounded-[26px] overflow-hidden border"
          style={{
            backgroundColor: "#080B16",
            borderColor: active ? `${tint}99` : "rgba(255,255,255,0.12)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 80% at 0% 0%, ${tint}55 0%, transparent 60%), radial-gradient(90% 60% at 100% 100%, ${tint}33 0%, transparent 70%)`,
            }}
          />
          {/* diagonal sheen */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 35%)",
            }}
          />
        </div>

        {/* content layer, lifted off the card for parallax depth */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{
            padding: "26px 26px 24px",
            transform: "translateZ(38px)",
            transformStyle: "preserve-3d",
          }}
        >
          <span
            className="self-start px-3 py-1 rounded-full text-xs font-mono"
            style={{
              color: tint,
              backgroundColor: "rgba(8,11,22,0.8)",
              border: `1px solid ${tint}66`,
              transform: "translateZ(18px)",
            }}
          >
            {project.category}
          </span>

          <h3
            className="mt-5 font-display font-extrabold tracking-tight text-white leading-[1.05]"
            style={{ fontSize: isDesktop ? 30 : 26, transform: "translateZ(12px)" }}
          >
            {project.title}
          </h3>

          <p
            className="mt-3 text-sm text-slate-300 leading-relaxed"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.tagline}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md bg-black/40 border border-white/10 text-[10px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-mono text-slate-400">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          <div
            className="mt-auto flex items-center gap-2"
            style={{ transform: "translateZ(22px)" }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (active) onCaseStudy();
              }}
              tabIndex={active ? 0 : -1}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-white font-semibold text-sm transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: ACCENT, boxShadow: `0 14px 24px -10px ${ACCENT}` }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Case Study</span>
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View GitHub Repository"
                tabIndex={active ? 0 : -1}
                onClick={(e) => e.stopPropagation()}
                className="p-3 rounded-2xl bg-black/50 hover:bg-black/70 border border-white/10 text-slate-200 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Live Preview"
                tabIndex={active ? 0 : -1}
                onClick={(e) => e.stopPropagation()}
                className="p-3 rounded-2xl bg-black/50 hover:bg-black/70 border border-white/10 text-slate-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function ProjectsSection3D() {
  const isDesktop = useIsDesktop();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [index, setIndex] = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(portfolioData.projects.map((p) => p.category)))],
    []
  );

  const filteredProjects =
    activeFilter === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeFilter);

  const n = filteredProjects.length;

  const go = useCallback(
    (dir: number) => {
      if (n === 0) return;
      setIndex((i) => (i + dir + n) % n);
    },
    [n]
  );

  const changeFilter = (filter: string) => {
    setActiveFilter(filter);
    setIndex(0);
  };

  // Shortest signed distance on a loop, so the carousel wraps around
  const offsetFor = (i: number) => {
    let d = i - index;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const activeTint = TINTS[index % TINTS.length];

  return (
    <section id="projects" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          Projects
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base font-light">
          Drag, swipe or use the arrows to browse.
        </p>
      </div>

      {/* Filters */}
      <div
        className="flex flex-wrap items-center justify-center gap-2 mb-10"
        role="tablist"
        aria-label="Filter projects"
      >
        {filters.map((filter) => {
          const active = filter === activeFilter;
          return (
            <button
              key={filter}
              role="tab"
              aria-selected={active}
              onClick={() => changeFilter(filter)}
              className="px-5 py-2 rounded-full text-xs font-mono transition-all"
              style={{
                color: active ? "#fff" : "#94A3B8",
                background: active
                  ? `linear-gradient(90deg, ${ACCENT}, #8B5CF6)`
                  : "rgba(15,23,42,0.6)",
                border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.08)"}`,
                boxShadow: active ? "0 0 18px rgba(91,123,255,0.45)" : undefined,
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {n === 0 ? (
        <p className="text-center text-slate-500">No projects in this category yet.</p>
      ) : (
        <>
          {/* 3D stage */}
          <motion.div
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="Projects"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") go(-1);
              if (e.key === "ArrowRight") go(1);
            }}
            onPanEnd={(_, info) => {
              if (info.offset.x < -50) go(1);
              else if (info.offset.x > 50) go(-1);
            }}
            className="relative outline-none"
            style={{
              height: 500,
              perspective: 1400,
              perspectiveOrigin: "50% 40%",
              touchAction: "pan-y",
            }}
          >
            {/* colour glow that follows the active project */}
            <div
              className="absolute pointer-events-none rounded-full blur-[110px] transition-colors duration-700"
              style={{
                left: "50%",
                top: 120,
                width: 420,
                height: 300,
                marginLeft: -210,
                backgroundColor: activeTint,
                opacity: 0.25,
              }}
            />

            {/* floor shadow */}
            <div
              className="absolute pointer-events-none rounded-[50%] blur-2xl transition-colors duration-700"
              style={{
                left: "50%",
                bottom: 14,
                width: isDesktop ? 420 : 300,
                height: 36,
                marginLeft: isDesktop ? -210 : -150,
                backgroundColor: activeTint,
                opacity: 0.35,
              }}
            />

            <div
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  tint={TINTS[i % TINTS.length]}
                  offset={offsetFor(i)}
                  isDesktop={isDesktop}
                  onSelect={() => setIndex(i)}
                  onCaseStudy={() => setModalProject(project)}
                />
              ))}
            </div>
          </motion.div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="p-3 rounded-full bg-[#1A1D29] hover:bg-[#222638] border border-white/10 text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {filteredProjects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${p.title}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? 26 : 8,
                    height: 8,
                    backgroundColor: i === index ? activeTint : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next project"
              className="p-3 rounded-full bg-[#1A1D29] hover:bg-[#222638] border border-white/10 text-slate-200 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      <ProjectDetailModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
}