import { useState } from "react";
import { Folder, FolderGit, ExternalLink, Filter, Search } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Get unique technology tags from all projects
  const allTags = Array.from(
    new Set(
      projects.flatMap(project => project.technologies)
    )
  );

  // Filter projects based on active filter and search term
  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === "All" || project.technologies.includes(activeFilter);
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 px-6 bg-github-darker relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-github-blue opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-purple-500 opacity-10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="p-3 mr-4">
              <Folder className="h-6 w-6 text-github-blue" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Projects</h2>
              <p className="text-github-muted">Showcase of my latest work</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-github-muted" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 glass-card rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-github-blue"
              />
            </div>
            
            <div className="relative group">
              <button className="flex items-center glass-card px-4 py-2 rounded-md hover:text-github-blue transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                <span>{activeFilter}</span>
              </button>
              
              <div className="absolute top-full left-0 mt-2 p-2 glass-card rounded-md shadow-lg z-10 hidden group-hover:block min-w-[180px]">
                <div 
                  className={`px-3 py-1.5 rounded-md mb-1 cursor-pointer ${activeFilter === "All" ? "bg-github-blue text-white" : "hover:text-github-blue"}`}
                  onClick={() => setActiveFilter("All")}
                >
                  All
                </div>
                {allTags.map((tag, index) => (
                  <div 
                    key={index}
                    className={`px-3 py-1.5 rounded-md mb-1 cursor-pointer ${activeFilter === tag ? "bg-github-blue text-white" : "hover:text-github-blue"}`}
                    onClick={() => setActiveFilter(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-10 rounded-lg text-center">
            <h3 className="text-xl mb-2">No projects found</h3>
            <p className="text-github-muted mb-4">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => { setActiveFilter("All"); setSearchTerm(""); }}
              className="text-github-blue hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
        
        <div className="mt-10 text-center">
          <a 
            href="https://github.com/draftdev?tab=repositories" 
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 bg-github-blue hover:bg-opacity-90 text-white rounded-md transition-colors duration-300 shine-effect"
          >
            <span>View All Projects</span>
            <ExternalLink className="h-5 w-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
