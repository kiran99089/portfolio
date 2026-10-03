"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Copy, Check, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { portfolioData } from "@/data/portfolio";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", botCheck: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", botCheck: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
          <Send className="w-3.5 h-3.5 text-cyan-400" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-400 to-emerald-400">Intelligent</span>
        </h2>
        <p className="text-slate-400 max-w-xl text-sm sm:text-base font-light">
          Whether you have an exciting software project, job opportunity, or tech discussion in mind, my inbox is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 p-8 rounded-3xl bg-slate-950/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold font-display text-white">
              Contact Details
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
              Feel free to reach out via direct email or social channels.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 rounded-xl bg-violet-600/20 text-violet-300 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-mono text-slate-200 truncate">
                {portfolioData.personal.email}
              </span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors shrink-0"
              title="Copy Email"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              Social Profiles
            </span>
            <div className="flex items-center gap-3">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-900 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white font-semibold text-xs transition-all"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-900 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white font-semibold text-xs transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 p-8 rounded-3xl bg-slate-950/40 border border-white/10 backdrop-blur-xl shadow-xl"
        >
          {status === "success" ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Message Received!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto font-light">
                Thank you for reaching out. I have received your message and will respond as soon as possible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2.5 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="botCheck"
                value={formData.botCheck}
                onChange={(e) => setFormData({ ...formData, botCheck: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-500 text-white font-semibold text-sm shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
