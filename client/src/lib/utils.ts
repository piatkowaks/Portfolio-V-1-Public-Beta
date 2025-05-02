import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Smooth scroll to section
export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Account for navbar height
      behavior: 'smooth'
    });
  }
}

// Format date to "last updated X days/weeks ago"
export function formatLastUpdated(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 1) {
    return "Last updated today";
  } else if (diffInDays === 1) {
    return "Last updated yesterday";
  } else if (diffInDays < 7) {
    return `Last updated ${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `Last updated ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `Last updated ${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
}
