import React, { useState } from 'react';
import './Appointment.css';

const Appointment = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const details = [
    { icon: '📍', title: 'Location', info: 'Lucknow, Uttar Pradesh' },
    { icon: '📞', title: 'Phone', info: '+91 7607588184 / +91 8840676202' },
    { icon: '✉️', title: 'Email', info: 'mindspalko@gmail.com' },
    { icon: '⏰', title: 'Hours', info: 'Mon–Fri: 8AM–6PM | Sat: 9AM–12PM' },
  ];

  return (
    <section id="contact" className="appointment section">
      <div className="container">
        <span className="section-label">TRANSFORM YOUR LIFE</span>
        <h2 className="section-title">Book an Appointment</h2>
        <p className="section-subtitle">
          Take the first step toward holistic well-being. Our expert therapists are ready to guide you.
        </p>

        <div className="appointment-layout">
          {/* Info panel */}
          <div className="appointment-info fade-in">
            <h3 className="appointment-info-title">Let's Talk About Your Well-Being</h3>
            <p className="appointment-info-desc">
              Whether you are dealing with stress, relationship issues, or seeking personal growth,
              MindSpa is here to help. Reach out today and let us walk this journey with you.
            </p>
            <div className="appointment-details">
              {details.map((d, i) => (
                <div key={i} className="appointment-detail">
                  <div className="appointment-detail-icon">{d.icon}</div>
                  <div className="appointment-detail-info">
                    <strong>{d.title}</strong>
                    <span>{d.info}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form panel */}
          <div className="appointment-content fade-in animate-delay-1">
            <h4 className="appointment-form-title">Schedule Your Session</h4>
            {submitted ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your appointment request has been submitted. We will contact you soon.</p>
              </div>
            ) : (
              <form className="appointment-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <select name="service" value={formData.service} onChange={handleChange} required>
                      <option value="">Select Service</option>
                      <option value="hypnotherapy">Hypnotherapy</option>
                      <option value="psycho-kundali">Psycho-Kundali</option>
                      <option value="chakra-healing">Chakra Healing</option>
                      <option value="handwriting">Handwriting Analysis</option>
                      <option value="coaching">Life & Executive Coaching</option>
                      <option value="stress">Stress, Anxiety & Depression</option>
                      <option value="relationships">Relationship Issues</option>
                      <option value="other">Other Services</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Your Message" rows="4" value={formData.message} onChange={handleChange} required />
                </div>
                <button type="submit" className={`btn btn-primary ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? <><span className="spinner" />Submitting...</> : 'Book Appointment'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
