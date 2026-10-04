"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { portfolioData } from "@/data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

export default function Footer() {
  const { name, github, linkedin, email } = portfolioData.personal;

  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const headingClass =
    "mb-6 font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-500";
  const linkClass =
    "text-lg text-slate-300 transition-colors hover:text-white";

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-gradient-to-b from-transparent via-black/20 to-black/60">
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 text-sm font-black text-white">
                {initials}
              </span>
              <span className="font-display text-xl font-bold text-white">
                {name}
              </span>
            </div>
            <p className="max-w-xs text-base leading-relaxed text-slate-400">
              Final-year CSE student building high-performance web apps and
              intelligent AI-driven solutions.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cyan-300"
                title="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cyan-300"
                title="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${email}`}
                className="transition-colors hover:text-cyan-300"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className={headingClass}>Navigate</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={headingClass}>Resources</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/EEGALA_KIRAN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Resume
                </a>
              </li>
              <li>
                <a href="#contact" className={linkClass}>
                  Hire Me
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={headingClass}>Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>

<div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md shadow-[0_0_25px_rgba(16,185,129,0.08)]">
  <span className="relative flex h-2.5 w-2.5">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
  </span>

  <span className="text-sm font-medium tracking-wide text-white/90">
    Open to new opportunities
  </span>
</div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs text-slate-300 transition-all hover:border-cyan-500/40 hover:text-white"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 text-cyan-400 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Giant faded name watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-0 -mb-[2vw] select-none overflow-hidden whitespace-nowrap text-center font-display font-black uppercase leading-none tracking-tight"
      >
        <span className="bg-gradient-to-r from-fuchsia-500/25 via-violet-500/15 to-cyan-500/25 bg-clip-text text-[11vw] text-transparent">
          {name}
        </span>
      </div>
    </footer>
  );
}