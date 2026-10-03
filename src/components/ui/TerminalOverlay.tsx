"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">
            KIRAN EEGALA Terminal [Version 2.0.4]
          </p>
          <p>Type <span className="text-violet-400 font-semibold">'help'</span> to see available commands. Press <span className="text-amber-300 font-mono">'~'</span> or <span className="text-amber-300 font-mono">'ESC'</span> to exit.</p>
        </div>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomToggle = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-terminal", handleCustomToggle);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-terminal", handleCustomToggle);
    };
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");

    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "exit") {
      setIsOpen(false);
      return;
    }

    let outputNode: React.ReactNode;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-semibold">Available Commands:</p>
            <p><span className="text-amber-300 w-24 inline-block font-mono">about</span> - Read bio and background story</p>
            <p><span className="text-amber-300 w-24 inline-block font-mono">skills</span> - Display key technical competencies</p>
            <p><span className="text-amber-300 w-24 inline-block font-mono">projects</span> - View featured developer projects</p>
            <p><span className="text-amber-300 w-24 inline-block font-mono">contact</span> - Get direct email and social links</p>
            <p><span className="text-amber-300 w-24 inline-block font-mono">clear</span> - Clear terminal window</p>
            <p><span className="text-amber-300 w-24 inline-block font-mono">exit</span> - Close terminal overlay</p>
          </div>
        );
        break;

      case "about":
        outputNode = (
          <div className="space-y-2 text-slate-300 max-w-xl">
            <p className="text-violet-400 font-semibold">{portfolioData.personal.name} • {portfolioData.personal.role}</p>
            {portfolioData.personal.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-2 text-slate-300">
            {portfolioData.skills.map((cat) => (
              <div key={cat.category}>
                <span className="text-cyan-400 font-semibold">{cat.category}: </span>
                <span>{cat.skills.map((s) => s.name).join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-slate-300">
            {portfolioData.projects.map((proj) => (
              <div key={proj.id} className="border-l-2 border-cyan-500/40 pl-3">
                <p className="font-bold text-white">{proj.title} <span className="text-xs font-mono text-cyan-400">[{proj.category}]</span></p>
                <p className="text-xs text-slate-400">{proj.tagline}</p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">Stack: {proj.techStack.join(" • ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p><span className="text-cyan-400">Email:</span> {portfolioData.personal.email}</p>
            <p><span className="text-cyan-400">GitHub:</span> {portfolioData.personal.github}</p>
            <p><span className="text-cyan-400">LinkedIn:</span> {portfolioData.personal.linkedin}</p>
          </div>
        );
        break;

      default:
        outputNode = (
          <p className="text-red-400">
            Command not recognized: <span className="font-mono">{cmd}</span>. Type <span className="text-amber-300 font-mono">'help'</span> for list of commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputNode }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg">
          {/* Backdrop click */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-3xl h-[480px] bg-[#080812] border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono text-xs z-10"
          >
            {/* Header Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-slate-400 select-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="ml-2 text-xs text-slate-300 flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                  kiran@portfolio:~ (zsh)
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body Output */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span>kiran@portfolio:~$</span>
                    <span className="text-white font-semibold">{item.command}</span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Prompt Input */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-3 bg-slate-900/70 border-t border-slate-800">
              <span className="text-cyan-400">kiran@portfolio:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white focus:outline-none"
                placeholder="type a command..."
                autoFocus
              />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
