"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Mail,
  Terminal as TerminalIcon,
  Code,
  User,
  Sparkles,
  Layers,
  Award,
  Send,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { portfolioData } from "@/data/portfolio";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const items = [
    {
      id: "sec-hero",
      title: "Home / Hero",
      category: "Sections",
      icon: Sparkles,
      action: () => {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "sec-about",
      title: "About Kiran",
      category: "Sections",
      icon: User,
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "sec-skills",
      title: "Skills & Stack",
      category: "Sections",
      icon: Code,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "sec-projects",
      title: "Featured Projects",
      category: "Sections",
      icon: Layers,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "sec-experience",
      title: "Experience & Education",
      category: "Sections",
      icon: Award,
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "sec-contact",
      title: "Contact & Links",
      category: "Sections",
      icon: Send,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "action-resume",
      title: "Download Resume (PDF)",
      category: "Actions",
      icon: FileText,
      action: () => {
        window.open(portfolioData.personal.resume, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "action-email",
      title: "Copy Email Address",
      category: "Actions",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "action-terminal",
      title: "Open Terminal Overlay (~)",
      category: "Actions",
      icon: TerminalIcon,
      action: () => {
        window.dispatchEvent(new CustomEvent("toggle-terminal"));
        setIsOpen(false);
      },
    },
    {
      id: "link-github",
      title: "Open GitHub Profile",
      category: "Social",
      icon: GithubIcon,
      action: () => {
        window.open(portfolioData.personal.github, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "link-linkedin",
      title: "Open LinkedIn Profile",
      category: "Social",
      icon: LinkedinIcon,
      action: () => {
        window.open(portfolioData.personal.linkedin, "_blank");
        setIsOpen(false);
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-slate-900/90 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {copied && (
              <div className="px-4 py-2 bg-emerald-500/20 text-emerald-300 text-xs font-mono border-b border-emerald-500/30 flex items-center justify-between">
                <span>✓ Email address copied to clipboard!</span>
              </div>
            )}

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-400 font-mono">
                  No matching commands found.
                </div>
              ) : (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-200 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 group-hover:bg-cyan-950 group-hover:text-cyan-300">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/60 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              <span>Use ↑↓ to navigate</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
