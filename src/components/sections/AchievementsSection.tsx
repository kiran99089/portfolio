// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Trophy, Award, Flame, Code } from "lucide-react";
// import { portfolioData } from "@/data/portfolio";

// export default function AchievementsSection() {
//   return (
//     <section id="achievements" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
//       {/* Section Header */}
//       <div className="flex flex-col items-center text-center space-y-3 mb-16">
//         <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
//           <Trophy className="w-3.5 h-3.5 text-amber-400" />
//           <span>Honors & Milestones</span>
//         </div>
//         <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
//           Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-violet-400 to-cyan-400">Recognition</span>
//         </h2>
//       </div>

//       {/* Achievements Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {portfolioData.achievements.map((ach, idx) => (
//           <motion.div
//             key={ach.id}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: idx * 0.15 }}
//             className="p-8 rounded-3xl bg-slate-950/40 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all group"
//           >
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
//                   <Flame className="w-6 h-6" />
//                 </div>
//                 <span className="text-xs font-mono text-slate-500">{ach.date}</span>
//               </div>

//               <div>
//                 <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
//                   {ach.organization}
//                 </span>
//                 <h3 className="text-xl font-bold font-display text-white mt-1 group-hover:text-amber-300 transition-colors">
//                   {ach.title}
//                 </h3>
//               </div>

//               <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
//                 {ach.description}
//               </p>
//             </div>

//             <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
//               <span className="flex items-center gap-1.5">
//                 <Code className="w-3.5 h-3.5 text-cyan-400" />
//                 Competitive Programming
//               </span>
//               <span className="text-amber-400 font-semibold">Awarded</span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }
