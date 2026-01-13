import React, { useState } from 'react';
import './Appointment.css';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="appointment section">
      <div className="container">
        <span className="section-label">TRANSFORM YOUR LIFE</span>
        <h2 className="section-title">Transform your body, mind, and life today.</h2>
        <p className="section-subtitle">
          Book an appointment with our expert therapists and start your journey towards holistic well-being.
        </p>
        <div className="appointment-content">
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
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
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
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`btn btn-primary ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Submitting...
                  </>
                ) : (
                  'Book Appointment'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Appointment;

