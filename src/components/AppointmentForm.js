import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './AppointmentForm.css';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [leftRef, leftVis] = useScrollReveal();
  const [rightRef, rightVis] = useScrollReveal();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="appointment">
      <div className="container">
        <div className="appointment__grid">
          <div ref={leftRef} className={`appointment__info ${leftVis ? 'visible' : ''}`}>
            <p className="section-label" style={{ textAlign: 'left' }}>Get In Touch</p>
            <h2 className="appointment__title">Book An Appointment Now</h2>
            <p className="appointment__desc">
              Take the first step toward mental wellness. Fill out the form and our team
              will get back to you within 24 hours to schedule your session.
            </p>

            <div className="appointment__contact-list">
              <div className="appointment__contact-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <div>
                  <h4>Phone</h4>
                  <p>+91 7607588184</p>
                </div>
              </div>
              <div className="appointment__contact-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
                <div>
                  <h4>Email</h4>
                  <p>mindspalko@gmail.com</p>
                </div>
              </div>
              <div className="appointment__contact-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <h4>Address</h4>
                  <p>Lucknow, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={rightRef} className={`appointment__form-wrap ${rightVis ? 'visible' : ''}`}>
            {submitted && (
              <div className="appointment__success">
                Thank you! We'll contact you shortly.
              </div>
            )}
            <form className="appointment__form" onSubmit={handleSubmit}>
              <div className="appointment__row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject *"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message *"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="btn-primary appointment__submit">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
