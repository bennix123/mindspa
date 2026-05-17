import React from 'react';
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';
import './StatsCounter.css';

const StatItem = ({ end, suffix, label, href, showCount = true }) => {
  const [ref, count] = useCountUp(end || 0, 2000);
  return (
    <div className={`stats-counter__item ${showCount ? '' : 'stats-counter__item--text'}`} ref={ref}>
      {showCount ? <span className="stats-counter__number">{count}{suffix}</span> : null}
      {href ? (
        <a href={href} className="stats-counter__label stats-counter__label-link">{label}</a>
      ) : (
        <span className="stats-counter__label">{label}</span>
      )}
      {!showCount ? <span className="stats-counter__meta">Learn more</span> : null}
    </div>
  );
};

const StatsCounter = () => {
  const [ref, vis] = useScrollReveal();

  return (
    <section className="stats-counter" style={{
      backgroundImage: `linear-gradient(132deg, rgba(30, 34, 40, 0.92) 0%, rgba(50, 55, 60, 0.88) 55%, rgba(30, 34, 40, 0.94) 100%), url(${process.env.PUBLIC_URL}/client-pic/gallery-4.jpeg)`,
    }}>
      <div className="container">
        <div ref={ref} className={`stats-counter__content ${vis ? 'visible' : ''}`}>
          <div className="stats-counter__left">
            <p className="stats-counter__subtitle">Our Mission</p>
            <h2 className="stats-counter__title">To unlock your peak potential and help you achieve peace of mind. Also create a brigade of Mental Health experts and hypnotherapists.</h2>
            <a href="/contact" className="btn-warm stats-counter__btn">
              Book An Appointment
            </a>
          </div>

          <div className="stats-counter__right">
            <div className="stats-counter__grid">
              <StatItem end={4000} suffix=" +" label="Satisfied Clients" href="/testimonials" />
              <StatItem end={0} suffix="" label="Awards and Certificates" href="/gallery" showCount={false} />
              <StatItem end={0} suffix="" label="Gallery" href="/gallery" showCount={false} />
              <StatItem end={40} suffix=" +" label="Yrs of Experience" href="https://www.instagram.com/mindspaindiaofficial/" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
