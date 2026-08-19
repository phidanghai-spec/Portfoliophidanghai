"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Layers, GitBranch, ArrowDown } from "lucide-react";

type ViewMode = "architecture" | "patterns";

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  Creational: {
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    text: "text-indigo-300",
    dot: "bg-indigo-500",
  },
  Structural: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-300",
    dot: "bg-violet-500",
  },
  Behavioral: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-300",
    dot: "bg-emerald-500",
  },
};

const TIER_COLORS = ["indigo", "violet", "emerald"] as const;
const TIER_STYLES = {
  indigo: {
    border: "border-indigo-500/40",
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    glow: "shadow-[0_0_24px_-4px_rgba(99,102,241,0.3)]",
    connector: "bg-indigo-500/40",
    dot: "bg-indigo-500",
  },
  violet: {
    border: "border-violet-500/40",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    glow: "shadow-[0_0_24px_-4px_rgba(139,92,246,0.3)]",
    connector: "bg-violet-500/40",
    dot: "bg-violet-500",
  },
  emerald: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "shadow-[0_0_24px_-4px_rgba(52,211,153,0.3)]",
    connector: "bg-emerald-500/40",
    dot: "bg-emerald-500",
  },
};

function FlowConnector({ color }: { color: typeof TIER_COLORS[number] }) {
  const styles = TIER_STYLES[color];
  return (
    <div className="flex flex-col items-center gap-0.5 py-1">
      <motion.div
        className={`w-px h-6 ${styles.connector}`}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={14} className={styles.text} />
      </motion.div>
      <motion.div
        className={`w-px h-6 ${styles.connector}`}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.35 }}
      />
    </div>
  );
}

function ArchitectureView3Tier() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-0 max-w-xl mx-auto">
      {portfolioData.architectureTiers.map((tier, idx) => {
        const color = TIER_COLORS[idx];
        const styles = TIER_STYLES[color];
        const isActive = activeNode === tier.id;

        return (
          <div key={tier.id} className="flex flex-col items-center w-full">
            <motion.div
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12, type: "spring", stiffness: 300, damping: 25 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveNode(isActive ? null : tier.id)}
              className={`
                w-full rounded-2xl border p-5 cursor-pointer transition-all duration-200
                ${styles.border} ${styles.bg}
                ${isActive ? styles.glow : ""}
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className={`text-xs font-mono uppercase tracking-widest ${styles.text}`}>
                    Layer {idx + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white">{tier.label}</h3>
                  <span className="text-xs text-neutral-500 font-mono">{tier.sublabel}</span>
                </div>
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${styles.dot}`} />
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-neutral-400 border-t border-white/[0.06] pt-3">
                      {tier.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tier.items.map((item) => (
                        <span
                          key={item}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-mono ${styles.border} ${styles.text} ${styles.bg}`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {idx < portfolioData.architectureTiers.length - 1 && (
              <FlowConnector color={color} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function GofPatternsGrid() {
  const categories = ["Creational", "Structural", "Behavioral"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((cat, catIdx) => {
        const patterns = portfolioData.gofPatterns.filter((p) => p.category === cat);
        const colors = CATEGORY_COLORS[cat];

        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: catIdx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
            className={`rounded-2xl border p-5 ${colors.border} ${colors.bg}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
              <span className={`text-xs font-mono uppercase tracking-widest ${colors.text}`}>
                {cat}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {patterns.map((pattern, pIdx) => (
                <motion.div
                  key={pattern.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: catIdx * 0.1 + pIdx * 0.04 }}
                  className="flex flex-col gap-0.5"
                >
                  <span className="text-sm font-medium text-white">{pattern.name}</span>
                  <span className="text-xs text-neutral-500">{pattern.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ArchitectureView() {
  const [mode, setMode] = useState<ViewMode>("architecture");

  return (
    <section id="architecture" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 mb-10"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest">
            <GitBranch size={13} />
            <span>System Design</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Architecture Visualizer
              </h2>
              <p className="mt-1 text-neutral-400 max-w-xl">
                Khám phá kiến trúc 3 tầng và 12 GoF Design Patterns được triển khai trong CineVerse.
              </p>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl border border-white/[0.06] bg-white/[0.02] w-fit shrink-0">
              {(["architecture", "patterns"] as ViewMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-colors ${
                    mode === m ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="modePill"
                      className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.12]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {m === "architecture" ? <Layers size={13} /> : <GitBranch size={13} />}
                    {m === "architecture" ? "3-Tier Arch" : "12 GoF Patterns"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {mode === "architecture" ? (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <ArchitectureView3Tier />
            </motion.div>
          ) : (
            <motion.div
              key="patterns"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <GofPatternsGrid />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
