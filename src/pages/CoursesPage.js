import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const COURSES = [
  {
    icon: '🧠',
    title: 'Introduction to Psychology',
    duration: '6 Weeks',
    description:
      'Explore the fundamentals of human psychology, covering key theories, mental processes, and behavioral patterns.',
    status: 'coming_soon',
  },
  {
    icon: '🌀',
    title: 'Hypnotherapy Certification',
    duration: '8 Weeks',
    description:
      'A comprehensive course on clinical hypnotherapy techniques, ethical practice, and hands-on sessions.',
    status: 'coming_soon',
  },
  {
    icon: '✍️',
    title: 'Graphology Masterclass',
    duration: '4 Weeks',
    description:
      'Learn the science of handwriting analysis. Understand personality traits, emotional states, and behavioral tendencies.',
    status: 'coming_soon',
  },
  {
    icon: '🧘',
    title: 'Mindfulness & Meditation',
    duration: '5 Weeks',
    description:
      'Practical techniques for cultivating mindfulness in daily life. Covers breathing exercises, body scans, and guided meditation.',
    status: 'coming_soon',
  },
  {
    icon: '🎯',
    title: 'Life Coaching Essentials',
    duration: '6 Weeks',
    description:
      'Build coaching skills to help others achieve clarity, set goals, and create actionable plans for personal growth.',
    status: 'coming_soon',
  },
  {
    icon: '💼',
    title: 'Corporate Wellness Program',
    duration: '4 Weeks',
    description:
      'Designed for HR professionals and managers. Learn to implement wellness initiatives and support employee mental health.',
    status: 'coming_soon',
  },
];

const coursesStyles = {
  section: {
    padding: '60px 0 80px',
    background: '#fff',
  },
  comingSoonBanner: {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #e8f0fe 0%, #fce7f3 100%)',
    borderRadius: 'var(--radius-md)',
    padding: '32px 24px',
    marginBottom: '50px',
    border: '1px solid var(--border-light)',
  },
  comingSoonText: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '8px',
  },
  comingSoonSub: {
    fontSize: '14px',
    color: 'var(--body-text)',
    margin: 0,
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
    padding: '30px 26px',
    border: '1px solid var(--border-light)',
    position: 'relative',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '36px',
  },
  badge: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '4px 12px',
    borderRadius: '50px',
    background: '#fef3c7',
    color: '#92400e',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '6px',
  },
  duration: {
    fontSize: '13px',
    color: 'var(--blue)',
    fontWeight: 600,
    marginBottom: '12px',
    display: 'block',
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
  ctaText: {
    fontSize: '15px',
    color: 'var(--body-text)',
    marginBottom: '20px',
    lineHeight: 1.6,
  },
};

function CoursesPage() {
  return (
    <>
      <PageBanner title="All Courses" />

      <section style={coursesStyles.section}>
        <div className="container">
          <h2 className="section-title">Upcoming Courses</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>

          <div style={coursesStyles.comingSoonBanner}>
            <h3 style={coursesStyles.comingSoonText}>
              Courses Launching Soon!
            </h3>
            <p style={coursesStyles.comingSoonSub}>
              We are preparing a range of professional courses in psychology,
              coaching, and wellness. Stay tuned for enrollment details.
            </p>
          </div>

          <div style={coursesStyles.grid} className="courses-page-grid">
            {COURSES.map((course, index) => (
              <div
                key={index}
                style={coursesStyles.card}
                className="course-page-card"
              >
                <div style={coursesStyles.cardHeader}>
                  <span style={coursesStyles.icon}>{course.icon}</span>
                  <span style={coursesStyles.badge}>Coming Soon</span>
                </div>
                <h3 style={coursesStyles.title}>{course.title}</h3>
                <span style={coursesStyles.duration}>{course.duration}</span>
                <p style={coursesStyles.description}>{course.description}</p>
              </div>
            ))}
          </div>

          <div style={coursesStyles.ctaWrap}>
            <p style={coursesStyles.ctaText}>
              Interested in our courses? Get in touch and we will notify you
              when enrollment opens.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .course-page-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        @media (max-width: 700px) {
          .courses-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default CoursesPage;
