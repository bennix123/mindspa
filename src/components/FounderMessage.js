import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './FounderMessage.css';

const FounderMessage = () => {
  const [titleRef, titleVis] = useScrollReveal();
  const [imgRef, imgVis] = useScrollReveal({ threshold: 0.2 });
  const [textRef, textVis] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="founder-message">
      <div className="container">
        <div ref={titleRef} className={`reveal reveal-up ${titleVis ? 'visible' : ''}`}>
          <h2 className="section-title">Founder's Message</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
        </div>

        <div className="founder-layout">
          <div ref={imgRef} className={`founder-image-col reveal reveal-left ${imgVis ? 'visible' : ''}`}>
            <div className="founder-photo-wrapper">
              <img
                src="/client-pic/intro_one.jpeg"
                alt="Dr. Manju Agrawal"
                className="founder-photo"
              />
            </div>
          </div>

          <div ref={textRef} className={`founder-text-col reveal reveal-right ${textVis ? 'visible' : ''}`}>
            <h3 className="founder-name">DR. MANJU AGRAWAL,</h3>
            <p className="founder-credential-line">Hypnotherapy Trainer &amp; Practitioner,</p>
            <p className="founder-credential-line">Subconscious Mind Coach</p>

            <div className="founder-letter">
              <p className="founder-greeting">Dear valued visitors,</p>
              <p>
                Welcome to Mind Spa, dedicated to creating holistic mental, physical, social and
                emotional well-being. Our mission is to provide a safe and supportive space for
                individuals to explore their mental health and emotional wellbeing, without stigma
                or judgment.
              </p>
              <p>
                We are a team of mental health professionals, dedicated to:
              </p>
              <ul className="founder-bullets">
                <li>Help you manifest your best potential</li>
                <li>Coach you to achieve success and happiness in your personal and professional lives</li>
                <li>Helping you navigate the ups and downs of life, empowering you to live your best life</li>
                <li>Offering online and offline therapy sessions</li>
                <li>Providing self-help resources for long-term healing and rehabilitation</li>
              </ul>
              <p className="founder-signature">— From the desk of the Founder President.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
