"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { introStart, CONTENT_REVEAL, CONTENT_FADE } from "@/lib/introTiming";

export default function IntroReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  const [delay] = useState(() =>
    Math.max(0, CONTENT_REVEAL - (performance.now() - introStart) / 1000)
  );

  return (
    <motion.div
      initial={{ opacity: reduceMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : CONTENT_FADE,
        delay: reduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className="flex  w-full flex-col justify-between"
    >
      {children}
    </motion.div>
  );
}