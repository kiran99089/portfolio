"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030308] text-white select-none pointer-events-auto"
        >
          {/* Subtle glowing center blur */}
          <div className="absolute w-72 h-72 rounded-full bg-violet-600/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center gap-3 text-center px-4"
          >
            {/* Glowing Tag */}
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Initializing Experience
            </div>

            {/* Main Name Reveal */}
            <h1 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-300">
              KIRAN EEGALA
            </h1>

            {/* Progress line */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2 relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
