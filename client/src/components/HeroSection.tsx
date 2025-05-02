import { useState, useEffect } from "react";
import { ChevronRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import CodeWindow from "@/components/CodeWindow";
import { scrollToSection } from "@/lib/utils";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const roles = [
    "Software Engineer",
    "UI/UX Developer",
    "Full Stack Developer",
    "Open Source Contributor"
  ];

  useEffect(() => {
    let currentIndex = 0;
    let currentRole = roles[textIndex];
    let isDeleting = false;
    let typingSpeed = 100;
    
    const typeWriter = () => {
      if (isDeleting) {
        setTypedText(prev => prev.substring(0, prev.length - 1));
        typingSpeed = 50;
      } else {
        setTypedText(currentRole.substring(0, currentIndex + 1));
        typingSpeed = 150;
      }
      
      currentIndex = isDeleting ? currentIndex - 1 : currentIndex + 1;
      
      if (!isDeleting && currentIndex === currentRole.length + 1) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
        currentIndex--;
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        setTextIndex((prevIndex) => (prevIndex + 1) % roles.length);
        currentRole = roles[(textIndex + 1) % roles.length];
        typingSpeed = 500; // Pause before typing next role
      }
      
      setTimeout(typeWriter, typingSpeed);
    };
    
    const typingTimeout = setTimeout(typeWriter, 1000);
    return () => clearTimeout(typingTimeout);
  }, [textIndex]);

  const codeContent = `import React, { useState } from 'react';

const Developer = () => {
  const [skills, setSkills] = useState([
    'JavaScript', 'React', 'Node.js',
    'TypeScript', 'GraphQL', 'AWS'
  ]);

  const projects = [
    { name: 'CodeCraft', stars: 128 },
    { name: 'DevFlow', stars: 94 },
    { name: 'NeuralCanvas', stars: 212 }
  ];

  return (
    <div className="developer-profile">
      <h1>Hello, I'm Draft</h1>
      <p>Turning ideas into code since 2018</p>
    </div>
  );
}

export default Developer;`;

  return (
    <section id="about" className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-github-green opacity-10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-github-blue opacity-10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-purple-500 opacity-5 rounded-full filter blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="animate-fadeIn">
          <div className="inline-block py-1 px-3 rounded-full text-white border border-github-blue text-sm font-semibold mb-4">
            Software Developer Portfolio
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-github-text to-github-blue">
            Hello, I'm <span className="text-github-blue">Draft</span>
          </h1>
          
          <div className="text-xl md:text-2xl font-mono font-medium mb-6 h-8">
            <span>{typedText}</span>
            <span className="typing"></span>
          </div>
          
          <p className="text-github-muted mb-8 text-lg max-w-lg">
            I build innovative web applications and solve complex problems with clean, efficient code.
            Passionate about open source and cutting-edge technologies.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <a 
              href="#projects" 
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className="bg-github-blue hover:bg-opacity-90 transition-all text-white font-medium py-3 px-6 rounded-md flex items-center"
            >
              View Projects
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="glass-card border-github-blue border py-3 px-6 rounded-md text-white hover:text-github-blue transition-all flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Get In Touch
            </a>
          </div>
          
          <div className="flex items-center space-x-5">
            <a 
              href="https://github.com/Draftgamz" 
              target="_blank" 
              className="text-github-muted hover:text-github-blue transition-colors"
              rel="noreferrer"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              className="text-github-muted hover:text-github-blue transition-colors"
              rel="noreferrer"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="https://x.com/home" 
              target="_blank" 
              className="text-github-muted hover:text-github-blue transition-colors"
              rel="noreferrer"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="w-full max-w-lg mx-auto animate-fadeUp transform hover:scale-105 transition-transform duration-500">
          <CodeWindow filename="developer.jsx" code={codeContent} />
        </div>
      </div>
    </section>
  );
}
