import React from "react";

export default function ContributionGraph() {
  // Days of the week
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Generate contribution data
  // 4 intensity levels from light to dark
  const intensityLevels = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
  
  // Generate a 7x8 grid of contribution cells (7 days x 8 weeks)
  const generateContributionData = () => {
    const data = [];
    for (let i = 0; i < 7 * 8; i++) {
      // Generate random intensity level (0-4)
      const randomLevel = Math.floor(Math.random() * 5);
      data.push(intensityLevels[randomLevel]);
    }
    return data;
  };
  
  const contributionData = generateContributionData();
  
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 gap-1 text-center mb-4">
        {daysOfWeek.map((day, index) => (
          <span key={index} className="text-xs text-github-muted">{day}</span>
        ))}
      </div>
      
      {/* GitHub-style contribution graph */}
      <div className="flex flex-wrap">
        {contributionData.map((color, index) => (
          <div 
            key={index} 
            className="contribution-cell" 
            style={{ backgroundColor: color }}
            title={`${Math.floor(index / 7) + 1} week, ${daysOfWeek[index % 7]}`}
          ></div>
        ))}
      </div>
      
      <div className="flex items-center justify-start mt-4 text-xs text-github-muted">
        <span className="mr-2">Less</span>
        {intensityLevels.map((level, index) => (
          <div 
            key={index} 
            className="contribution-cell mr-1" 
            style={{ backgroundColor: level }}
          ></div>
        ))}
        <span className="ml-1">More</span>
      </div>
    </div>
  );
}
