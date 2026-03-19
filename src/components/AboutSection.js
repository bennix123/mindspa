import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useScrollReveal';
import './AboutSection.css';

const specialties = [
  { title: 'Qualified Therapies', desc: '45 years of experience' },
  { title: 'Individual Counseling', desc: 'Mental help for families' },
  { title: 'Couples Counseling', desc: '45 years of experience' },
  { title: 'Referring Therapists', desc: 'Experts you can trust' },
];

const AboutSection = () => {
  const [leftRef, leftVis] = useScrollReveal();
  const [rightRef, rightVis] = useScrollReveal();
  const [yearsRef, yearsCount] = useCountUp(45, 2000);

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-section__grid">
          <div ref={leftRef} className={`about-section__left ${leftVis ? 'visible' : ''}`}>
            <div className="about-section__images">
              <div className="about-section__img-main">
                <img src="/client-pic/1.jpeg" alt="Therapy session" />
              </div>
              <div className="about-section__img-secondary">
                <img src="/client-pic/2.jpeg" alt="Counseling" />
              </div>
              <div className="about-section__experience" ref={yearsRef}>
                <span className="about-section__exp-num">{yearsCount}+</span>
                <span className="about-section__exp-text">Years Experience</span>
              </div>
            </div>
          </div>

          <div ref={rightRef} className={`about-section__right ${rightVis ? 'visible' : ''}`}>
            <p className="section-label" style={{ textAlign: 'left' }}>Who We Are</p>
            <h2 className="about-section__title">Learn About Our Professional Psychology Therapy</h2>
            <p className="about-section__desc">
              At Mind Spa, we believe in a holistic approach to mental health. Our team of experienced
              professionals provides compassionate care tailored to your unique needs, helping you
              navigate life's challenges with confidence and resilience.
            </p>

            <div className="about-section__specialties">
              {specialties.map((item, i) => (
                <div key={i} className="about-section__specialty">
                  <span className="about-section__specialty-dot"></span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-section__bottom">
              <div className="about-section__founder">
                <img src="/client-pic/signature.png" alt="Signature" className="about-section__signature" onError={(e) => { e.target.style.display = 'none'; }} />
                <div className="about-section__founder-info">
                  <p className="about-section__founder-name">Saanya Singh</p>
                  <p className="about-section__founder-role">Founder</p>
                </div>
              </div>
              <a href="/about" className="btn-primary about-section__btn">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
