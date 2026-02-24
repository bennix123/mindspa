import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';

const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    const suffix = element.dataset.suffix || '';
    element.textContent = current + suffix;
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
};

const Stats = () => {
  const [counted, setCounted] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    { number: '1000+', label: 'Satisfied Clients', target: 1000, suffix: '+', icon: '😊' },
    { number: '50+',   label: 'Expert Therapists', target: 50,   suffix: '+', icon: '👨‍⚕️' },
    { number: '5000+', label: 'Sessions Completed', target: 5000, suffix: '+', icon: '📋' },
    { number: '15+',   label: 'Years Experience',  target: 15,   suffix: '+', icon: '🏆' }
  ];

  useEffect(() => {
    const currentRef = statsRef.current;
    if (!currentRef) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach((el, i) => {
            setTimeout(() => {
              const target = parseInt(el.dataset.target);
              if (target) animateValue(el, 0, target, 2000);
            }, i * 200);
          });
        }
      });
    }, { threshold: 0.4 });
    observer.observe(currentRef);
    return () => currentRef && observer.unobserve(currentRef);
  }, [counted]);

  return (
    <section className="stats section">
      <div className="stats-bg-layer">
        <img
          src="https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          aria-hidden="true"
        />
        <div className="stats-bg-overlay" />
      </div>
      <div className="stats-full-width">
        <div className="stats-grid" ref={statsRef}>
          {stats.map((stat, index) => (
            <div key={index} className="stat-card fade-in" style={{ transitionDelay: `${index * 0.1}s` }}>
              <span className="stat-icon">{stat.icon}</span>
              <span
                className="stat-number"
                data-target={stat.target}
                data-suffix={stat.suffix}
              >
                {counted ? stat.number : '0' + stat.suffix}
              </span>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
