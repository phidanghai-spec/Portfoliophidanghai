"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import {
  Download,
  GitFork,
  Copy,
  Check,
  MapPin,
  GraduationCap,
  Users,
  Zap,
  Terminal,
  ShieldCheck,
} from "lucide-react";

function CountingNumber({ value }: { value: string }) {
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : null;
  const rest = numericMatch ? value.slice(numericMatch[1].length) : value;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const counter = useMotionValue(0);
  const spring = useSpring(counter, { stiffness: 200, damping: 30 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsubscribe;
  }, [spring]);

  useEffect(() => {
    if (inView && numericValue !== null) {
      counter.set(numericValue);
    }
  }, [inView, numericValue, counter]);

  if (numericValue === null) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {display}
      {rest}
    </span>
  );
}

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const { profile, statsRibbon } = portfolioData;

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background blueprint glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-48 bg-teal-500/5 blur-[90px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Technical Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3 w-fit mb-8 flex-wrap"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-950/40 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
            </span>
            <span className="text-xs font-mono font-medium text-teal-300">{profile.status}</span>
          </div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5 border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 rounded-full">
            <Terminal size={12} className="text-teal-400" />
            <span>HUFLIT &middot; Class of 2027</span>
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Text specs (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="inline-block w-4 h-px bg-cyan-400" />
                <span>TECHNICAL PROFILE // SPECIFICATION</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                <span className="text-white">{profile.name}</span>
                <br />
                <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                  {profile.title}
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 flex flex-col gap-2.5 text-sm text-slate-300"
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap size={15} className="text-teal-400 shrink-0" />
                <span>
                  {profile.school} &middot; GPA{" "}
                  <span className="text-teal-300 font-mono font-semibold">{profile.gpa}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users size={15} className="text-cyan-400 shrink-0" />
                <span>{profile.club}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-slate-400 shrink-0" />
                <span>{profile.location}</span>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="/resume.pdf"
                download="CV_Fullstack_Intern_DangHaiPhi.pdf"
                className="
                  flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                  bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold
                  transition-all duration-150 active:scale-95
                  shadow-[0_0_25px_-4px_rgba(45,212,191,0.4)]
                "
              >
                <Download size={15} />
                Tải CV PDF
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                  border border-slate-700/60 bg-slate-900/60 text-slate-200
                  hover:bg-slate-800/60 hover:border-teal-500/40 hover:text-teal-300
                  transition-all duration-150 active:scale-95
                "
              >
                <GitFork size={15} />
                GitHub
              </a>

              <button
                onClick={handleCopyEmail}
                className="
                  relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                  border border-slate-700/60 bg-slate-900/60 text-slate-200
                  hover:bg-slate-800/60 hover:border-teal-500/40 hover:text-teal-300
                  transition-all duration-150 active:scale-95 font-mono
                "
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-teal-400" />
                    <span className="text-teal-400">Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    {profile.email}
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Right: Technical Photo & Blueprint Specs (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 items-center"
          >
            {/* Technical Avatar Frame */}
            <div className="relative group w-full max-w-[280px] aspect-[4/5] rounded-2xl p-2 border border-teal-500/30 bg-slate-900/80 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(45,212,191,0.2)]">
              {/* Technical drafting corner marks */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-teal-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-teal-400" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-teal-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-teal-400" />

              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-950">
                <Image
                  src="/images/avatar.jpg"
                  alt="Đặng Hải Phi - Fullstack Developer Intern"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-teal-300 font-semibold px-2 py-0.5 rounded bg-slate-950/80 border border-teal-500/30 backdrop-blur-sm">
                    DEV_ID #DHP-2026
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded border border-white/[0.08]">
                    <ShieldCheck size={11} className="text-teal-400" />
                    VERIFIED
                  </div>
                </div>
              </div>
            </div>

            {/* Quick mini specs */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-[280px]">
              {[
                { icon: Zap, label: "Core Stack", value: "ASP.NET + Next" },
                { icon: Terminal, label: "Patterns", value: "12 GoF" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col gap-0.5 text-xs font-mono"
                >
                  <span className="text-slate-400 flex items-center gap-1">
                    <Icon size={12} className="text-teal-400" />
                    {label}
                  </span>
                  <span className="text-slate-200 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {statsRibbon.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              whileHover={{ y: -2 }}
              className="
                flex flex-col gap-1 p-5 rounded-2xl
                border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm
                hover:border-teal-500/30 hover:bg-slate-900/90
                transition-all duration-200
              "
            >
              <span className="text-3xl font-bold font-mono tracking-tight text-white">
                <CountingNumber value={stat.value} />
              </span>
              <span className="text-sm font-medium text-slate-200">{stat.label}</span>
              <span className="text-xs text-slate-400 font-mono">{stat.helper}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
