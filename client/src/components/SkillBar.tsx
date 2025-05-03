import React, { useEffect, useState } from "react";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
}

export default function SkillBar({ name, percentage, color }: SkillBarProps) {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    // Animate the progress bar when component mounts
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [percentage]);
  
  return (
    <li className="flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-github-muted">{percentage}%</span>
      </div>
      <div className="relative w-full">
        <div className="w-full bg-github-dark bg-opacity-50 rounded-full h-2.5">
          <div 
            className={`${color} h-2.5 rounded-full transition-all duration-1000 ease-out`} 
            style={{ width: `${width}%` }}
          >
            <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-white opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </div>
        </div>
        <div className="absolute -bottom-4 left-0 w-full">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-github-blue to-transparent opacity-0 group-hover:opacity-30"></div>
        </div>
      </div>
    </li>
  );
}
