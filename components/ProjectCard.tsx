"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "@/data/portfolioData";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

interface ProjectCardProps {
  project: Project & { subtitle?: string };
  isActive: boolean;
  isDimmed: boolean;
  onTechClick: (tech: string) => void;
  index: number;
}

const categoryAccent: Record<string, string> = {
  "Fullstack E-Commerce": "from-indigo-500/20 to-violet-500/20 border-indigo-500/30",
  "System Design & Backend": "from-violet-500/20 to-purple-500/20 border-violet-500/30",
  "Automation QA Testing": "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
};

const metricAccent: Record<string, string> = {
  "Fullstack E-Commerce": "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  "System Design & Backend": "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Automation QA Testing": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

export default function ProjectCard({
  project,
  isActive,
  isDimmed,
  onTechClick,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  // 3D tilt springs
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Spotlight position
      setSpotlightPos({ x, y });

      // Subtle 3D tilt (max ±6deg)
      rotateX.set(((y - centerY) / centerY) * -6);
      rotateY.set(((x - centerX) / centerX) * 6);
    },
    [isTouchDevice, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!isTouchDevice) {
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [isTouchDevice, rotateX, rotateY]);

  const accentGradient = categoryAccent[project.category] ?? categoryAccent["Fullstack E-Commerce"];
  const metricStyle = metricAccent[project.category] ?? metricAccent["Fullstack E-Commerce"];

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: isDimmed ? 0.25 : 1,
        y: 0,
        scale: isActive ? 1.015 : isDimmed ? 0.97 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.05 }}
      style={
        !isTouchDevice
          ? { rotateX, rotateY, transformPerspective: 1000 }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`
        relative group rounded-2xl border bg-neutral-900/60 backdrop-blur-sm overflow-hidden
        transition-shadow duration-300 cursor-default
        ${isActive
          ? "border-indigo-500/50 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]"
          : "border-white/[0.08]"
        }
        ${isDimmed ? "pointer-events-none" : ""}
      `}
    >
      {/* Spotlight overlay */}
      {isHovered && !isTouchDevice && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(220px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(99,102,241,0.10), transparent 70%)`,
          }}
        />
      )}

      {/* Card gradient header strip */}
      <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${accentGradient.split(" border-")[0].replace("from-", "from-").replace(/\/\d+/g, "")}`} />

      <div className="p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
              {project.category}
            </span>
            <h3 className="text-lg font-semibold text-white tracking-tight leading-snug">
              {project.title}
              {(project as { subtitle?: string }).subtitle && (
                <span className="ml-2 text-sm font-normal text-neutral-400">
                  — {(project as { subtitle?: string }).subtitle}
                </span>
              )}
            </h3>
            <span className="text-xs text-neutral-500 font-mono">{project.role}</span>
          </div>

          {/* Metric badge */}
          {project.metrics && (
            <div className={`shrink-0 flex flex-col items-end gap-0.5 px-3 py-2 rounded-xl border font-mono ${metricStyle}`}>
              <span className="text-xl font-bold tracking-tight">{project.metrics.value}</span>
              <span className="text-[10px] opacity-70">{project.metrics.label}</span>
            </div>
          )}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <button
              key={tech}
              onClick={() => onTechClick(tech)}
              className="
                px-2.5 py-1 rounded-lg text-xs font-mono border border-white/[0.08]
                bg-white/[0.04] text-neutral-400
                hover:border-indigo-500/40 hover:text-indigo-300 hover:bg-indigo-500/10
                transition-all duration-150 active:scale-95
              "
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Highlights */}
        <ul className="flex flex-col gap-2.5">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-400 leading-relaxed">
              <ChevronRight className="mt-0.5 shrink-0 text-emerald-400 opacity-70" size={14} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Footer links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex gap-3 pt-1 border-t border-white/[0.05]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors"
              >
                <Github size={13} />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-indigo-300 transition-colors"
              >
                <ExternalLink size={13} />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
