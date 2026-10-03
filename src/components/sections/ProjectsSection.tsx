"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { portfolioData, Project } from "@/data/portfolio";
import ProjectDetailModal from "./ProjectDetailModal";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = ["All", "Web", "AI-ML"];

  const filteredProjects =
    activeFilter === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5 text-violet-400" />
          <span>Selected Works</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400">Projects</span>
        </h2>
        <p className="text-slate-400 max-w-xl text-sm sm:text-base font-light">
          Real-world applications spanning AI document synthesis, WebGL background engines, and real-time metric streams.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-xs font-mono transition-all ${
              activeFilter === filter
                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_16px_rgba(6,182,212,0.4)]"
                : "bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-white/5"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col justify-between p-6 rounded-3xl bg-slate-950/40 border border-white/10 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => setSelectedProject(project)}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-violet-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono">
                  {project.category}
                </span>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light line-clamp-3 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-900 text-[10px] font-mono text-slate-500">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 group-hover:underline flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                View Case Study
              </span>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-white/5 hover:border-white/20 transition-colors"
                  title="View GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-colors"
                    title="Open Live Preview"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
