import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 400);
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const circumference = 2 * Math.PI * 22;
  const strokeDash = circumference * progress;

  return (
    <button
      className={`scroll-top-btn ${visible ? 'show' : ''}`}
      onClick={scrollUp}
      aria-label="Scroll to top"
    >
      <svg className="scroll-progress-ring" viewBox="0 0 48 48">
        <circle className="ring-bg" cx="24" cy="24" r="22" />
        <circle
          className="ring-fg"
          cx="24" cy="24" r="22"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - strokeDash}
        />
      </svg>
      <span className="scroll-arrow">↑</span>
    </button>
  );
};

export default ScrollToTop;
