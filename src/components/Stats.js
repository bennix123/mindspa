import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';

const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    const text = element.textContent;
    const suffix = text.replace(/[0-9]/g, '');
    element.textContent = current + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

const Stats = () => {
  const [counted, setCounted] = useState(false);
  const statsRef = useRef(null);
  
  const stats = [
    { number: '1000+', label: 'Satisfied Clients', target: 1000 },
    { number: '50+', label: 'Expert Therapists', target: 50 },
    { number: '5000+', label: 'Sessions Completed', target: 5000 },
    { number: '15+', label: 'Years Of Experience', target: 15 }
  ];

  useEffect(() => {
    const currentRef = statsRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            setCounted(true);
            // Animate numbers
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((statEl, index) => {
              setTimeout(() => {
                const text = statEl.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                  animateValue(statEl, 0, number, 2000);
                }
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [counted]);

  return (
    <section className="stats section">
      <div className="container">
        <div className="stats-grid" ref={statsRef}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card fade-in"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="stat-number" data-target={stat.target}>
                {counted ? stat.number : '0'}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

