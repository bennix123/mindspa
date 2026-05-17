import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';

const contactStyles = {
  section: {
    padding: '60px 0 80px',
    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '28px',
    alignItems: 'start',
  },
  formsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  formCard: {
    background: '#ffffff',
    borderRadius: '18px',
    padding: '32px 28px',
    border: '1px solid #e8edf3',
    boxShadow: '0 10px 36px rgba(30, 34, 40, 0.07)',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--dark-navy)',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '13px 16px',
    fontSize: '15px',
    border: '1.5px solid #dce3ec',
    borderRadius: '10px',
    background: '#fafbfc',
    color: 'var(--body-text)',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
  },
  textarea: {
    width: '100%',
    padding: '13px 16px',
    fontSize: '15px',
    border: '1.5px solid #dce3ec',
    borderRadius: '10px',
    background: '#fafbfc',
    color: 'var(--body-text)',
    outline: 'none',
    minHeight: '110px',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
  },
  formTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '28px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    lineHeight: 1.2,
    marginBottom: '8px',
  },
  formSubtitle: {
    fontSize: '15px',
    color: 'var(--body-text)',
    marginBottom: '20px',
    lineHeight: 1.6,
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'sticky',
    top: '100px',
  },
  infoCard: {
    background: '#ffffff',
    borderRadius: '18px',
    padding: '32px 28px',
    border: '1px solid #e8edf3',
    boxShadow: '0 10px 36px rgba(30, 34, 40, 0.07)',
  },
  infoTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '28px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '20px',
  },
  infoItem: {
    display: 'grid',
    gridTemplateColumns: '48px 1fr',
    gap: '14px',
    alignItems: 'start',
    marginBottom: '18px',
  },
  infoIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'var(--blue)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 700,
  },
  infoLabel: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#8da0bd',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  infoText: {
    fontSize: '16px',
    color: 'var(--dark-navy)',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  infoHighlight: {
    marginTop: '20px',
    padding: '16px 18px',
    borderRadius: '12px',
    border: '1px solid #cfeee1',
    background: '#effbf5',
  },
  infoHighlightTitle: {
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#2f6f58',
    marginBottom: '6px',
  },
  infoHighlightText: {
    fontSize: '15px',
    color: '#214536',
    lineHeight: 1.5,
  },
  tipsCard: {
    background: '#ffffff',
    borderRadius: '18px',
    padding: '32px 28px',
    border: '1px solid #e8edf3',
    boxShadow: '0 10px 36px rgba(30, 34, 40, 0.07)',
    display: 'flex',
    flexDirection: 'column',
  },
  tipsTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '28px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '16px',
  },
  tipsSubtitle: {
    fontSize: '15px',
    color: 'var(--body-text)',
    marginBottom: '20px',
    lineHeight: 1.6,
  },
  tipsList: {
    margin: 0,
    paddingLeft: '20px',
    flex: 1,
  },
  tipsItem: {
    fontSize: '15px',
    color: 'var(--body-text)',
    lineHeight: 1.7,
    marginBottom: '10px',
  },
  tipsHighlight: {
    marginTop: '20px',
    padding: '16px 18px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
    color: '#fff',
    textAlign: 'center',
  },
  tipsHighlightText: {
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  successMsg: {
    background: '#e6faf2',
    color: '#00b871',
    padding: '14px 20px',
    borderRadius: 'var(--radius-sm)',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid #b5e8d0',
  },
};

const INITIAL_FORM = {
  fullName: '',
  email: '',
  age: '',
  phone: '',
  queryIssue: '',
  message: '',
};

function ContactPage() {
  const [therapyForm, setTherapyForm] = useState(INITIAL_FORM);
  const [courseForm, setCourseForm] = useState(INITIAL_FORM);
  const [therapySubmitted, setTherapySubmitted] = useState(false);
  const [courseSubmitted, setCourseSubmitted] = useState(false);

  const handleChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e, setSubmitted, setFormData) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const renderForm = ({ title, subtitle, formData, setFormData, submitted, setSubmitted, buttonLabel, phoneLabel = 'Phone Number' }) => (
    <div style={contactStyles.formCard}>
      <h2 style={contactStyles.formTitle}>{title}</h2>
      <p style={contactStyles.formSubtitle}>{subtitle}</p>

      {submitted && (
        <div style={contactStyles.successMsg}>
          Thank you for reaching out! We will get back to you shortly.
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, setSubmitted, setFormData)}>
        <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={contactStyles.formGroup}>
            <label style={contactStyles.label}>Full Name *</label>
            <input
              style={contactStyles.input}
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange(e, setFormData)}
              placeholder="Your full name"
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
              onChange={(e) => handleChange(e, setFormData)}
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={contactStyles.formGroup}>
            <label style={contactStyles.label}>Age *</label>
            <input
              style={contactStyles.input}
              type="number"
              name="age"
              value={formData.age}
              onChange={(e) => handleChange(e, setFormData)}
              placeholder="Your age"
              min="1"
              required
            />
          </div>
          <div style={contactStyles.formGroup}>
            <label style={contactStyles.label}>{phoneLabel} *</label>
            <input
              style={contactStyles.input}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange(e, setFormData)}
              placeholder="+91 XXXXX XXXXX"
              required
            />
          </div>
        </div>

        <div style={contactStyles.formGroup}>
          <label style={contactStyles.label}>Query / Issue *</label>
          <input
            style={contactStyles.input}
            type="text"
            name="queryIssue"
            value={formData.queryIssue}
            onChange={(e) => handleChange(e, setFormData)}
            placeholder="Write your query or issue"
            required
          />
        </div>

        <div style={contactStyles.formGroup}>
          <label style={contactStyles.label}>Message *</label>
          <textarea
            style={contactStyles.textarea}
            name="message"
            value={formData.message}
            onChange={(e) => handleChange(e, setFormData)}
            placeholder="Write your message here..."
            required
          />
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
          {buttonLabel}
        </button>
      </form>
    </div>
  );

  return (
    <>
      <PageBanner title="Contact Us" />

      <section style={contactStyles.section}>
        <div className="container">
          <div style={contactStyles.mainGrid} className="contact-main-grid">
            {/* Left: Forms stacked */}
            <div style={contactStyles.formsColumn}>
              {renderForm({
                title: 'Course Enquiry',
                subtitle: 'Interested in CHI-Certified & Mindspa-Certified courses? Get in touch.',
                formData: courseForm,
                setFormData: setCourseForm,
                submitted: courseSubmitted,
                setSubmitted: setCourseSubmitted,
                buttonLabel: 'Submit Enquiry',
                phoneLabel: 'WhatsApp Number',
              })}

              {renderForm({
                title: 'Book a Therapy Session',
                subtitle: 'Fill in your details to schedule a Hypnotherapy or Psychotherapy session.',
                formData: therapyForm,
                setFormData: setTherapyForm,
                submitted: therapySubmitted,
                setSubmitted: setTherapySubmitted,
                buttonLabel: 'Book Session',
              })}
            </div>

            {/* Right: Contact info + Tips */}
            <div style={contactStyles.rightColumn} className="contact-right-col">
              <div style={contactStyles.infoCard}>
                <h2 style={contactStyles.infoTitle}>Contact Information</h2>

                <div style={contactStyles.infoItem}>
                  <div style={contactStyles.infoIcon}>📍</div>
                  <div>
                    <p style={contactStyles.infoLabel}>Address</p>
                    <p style={contactStyles.infoText}>Lucknow, Uttar Pradesh, India</p>
                  </div>
                </div>

                <div style={contactStyles.infoItem}>
                  <div style={contactStyles.infoIcon}>☎</div>
                  <div>
                    <p style={contactStyles.infoLabel}>Phone</p>
                    <p style={contactStyles.infoText}>+91 7607588184<br />+91 8840676202</p>
                  </div>
                </div>

                <div style={contactStyles.infoItem}>
                  <div style={contactStyles.infoIcon}>✉</div>
                  <div>
                    <p style={contactStyles.infoLabel}>Email</p>
                    <p style={contactStyles.infoText}>mindspalko@gmail.com</p>
                  </div>
                </div>

                <div style={{ ...contactStyles.infoItem, marginBottom: 0 }}>
                  <div style={contactStyles.infoIcon}>🕒</div>
                  <div>
                    <p style={contactStyles.infoLabel}>Working Hours</p>
                    <p style={contactStyles.infoText}>On Appointment Only</p>
                  </div>
                </div>

                <div style={contactStyles.infoHighlight}>
                  <p style={contactStyles.infoHighlightTitle}>Quick Response</p>
                  <p style={contactStyles.infoHighlightText}>
                    We usually reply within 24 hours. For faster support, please call the phone numbers above.
                  </p>
                </div>
              </div>

              <div style={contactStyles.tipsCard}>
                <h3 style={contactStyles.tipsTitle}>Before You Book</h3>
                <p style={contactStyles.tipsSubtitle}>A few things to keep in mind when reaching out to us.</p>
                <ul style={contactStyles.tipsList}>
                  <li style={contactStyles.tipsItem}>Choose your preferred date and time in the message.</li>
                  <li style={contactStyles.tipsItem}>Mention your main concern for better guidance.</li>
                  <li style={contactStyles.tipsItem}>Online and in-person sessions are available.</li>
                  <li style={{ ...contactStyles.tipsItem, marginBottom: 0 }}>Average response time: within 24 hours.</li>
                </ul>
                <div style={contactStyles.tipsHighlight}>
                  <p style={contactStyles.tipsHighlightText}>
                    Need urgent help? Call us directly at <strong>+91 7607588184</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-main-grid input:focus,
        .contact-main-grid textarea:focus {
          border-color: var(--blue);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(0, 208, 132, 0.13);
        }

        @media (max-width: 960px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-right-col {
            position: static !important;
          }
        }
        @media (max-width: 600px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default ContactPage;
