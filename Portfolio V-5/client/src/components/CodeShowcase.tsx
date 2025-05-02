import React from 'react';
import { Code, GitBranch } from 'lucide-react';
import AnimatedCodeWindow from '@/components/AnimatedCodeWindow';
import { codeSnippets } from '@/data/codeSnippets';

export default function CodeShowcase() {
  return (
    <section id="code-samples" className="py-20 px-6 relative overflow-hidden scroll-snap-align">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-github-blue opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-purple-500 opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bg-grid-pattern opacity-5 inset-0"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="p-3 mr-4">
              <Code className="h-6 w-6 text-github-blue" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Code Samples</h2>
              <p className="text-github-muted">Recent project work and code snippets</p>
            </div>
          </div>
          
          <a href="https://github.com/draftdev" target="_blank" rel="noreferrer" className="inline-flex items-center text-github-blue hover:underline">
            <GitBranch className="h-4 w-4 mr-2" />
            <span>View More on GitHub</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="scroll-reveal-left">
            <AnimatedCodeWindow 
              snippets={codeSnippets.slice(0, 3)} 
              typingSpeed={30}
              pauseBetweenSnippets={4000}
              loop={true}
            />
          </div>
          
          <div className="glass-card p-8 rounded-lg shadow-lg scroll-reveal-right">
            <h3 className="text-xl font-semibold mb-6">About These Code Samples</h3>
            
            <div className="space-y-6 text-github-text">
              <p>
                These are real code snippets from various projects I've worked on. They showcase my 
                approach to solving complex problems and writing clean, maintainable code.
              </p>
              
              <div className="space-y-4">
                <h4 className="font-medium text-github-blue">Featured Patterns</h4>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Custom React hooks for reusable logic</li>
                  <li>TypeScript for type safety and developer experience</li>
                  <li>Context API for state management</li>
                  <li>Database models and connections</li>
                  <li>UI component design with accessibility in mind</li>
                </ul>
              </div>
              
              <p>
                My development philosophy centers around creating scalable, performant applications 
                with clean, well-documented code that's easy to maintain and extend.
              </p>
              
              <div className="pt-4">
                <a 
                  href="https://github.com/draftdev?tab=repositories" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-5 py-2.5 bg-github-blue hover:bg-opacity-90 text-white rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 shine-effect"
                >
                  <span className="font-medium">Explore My Repositories</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}