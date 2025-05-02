/**
 * ScrollReveal utility to animate elements as they come into viewport
 */

// Options for the Intersection Observer
const observerOptions = {
  root: null, // use the viewport as the root
  rootMargin: '0px',
  threshold: 0.1 // trigger when at least 10% of the element is visible
};

// Handler for intersection changes
const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach(entry => {
    // If the element is in the viewport
    if (entry.isIntersecting) {
      // Add the 'visible' class to trigger the animation
      entry.target.classList.add('visible');
      
      // Once we've animated it in, we don't need to watch it anymore
      // This is optional - remove this line if you want to animate
      // the element every time it enters the viewport
      observer.unobserve(entry.target);
    }
  });
};

// Initialize the scroll reveal animations
export function initScrollReveal() {
  // Check if we're in a browser environment and if IntersectionObserver is supported
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  // Create our observer
  const observer = new IntersectionObserver(handleIntersect, observerOptions);

  // Get all elements with scroll animation classes
  const scrollAnimElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-zoom'
  );

  // Observe each element
  scrollAnimElements.forEach(element => {
    observer.observe(element);
  });

  return observer; // Return observer to allow for cleanup if needed
}

// Helper function to add a reveal class to an element
export function addScrollRevealClass(element: HTMLElement, className: string = 'scroll-reveal') {
  if (element) {
    element.classList.add(className);
  }
}

// Manually reveal an element (useful for elements that are already in view on page load)
export function revealElement(element: HTMLElement) {
  if (element) {
    element.classList.add('visible');
  }
}

// Cleanup function (call this when component unmounts if needed)
export function cleanupScrollReveal(observer: IntersectionObserver) {
  if (observer) {
    observer.disconnect();
  }
}