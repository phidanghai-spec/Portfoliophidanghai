"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Project } from "@/data/portfolioData";
import { ExternalLink, GitFork, ChevronRight, Code2 } from "lucide-react";

interface ProjectCardProps {
  project: Project & { subtitle?: string };
  isActive: boolean;
  isDimmed: boolean;
  onTechClick: (tech: string) => void;
  index: number;
}

const categoryAccent: Record<string, string> = {
  "Fullstack E-Commerce": "from-teal-500/30 to-cyan-500/30 border-teal-500/40",
  "System Design & Backend": "from-cyan-500/30 to-blue-500/30 border-cyan-500/40",
  "Automation QA Testing": "from-emerald-500/30 to-teal-500/30 border-emerald-500/40",
};

const metricAccent: Record<string, string> = {
  "Fullstack E-Commerce": "text-teal-300 bg-teal-950/50 border-teal-500/30",
  "System Design & Backend": "text-cyan-300 bg-cyan-950/50 border-cyan-500/30",
  "Automation QA Testing": "text-emerald-300 bg-emerald-950/50 border-emerald-500/30",
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
  const [imgError, setImgError] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  // Subtle 3D tilt springs
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

      setSpotlightPos({ x, y });

      rotateX.set(((y - centerY) / centerY) * -4);
      rotateY.set(((x - centerX) / centerX) * 4);
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

  const metricStyle = metricAccent[project.category] ?? metricAccent["Fullstack E-Commerce"];

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: isDimmed ? 0.25 : 1,
        y: 0,
        scale: isActive ? 1.01 : isDimmed ? 0.98 : 1,
      }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      style={
        !isTouchDevice
          ? { rotateX, rotateY, transformPerspective: 1000 }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`
        relative group rounded-2xl border bg-slate-900/70 backdrop-blur-md overflow-hidden
        transition-all duration-200 cursor-default flex flex-col justify-between
        ${isActive
          ? "border-teal-500/50 shadow-[0_0_30px_-5px_rgba(45,212,191,0.25)]"
          : "border-slate-800/90 hover:border-teal-500/30"
        }
        ${isDimmed ? "pointer-events-none" : ""}
      `}
    >
      {/* Blueprint Spotlight overlay */}
      {isHovered && !isTouchDevice && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(250px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(45,212,191,0.08), transparent 70%)`,
          }}
        />
      )}

      {/* Top technical accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-500/40 via-cyan-500/40 to-sky-500/40" />

      <div className="p-6 flex flex-col gap-5 flex-1 justify-between">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono text-teal-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                {project.category}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                {project.title}
                {project.subtitle && (
                  <span className="ml-2 text-sm font-normal text-slate-400">
                    — {project.subtitle}
                  </span>
                )}
              </h3>
              <span className="text-xs text-slate-400 font-mono">{project.role}</span>
            </div>

            {/* Metric badge */}
            {project.metrics && (
              <div className={`shrink-0 flex flex-col items-end gap-0.5 px-3 py-1.5 rounded-xl border font-mono ${metricStyle}`}>
                <span className="text-lg font-bold tracking-tight">{project.metrics.value}</span>
                <span className="text-[10px] opacity-80 uppercase">{project.metrics.label}</span>
              </div>
            )}
          </div>

          {/* Project Screenshot / Blueprint Schematic Location */}
          {project.image && !imgError ? (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60 group/img">
              <Image
                src={project.image}
                alt={project.imageAlt || `${project.title} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div className="w-full py-6 px-4 rounded-xl border border-dashed border-cyan-500/20 bg-slate-950/40 flex items-center justify-between font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Code2 size={15} className="text-teal-400" />
                <span>SYS_SPEC // {project.id.toUpperCase()}</span>
              </div>
              <span className="text-[10px] text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                PROD_READY
              </span>
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <button
                key={tech}
                onClick={() => onTechClick(tech)}
                className="
                  px-2.5 py-1 rounded-lg text-xs font-mono border border-slate-800
                  bg-slate-950/50 text-slate-300
                  hover:border-teal-500/40 hover:text-teal-300 hover:bg-teal-950/30
                  transition-all duration-150 active:scale-95
                "
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Highlights */}
          <ul className="flex flex-col gap-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                <ChevronRight className="mt-1 shrink-0 text-teal-400" size={14} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex gap-4 pt-3 mt-2 border-t border-slate-800/80">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-teal-300 transition-colors"
              >
                <GitFork size={13} />
                GitHub Repo
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-teal-400 hover:text-teal-300 font-semibold transition-colors"
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
