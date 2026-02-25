import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const SERVICES = [
  {
    icon: '🌀',
    title: 'Hypnotherapy',
    description:
      'Unlock the power of your subconscious mind through guided hypnotherapy sessions. Effective for anxiety, habits, phobias, and personal transformation.',
  },
  {
    icon: '🔮',
    title: 'Psycho-Kundali',
    description:
      'A unique blend of psychological profiling and astrological insights to help you understand your personality patterns, strengths, and areas for growth.',
  },
  {
    icon: '🧘',
    title: 'Chakra Healing',
    description:
      'Restore balance and harmony through chakra healing therapy. We help align your energy centers for improved emotional, mental, and physical well-being.',
  },
  {
    icon: '✍️',
    title: 'Handwriting Analysis',
    description:
      'Discover hidden personality traits and behavioral patterns through professional graphology. Handwriting analysis provides deep insights into your psyche.',
  },
  {
    icon: '🎯',
    title: 'Life & Executive Coaching',
    description:
      'Achieve your personal and professional goals with structured coaching sessions. We help you develop clarity, confidence, and actionable strategies.',
  },
  {
    icon: '🔍',
    title: 'Identify Issues',
    description:
      'Our comprehensive assessment process helps identify the root causes of emotional and behavioral challenges, enabling targeted and effective treatment plans.',
  },
  {
    icon: '💪',
    title: 'Coping With Diseases',
    description:
      'Psychological support for individuals dealing with chronic illness, pain management, and health-related anxiety. We help build resilience and coping strategies.',
  },
];

const servicesStyles = {
  section: {
    padding: '60px 0 80px',
    background: '#fff',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    color: 'var(--body-text)',
    maxWidth: '640px',
    margin: '0 auto 50px',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '28px',
  },
  card: {
    background: 'var(--light-grey)',
    borderRadius: 'var(--radius-md)',
    padding: '32px 28px',
    border: '1px solid var(--border-light)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: 'var(--blue)',
    borderRadius: '4px 0 0 4px',
  },
  icon: {
    fontSize: '40px',
    marginBottom: '16px',
    display: 'block',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '22px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '12px',
  },
  description: {
    fontSize: '14px',
    lineHeight: 1.7,
    color: 'var(--body-text)',
    margin: 0,
  },
  ctaWrap: {
    textAlign: 'center',
    marginTop: '50px',
  },
};

function ServicesPage() {
  return (
    <>
      <PageBanner title="Our Psychological Services" />

      <section style={servicesStyles.section}>
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
          <p style={servicesStyles.subtitle}>
            Explore our wide range of therapeutic and wellness services designed
            to support your mental health journey.
          </p>

          <div style={servicesStyles.grid} className="services-page-grid">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                style={servicesStyles.card}
                className="service-page-card"
              >
                <div style={servicesStyles.cardAccent}></div>
                <span style={servicesStyles.icon}>{service.icon}</span>
                <h3 style={servicesStyles.title}>{service.title}</h3>
                <p style={servicesStyles.description}>{service.description}</p>
              </div>
            ))}
          </div>

          <div style={servicesStyles.ctaWrap}>
            <Link to="/contact" className="btn-pink">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .service-page-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        @media (max-width: 700px) {
          .services-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default ServicesPage;
