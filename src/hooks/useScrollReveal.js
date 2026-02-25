import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for scroll-reveal animations using Intersection Observer.
 * Returns a ref to attach to the element and whether it's visible.
 */
export const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
};

/**
 * Hook for staggered children animations.
 * Returns a ref for the parent container — children get animated with delay.
 */
export const useStaggerReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -40px 0px',
    staggerDelay = 120,
    childSelector = '.stagger-item',
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = container.querySelectorAll(childSelector);
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * staggerDelay}ms`;
            child.classList.add('revealed');
          });
          observer.unobserve(container);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, rootMargin, staggerDelay, childSelector]);

  return ref;
};

/**
 * Hook for counting up numbers when they enter viewport.
 */
export const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return [ref, count];
};
