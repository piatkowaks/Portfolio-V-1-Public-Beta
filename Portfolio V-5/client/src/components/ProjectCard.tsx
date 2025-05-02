import React from "react";
import { FolderIcon, Star, ExternalLink, GitBranch, Eye } from "lucide-react";

interface ProjectProps {
  project: {
    name: string;
    description: string;
    stars: number;
    lastUpdated: string;
    technologies: string[];
    repoUrl: string;
    status: {
      color: string;
      text: string;
    };
  };
}

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <div className="glass-card rounded-lg overflow-hidden group animate-fadeUp transform hover:translate-y-[-8px] transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 mr-3">
              <FolderIcon className="h-5 w-5 text-github-blue" />
            </div>
            <h3 className="text-xl font-semibold group-hover:text-github-blue transition-colors duration-300">{project.name}</h3>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <Star className="h-4 w-4 mr-1 text-yellow-400" /> 
              <span className="text-github-muted text-sm">{project.stars}</span>
            </div>
            <div className="flex items-center">
              <GitBranch className="h-4 w-4 mr-1 text-github-muted" />
              <span className="text-github-muted text-sm">{Math.floor(project.stars / 4)}</span>
            </div>
          </div>
        </div>
        
        <div className="relative mb-6">
          <div className="absolute top-0 left-0 w-1 h-full bg-github-blue rounded-full opacity-30"></div>
          <p className="text-github-muted pl-4">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="bg-github-dark px-3 py-1 rounded-full text-xs font-mono border border-github-border group-hover:border-github-blue transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-github-border group-hover:border-github-blue transition-colors duration-300">
          <div className="flex items-center space-x-2">
            <span 
              className="inline-block h-3 w-3 rounded-full" 
              style={{ backgroundColor: project.status.color }}
            ></span>
            <span className="text-xs text-github-muted">
              {project.status.text} • {project.lastUpdated}
            </span>
          </div>
          <div className="flex items-center">
            <a 
              href={`${project.repoUrl}/demo`} 
              target="_blank" 
              rel="noreferrer"
              className="mr-3 flex items-center text-github-muted hover:text-github-blue transition-colors duration-300"
            >
              <Eye className="h-4 w-4 mr-1" />
              <span className="text-sm">Demo</span>
            </a>
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center text-github-blue hover:underline"
            >
              <span className="text-sm">View</span>
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
