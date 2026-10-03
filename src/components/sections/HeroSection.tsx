"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles, ChevronDown, Terminal } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotating roles interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolioData.personal.subRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 pt-28 pb-16 overflow-hidden"
    >
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glass Content Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
className="glass-hero relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-8 p-6 sm:p-10 md:p-14"      >
        {/* Available for Opportunities Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wide shadow-inner"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Final-Year CSE Student · Open to Opportunities</span>
        </motion.div>

        {/* Main Name Headline */}
        <div className="space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xs sm:text-sm font-mono text-cyan-400 tracking-widest uppercase"
          >
            Hello,I am
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200 drop-shadow-sm"
          >
            {portfolioData.personal.name}
          </motion.h1>
        </div>

        {/* Dynamic Rotating Role */}
        <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden">
          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-lg sm:text-2xl md:text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-cyan-300 to-emerald-300"
          >
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
            <span>{portfolioData.personal.subRoles[roleIndex]}</span>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed"
        >
          {portfolioData.personal.tagline}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          {/* Primary CTA */}
          <button
            onClick={() => scrollTo("projects")}
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-500 text-white font-semibold text-sm shadow-[0_0_24px_rgba(6,182,212,0.4)] hover:shadow-[0_0_36px_rgba(6,182,212,0.6)] transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <a
            href={portfolioData.personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-white/15 text-slate-200 hover:text-white text-sm font-semibold shadow-lg transition-all hover:border-cyan-400/40 hover:scale-105 active:scale-95"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </a>

          {/* Quick Terminal Hint */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-terminal"))}
            className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full bg-slate-900/40 hover:bg-slate-800/60 border border-slate-700/50 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors"
            title="Press ~ to open developer CLI"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>CLI [~]</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Down Cue */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        className="mt-12 flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase group-hover:text-cyan-300">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 text-cyan-400" />
      </motion.button>
    </section>
  );
}
