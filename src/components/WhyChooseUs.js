import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const services = [
    { label: 'Stress, Anxiety & Depression', icon: '😰' },
    { label: 'Depression',                   icon: '💙' },
    { label: 'Relationship Issues',           icon: '💑' },
    { label: 'OCD, Bipolar Disorder',         icon: '🔄' },
    { label: 'Eating & Sleeping Disorder',    icon: '🍃' },
    { label: 'Trauma, Grief & Anger Issues',  icon: '🕊️' },
    { label: 'Sexuality & Marital Issues',    icon: '❤️' },
    { label: 'Other Disorders',               icon: '🧩' },
    { label: 'Addiction Recovery',            icon: '🌱' },
    { label: 'Self Enhancement',              icon: '⭐' },
  ];

  const reasons = [
    { icon: '🎓', title: 'Certified Experts', desc: 'Licensed psychologists & certified therapists with years of practice.' },
    { icon: '🔒', title: 'Confidential', desc: 'Your privacy is our priority — every session is completely confidential.' },
    { icon: '💻', title: 'Online & Offline', desc: 'Flexible sessions — connect from anywhere or visit us in-person.' },
    { icon: '❤️', title: 'Holistic Approach', desc: 'Mind, body and soul — we treat the whole person, not just symptoms.' },
  ];

  return (
    <section id="therapies" className="why-choose-us section">
      <div className="container">
        <div className="wcu-layout">
          {/* Left — Get Help With */}
          <div className="wcu-left fade-in">
            <span className="section-label">GET HELP WITH</span>
            <h2 className="section-title wcu-title">We Help You Overcome Challenges</h2>
            <p className="wcu-desc">
              Our comprehensive range of psychological services helps you navigate life's challenges
              and achieve personal growth and lasting well-being.
            </p>
            <div className="services-list">
              {services.map((s, i) => (
                <div key={i} className="service-tag">
                  <span className="service-tag-icon">{s.icon}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="text-center" style={{ marginTop: 36 }}>
              <button className="btn btn-primary" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Book a Session
              </button>
            </div>
          </div>

          {/* Right — Why Choose Us */}
          <div className="wcu-right fade-in animate-delay-1">
            <span className="section-label">WHY CHOOSE US</span>
            <h2 className="section-title wcu-title">Why MindSpa?</h2>
            <div className="wcu-reasons">
              {reasons.map((r, i) => (
                <div key={i} className="wcu-reason-card">
                  <div className="wcu-reason-icon">{r.icon}</div>
                  <div>
                    <h4 className="wcu-reason-title">{r.title}</h4>
                    <p className="wcu-reason-desc">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
