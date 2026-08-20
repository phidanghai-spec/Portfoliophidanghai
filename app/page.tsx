import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import ArchitectureView from "@/components/ArchitectureView";
import SkillsMatrix from "@/components/SkillsMatrix";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070d19] text-slate-100 relative blueprint-grid overflow-hidden">
      <Navigation />
      <Hero />
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>
      <ProjectShowcase />
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>
      <ArchitectureView />
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>
      <SkillsMatrix />
      <Contact />
    </main>
  );
}
