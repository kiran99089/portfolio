"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

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
          {portfolioData.experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative group"
            >
              {/* Timeline Node Pulsing Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-4 hover:border-cyan-500/40 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
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
          ))}
        </div>
      </div>

      {/* 2. Education & Certifications */}
      <div className="space-y-12">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
            <span>Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400">Certifications</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-8 rounded-3xl bg-slate-950/40 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 text-white w-fit shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Undergraduate Degree
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-1">
                  B.Tech in Computer Science
                </h3>
                <p  className="text-sm font-mono text-slate-400 mt-1">
               GIET ENGINEERING COLLEGE,Rajahmundry
                </p><br></br>
                <p className="text-sm font-mono text-slate-400 mt-1">
                  Final Year Student • Graduating 2027
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
Studying core computer science with a focus on software development, data structures and algorithms, and artificial intelligence.              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Status: Final Year</span>
              <span className="text-emerald-400 font-semibold">Active Enrolled</span>
            </div>
          </motion.div>

          {/* Certifications Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioData.certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-950/40 border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-3 hover:border-cyan-500/30 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-slate-500">{cert.date}</span>
                  </div>
                  <h4 className="font-bold font-display text-sm text-white group-hover:text-cyan-200 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">{cert.issuer}</p>
                </div>

                <div className="pt-2 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                  <span>Verified Certification</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
