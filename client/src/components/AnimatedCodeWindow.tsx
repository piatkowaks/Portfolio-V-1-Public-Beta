import { useState, useEffect, useRef } from "react";

interface AnimatedCodeWindowProps {
  snippets: {
    code: string;
    filename: string;
    language: string;
  }[];
  typingSpeed?: number;
  pauseBetweenSnippets?: number;
  loop?: boolean;
}

export default function AnimatedCodeWindow({
  snippets,
  typingSpeed = 35,
  pauseBetweenSnippets = 3000,
  loop = true,
}: AnimatedCodeWindowProps) {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const currentSnippet = snippets[currentSnippetIndex];

  // Handle typing animation
  useEffect(() => {
    // Clear any existing timers
    if (typingRef.current) clearTimeout(typingRef.current);
    if (pauseRef.current) clearTimeout(pauseRef.current);

    // Reset state when switching to a new snippet
    setDisplayedCode("");
    setIsTyping(true);

    // Animation speed is a bit randomized to look more realistic
    const getRandomSpeed = () => {
      const variance = typingSpeed * 0.5;
      return typingSpeed + Math.random() * variance - variance / 2;
    };

    let charIndex = 0;
    
    const typeNextChar = () => {
      if (charIndex < currentSnippet.code.length) {
        const nextChar = currentSnippet.code.charAt(charIndex);
        setDisplayedCode(prev => prev + nextChar);
        charIndex++;
        
        // Type faster for spaces and newlines
        const delay = nextChar === ' ' || nextChar === '\n' ? typingSpeed * 0.5 : getRandomSpeed();
        typingRef.current = setTimeout(typeNextChar, delay);
      } else {
        // Typing complete for this snippet
        setIsTyping(false);
        
        // Pause before moving to the next snippet
        pauseRef.current = setTimeout(() => {
          if (loop || currentSnippetIndex < snippets.length - 1) {
            setCurrentSnippetIndex((prevIndex) => (prevIndex + 1) % snippets.length);
          }
        }, pauseBetweenSnippets);
      }
    };
    
    typingRef.current = setTimeout(typeNextChar, 500); // Initial delay

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
      if (pauseRef.current) clearTimeout(pauseRef.current);
    };
  }, [currentSnippetIndex, currentSnippet.code, typingSpeed, pauseBetweenSnippets, loop, snippets.length]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(show => !show);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Split the displayed code into lines and add line numbers
  const codeLines = displayedCode.split("\n").map((line, index) => {
    return (
      <div key={index} className="group flex">
        <span className="line-number select-none text-right pr-3 min-w-[40px] inline-block text-github-muted">
          {index + 1}
        </span>
        <span 
          className="text-github-text whitespace-pre"
          dangerouslySetInnerHTML={{ 
            __html: highlightSyntax(line, currentSnippet.language) 
          }} 
        />
        {/* Add cursor to the last line if it's the current line being typed */}
        {index === displayedCode.split("\n").length - 1 && isTyping && showCursor && (
          <span className="typing-cursor">|</span>
        )}
      </div>
    );
  });

  return (
    <div className="code-window w-full rounded-lg overflow-hidden border border-github-border shadow-lg bg-github-darker animate-float-slow">
      <div className="bg-github-darker py-2 px-4 border-b border-github-border flex items-center">
        <div className="flex space-x-2 mr-4">
          <div className="window-btn bg-red-500 w-3 h-3 rounded-full"></div>
          <div className="window-btn bg-yellow-500 w-3 h-3 rounded-full"></div>
          <div className="window-btn bg-green-500 w-3 h-3 rounded-full"></div>
        </div>
        <div className="text-xs font-mono text-github-muted flex items-center">
          <span className="mr-2">{currentSnippet.filename}</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-github-darker border border-github-border">
            {getLanguageLabel(currentSnippet.language)}
          </span>
        </div>
      </div>
      <div className="code-content p-4 font-mono text-sm text-github-text overflow-x-auto bg-github-dark">
        <pre className="leading-relaxed">{codeLines}</pre>
      </div>
    </div>
  );
}

// Helper function to get language display label
function getLanguageLabel(language: string): string {
  const langMap: Record<string, string> = {
    'js': 'JavaScript',
    'jsx': 'React',
    'ts': 'TypeScript',
    'tsx': 'React TSX',
    'py': 'Python',
    'rb': 'Ruby',
    'go': 'Go',
    'java': 'Java',
    'php': 'PHP',
    'c': 'C',
    'cpp': 'C++',
    'cs': 'C#',
    'rust': 'Rust',
    'swift': 'Swift',
    'kotlin': 'Kotlin',
    'html': 'HTML',
    'css': 'CSS',
    'json': 'JSON',
    'md': 'Markdown',
    'sql': 'SQL',
    'sh': 'Shell',
    'yml': 'YAML',
    'yaml': 'YAML',
    'graphql': 'GraphQL',
  };
  
  return langMap[language] || language.toUpperCase();
}

// Enhanced syntax highlighting function with language support
function highlightSyntax(line: string, language: string): string {
  // Common patterns
  let highlightedLine = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Define pattern type for syntax highlighting
  type SyntaxPattern = {
    pattern: string;
    color: string;
  };
  
  // Keywords based on language
  const keywords: Record<string, SyntaxPattern[]> = {
    'js': [
      // Keywords (purple)
      { pattern: '(import|export|const|let|var|function|return|from|default|class|extends|async|await|if|else|for|while|try|catch|switch|case|break|continue|new|this|super|typeof|instanceof)', color: 'text-purple-400' },
      // Variables & functions (white)
      { pattern: '(\\w+)(?=\\s*=)', color: 'text-github-text' },
      { pattern: '(\\w+)(?=\\s*\\()', color: 'text-yellow-300' },
      // React hooks (blue)
      { pattern: '(useState|useEffect|useContext|useRef|useReducer|useMemo|useCallback)', color: 'text-blue-400' },
      // Strings (green)
      { pattern: '([\'"`].*?[\'"`])', color: 'text-green-300' },
      // Numbers (orange)
      { pattern: '\\b(\\d+)\\b', color: 'text-orange-400' },
      // Comments (gray)
      { pattern: '(\\/\\/.*$)', color: 'text-github-muted' },
      // Operators
      { pattern: '(\\+|\\-|\\*|\\/|===|==|=|!==|!=|>=|<=|>|<|\\?|:|\\|\\||&&)', color: 'text-red-300' },
      // Brackets, braces, etc
      { pattern: '(\\{|\\}|\\(|\\)|\\[|\\]|;|,|\\.)', color: 'text-github-text' },
    ],
    'jsx': [
      // JSX tags (blue)
      { pattern: '(&lt;\\/?\\w+)', color: 'text-blue-300' },
      // JSX attributes (yellow)
      { pattern: '(\\w+)(?==)', color: 'text-yellow-300' },
      // Keywords (purple)
      { pattern: '(import|export|const|let|var|function|return|from|default|class|extends|async|await|if|else|for|while|try|catch|switch|case|break|continue|new|this|super|typeof|instanceof)', color: 'text-purple-400' },
      // React hooks (blue)
      { pattern: '(useState|useEffect|useContext|useRef|useReducer|useMemo|useCallback)', color: 'text-blue-400' },
      // Strings (green)
      { pattern: '([\'"`].*?[\'"`])', color: 'text-green-300' },
      // Numbers (orange)
      { pattern: '\\b(\\d+)\\b', color: 'text-orange-400' },
      // Comments (gray)
      { pattern: '(\\/\\/.*$)', color: 'text-github-muted' },
    ],
    'ts': [
      // TypeScript types (teal)
      { pattern: '(\\w+)(?=\\s*:\\s*\\w+)', color: 'text-teal-300' },
      { pattern: '(?<=:\\s*)(\\w+)(\\[\\])?', color: 'text-blue-300' },
      { pattern: '(interface|type|namespace|enum|any|void|string|number|boolean|null|undefined|never|unknown)', color: 'text-teal-300' },
      // Keywords (purple)
      { pattern: '(import|export|const|let|var|function|return|from|default|class|extends|implements|async|await|if|else|for|while|try|catch|switch|case|break|continue|new|this|super|typeof|instanceof)', color: 'text-purple-400' },
      // Strings (green)
      { pattern: '([\'"`].*?[\'"`])', color: 'text-green-300' },
      // Numbers (orange)
      { pattern: '\\b(\\d+)\\b', color: 'text-orange-400' },
      // Comments (gray)
      { pattern: '(\\/\\/.*$)', color: 'text-github-muted' },
    ],
    'py': [
      // Python keywords
      { pattern: '(def|class|import|from|as|return|if|elif|else|for|while|try|except|finally|with|in|is|not|and|or|True|False|None|lambda|async|await|yield)', color: 'text-purple-400' },
      // Function names
      { pattern: '(\\w+)(?=\\s*\\()', color: 'text-yellow-300' },
      // Decorators
      { pattern: '(@\\w+)', color: 'text-pink-300' },
      // Strings
      { pattern: '([\'"`].*?[\'"`])', color: 'text-green-300' },
      // Numbers
      { pattern: '\\b(\\d+)\\b', color: 'text-orange-400' },
      // Comments
      { pattern: '(#.*$)', color: 'text-github-muted' },
    ],
    'html': [
      // Tags
      { pattern: '(&lt;\\/?)([\\w\\-]+)', color: 'text-blue-300' },
      // Attributes
      { pattern: '(\\s\\w+)(?==)', color: 'text-yellow-300' },
      // Strings
      { pattern: '([\'"`].*?[\'"`])', color: 'text-green-300' },
      // Doctype
      { pattern: '(&lt;!DOCTYPE.*?&gt;)', color: 'text-gray-500' },
      // Comments
      { pattern: '(&lt;!--.*?--&gt;)', color: 'text-github-muted' },
    ],
    'css': [
      // Selectors
      { pattern: '([\\.\\#][\\w\\-]+)', color: 'text-yellow-300' },
      // Properties
      { pattern: '([\\w\\-]+)(?=\\s*:)', color: 'text-blue-300' },
      // Values
      { pattern: '(:.*?)(;|\\}|$)', color: 'text-green-300' },
      // Units
      { pattern: '(\\d+)(px|em|rem|%|vh|vw|s|ms)', color: 'text-orange-400' },
      // Comments
      { pattern: '(\\/\\*.*?\\*\\/)', color: 'text-github-muted' },
    ]
  };
  
  // Apply language-specific highlighting or fallback to JS
  const patterns = keywords[language] || keywords['js'];
  
  // Apply each pattern
  patterns.forEach(({ pattern, color }) => {
    const regex = new RegExp(pattern, 'g');
    highlightedLine = highlightedLine.replace(regex, `<span class="${color}">$1</span>`);
  });
  
  return highlightedLine;
}

// Add CSS to document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    .typing-cursor {
      display: inline-block;
      color: #58A6FF;
      font-weight: bold;
      animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
      from, to { opacity: 1; }
      50% { opacity: 0; }
    }
    
    .window-btn:hover {
      filter: brightness(1.2);
    }
  `;
  document.head.appendChild(styleElement);
}