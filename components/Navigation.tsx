"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Download, Menu, X, GitFork } from "lucide-react";

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#architecture", label: "Architecture" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-cyan-500/15 bg-[#070d19]/90 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-mono text-sm font-semibold text-white tracking-tight flex items-center gap-1">
          <span className="text-teal-400">{"<"}</span>
          <span className="text-slate-100">{portfolioData.profile.name.split(" ").pop()}</span>
          <span className="text-cyan-400">{" />"}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-teal-300 rounded-lg hover:bg-white/[0.04] transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="/resume.pdf"
            download="CV_Fullstack_Intern_DangHaiPhi.pdf"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all duration-150 active:scale-95 shadow-[0_0_20px_-4px_rgba(45,212,191,0.4)]"
          >
            <Download size={13} />
            CV PDF
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-cyan-500/15 bg-[#070d19]/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-teal-300 rounded-xl hover:bg-white/[0.04] transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download="CV_Fullstack_Intern_DangHaiPhi.pdf"
            className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all duration-150"
          >
            <Download size={13} />
            Tải CV PDF
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
