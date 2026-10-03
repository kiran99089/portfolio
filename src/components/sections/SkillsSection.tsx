"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Cpu, Database, Sparkles, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categoryIcons: Record<string, any> = {
    Languages: Terminal,
    Frontend: Code,
    "Backend & Cloud": Database,
    "AI / Machine Learning": Cpu,
  };

  const categories = ["All", ...portfolioData.skills.map((s) => s.category)];

  const filteredCategories =
    activeCategory === "All"
      ? portfolioData.skills
      : portfolioData.skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Technical Arsenal</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-400 to-emerald-400">Technologies</span>
        </h2>
        <p className="text-slate-400 max-w-xl text-sm sm:text-base font-light">
          A comprehensive suite of tools and frameworks I leverage to engineer robust, high-performance systems.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_16px_rgba(6,182,212,0.4)]"
                : "bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((group, groupIdx) => {
          const Icon = categoryIcons[group.category] || Code;
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-950/40 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6 hover:border-cyan-500/30 transition-all group"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold font-display text-xl text-white">
                    {group.category}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {group.skills.length} skills
                </span>
              </div>

              {/* Skills List with Progress Indicators */}
              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-200 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        {skill.name}
                      </span>
                      <span className="font-mono text-cyan-400">{skill.level}%</span>
                    </div>

                    {/* Progress Glow Bar */}
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden p-[1px]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
