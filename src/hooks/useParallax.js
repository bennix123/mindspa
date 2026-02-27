import { useEffect, useRef } from 'react';

/**
 * Hook for scroll-based parallax effect.
 * Applies translateY transform based on scroll position.
 * @param {number} speed - Parallax speed factor (default 0.3). Lower = subtler.
 */
export const useParallax = (speed = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const scrollY = window.scrollY;
            ref.current.style.transform = `translateY(${scrollY * speed}px) scale(1.05)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};
