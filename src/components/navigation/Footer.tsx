"use client";

import React from "react";
import {
  ArrowUp,
  Mail,
  User,
  Wrench,
  FolderKanban,
  Briefcase,
  FileText,
  Send,
  Compass,
  FolderOpen,
  MessageCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { portfolioData } from "@/data/portfolio";

const V = "#8b5cf6", C = "#06b6d4", G = "#10b981", A = "#f59e0b", P = "#f472b6", B = "#3b82f6";

type IconType = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const navLinks: { label: string; href: string; icon: IconType; color: string }[] = [
  { label: "About", href: "#about", icon: User, color: V },
  { label: "Skills", href: "#skills", icon: Wrench, color: C },
  { label: "Projects", href: "#projects", icon: FolderKanban, color: G },
  { label: "Experience", href: "#experience", icon: Briefcase, color: A },
];

/* One footer link with a coloured icon box */
function FooterLink({
  href,
  icon: Icon,
  color,
  children,
  external,
  breakAll,
}: {
  href: string;
  icon: IconType;
  color: string;
  children: React.ReactNode;
  external?: boolean;
  breakAll?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-3 text-lg text-slate-300 transition-colors hover:text-white"
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110"
        style={{
          background: `${color}14`,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 0 0 ${color}00`,
        }}
      >
        <Icon className="h-[18px] w-[18px]" style={{ color }} />
      </span>
      <span className={breakAll ? "min-w-0 break-all" : ""}>{children}</span>
    </a>
  );
}

/* Section heading with icon */
function FooterHeading({
  icon: Icon,
  color,
  children,
}: {
  icon: IconType;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <h4 className="mb-6 flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
      <Icon className="h-4 w-4" style={{ color }} />
      {children}
    </h4>
  );
}

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
            <div className="flex items-center gap-3">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition-all hover:-translate-y-0.5 hover:text-white"
                style={{ background: "rgba(226,232,240,.08)", border: "1px solid rgba(226,232,240,.2)" }}
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:-translate-y-0.5"
                style={{ background: `${B}14`, border: `1px solid ${B}40`, color: "#60a5fa" }}
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${email}`}
                title="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:-translate-y-0.5"
                style={{ background: `${P}14`, border: `1px solid ${P}40`, color: P }}
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <FooterHeading icon={Compass} color={V}>Navigate</FooterHeading>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} icon={link.icon} color={link.color}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <FooterHeading icon={FolderOpen} color={C}>Resources</FooterHeading>
            <ul className="space-y-4">
              <li>
                <FooterLink href="/EEGALA_KIRAN.pdf" icon={FileText} color={C} external>
                  Resume
                </FooterLink>
              </li>
              <li>
                <FooterLink href="#contact" icon={Send} color={G}>
                  Hire Me
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <FooterHeading icon={MessageCircle} color={G}>Contact</FooterHeading>
            <ul className="space-y-4">
              <li>
                <FooterLink href={`mailto:${email}`} icon={Mail} color={P} breakAll>
                  {email}
                </FooterLink>
              </li>
              <li>
                <FooterLink
                  href={github}
                  icon={({ className, style }) => <GithubIcon className={className} />}
                  color="#e2e8f0"
                  external
                >
                  GitHub
                </FooterLink>
              </li>
              <li>
                <FooterLink
                  href={linkedin}
                  icon={({ className, style }) => <LinkedinIcon className={className} />}
                  color="#60a5fa"
                  external
                >
                  LinkedIn
                </FooterLink>
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