import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const aboutStyles = {
  section: {
    padding: '60px 0 80px',
    background: '#fff',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '20px',
  },
  text: {
    fontSize: '16px',
    lineHeight: 1.8,
    color: 'var(--body-text)',
    marginBottom: '20px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '40px',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--blue)',
  },
  line: {
    width: '30px',
    height: '3px',
    background: 'var(--blue)',
  },
  buttonWrap: {
    marginTop: '36px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginTop: '50px',
    textAlign: 'left',
  },
  valueCard: {
    background: 'var(--light-grey)',
    borderRadius: 'var(--radius-md)',
    padding: '30px 24px',
    border: '1px solid var(--border-light)',
  },
  valueIcon: {
    fontSize: '32px',
    marginBottom: '14px',
    display: 'block',
  },
  valueTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '10px',
  },
  valueText: {
    fontSize: '14px',
    lineHeight: 1.7,
    color: 'var(--body-text)',
    margin: 0,
  },
};

function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" />

      <section style={aboutStyles.section}>
        <div className="container">
          <div style={aboutStyles.content}>
            <h2 style={aboutStyles.heading}>Hello and Welcome to MindSpa!</h2>
            <div style={aboutStyles.divider}>
              <span style={aboutStyles.line}></span>
              <span style={aboutStyles.dot}></span>
              <span style={aboutStyles.dot}></span>
              <span style={aboutStyles.dot}></span>
              <span style={aboutStyles.line}></span>
            </div>
            <p style={aboutStyles.text}>
              We are psychologists who are passionate about partnering with you
              to enhance your quality of life. Our aim is to provide a safe,
              supportive, and confidential environment where you can explore your
              thoughts, feelings, and behaviors. We believe in empowering
              individuals to achieve their full potential through evidence-based
              therapeutic approaches.
            </p>
            <p style={aboutStyles.text}>
              At MindSpa, we specialize in a wide range of psychological
              services including hypnotherapy, psycho-kundali, chakra healing,
              handwriting analysis, life coaching, and executive coaching. Our
              holistic approach ensures that each client receives personalized
              care tailored to their unique needs.
            </p>
            <p style={aboutStyles.text}>
              Whether you are dealing with stress, anxiety, relationship
              challenges, or simply seeking personal growth, our team of
              experienced professionals is here to guide you every step of the
              way. We combine traditional therapeutic wisdom with modern
              psychological techniques for the most effective outcomes.
            </p>

            <div style={aboutStyles.buttonWrap}>
              <Link to="/contact" className="btn-primary">
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Values Section */}
          <div style={aboutStyles.valuesGrid}>
            <div style={aboutStyles.valueCard}>
              <span style={aboutStyles.valueIcon}>🧠</span>
              <h3 style={aboutStyles.valueTitle}>Expert Team</h3>
              <p style={aboutStyles.valueText}>
                Our team of certified psychologists and therapists bring years of
                experience and specialized training to support your well-being.
              </p>
            </div>
            <div style={aboutStyles.valueCard}>
              <span style={aboutStyles.valueIcon}>💙</span>
              <h3 style={aboutStyles.valueTitle}>Compassionate Care</h3>
              <p style={aboutStyles.valueText}>
                We create a safe and non-judgmental space where you can openly
                explore your challenges and work toward meaningful solutions.
              </p>
            </div>
            <div style={aboutStyles.valueCard}>
              <span style={aboutStyles.valueIcon}>🌿</span>
              <h3 style={aboutStyles.valueTitle}>Holistic Approach</h3>
              <p style={aboutStyles.valueText}>
                We blend evidence-based therapy with holistic wellness practices,
                addressing mind, body, and spirit for lasting transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
