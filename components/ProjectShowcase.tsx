"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { portfolioData, Category } from "@/data/portfolioData";
import ProjectCard from "./ProjectCard";
import { Filter, Layers } from "lucide-react";

const ALL_CATEGORIES: Category[] = [
  "All",
  "Fullstack E-Commerce",
  "System Design & Backend",
  "Automation QA Testing",
];

const CATEGORY_LABELS: Record<Category, string> = {
  All: "Tất Cả",
  "Fullstack E-Commerce": "Fullstack",
  "System Design & Backend": "Architecture",
  "Automation QA Testing": "QA Testing",
};

export default function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeTech, setActiveTech] = useState<string | null>(null);

  // Tech badges for Tier 2 — derived from current category
  const techBadges = useMemo(() => {
    const projects =
      activeCategory === "All"
        ? portfolioData.projects
        : portfolioData.projects.filter((p) => p.category === activeCategory);
    const techs = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => techs.add(t)));
    return Array.from(techs);
  }, [activeCategory]);

  // Filter projects for display
  const filteredProjects = useMemo(() => {
    return portfolioData.projects.filter((p) => {
      const catMatch = activeCategory === "All" || p.category === activeCategory;
      return catMatch;
    });
  }, [activeCategory]);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setActiveTech(null);
  };

  const handleTechClick = (tech: string) => {
    setActiveTech((prev) => (prev === tech ? null : tech));
  };

  const isProjectDimmed = (projectTechStack: string[]) => {
    if (!activeTech) return false;
    return !projectTechStack.includes(activeTech);
  };

  const isProjectActive = (projectTechStack: string[]) => {
    if (!activeTech) return false;
    return projectTechStack.includes(activeTech);
  };

  return (
    <section id="projects" className="py-24 px-4">
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
            <Layers size={13} />
            <span>CASE STUDIES // ENGINEERING PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Dự Án Nổi Bật
          </h2>
          <p className="text-slate-300 max-w-xl text-sm leading-relaxed">
            3 case studies thực tế — từ kiến trúc phân tầng 3-Tier, fullstack e-commerce real-time đến automation QA testing với Selenium.
          </p>
        </motion.div>

        {/* Tier 1: Category tabs */}
        <LayoutGroup>
          <div className="flex items-center gap-1 flex-wrap mb-6 p-1 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm w-fit">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`relative px-4 py-2 text-xs font-mono rounded-lg font-medium transition-colors duration-150 ${
                  activeCategory === cat
                    ? "text-teal-300"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="categoryPill"
                    className="absolute inset-0 rounded-lg bg-teal-500/15 border border-teal-500/30"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{CATEGORY_LABELS[cat]}</span>
              </button>
            ))}
          </div>

          {/* Tier 2: Tech badge filter pills */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 flex-wrap mb-10"
            >
              <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                <Filter size={11} className="text-teal-400" />
                Lọc theo tech:
              </span>
              {techBadges.map((tech) => (
                <motion.button
                  key={tech}
                  layout
                  onClick={() => handleTechClick(tech)}
                  whileTap={{ scale: 0.94 }}
                  className={`relative px-3 py-1 rounded-full text-xs font-mono border transition-all duration-150 ${
                    activeTech === tech
                      ? "border-teal-500/60 text-teal-300 bg-teal-950/60 shadow-[0_0_12px_-2px_rgba(45,212,191,0.4)]"
                      : "border-slate-800 text-slate-400 bg-slate-900/40 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {activeTech === tech && (
                    <motion.span
                      layoutId="techPill"
                      className="absolute inset-0 rounded-full bg-teal-500/10"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{tech}</span>
                </motion.button>
              ))}
              {activeTech && (
                <button
                  onClick={() => setActiveTech(null)}
                  className="text-xs text-teal-400 font-mono hover:text-teal-300 underline underline-offset-2 transition-colors ml-1"
                >
                  Reset
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={isProjectActive(project.techStack)}
                isDimmed={isProjectDimmed(project.techStack)}
                onTechClick={handleTechClick}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
