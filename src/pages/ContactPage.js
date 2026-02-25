import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';

const contactStyles = {
  section: {
    padding: '60px 0 80px',
    background: '#fff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '50px',
    alignItems: 'start',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--dark-navy)',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--light-grey)',
    color: 'var(--body-text)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--light-grey)',
    color: 'var(--body-text)',
    outline: 'none',
    minHeight: '140px',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
  },
  formTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '26px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '8px',
  },
  formSubtitle: {
    fontSize: '14px',
    color: 'var(--body-text)',
    marginBottom: '30px',
    lineHeight: 1.6,
  },
  sidebarCard: {
    background: 'var(--light-grey)',
    borderRadius: 'var(--radius-md)',
    padding: '32px 28px',
    border: '1px solid var(--border-light)',
  },
  sidebarTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '22px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '24px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    marginBottom: '22px',
  },
  infoIcon: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    borderRadius: '50%',
    background: 'var(--blue)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '16px',
  },
  infoLabel: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  infoText: {
    fontSize: '15px',
    color: 'var(--dark-navy)',
    lineHeight: 1.5,
    margin: 0,
  },
  successMsg: {
    background: '#ecfdf5',
    color: '#065f46',
    padding: '14px 20px',
    borderRadius: 'var(--radius-sm)',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid #a7f3d0',
  },
};

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <PageBanner title="Contact Us" />

      <section style={contactStyles.section}>
        <div className="container">
          <div style={contactStyles.grid} className="contact-grid">
            {/* Contact Form */}
            <div>
              <h2 style={contactStyles.formTitle}>Get In Touch</h2>
              <p style={contactStyles.formSubtitle}>
                Have a question or want to book an appointment? Fill out the
                form below and we will get back to you as soon as possible.
              </p>

              {submitted && (
                <div style={contactStyles.successMsg}>
                  Thank you for reaching out! We will get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={contactStyles.formGroup}>
                    <label style={contactStyles.label}>Full Name *</label>
                    <input
                      style={contactStyles.input}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div style={contactStyles.formGroup}>
                    <label style={contactStyles.label}>Email *</label>
                    <input
                      style={contactStyles.input}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={contactStyles.formGroup}>
                    <label style={contactStyles.label}>Phone</label>
                    <input
                      style={contactStyles.input}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div style={contactStyles.formGroup}>
                    <label style={contactStyles.label}>Subject *</label>
                    <input
                      style={contactStyles.input}
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                    />
                  </div>
                </div>
                <div style={contactStyles.formGroup}>
                  <label style={contactStyles.label}>Message *</label>
                  <textarea
                    style={contactStyles.textarea}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div style={contactStyles.sidebarCard}>
              <h3 style={contactStyles.sidebarTitle}>Contact Information</h3>

              <div style={contactStyles.infoItem}>
                <div style={contactStyles.infoIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div style={contactStyles.infoLabel}>Address</div>
                  <p style={contactStyles.infoText}>Lucknow, Uttar Pradesh, India</p>
                </div>
              </div>

              <div style={contactStyles.infoItem}>
                <div style={contactStyles.infoIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div style={contactStyles.infoLabel}>Phone</div>
                  <p style={contactStyles.infoText}>
                    +91 7607588184<br />
                    +91 8840676202
                  </p>
                </div>
              </div>

              <div style={contactStyles.infoItem}>
                <div style={contactStyles.infoIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <div style={contactStyles.infoLabel}>Email</div>
                  <p style={contactStyles.infoText}>mindspalko@gmail.com</p>
                </div>
              </div>

              <div style={contactStyles.infoItem}>
                <div style={contactStyles.infoIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <div style={contactStyles.infoLabel}>Working Hours</div>
                  <p style={contactStyles.infoText}>
                    Mon - Fri: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 12:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive styles injected via style tag */}
      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .contact-grid form > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default ContactPage;
