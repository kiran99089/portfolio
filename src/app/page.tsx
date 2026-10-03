import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
// import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/navigation/Footer";
import ChatBot from "@/components/ChatBot";
import IntroReveal from "@/components/IntroReveal";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full selection:bg-cyan-500/30 selection:text-cyan-200">
      <IntroReveal>
        {/* Floating Glass Pill Navbar */}
        <Navbar />

        {/* Main Portfolio Sections */}
        <main className="relative z-10 space-y-12 sm:space-y-20">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          {/* <AchievementsSection /> */}
          <ContactSection />
          <ChatBot />
        </main>

        {/* Footer */}
        <Footer />
      </IntroReveal>
    </div>
  );
}