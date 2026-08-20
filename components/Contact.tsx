"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Mail, Phone, GitFork, MapPin, Copy, Check, Terminal } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { profile } = portfolioData;
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const contactItems = [
    { key: "email", icon: Mail, label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
    { key: "phone", icon: Phone, label: "PHONE", value: profile.phone, href: `tel:${profile.phone}` },
    { key: "github", icon: GitFork, label: "GITHUB", value: "phidanghai-spec", href: profile.github },
    { key: "location", icon: MapPin, label: "LOCATION", value: profile.location, href: null },
  ];

  return (
    <section id="contact" className="py-24 px-4 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest">
            <Terminal size={13} />
            <span>COMMUNICATION CHANNELS // CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Liên Hệ Trực Tiếp</h2>
          <p className="text-slate-300 max-w-md text-sm leading-relaxed">
            Sẵn sàng trao đổi cơ hội thực tập Fullstack / Backend Developer và phỏng vấn kỹ thuật.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {contactItems.map(({ key, icon: Icon, label, value, href }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="relative p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm flex flex-col gap-3 group hover:border-teal-500/40 transition-all duration-200"
            >
              <div className="p-2 rounded-xl bg-teal-950/50 border border-teal-500/30 w-fit">
                <Icon size={16} className="text-teal-300" />
              </div>
              <div>
                <div className="text-[11px] text-teal-400 font-mono mb-1">{label}</div>
                {href ? (
                  <a
                    href={href}
                    target={key === "github" ? "_blank" : undefined}
                    rel={key === "github" ? "noopener noreferrer" : undefined}
                    className="text-sm font-medium text-slate-200 hover:text-teal-300 transition-colors break-all"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-slate-200">{value}</span>
                )}
              </div>
              {key !== "location" && (
                <button
                  onClick={() => handleCopy(value, key)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-500 hover:text-teal-300 hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-150"
                  title="Sao chép"
                >
                  {copiedItem === key ? <Check size={13} className="text-teal-400" /> : <Copy size={13} />}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center text-xs text-slate-400 font-mono flex flex-col sm:flex-row items-center justify-center gap-2"
        >
          <span>ENGINEERED WITH NEXT.JS &bull; TAILWIND CSS &bull; FRAMER MOTION</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>{profile.name} &copy; 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
