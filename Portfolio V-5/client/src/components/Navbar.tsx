import { useState, useEffect } from "react";
import { Link } from "wouter";
import { User, FolderGit, Code, Mail, Download, X, Menu } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import logoImage from "../assets/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navClasses = scrollPosition > 50 
    ? "fixed top-4 left-0 right-0 z-50 glass shadow-lg px-8 py-3 transition-all duration-300 mx-4 md:mx-6 lg:mx-8 rounded-full border border-github-border"
    : "fixed top-6 left-0 right-0 z-50 glass px-8 py-4 transition-all duration-300 mx-4 md:mx-6 lg:mx-8 rounded-full border border-github-border";

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={logoImage} alt="Draft Logo" className="h-12 w-auto" />
        </div>
        
        <div className={`
          ${isMenuOpen 
            ? 'flex flex-col absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-11/12 glass p-6 rounded-2xl shadow-xl z-20 border border-github-blue' 
            : 'hidden'
          } 
          md:flex md:flex-row md:static md:transform-none md:w-auto md:bg-transparent md:p-0 md:border-none md:shadow-none
          items-center space-y-4 md:space-y-0 md:space-x-8
        `}>
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
            className="text-white hover:text-github-blue transition-colors duration-300 font-medium flex items-center gap-1.5"
          >
            <User className="h-4 w-4" />
            About
          </a>
          <a 
            href="#projects" 
            onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}
            className="text-white hover:text-github-blue transition-colors duration-300 font-medium flex items-center gap-1.5"
          >
            <FolderGit className="h-4 w-4" />
            Projects
          </a>
          <a 
            href="#skills" 
            onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}
            className="text-white hover:text-github-blue transition-colors duration-300 font-medium flex items-center gap-1.5"
          >
            <Code className="h-4 w-4" />
            Skills
          </a>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            className="text-white hover:text-github-blue transition-colors duration-300 font-medium flex items-center gap-1.5"
          >
            <Mail className="h-4 w-4" />
            Contact
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="/resume.pdf" 
            target="_blank" 
            className="py-2.5 px-5 bg-github-blue hover:bg-opacity-90 text-white rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4 mr-2" />
            <span className="font-medium">Resume</span>
          </a>
          <button 
            className="md:hidden bg-github-darker p-2.5 rounded-full border border-github-blue shadow-md hover:shadow-lg transition-all duration-300" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-github-blue" />
            ) : (
              <Menu className="h-5 w-5 text-github-blue" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}