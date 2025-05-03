import { Switch, Route } from "wouter";
import { useEffect } from "react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { initScrollReveal } from "@/lib/scrollReveal";
import { initSmoothScroll } from "@/lib/smoothScroll";

function App() {
  // Initialize scroll animations and effects
  useEffect(() => {
    // Initialize scroll reveal animations with intersection observer
    const observer = initScrollReveal();
    
    // Initialize smooth scrolling utilities
    initSmoothScroll();
    
    // Cleanup on unmount
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
