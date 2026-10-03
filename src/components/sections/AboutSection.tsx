"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Code2, Award, GitCommit, Calendar } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function AboutSection() {
  const stats = [
    {
      label: "Projects Completed",
      value: portfolioData.personal.stats.projects,
      suffix: "+",
      icon: Code2,
      color: "from-violet-500 to-indigo-500",
    },
    {
      label: "Certifications",
      value: portfolioData.personal.stats.certifications,
      suffix: "",
      icon: Award,
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "Years Coding",
      value: portfolioData.personal.stats.learningYears,
      suffix: " Yrs",
      icon: Calendar,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Technologies ",
      value: portfolioData.personal.stats.Technologies,
      suffix: "",
      icon: GitCommit,
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section id="about" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest">
          <User className="w-3.5 h-3.5 text-violet-400" />
          <span>About Me</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          Architecting Software with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400">Purpose</span>
        </h2>
      </div>

      {/* Story & Creative Frame Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Creative Interactive Frame with Profile Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-72 h-80 sm:w-80 sm:h-96 rounded-3xl bg-slate-900/60 border border-white/10 p-3 shadow-2xl backdrop-blur-xl">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-violet-600 via-cyan-500 to-emerald-400 opacity-30 blur-lg group-hover:opacity-60 transition-opacity duration-500" />

            {/* Frame Inner Box */}
            <div className="relative w-full h-full rounded-2xl bg-[#070712] border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-4">
              {/* Profile Photo */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-violet-600 via-cyan-500 to-emerald-400 p-[2px] shadow-lg">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#070712]">
                  <Image
  src="/images/profile.jpg"
  alt={portfolioData.personal.name}
  fill
  unoptimized
  sizes="128px"
  className="object-cover object-top"
/>
                </div>
              </div>

              <div>
                <h3 className="font-bold font-display text-xl text-white">
                  {portfolioData.personal.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  Final-Year B.Tech CSE
                </p>
              </div>

              <div className="w-full pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{portfolioData.personal.location}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Bio Text & Story */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed font-light text-base sm:text-lg"
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
            {portfolioData.personal.bio.map((paragraph, index) => (
              <p key={index} className="text-slate-300">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300">
                ⚡ Problem Solver
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-violet-300">
                🚀 Full-Stack Engineer
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300">
                ▤ Data science & 🤖 AI / ML Enthusiast
              </span>
              
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Grid */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-slate-950/40 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center space-y-2 group hover:border-cyan-500/40 transition-all"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black font-display text-white tracking-tight">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs font-mono text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}