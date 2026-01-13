import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const services = [
    'Stress, Anxiety & Depression',
    'Depression',
    'Relationships Issues',
    'OCD, Bipolar Disorder',
    'Eating & Sleeping Disorder',
    'Trauma, Grief & Anger Issues',
    'Sexuality, Old Age, Marital Issues',
    'Other Disorders',
    'Addiction',
    'Self Enhancement'
  ];

  return (
    <section id="therapies" className="why-choose-us section">
      <div className="container">
        <span className="section-label">GET HELP WITH</span>
        <h2 className="section-title">Get Help With</h2>
        <p className="section-subtitle">
          Our comprehensive range of psychological services to help you overcome challenges 
          and achieve personal growth and well-being.
        </p>
        <div className="services-list">
          {services.map((service, index) => (
            <div key={index} className="service-tag">
              <span className="check-icon">✓</span>
              {service}
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="btn btn-primary">Read More</button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

