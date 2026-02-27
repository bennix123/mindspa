import { useEffect, useRef } from 'react';

/**
 * Hook for material-style click ripple effect.
 * Appends a temporary ripple span at click position, auto-removes after animation.
 */
export const useRipple = () => {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    // Ensure the element can contain the absolute ripple
    const position = getComputedStyle(el).position;
    if (position === 'static') {
      el.style.position = 'relative';
    }
    el.style.overflow = 'hidden';

    const handleClick = (e) => {
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.classList.add('ripple-effect');
      el.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, []);

  return ref;
};
