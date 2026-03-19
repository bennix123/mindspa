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
        <div ref={leftRef} className={`appointment__header ${leftVis ? 'visible' : ''}`}>
          <p className="section-label">Who We Are</p>
          <h2 className="section-title">Book An Appointment Now</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
        </div>

        <div className="appointment__grid">
          <div className="appointment__image-wrap">
            <img src="/client-pic/2.jpeg" alt="Customer service" className="appointment__image" />
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
              <div className="appointment__row">
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
              </div>
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
