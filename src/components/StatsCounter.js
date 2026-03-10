import React from 'react';
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';
import './StatsCounter.css';

const StatItem = ({ end, suffix, label }) => {
  const [ref, count] = useCountUp(end, 2000);
  return (
    <div className="stats-counter__item" ref={ref}>
      <span className="stats-counter__number">{count}{suffix}</span>
      <span className="stats-counter__label">{label}</span>
    </div>
  );
};

const StatsCounter = () => {
  const [ref, vis] = useScrollReveal();

  return (
    <section className="stats-counter" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/client-pic/3.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="stats-counter__overlay" />
      <div className="container">
        <div ref={ref} className={`stats-counter__content ${vis ? 'visible' : ''}`}>
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Available 24/7</p>
          <h2 className="stats-counter__title">We are Always Ready For A Challenge</h2>

          <div className="stats-counter__grid">
            <StatItem end={500} suffix="+" label="Satisfied Customers" />
            <StatItem end={15} suffix="" label="Winning Awards" />
            <StatItem end={200} suffix="" label="Projects Completed" />
            <StatItem end={10} suffix="+" label="Years Of Experience" />
          </div>

          <a href="/contact" className="btn-warm stats-counter__btn">
            Book An Appointment
          </a>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
