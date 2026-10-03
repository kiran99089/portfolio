"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Menu,
  X,
  Sparkles,
  User,
  Code,
  Layers,
  Award,
  Send,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const navItems = [
  { id: "hero", label: "Home", icon: Sparkles },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "experience", label: "Experience", icon: Award },
  { id: "contact", label: "Contact", icon: Send },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);

      // Section intersection detection
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = currentScrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerCommandPalette = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
      >
        {/* Floating Glass Pill Navbar */}
        <nav className="pointer-events-auto flex items-center justify-between gap-3 md:gap-6 px-4 py-2.5 rounded-full bg-slate-950/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all">
          {/* Logo / Brand */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#050510] flex items-center justify-center font-extrabold font-display text-xs text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                KE
              </div>
            </div>
            <span className="hidden sm:inline font-bold font-display text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              KIRAN <span className="text-cyan-400 font-normal">EEGALA</span>
            </span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 rounded-full border border-white/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive ? "text-cyan-300" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/30 to-cyan-500/30 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={triggerCommandPalette}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 text-xs text-slate-300 hover:text-white transition-all group"
              title="Open Command Palette (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-mono text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-white/5">
                ⌘K
              </span>
            </button>

            {/* Resume Button */}
            <a
              href={portfolioData.personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-xs font-semibold text-white shadow-md hover:shadow-cyan-500/20 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Fullscreen Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-[#030308]/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-12 md:hidden"
          >
            <div className="space-y-6">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Navigation
              </span>
              <div className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="flex items-center gap-4 text-2xl font-display font-bold text-slate-200 hover:text-cyan-300 transition-colors text-left"
                    >
                      <Icon className="w-6 h-6 text-violet-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-8 border-t border-slate-800 space-y-4">
                <a
                  href={portfolioData.personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm shadow-lg"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
