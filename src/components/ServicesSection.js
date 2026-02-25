import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ServicesSection.css';

const SERVICES = [
  'Hypnotherapy',
  'Psycho-Kundali',
  'Chakra Healing',
  'Handwriting Analysis',
  'Life & Executive Coaching',
  'Identify Issues',
  'Coping With Heart Attack, Diabetes & Other Diseases',
];

const FEATURED_IMAGE =
  'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600';

const ServicesSection = () => {
  const [leftRef, leftVis] = useScrollReveal({ threshold: 0.1 });
  const [rightRef, rightVis] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="services-section">
      <div className="services-section__container">
        {/* Left column: service list */}
        <div ref={leftRef} className={`services-section__list reveal reveal-left ${leftVis ? 'visible' : ''}`}>
          <h3 className="services-section__list-title">Our Services</h3>
          <ul className="services-section__items">
            {SERVICES.map((service, index) => (
              <li className="services-section__item" key={index}>
                <Link to="/services" className="services-section__link">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: featured area */}
        <div ref={rightRef} className={`services-section__featured reveal reveal-right ${rightVis ? 'visible' : ''}`}>
          <div className="services-section__featured-bg">
            <img src={FEATURED_IMAGE} alt="" aria-hidden="true" />
          </div>
          <div className="services-section__featured-overlay" />

          <div className="services-section__featured-content">
            <h2 className="services-section__featured-heading">
              Special Services By Experts
            </h2>
            <p className="services-section__featured-text">
              Our team of experts offers a range of specialized services to help
              individuals overcome challenges, achieve personal and professional
              goals, and improve their overall well-being. From therapy and
              counselling to coaching and holistic healing, we provide
              personalized support for every journey.
            </p>
            <Link to="/appointment" className="services-section__book-btn">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
