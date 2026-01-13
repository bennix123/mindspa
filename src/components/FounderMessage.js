import React from 'react';
import './FounderMessage.css';

const FounderMessage = () => {
  return (
    <section id="founder" className="founder-message section">
      <div className="container">
        <span className="section-label">FOUNDER'S MESSAGE</span>
        <div className="founder-content">
          <div className="founder-info-card">
            <div className="founder-header">
              <h3>DR. MANJU AGRAWAL</h3>
              <p className="founder-title">Hypnotherapy Trainer & Practitioner</p>
              <p className="founder-title">Subconscious Mind Coach</p>
            </div>
          </div>
          <div className="founder-message-text">
            <p className="greeting">Dear valued visitors,</p>
            <p>
              Welcome to Mind Spa, dedicated to create holistic mental, physical, social and emotional well being. 
              Our mission is to provide a safe and supportive space for individuals to explore their mental health 
              and emotional wellbeing, without stigma or judgment.
            </p>
            <p>We are a team of mental health professionals, dedicated to:</p>
            <ul className="founder-list">
              <li>Help you manifest your best potential</li>
              <li>Coach you to achieve success and happiness in your personal and professional lives.</li>
              <li>Helping you navigate the ups and downs of life, and empowering you to live your best life.</li>
              <li>Online and offline therapy sessions</li>
              <li>Self-help resources for long term healing and rehabilitation.</li>
            </ul>
            <p className="signature">–From the desk of the Founder President.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;

