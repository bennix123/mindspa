import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useScrollReveal';
import './AboutSection.css';

const specialties = [
  { title: 'Certified, experienced professionals.', desc: '' },
  { title: 'Both online and offline therapy sessions and training programs.', desc: '' },
  { title: 'Safe, confidential and inclusive space.', desc: '' },
  { title: 'Experience quick and lasting results through holistic approach.', desc: '' },
];

const AboutSection = () => {
  const [leftRef, leftVis] = useScrollReveal();
  const [rightRef, rightVis] = useScrollReveal();
  const [yearsRef, yearsCount] = useCountUp(40, 2000);

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-section__grid">
          <div ref={leftRef} className={`about-section__left ${leftVis ? 'visible' : ''}`}>
            <div className="about-section__images">
              <div className="about-section__img-main">
                <img src="/client-pic/why-choose.jpeg" alt="Why choose Mind Spa" />
              </div>
              <div className="about-section__img-tertiary">
                <img src="/client-pic/gallery-3.jpeg" alt="Therapy consultation" />
              </div>
              <div className="about-section__img-secondary">
                <img src="/client-pic/why-choose-floating.jpeg" alt="Prof (Dr) Manju Agrawal at MindSpa" />
              </div>
              <a href="https://www.instagram.com/mindspaindiaofficial/" target="_blank" rel="noopener noreferrer" className="about-section__experience" ref={yearsRef}>
                <span className="about-section__exp-num">{yearsCount}+</span>
                <span className="about-section__exp-text">Yrs of Experience</span>
              </a>
            </div>
          </div>

          <div ref={rightRef} className={`about-section__right ${rightVis ? 'visible' : ''}`}>
            <h2 className="about-section__title">Why Choose Us</h2>
            <p className="about-section__desc">
              We are a team of certified professionals dedicated to your well-being, and we provide comprehensive mental health care with our evidence-based approaches and ensure quick, effective, and lasting results.
            </p>

            <div className="about-section__specialties">
              {specialties.map((item, i) => (
                <div key={i} className="about-section__specialty">
                  <span className="about-section__specialty-dot"></span>
                  <div>
                    <h4>{item.title}</h4>
                    {item.desc ? <p>{item.desc}</p> : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="about-section__bottom">
              <a href="/about" className="btn-primary about-section__btn">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
