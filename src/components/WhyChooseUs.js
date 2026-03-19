import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TriangleDots, FloatingShape } from './DecorativePatterns';
import './WhyChooseUs.css';

const leftServices = [
  'Bipolar Disorders',
  'Anxiety Therapy',
  'Stress Management',
  'Executive Coaching',
  'Depression Therapy',
];

const rightServices = [
  'Relationship Therapy',
  'Family Therapy',
  'Curing Addictions',
  'Emergency Services',
  'Brief Therapy',
];

const WhyChooseUs = () => {
  const [leftRef, leftVis] = useScrollReveal();
  const [rightRef, rightVis] = useScrollReveal();

  return (
    <section className="why-choose">
      <TriangleDots style={{ top: '60px', right: '40px' }} />
      <FloatingShape shape="circle" style={{ top: '20%', left: '-80px' }} />
      <FloatingShape shape="warm" style={{ bottom: '10%', right: '-60px' }} />
      <div className="container">
        <div className="why-choose__grid">
          <div ref={leftRef} className={`why-choose__image ${leftVis ? 'visible' : ''}`}>
            <img src="/client-pic/4.jpeg" alt="Why choose Mind Spa" />
            <div className="why-choose__play-btn" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>

          <div ref={rightRef} className={`why-choose__content ${rightVis ? 'visible' : ''}`}>
            <p className="section-label" style={{ textAlign: 'left' }}>Why We Are</p>
            <h2 className="why-choose__title">Why Choose Us</h2>
            <p className="why-choose__desc">
              We provide comprehensive mental health care with a team of certified professionals
              dedicated to your well-being. Our evidence-based approaches ensure effective and
              lasting results.
            </p>

            <div className="why-choose__lists">
              <ul className="why-choose__list">
                {leftServices.map((s, i) => (
                  <li key={i}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="var(--accent)" strokeWidth="2"/>
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
              <ul className="why-choose__list">
                {rightServices.map((s, i) => (
                  <li key={i}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="var(--accent)" strokeWidth="2"/>
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <a href="/services" className="btn-warm why-choose__btn">Read More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
