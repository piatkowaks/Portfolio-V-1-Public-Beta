// Collection of interesting code snippets showcasing real work
export const codeSnippets = [
  {
    filename: "useDataFetching.ts",
    language: "ts",
    code: `import { useState, useEffect } from 'react';

interface FetchOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useDataFetching<T>({ url, method = 'GET', headers, body }: FetchOptions) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      setState({ data: null, loading: true, error: null });
      
      try {
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          signal,
        };

        if (body && method !== 'GET') {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! Status: \${response.status}\`);
        }

        const result = await response.json();
        
        if (!signal.aborted) {
          setState({
            data: result,
            loading: false,
            error: null,
          });
        }
      } catch (error: any) {
        if (!signal.aborted) {
          setState({
            data: null,
            loading: false,
            error,
          });
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, method, JSON.stringify(headers), JSON.stringify(body)]);

  return state;
}`
  },
  {
    filename: "ThemeProvider.tsx",
    language: "tsx",
    code: `import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get saved theme from localStorage or default to 'system'
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Apply theme changes and track system preference
  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (theme: Theme) => {
      // Remove existing class
      root.classList.remove('light', 'dark');
      
      // Apply appropriate theme class
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
        setIsDarkMode(systemTheme === 'dark');
      } else {
        root.classList.add(theme);
        setIsDarkMode(theme === 'dark');
      }
    };
    
    applyTheme(theme);
    localStorage.setItem('theme', theme);
    
    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}`
  },
  {
    filename: "PaginatedList.jsx",
    language: "jsx",
    code: `import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

function PaginatedList({ 
  items, 
  itemsPerPage = 10, 
  renderItem, 
  className = '',
  emptyMessage = 'No items to display'
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([]);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  // Calculate visible page numbers
  useEffect(() => {
    let pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate middle range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, startPage + 2);
      
      // Adjust if we're near the end
      if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - 2);
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    setVisiblePages(pages);
  }, [currentPage, totalPages]);
  
  // Get current page items
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of list
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div className={className}>
      {items.length > 0 ? (
        <>
          <div className="space-y-4">
            {currentItems.map(renderItem)}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md disabled:opacity-50"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {visiblePages.map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span className="p-2">
                        <MoreHorizontal size={16} />
                      </span>
                    ) : (
                      <button
                        onClick={() => goToPage(page)}
                        className={\`w-8 h-8 rounded-md \${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }\`}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md disabled:opacity-50"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="py-8 text-center text-gray-500">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}`
  },
  {
    filename: "db.py",
    language: "py",
    code: `import os
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import logging
from contextlib import contextmanager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Get database URL from environment or use a default
DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///app.db')

# Create database engine
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL, 
        connect_args={"check_same_thread": False},
        echo=False
    )
else:
    engine = create_engine(DATABASE_URL, echo=False, pool_pre_ping=True)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
Base = declarative_base()

@contextmanager
def get_db_session():
    """Context manager for database sessions."""
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        logger.error(f"Database session error: {e}")
        raise
    finally:
        session.close()

# Define models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(100))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    projects = relationship("Project", back_populates="owner")
    
    def __repr__(self):
        return f"<User {self.username}>"

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    description = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    owner = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Project {self.name}>"

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    description = Column(Text, nullable=True)
    status = Column(String(20), default="pending")
    priority = Column(Integer, default=0)
    project_id = Column(Integer, ForeignKey("projects.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="tasks")
    
    def __repr__(self):
        return f"<Task {self.title}>"

# Create tables
def init_db():
    """Initialize the database, creating all tables."""
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {e}")
        raise

if __name__ == "__main__":
    init_db()`
  },
  {
    filename: "useDarkMode.ts",
    language: "ts",
    code: `import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export function useDarkMode(defaultTheme: Theme = 'dark'): [Theme, (theme: Theme) => void] {
  // Initialize state from localStorage or default
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      return savedTheme;
    }
    
    // If no theme in localStorage, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Fallback to default theme
    return defaultTheme;
  });

  // Apply theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme class
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Watch for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme: Theme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
    };
    
    // Add event listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return [theme, setTheme];
}`
  },
  {
    filename: "CardSkeleton.tsx",
    language: "tsx",
    code: `import React from 'react';

interface CardSkeletonProps {
  rows?: number;
  imageHeight?: number;
  animated?: boolean;
  className?: string;
}

export function CardSkeleton({
  rows = 3,
  imageHeight = 200,
  animated = true,
  className = '',
}: CardSkeletonProps) {
  const pulseClass = animated ? 'animate-pulse' : '';
  
  return (
    <div className={\`rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden \${className}\`}>
      {/* Skeleton image */}
      <div 
        className={\`bg-gray-200 dark:bg-gray-800 \${pulseClass}\`}
        style={{ height: \`\${imageHeight}px\` }}
      />
      
      <div className="p-4">
        {/* Title skeleton */}
        <div className={\`h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4 \${pulseClass}\`} />
        
        {/* Content rows */}
        <div className="space-y-2">
          {Array.from({ length: rows }).map((_, index) => (
            <div 
              key={index}
              className={\`h-4 bg-gray-200 dark:bg-gray-800 rounded w-\${Math.random() > 0.5 ? 'full' : '4/5'} \${pulseClass}\`}
            />
          ))}
        </div>
        
        {/* Footer area */}
        <div className="mt-6 flex justify-between items-center">
          <div className={\`h-8 bg-gray-200 dark:bg-gray-800 rounded w-24 \${pulseClass}\`} />
          <div className={\`h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-8 \${pulseClass}\`} />
        </div>
      </div>
    </div>
  );
}

// Create a repeatable grid of skeletons
export function CardSkeletonGrid({
  count = 6,
  className = '',
  ...props
}: CardSkeletonProps & { count?: number }) {
  return (
    <div className={\`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 \${className}\`}>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} {...props} />
      ))}
    </div>
  );
}`
  }
];