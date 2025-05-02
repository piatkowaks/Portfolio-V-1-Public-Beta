import { useState } from "react";
import { ShieldCheck, Code, Layout, Terminal, Cloud, ChevronRight } from "lucide-react";
import ContributionGraph from "@/components/ContributionGraph";
import SkillBar from "@/components/SkillBar";
import { 
  languageSkills, 
  frameworkSkills, 
  toolSkills, 
  cloudSkills 
} from "@/data/skills";

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>("languages");
  
  const renderSkills = () => {
    switch(activeTab) {
      case "languages":
        return (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-6">
              <Code className="h-5 w-5 mr-2 text-github-green" />
              <h4 className="text-lg font-medium">Programming Languages</h4>
            </div>
            <ul className="space-y-4">
              {languageSkills.map((skill, index) => (
                <SkillBar 
                  key={index} 
                  name={skill.name} 
                  percentage={skill.percentage} 
                  color="bg-github-green" 
                />
              ))}
            </ul>
            <p className="mt-6 text-github-muted italic text-sm">
              Strong expertise in modern JavaScript, TypeScript and Python development 
              with experience in a variety of programming paradigms.
            </p>
          </div>
        );
      case "frameworks":
        return (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-6">
              <Layout className="h-5 w-5 mr-2 text-github-blue" />
              <h4 className="text-lg font-medium">Frameworks & Libraries</h4>
            </div>
            <ul className="space-y-4">
              {frameworkSkills.map((skill, index) => (
                <SkillBar 
                  key={index} 
                  name={skill.name} 
                  percentage={skill.percentage} 
                  color="bg-github-blue" 
                />
              ))}
            </ul>
            <p className="mt-6 text-github-muted italic text-sm">
              Proficient with React ecosystem and modern frontend development 
              including state management, routing, and component architecture.
            </p>
          </div>
        );
      case "tools":
        return (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-6">
              <Terminal className="h-5 w-5 mr-2 text-purple-500" />
              <h4 className="text-lg font-medium">Development Tools</h4>
            </div>
            <ul className="space-y-4">
              {toolSkills.map((skill, index) => (
                <SkillBar 
                  key={index} 
                  name={skill.name} 
                  percentage={skill.percentage} 
                  color="bg-purple-500" 
                />
              ))}
            </ul>
            <p className="mt-6 text-github-muted italic text-sm">
              Experienced with modern development toolchains, CI/CD pipelines, 
              and containerization technologies.
            </p>
          </div>
        );
      case "cloud":
        return (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-6">
              <Cloud className="h-5 w-5 mr-2 text-yellow-500" />
              <h4 className="text-lg font-medium">Cloud & Deployment</h4>
            </div>
            <ul className="space-y-4">
              {cloudSkills.map((skill, index) => (
                <SkillBar 
                  key={index} 
                  name={skill.name} 
                  percentage={skill.percentage} 
                  color="bg-yellow-500" 
                />
              ))}
            </ul>
            <p className="mt-6 text-github-muted italic text-sm">
              Experienced in cloud infrastructure, serverless architecture, and 
              modern deployment strategies with various cloud providers.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="skills" className="py-20 px-6 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-github-green opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="p-3 mr-4">
              <ShieldCheck className="h-6 w-6 text-github-green" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Skills & Expertise</h2>
              <p className="text-github-muted">My technical expertise and experience</p>
            </div>
          </div>

          <a href="/resume.pdf" target="_blank" className="inline-flex items-center text-github-blue hover:underline">
            <span>Full Skills & Experience</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="glass-card p-8 rounded-lg shadow-lg animate-fadeUp order-2 md:order-1">
            <div className="flex mb-8 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab("languages")}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${activeTab === "languages" ? 'bg-github-green text-white' : 'hover:text-github-green'}`}
              >
                Languages
              </button>
              <button 
                onClick={() => setActiveTab("frameworks")}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${activeTab === "frameworks" ? 'bg-github-blue text-white' : 'hover:text-github-blue'}`}
              >
                Frameworks
              </button>
              <button 
                onClick={() => setActiveTab("tools")}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${activeTab === "tools" ? 'bg-purple-500 text-white' : 'hover:text-purple-500'}`}
              >
                Tools
              </button>
              <button 
                onClick={() => setActiveTab("cloud")}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === "cloud" ? 'bg-yellow-500 text-white' : 'hover:text-yellow-500'}`}
              >
                Cloud
              </button>
            </div>
            
            <div className="min-h-[300px]">
              {renderSkills()}
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-lg shadow-lg animate-fadeUp order-1 md:order-2">
            <h3 className="text-xl font-semibold mb-6 inline-flex items-center">
              <span className="p-2 mr-3">
                <Code className="h-5 w-5 text-github-blue" />
              </span>
              Contribution Activity
            </h3>
            <p className="text-github-muted mb-6">
              Consistent contribution to open source and personal projects over the past year
            </p>
            <div className="animate-float">
              <ContributionGraph />
            </div>
            <div className="mt-6 text-center text-sm text-github-muted">
              <a href="https://github.com/draftdev" target="_blank" rel="noreferrer" className="hover:text-github-blue transition-colors">
                See more contribution activity on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
