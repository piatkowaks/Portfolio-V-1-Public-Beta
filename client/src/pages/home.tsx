import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CodeShowcase from "@/components/CodeShowcase";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-github-dark text-github-text font-inter">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <CodeShowcase />
      <ContactSection />
      <Footer />
    </div>
  );
}
