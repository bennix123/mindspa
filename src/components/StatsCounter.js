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
    <section className="stats-counter">
      <div className="container">
        <div ref={ref} className={`stats-counter__content ${vis ? 'visible' : ''}`}>
          <div className="stats-counter__left">
            <p className="stats-counter__subtitle">Available 24/7</p>
            <h2 className="stats-counter__title">We are Always Ready For A Challenge</h2>
            <a href="/contact" className="btn-warm stats-counter__btn">
              Book An Appointment
            </a>
          </div>

          <div className="stats-counter__right">
            <div className="stats-counter__grid">
              <StatItem end={406} suffix=" +" label="Satisfied Customers" />
              <StatItem end={196} suffix="" label="Winning Awards" />
              <StatItem end={305} suffix="" label="Project Completed" />
              <StatItem end={45} suffix=" +" label="Years Of Experience" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
