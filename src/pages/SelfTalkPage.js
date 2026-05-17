import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const styles = {
  section: { padding: '60px 0', background: 'var(--bg-white)' },
  hero: {
    background: 'var(--bg-light)',
    padding: '50px 40px',
    borderRadius: 'var(--radius-lg)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 40,
    alignItems: 'center',
    marginBottom: 60,
  },
  heroText: {
    fontFamily: "'Lora', serif",
    fontSize: 18,
    fontStyle: 'italic',
    color: 'var(--text-body)',
    lineHeight: 1.7,
    marginBottom: 20,
  },
  heroImg: {
    width: '100%',
    borderRadius: 'var(--radius-md)',
    objectFit: 'cover',
    maxHeight: 340,
  },
  principle: {
    display: 'flex',
    gap: 24,
    padding: '24px 0',
    borderBottom: '1px solid var(--border-light)',
  },
  num: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 48,
    color: 'var(--accent)',
    lineHeight: 1,
    minWidth: 60,
  },
  pTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 22,
    fontWeight: 500,
    color: 'var(--text-heading)',
    marginBottom: 8,
  },
  pDesc: { fontSize: 15, color: 'var(--text-body)', lineHeight: 1.7 },
};

const PRINCIPLES = [
  {
    title: 'You Speak to Yourself All Day',
    desc: 'The average person has 50,000+ thoughts per day. Most are repetitive, many are negative, and almost all go unexamined. Becoming aware of your internal narrator is the first step to changing it.',
  },
  {
    title: 'Your Brain Believes What You Tell It',
    desc: 'Neural pathways strengthen with repetition. When you repeatedly tell yourself "I\'m not good enough," your brain encodes that as truth. The reverse is also true — intentional positive self-talk literally rewires your neural architecture.',
  },
  {
    title: 'Self-Talk Shapes Your Emotional State',
    desc: 'The stories you tell yourself about events matter more than the events themselves. Two people can experience the same situation and walk away with completely different emotional outcomes — based purely on their internal dialogue.',
  },
  {
    title: 'Compassionate Self-Talk Builds Resilience',
    desc: 'Research shows self-compassion (not harsh self-criticism) predicts success, mental health, and motivation. Speak to yourself the way you would speak to a dear friend facing the same challenge.',
  },
  {
    title: 'Awareness Is the Catalyst for Change',
    desc: 'You cannot change what you don\'t notice. Journaling, meditation, and simple pause-and-reflect habits reveal the patterns of your self-talk — making them available for transformation.',
  },
];

function SelfTalkPage() {
  return (
    <>
      <PageBanner title="Psychology of Self Talk" />

      <section style={styles.section}>
        <div className="container">
          <div style={styles.hero} className="self-talk-hero">
            <div>
              <p className="section-label" style={{ textAlign: 'left' }}>
                Featured Program
              </p>
              <h2
                className="section-title"
                style={{ textAlign: 'left', marginBottom: 20 }}
              >
                The Psychology of Self Talk
              </h2>
              <p style={styles.heroText}>
                "The way you talk to yourself shapes everything — your confidence, your
                relationships, your mental health, and ultimately, your life."
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 20 }}>
                Explore how inner dialogue influences mental health and learn evidence-based
                techniques to transform negative patterns into empowering conversations.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/courses" className="btn-primary">
                  Join the Program
                </Link>
                <Link to="/contact" className="btn-outline">
                  Book a Session
                </Link>
              </div>
            </div>
            <img
              src="https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Psychology of Self Talk"
              style={styles.heroImg}
            />
          </div>

          <h2 className="section-title">Core Principles</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>

          <div>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={styles.principle}>
                <div style={styles.num}>0{i + 1}</div>
                <div>
                  <h3 style={styles.pTitle}>{p.title}</h3>
                  <p style={styles.pDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '50px 20px',
              marginTop: 40,
              background: 'var(--bg-light)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h3
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 24,
                marginBottom: 12,
                color: 'var(--text-heading)',
              }}
            >
              Ready to transform your inner dialogue?
            </h3>
            <p
              style={{
                fontSize: 15,
                color: 'var(--text-body)',
                marginBottom: 24,
                maxWidth: 600,
                margin: '0 auto 24px',
                lineHeight: 1.6,
              }}
            >
              Our Self-Talk program combines psychology, hypnotherapy, and daily practice to
              help you build a kinder, more empowering relationship with yourself.
            </p>
            <Link to="/contact" className="btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .self-talk-hero {
            grid-template-columns: 1fr !important;
            padding: 30px 20px !important;
          }
        }
      `}</style>
    </>
  );
}

export default SelfTalkPage;
