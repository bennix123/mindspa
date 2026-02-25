import React from 'react';
import PageBanner from '../components/PageBanner';

const TESTIMONIALS = [
  {
    name: 'Priya S.',
    role: 'Anxiety & Stress Management',
    quote:
      'MindSpa has truly changed my life. The hypnotherapy sessions helped me overcome anxiety that I had been dealing with for years. I feel lighter and more at peace with myself.',
    avatar: 'PS',
  },
  {
    name: 'Rahul M.',
    role: 'Life Coaching Client',
    quote:
      'The life coaching sessions at MindSpa gave me the clarity and direction I was looking for. The team is incredibly supportive and genuinely cares about your growth.',
    avatar: 'RM',
  },
  {
    name: 'Anita K.',
    role: 'Chakra Healing',
    quote:
      'I was skeptical at first, but the chakra healing sessions helped me feel more balanced and energized. The therapists are very knowledgeable and make you feel comfortable.',
    avatar: 'AK',
  },
  {
    name: 'Vikram D.',
    role: 'Executive Coaching',
    quote:
      'As a business leader, MindSpa executive coaching helped me manage stress and improve my decision-making abilities. Highly recommended for professionals.',
    avatar: 'VD',
  },
  {
    name: 'Sneha T.',
    role: 'Handwriting Analysis',
    quote:
      'The handwriting analysis was fascinating and surprisingly accurate. It helped me understand my personality traits and areas where I can improve. A unique experience!',
    avatar: 'ST',
  },
  {
    name: 'Arjun P.',
    role: 'Hypnotherapy for Habits',
    quote:
      'I went to MindSpa to break a bad habit, and through hypnotherapy I was able to make a lasting change. The environment is very calming and professional.',
    avatar: 'AP',
  },
];

const testimonialStyles = {
  section: {
    padding: '60px 0 80px',
    background: '#fff',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    color: 'var(--body-text)',
    maxWidth: '600px',
    margin: '0 auto 50px',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '28px',
  },
  card: {
    background: 'var(--light-grey)',
    borderRadius: 'var(--radius-md)',
    padding: '32px 28px',
    border: '1px solid var(--border-light)',
    position: 'relative',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  quoteIcon: {
    fontSize: '36px',
    color: 'var(--blue)',
    marginBottom: '16px',
    display: 'block',
    fontFamily: 'Georgia, serif',
    lineHeight: 1,
    opacity: 0.3,
  },
  quoteText: {
    fontSize: '15px',
    lineHeight: 1.75,
    color: 'var(--body-text)',
    marginBottom: '24px',
    fontStyle: 'italic',
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'var(--blue)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.5px',
  },
  authorName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '2px',
  },
  authorRole: {
    fontSize: '13px',
    color: '#94a3b8',
    margin: 0,
  },
};

function TestimonialsPage() {
  return (
    <>
      <PageBanner title="Testimonials" />

      <section style={testimonialStyles.section}>
        <div className="container">
          <h2 className="section-title">Our Clients Share Their Experience</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
          <p style={testimonialStyles.subtitle}>
            Hear from people who have experienced positive transformation
            through our therapeutic services.
          </p>

          <div style={testimonialStyles.grid} className="testimonials-page-grid">
            {TESTIMONIALS.map((item, index) => (
              <div
                key={index}
                style={testimonialStyles.card}
                className="testimonial-page-card"
              >
                <span style={testimonialStyles.quoteIcon}>&ldquo;</span>
                <p style={testimonialStyles.quoteText}>{item.quote}</p>
                <div style={testimonialStyles.author}>
                  <div style={testimonialStyles.avatar}>{item.avatar}</div>
                  <div>
                    <div style={testimonialStyles.authorName}>{item.name}</div>
                    <p style={testimonialStyles.authorRole}>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .testimonial-page-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        @media (max-width: 700px) {
          .testimonials-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default TestimonialsPage;
