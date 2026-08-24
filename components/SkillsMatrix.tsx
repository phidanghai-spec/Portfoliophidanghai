"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Code2, Terminal } from "lucide-react";

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; hover: string; dot: string }> = {
  Backend: {
    bg: "bg-teal-950/30",
    border: "border-teal-500/30",
    text: "text-teal-300",
    hover: "hover:border-teal-500/50 hover:bg-teal-950/50",
    dot: "bg-teal-400",
  },
  Frontend: {
    bg: "bg-cyan-950/30",
    border: "border-cyan-500/30",
    text: "text-cyan-300",
    hover: "hover:border-cyan-500/50 hover:bg-cyan-950/50",
    dot: "bg-cyan-400",
  },
  Databases: {
    bg: "bg-sky-950/30",
    border: "border-sky-500/30",
    text: "text-sky-300",
    hover: "hover:border-sky-500/50 hover:bg-sky-950/50",
    dot: "bg-sky-400",
  },
  "QA & Tooling": {
    bg: "bg-emerald-950/30",
    border: "border-emerald-500/30",
    text: "text-emerald-300",
    hover: "hover:border-emerald-500/50 hover:bg-emerald-950/50",
    dot: "bg-emerald-400",
  },
};

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = Object.keys(portfolioData.skillsMatrix);

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-2 mb-10"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest">
            <Code2 size={13} />
            <span>TECH STACK // COMPETENCY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Skills Matrix</h2>
          <p className="text-slate-300 max-w-xl text-sm leading-relaxed">
            Bộ kỹ năng công nghệ thực chiến — từ backend OOP, database optimization đến Selenium automation testing.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all duration-150 ${
              activeCategory === null
                ? "border-teal-500/40 bg-teal-950/50 text-teal-300 font-semibold"
                : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200"
            }`}
          >
            Tất Cả Stack
          </button>
          {categories.map((cat) => {
            const colors = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all duration-150 ${
                  activeCategory === cat
                    ? `${colors.border} ${colors.bg} ${colors.text} font-semibold shadow-[0_0_12px_-2px_rgba(45,212,191,0.3)]`
                    : `border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200`
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {categories
              .filter((cat) => activeCategory === null || cat === activeCategory)
              .map((cat, catIdx) => {
                const colors = CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.Backend;
                const skills = portfolioData.skillsMatrix[cat];

                return (
                  <motion.div
                    key={cat}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, delay: catIdx * 0.04 }}
                    className={`rounded-2xl border p-5 ${colors.border} ${colors.bg} backdrop-blur-sm flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/[0.06]">
                        <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                        <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${colors.text}`}>
                          {cat} ({skills.length} techs)
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {skills.map((skill) => (
                          <div
                            key={skill}
                            className={`
                              px-3 py-2 rounded-xl border text-xs font-mono
                              border-slate-800/80 bg-slate-950/60 text-slate-200
                              ${colors.hover}
                              transition-all duration-150 cursor-default flex items-center justify-between
                            `}
                          >
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
