import { FaGithub, FaLinkedin, FaTwitter, FaDiscord, FaCodepen } from "react-icons/fa";
import { Heart, ArrowUp, Code, Globe, Mail } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import logoImage from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const footerLinks = [
    { name: "About", href: "#about", onClick: (e: React.MouseEvent) => { e.preventDefault(); scrollToSection('about'); } },
    { name: "Projects", href: "#projects", onClick: (e: React.MouseEvent) => { e.preventDefault(); scrollToSection('projects'); } },
    { name: "Skills", href: "#skills", onClick: (e: React.MouseEvent) => { e.preventDefault(); scrollToSection('skills'); } },
    { name: "Code Samples", href: "#code-samples", onClick: (e: React.MouseEvent) => { e.preventDefault(); scrollToSection('code-samples'); } },
    { name: "Contact", href: "#contact", onClick: (e: React.MouseEvent) => { e.preventDefault(); scrollToSection('contact'); } },
  ];
  
  const resourceLinks = [
    { name: "Resume", href: "/resume.pdf", external: true },
    { name: "Blog", href: "https://blog.draft.dev", external: true },
    { name: "GitHub Repositories", href: "https://github.com/draftdev?tab=repositories", external: true },
    { name: "Send Email", href: "mailto:contact@draft.dev", external: false },
  ];
  
  const socialLinks = [
    { icon: <FaGithub className="h-5 w-5" />, href: "https://github.com/draftdev", color: "hover:text-github-blue group-hover:text-white", label: "GitHub" },
    { icon: <FaLinkedin className="h-5 w-5" />, href: "https://linkedin.com/in/draftdev", color: "hover:text-github-blue group-hover:text-white", label: "LinkedIn" },
    { icon: <FaTwitter className="h-5 w-5" />, href: "https://twitter.com/draftdev", color: "hover:text-github-blue group-hover:text-white", label: "Twitter" },
    { icon: <FaDiscord className="h-5 w-5" />, href: "https://discord.gg/draftdev", color: "hover:text-github-blue group-hover:text-white", label: "Discord" },
    { icon: <FaCodepen className="h-5 w-5" />, href: "https://codepen.io/draftdev", color: "hover:text-github-blue group-hover:text-white", label: "CodePen" },
  ];
  
  return (
    <footer className="pt-20 pb-10 px-6 border-t border-github-border bg-gradient-to-b from-github-dark to-github-darker relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-github-blue opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-github-green opacity-5 rounded-full filter blur-3xl"></div>
      </div>
    
      <div className="max-w-7xl mx-auto">
        {/* Footer top with logo and newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 pb-16 border-b border-github-border">
          <div className="max-w-md mb-10 lg:mb-0">
            <div className="flex items-center mb-6">
              <img src={logoImage} alt="Draft Logo" className="h-12 w-auto mr-3" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-github-blue">Draft</span>
            </div>
            <p className="text-github-muted mb-8">
              Software engineer and open source contributor passionate about creating innovative solutions
              that leverage cutting-edge technologies and modern design principles.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`group text-github-muted ${social.color} transition-all duration-300 flex items-center gap-2 py-2 px-3 hover:bg-github-blue hover:bg-opacity-10 rounded-md border border-transparent hover:border-github-blue`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-lg w-full max-w-md border border-github-border">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-github-blue" />
              Stay Updated
            </h3>
            <p className="text-github-muted text-sm mb-4">
              Subscribe to my newsletter for updates on new projects, blog posts, and tech insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-grow bg-github-dark border border-github-border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-github-blue"
                required
              />
              <button 
                type="submit"
                className="bg-github-blue hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 shine-effect whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer middle with links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div>
            <h3 className="text-lg font-medium mb-6 flex items-center">
              <Code className="h-5 w-5 mr-2 text-github-blue" />
              Navigation
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-3 gap-x-6">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    onClick={link.onClick}
                    className="text-github-muted hover:text-github-blue transition-colors duration-300 flex items-center"
                  >
                    <span className="bg-github-dark inline-block w-1.5 h-1.5 rounded-full mr-2 border border-github-blue"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6 flex items-center">
              <Code className="h-5 w-5 mr-2 text-github-green" />
              Resources
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-3 gap-x-6">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    target={link.external ? "_blank" : undefined} 
                    rel={link.external ? "noreferrer" : undefined}
                    className="text-github-muted hover:text-github-blue transition-colors duration-300 flex items-center"
                  >
                    <span className="bg-github-dark inline-block w-1.5 h-1.5 rounded-full mr-2 border border-github-green"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-github-blue" />
              Get In Touch
            </h3>
            <div className="space-y-4">
              <p className="text-github-muted">
                Have a project in mind or a question? Feel free to reach out.
              </p>
              <div className="flex items-center text-github-muted">
                <Mail className="mr-2 h-4 w-4" />
                <a href="mailto:contact@draft.dev" className="hover:text-github-blue transition-colors">
                  contact@draft.dev
                </a>
              </div>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="inline-flex items-center text-github-blue hover:underline"
              >
                <span>Contact Form</span>
                <ArrowUp className="ml-1 h-3 w-3 rotate-45" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer bottom with copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-github-border">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-github-muted text-sm">
              © {currentYear} Draft Developer. All rights reserved.
            </p>
            <p className="text-github-muted text-xs mt-1">
              Built with <Heart className="inline-block h-3 w-3 text-red-500 animate-pulse" /> using React, TailwindCSS & TypeScript
            </p>
          </div>
          
          <button 
            onClick={backToTop}
            className="glass-card p-3 rounded-full hover:text-github-blue hover:border-github-blue transition-all duration-300 shine-effect"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
