import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const PLANS = [
  {
    name: 'Basic',
    price: 499,
    period: 'per month',
    tag: null,
    features: [
      'Access to 3 free courses',
      'Community discussion access',
      'Monthly wellness newsletter',
      'Downloadable resource library',
    ],
    cta: 'Start Basic',
  },
  {
    name: 'Premium',
    price: 1499,
    period: 'per month',
    tag: 'Most Popular',
    features: [
      'Access to ALL courses',
      'Monthly 1-on-1 coaching call',
      'Priority support',
      'Exclusive masterclasses',
      'Certificate on completion',
      'Ad-free experience',
    ],
    cta: 'Go Premium',
  },
  {
    name: 'Professional',
    price: 4999,
    period: 'per month',
    tag: 'Best Value',
    features: [
      'Everything in Premium',
      'Unlimited 1-on-1 coaching',
      'Co-branded certifications',
      'Early access to new courses',
      'Private WhatsApp group',
      'Annual in-person retreat',
    ],
    cta: 'Join Professional',
  },
];

const styles = {
  section: { padding: '60px 0 80px', background: 'var(--bg-white)' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '28px',
    marginTop: '50px',
  },
  card: {
    background: 'var(--bg-white)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-lg)',
    padding: '36px 28px',
    position: 'relative',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardPopular: {
    border: '2px solid var(--accent)',
    boxShadow: '0 8px 40px rgba(0,208,132,0.15)',
    transform: 'scale(1.03)',
  },
  tag: {
    position: 'absolute',
    top: '-14px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--accent)',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '18px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  name: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: 500,
    color: 'var(--text-heading)',
    marginBottom: '6px',
  },
  price: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '44px',
    fontWeight: 500,
    color: 'var(--accent)',
    lineHeight: 1,
  },
  period: { fontSize: '13px', color: 'var(--text-light)', marginBottom: '20px' },
  featureList: { listStyle: 'none', padding: 0, margin: '24px 0' },
  feature: {
    padding: '8px 0 8px 26px',
    position: 'relative',
    fontSize: '14px',
    color: 'var(--text-body)',
    lineHeight: 1.5,
  },
};

function MembershipsPage() {
  return (
    <>
      <PageBanner title="Memberships" />

      <section style={styles.section}>
        <div className="container">
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="section-subtitle">
            Unlock ongoing access to MindSpa courses, coaching, and resources
          </p>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>

          <div style={styles.grid}>
            {PLANS.map((plan) => {
              const isPopular = plan.tag === 'Most Popular';
              return (
                <div
                  key={plan.name}
                  style={{ ...styles.card, ...(isPopular ? styles.cardPopular : {}) }}
                >
                  {plan.tag && <span style={styles.tag}>{plan.tag}</span>}
                  <h3 style={styles.name}>{plan.name}</h3>
                  <div style={styles.price}>
                    ₹{plan.price.toLocaleString('en-IN')}
                    <span style={{ fontSize: 16, color: 'var(--text-light)' }}>
                      {' '}
                      / mo
                    </span>
                  </div>
                  <div style={styles.period}>{plan.period}</div>

                  <ul style={styles.featureList}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={styles.feature}>
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            color: 'var(--accent)',
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={isPopular ? 'btn-primary' : 'btn-outline'}
                    style={{ width: '100%', display: 'block' }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              );
            })}
          </div>

          <p
            style={{
              textAlign: 'center',
              marginTop: 40,
              fontSize: 14,
              color: 'var(--text-light)',
            }}
          >
            All memberships include a 7-day free trial. Cancel anytime.
          </p>
        </div>
      </section>
    </>
  );
}

export default MembershipsPage;
