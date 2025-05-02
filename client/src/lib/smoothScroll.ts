/**
 * Smooth scroll utility functions for enhanced scrolling experience
 */

/**
 * Smooth scroll to a specific element by ID with customizable duration and easing
 * @param elementId The ID of the element to scroll to
 * @param duration Duration of scroll animation in milliseconds
 * @param offset Offset from the top of the element in pixels (e.g., for fixed headers)
 */
export function scrollToElement(elementId: string, duration = 1000, offset = 80) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animate(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animate);
  }

  // Easing function for smooth acceleration and deceleration
  function easeInOutCubic(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animate);
}

/**
 * Makes anchor links scroll smoothly to their targets
 */
export function setupSmoothAnchorLinks() {
  // Only run in browser environment
  if (typeof document === 'undefined') return;

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    
    // Check if clicked element is an anchor link or has an anchor link parent
    const anchor = target.tagName === 'A' 
      ? target 
      : target.closest('a');
    
    if (!anchor) return;
    
    const href = (anchor as HTMLAnchorElement).getAttribute('href');
    
    // Check if it's a hash link (starts with #)
    if (href && href.startsWith('#') && href.length > 1) {
      event.preventDefault();
      
      const targetId = href.substring(1); // Remove the # character
      scrollToElement(targetId);
      
      // Update URL without scrolling (pushState)
      history.pushState(null, '', href);
    }
  });
}

/**
 * Adds a parallax scroll effect to elements
 * @param selector CSS selector for elements to apply parallax to
 * @param speedFactor Speed factor (0.5 = half speed, 2 = double speed)
 */
export function setupParallaxEffect(selector: string, speedFactor = 0.5) {
  if (typeof window === 'undefined') return;
  
  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (!elements.length) return;
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    
    elements.forEach(element => {
      const elementTop = element.offsetTop;
      const distance = scrollTop - elementTop;
      
      // Apply parallax effect based on scroll position
      element.style.transform = `translateY(${distance * speedFactor}px)`;
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Initial call to set positions
  handleScroll();
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', handleScroll);
}

/**
 * Initialize all smooth scroll features
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return;
  
  // Set up smooth anchor links
  setupSmoothAnchorLinks();
  
  // Add any other initialization as needed
}