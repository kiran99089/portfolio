"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Database, Cpu, Layers, Sparkles, MousePointer2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

/* Colour + icon per category (matched by name from portfolio.ts) */
const CATEGORY_STYLE: Record<string, { color: string; icon: any }> = {
  "Languages": { color: "#8b5cf6", icon: Terminal },
  "Frontend": { color: "#06b6d4", icon: Code2 },
  "Backend & Cloud": { color: "#10b981", icon: Database },
  "AI / Machine Learning": { color: "#f59e0b", icon: Cpu },
};
const FALLBACK = { color: "#8b5cf6", icon: Layers };

const tierLabel = (level: number) =>
  level >= 90 ? "Advanced" : level >= 80 ? "Proficient" : "Familiar";

export default function SkillsSection() {
  const categories = portfolioData.skills;

  /* ── Place every skill on a sphere (Fibonacci sphere) ── */
  const nodes = useMemo(() => {
    // interleave categories so the colours are mixed all over the sphere
    const flat: { name: string; level: number; category: string; color: string }[] = [];
    const maxLen = Math.max(...categories.map((c) => c.skills.length));
    for (let i = 0; i < maxLen; i++) {
      categories.forEach((c) => {
        const s = c.skills[i];
        if (s) {
          flat.push({
            name: s.name,
            level: s.level,
            category: c.category,
            color: (CATEGORY_STYLE[c.category] || FALLBACK).color,
          });
        }
      });
    }
    const N = flat.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return flat.map((s, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      return { ...s, x: Math.cos(t) * r, y, z: Math.sin(t) * r };
    });
  }, [categories]);

  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const boxRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angles = useRef({ ax: 0.35, ay: 0 });
  const vel = useRef({ x: 0, y: 0.004 });
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const filterRef = useRef("All");
  const hoveredRef = useRef<number | null>(null);

  useEffect(() => { filterRef.current = filter; }, [filter]);
  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  /* ── Animation loop (updates the DOM directly, no re-renders) ── */
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const box = boxRef.current;
      if (box) {
        const R = box.clientWidth * 0.38;

        // cursor controls spin direction/speed; slow auto-rotation otherwise
        let tvx = 0.0012;
        let tvy = 0.004;
        if (pointer.current) {
          const dead = (v: number) => (Math.abs(v) < 0.18 ? 0 : v);
          tvy = 0.002 + dead(pointer.current.x) * 0.02;
          tvx = -dead(pointer.current.y) * 0.02;
        }
        if (hoveredRef.current !== null) { tvx *= 0.1; tvy *= 0.1; } // slow down so a skill is easy to hit

        vel.current.x += (tvx - vel.current.x) * 0.05;
        vel.current.y += (tvy - vel.current.y) * 0.05;
        angles.current.ax += vel.current.x;
        angles.current.ay += vel.current.y;

        const { ax, ay } = angles.current;
        const sx = Math.sin(ax), cx = Math.cos(ax), sy = Math.sin(ay), cy = Math.cos(ay);

        nodes.forEach((n, i) => {
          const el = nodeRefs.current[i];
          if (!el) return;
          const x1 = n.x * cy + n.z * sy;
          const z1 = -n.x * sy + n.z * cy;
          const y2 = n.y * cx - z1 * sx;
          const z2 = n.y * sx + z1 * cx;
          const d = (z2 + 1) / 2; // 0 = back, 1 = front
          const dim = filterRef.current !== "All" && filterRef.current !== n.category;

          el.style.transform = `translate(-50%, -50%) translate(${x1 * R}px, ${y2 * R}px) scale(${0.62 + 0.6 * d})`;
          el.style.opacity = String(dim ? 0.08 : 0.25 + 0.75 * d);
          el.style.zIndex = String(Math.round(d * 100));
          el.style.pointerEvents = dim || d < 0.3 ? "none" : "auto";
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [nodes]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const py = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointer.current = { x: Math.max(-1, Math.min(1, px)), y: Math.max(-1, Math.min(1, py)) };
  };

  const active = hovered !== null ? nodes[hovered] : null;

  return (
    <section id="skills" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Tech Stack</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          Skills &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400">
            Technologies
          </span>
        </h2>
        <p className="text-sm font-mono text-slate-400 inline-flex items-center gap-2">
          <MousePointer2 className="w-4 h-4" /> Move your cursor over the sphere to spin it
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 items-center" style={{ gap: "32px" }}>
        {/* ── 3D sphere ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div
            ref={boxRef}
            onPointerMove={handleMove}
            onPointerLeave={() => { pointer.current = null; }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "620px",
              aspectRatio: "1 / 1",
              margin: "0 auto",
              borderRadius: "50%",
              touchAction: "pan-y",
              background:
                "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.07) 45%, transparent 70%)",
            }}
          >
            {/* decorative orbit rings */}
            <div style={{ position: "absolute", inset: "6%", borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.08)" }} />
            <div style={{ position: "absolute", inset: "20%", borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.06)" }} />

            {/* centre glow */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "22%",
                height: "22%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(139,92,246,0.55), transparent 70%)",
                filter: "blur(10px)",
              }}
            />

            {/* skill nodes */}
            {nodes.map((n, i) => (
              <div
                key={n.name + i}
                ref={(el) => { nodeRefs.current[i] = el; }}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  opacity: 0,
                  willChange: "transform, opacity",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 14px",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#fff",
                  background: hovered === i ? `${n.color}55` : "rgba(15,23,42,0.85)",
                  border: `1px solid ${hovered === i ? n.color : n.color + "66"}`,
                  boxShadow: hovered === i ? `0 0 24px ${n.color}` : "none",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: n.color,
                    boxShadow: `0 0 8px ${n.color}`,
                  }}
                />
                {n.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Side panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {/* Category filter */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {["All", ...categories.map((c) => c.category)].map((name) => {
              const style = CATEGORY_STYLE[name] || FALLBACK;
              const isActive = filter === name;
              const count =
                name === "All"
                  ? nodes.length
                  : categories.find((c) => c.category === name)?.skills.length;
              const color = name === "All" ? "#e2e8f0" : style.color;
              return (
                <button
                  key={name}
                  onClick={() => setFilter(name)}
                  className="font-mono text-sm transition-all"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    textAlign: "left",
                    color: isActive ? "#fff" : "#94a3b8",
                    background: isActive ? `${color}22` : "rgba(15,23,42,0.5)",
                    border: `1px solid ${isActive ? color : "rgba(255,255,255,0.08)"}`,
                    boxShadow: isActive ? `0 0 22px ${color}33` : "none",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
                    {name}
                  </span>
                  <span style={{ color: "#64748b" }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Detail card (shows the skill under the cursor) */}
          <div
            style={{
              minHeight: "130px",
              padding: "22px 24px",
              borderRadius: "20px",
              background: "rgba(2,6,23,0.55)",
              border: `1px solid ${active ? active.color + "88" : "rgba(255,255,255,0.1)"}`,
              boxShadow: active ? `0 0 30px ${active.color}30` : "none",
              transition: "border-color .3s ease, box-shadow .3s ease",
            }}
            className="backdrop-blur-xl"
          >
            {active ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <p className="text-xl font-bold font-display text-white">{active.name}</p>
                  <p className="text-xs font-mono" style={{ color: active.color, marginTop: "4px" }}>
                    {active.category} · {tierLabel(active.level)}
                  </p>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${active.level}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: `linear-gradient(90deg, ${active.color}, #fff)`,
                    }}
                  />
                </div>
                <p className="text-xs font-mono text-slate-400">{active.level}% comfort level</p>
              </div>
            ) : (
              <p className="text-sm font-mono text-slate-500" style={{ lineHeight: 1.7 }}>
                Hover a skill on the sphere to see its category and level here. Use the filters above to
                highlight one group.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}