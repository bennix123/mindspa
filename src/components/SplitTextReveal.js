import React, { useRef, useEffect, useState } from 'react';
import './SplitTextReveal.css';

const SplitTextReveal = ({ children, tag: Tag = 'h2', className = '', delay = 0 }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  // Split text into words
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  return (
    <Tag
      ref={containerRef}
      className={`split-text-reveal ${isVisible ? 'split-text-reveal--visible' : ''} ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="split-text-reveal__word-wrap">
          <span
            className="split-text-reveal__word"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
};

export default SplitTextReveal;
