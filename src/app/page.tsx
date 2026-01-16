import Navbar from "@/components/ui/Navbar";
import Hero3D from "@/components/sections/Hero3D";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import FloatingDock from "@/components/ui/FloatingDock";
import InteractiveBackground from "@/components/ui/InteractiveBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <InteractiveBackground />
      <Navbar />
      <Hero3D />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <FloatingDock />

      {/* Subtle grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}
